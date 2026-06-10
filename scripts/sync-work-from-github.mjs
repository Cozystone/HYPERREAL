#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const workDir = path.join(root, "content", "work");

const args = new Set(process.argv.slice(2));
const owner = process.env.WORK_SYNC_OWNER || "Cozystone";
const dryRun = args.has("--dry-run") || process.env.WORK_SYNC_DRY_RUN === "true";
const noScreenshots = args.has("--no-screenshots");
const refreshCovers =
  !noScreenshots && process.env.WORK_SYNC_REFRESH_COVERS === "true";
const refreshCustomCovers =
  process.env.WORK_SYNC_REFRESH_CUSTOM_COVERS === "true";
const createNew = process.env.WORK_SYNC_CREATE_NEW !== "false";
const maxNewItems = Number.parseInt(process.env.WORK_SYNC_MAX_NEW || "8", 10);
const screenshotTimeoutMs = Number.parseInt(
  process.env.WORK_SYNC_SCREENSHOT_TIMEOUT_MS || "30000",
  10,
);
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

const defaultSkipRepos = new Set(["hyperreal", "aemini"]);
const envSkipRepos = new Set(
  (process.env.WORK_SYNC_SKIP_REPOS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean),
);

const repoSlugAliases = new Map([
  ["wethus2", "wethus"],
  ["wethus", "wethus"],
  ["belife", "belife"],
  ["lifenet", "lifenet"],
  ["red-is-cover", "red-is-cover"],
  ["red-is-cove", "red-is-cover"],
  ["-makercode-arcade", "makercode-arcade"],
]);

function log(message) {
  console.log(`[work-sync] ${message}`);
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeRepoName(value) {
  return value.replace(/\.git$/, "").toLowerCase();
}

function repoKey(ownerName, repoName) {
  return `${ownerName.toLowerCase()}/${normalizeRepoName(repoName)}`;
}

function repoFromGithubUrl(url) {
  const match = String(url).match(/github\.com[:/]([^/\s]+)\/([^/#?\s]+)/i);
  if (!match) return undefined;
  return repoKey(match[1], match[2]);
}

function getLinks(data) {
  return Array.isArray(data.links)
    ? data.links.filter(
        (link) =>
          link &&
          typeof link === "object" &&
          typeof link.label === "string" &&
          typeof link.url === "string",
      )
    : [];
}

function uniqueLinks(links) {
  const seen = new Set();
  return links.filter((link) => {
    const key = `${link.label.toLowerCase()}:${link.url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function quote(value) {
  return JSON.stringify(String(value ?? ""));
}

function quoteArray(values) {
  return `[${values.map((value) => quote(value)).join(", ")}]`;
}

function frontmatter(data) {
  const lines = [
    "---",
    `code: ${quote(data.code)}`,
    `title: ${quote(data.title)}`,
    `summary: ${quote(data.summary)}`,
    `status: ${quote(data.status)}`,
    `role: ${quoteArray(data.role || [])}`,
    `period: ${quote(data.period)}`,
    `tags: ${quoteArray(data.tags || [])}`,
    `tools: ${quoteArray(data.tools || [])}`,
    "links:",
  ];

  for (const link of getLinks(data)) {
    lines.push(`  - { label: ${quote(link.label)}, url: ${quote(link.url)} }`);
  }

  if (data.cover) lines.push(`cover: ${quote(data.cover)}`);
  lines.push(`featured: ${data.featured ? "true" : "false"}`);
  lines.push(`date: ${quote(data.date)}`);
  lines.push("---");
  return `${lines.join("\n")}\n`;
}

function serializeWork(data, body) {
  return `${frontmatter(data)}\n${body.trim()}\n`;
}

function yearMonth(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getUTCFullYear()}.${String(date.getUTCMonth() + 1).padStart(
    2,
    "0",
  )}`;
}

function dateOnly(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "1970-01-01";
  return date.toISOString().slice(0, 10);
}

function inferStatus(repo, readme) {
  const source = `${repo.name} ${repo.description || ""} ${readme || ""}`.toLowerCase();
  if (source.includes("mvp")) return "mvp";
  if (source.includes("prototype") || source.includes("프로토타입")) {
    return "prototype";
  }
  if (source.includes("complete") || source.includes("완성")) return "done";
  if (source.includes("progress") || source.includes("진행중")) {
    return "in-progress";
  }
  return "experiment";
}

function extractTextSummary(repo, readme) {
  const description = String(repo.description || "").trim();
  if (description) return description.replace(/\s+/g, " ").slice(0, 150);

  const clean = String(readme || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]+]\([^)]*\)/g, " ")
    .replace(/^#+\s*/gm, "")
    .replace(/[>*_`#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return clean
    ? clean.slice(0, 150)
    : `${repo.name} 저장소를 기준으로 자동 수집된 프로젝트 기록.`;
}

function cleanUrl(rawUrl) {
  try {
    const cleaned = rawUrl.trim().replace(/[),.;\]]+$/g, "");
    const url = new URL(cleaned);
    if (!["http:", "https:"].includes(url.protocol)) return undefined;
    if (/\.(png|jpe?g|gif|svg|webp|pdf|zip)$/i.test(url.pathname)) {
      return undefined;
    }
    return url.toString();
  } catch {
    return undefined;
  }
}

function findLiveUrl(repo, readme) {
  const homepage = cleanUrl(repo.homepage || "");
  if (homepage && !new URL(homepage).hostname.includes("github.com")) {
    return homepage;
  }

  const urls = Array.from(String(readme || "").matchAll(/https?:\/\/[^\s<>"']+/gi))
    .map((match) => cleanUrl(match[0]))
    .filter(Boolean);

  const preferred = urls.find((url) =>
    /(vercel\.app|github\.io|base44\.app|pages\.dev|netlify\.app|fly\.dev|render\.com)/i.test(
      url,
    ),
  );
  if (preferred) return preferred;

  return urls.find((url) => !new URL(url).hostname.includes("github.com"));
}

async function githubJson(apiPath) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "hyperreal-work-sync",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`https://api.github.com${apiPath}`, { headers });
  if (response.status === 404) return undefined;
  if (!response.ok) {
    throw new Error(
      `GitHub API failed ${response.status} ${response.statusText}: ${apiPath}`,
    );
  }
  return response.json();
}

async function getRepos() {
  const repos = [];
  for (let page = 1; page <= 10; page += 1) {
    const batch = await githubJson(
      `/users/${owner}/repos?per_page=100&page=${page}&sort=updated&type=owner`,
    );
    if (!Array.isArray(batch) || batch.length === 0) break;
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos;
}

async function getReadme(repoName) {
  const readme = await githubJson(`/repos/${owner}/${repoName}/readme`);
  if (!readme?.content) return "";
  return Buffer.from(readme.content.replace(/\n/g, ""), "base64").toString(
    "utf8",
  );
}

async function getLanguages(repoName) {
  const languages = await githubJson(`/repos/${owner}/${repoName}/languages`);
  if (!languages || typeof languages !== "object") return [];
  return Object.keys(languages).slice(0, 5);
}

async function readExistingWork() {
  const files = (await fs.readdir(workDir)).filter((file) => file.endsWith(".mdx"));
  const items = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(workDir, file);
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);
    const links = getLinks(parsed.data);
    const githubLink = links.find((link) => /github\.com/i.test(link.url));
    items.push({
      slug,
      file,
      filePath,
      raw,
      body: parsed.content,
      data: { ...parsed.data, links },
      repoKey: githubLink ? repoFromGithubUrl(githubLink.url) : undefined,
    });
  }

  return items;
}

function nextCode(items, offset) {
  const max = items.reduce((highest, item) => {
    const match = String(item.data.code || "").match(/(\d+)/);
    return match ? Math.max(highest, Number.parseInt(match[1], 10)) : highest;
  }, 0);
  return `REP-${String(max + offset).padStart(3, "0")}`;
}

function buildNewBody(repo, readme, liveUrl) {
  const summary = extractTextSummary(repo, readme);
  const pushedAt = dateOnly(repo.pushed_at || repo.updated_at || repo.created_at);
  const liveLine = liveUrl
    ? `Live URL은 ${liveUrl} 기준으로 월간 캡처된다.`
    : "Live URL이 확인되기 전까지는 GitHub 저장소 메타데이터를 기준으로 기록한다.";

  return `## 무엇인가

${summary}

## GitHub 기준

이 항목은 월간 GitHub work sync가 ${owner}/${repo.name} 저장소를 기준으로 생성했다. 마지막 저장소 push 기준일은 ${pushedAt}이다. ${liveLine}

## 다음 정리 포인트

README, 비전 프롬프트, 실행 화면이 더 정리되면 이 본문을 직접 보강한다. 자동화는 링크와 표지 캡처를 갱신하고, 사람의 해석은 이 문서 안에 남긴다.`;
}

function shouldCreateNew(repo, readme, liveUrl) {
  if (!createNew) return false;
  if (repo.archived || repo.fork) return false;
  if (defaultSkipRepos.has(repo.name.toLowerCase())) return false;
  if (envSkipRepos.has(repo.name.toLowerCase())) return false;
  if (liveUrl) return true;
  if (repo.description && repo.description.trim().length > 8) return true;
  return /(portfolio|project|mvp|prototype|실험|프로젝트)/i.test(readme || "");
}

function plannedSlug(repo) {
  const key = repo.name.toLowerCase();
  return repoSlugAliases.get(key) || slugify(repo.name);
}

async function fileHash(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return crypto.createHash("sha256").update(data).digest("hex");
  } catch {
    return undefined;
  }
}

async function writeIfChanged(filePath, content) {
  let current = "";
  try {
    current = await fs.readFile(filePath, "utf8");
  } catch {
    // New file.
  }
  if (current === content) return false;
  if (!dryRun) await fs.writeFile(filePath, content, "utf8");
  return true;
}

async function captureCover(browser, item, liveUrl, coverPublicPath) {
  const coverPath = path.join(root, coverPublicPath.replace(/^\//, ""));
  const tempPath = `${coverPath}.tmp`;
  const previousHash = await fileHash(coverPath);

  log(`capturing ${item.slug} from ${liveUrl}`);
  if (dryRun) return false;

  await fs.mkdir(path.dirname(coverPath), { recursive: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  try {
    await page.goto(liveUrl, {
      waitUntil: "domcontentloaded",
      timeout: screenshotTimeoutMs,
    });
    await page.addStyleTag({
      content:
        "*,*::before,*::after{animation-duration:0.001s!important;transition-duration:0s!important;scroll-behavior:auto!important}",
    });
    await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: tempPath,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
      animations: "disabled",
    });
  } finally {
    await page.close().catch(() => {});
  }

  const nextHash = await fileHash(tempPath);
  if (previousHash && previousHash === nextHash) {
    await fs.rm(tempPath, { force: true });
    return false;
  }

  await fs.rename(tempPath, coverPath);
  return true;
}

async function main() {
  const existing = await readExistingWork();
  const byRepo = new Map(existing.filter((item) => item.repoKey).map((item) => [item.repoKey, item]));
  const bySlug = new Map(existing.map((item) => [item.slug, item]));
  const repos = await getRepos();

  let newCount = 0;
  let changedFiles = 0;
  const screenshotQueue = [];

  for (const repo of repos) {
    if (repo.archived || repo.fork) continue;
    if (defaultSkipRepos.has(repo.name.toLowerCase())) continue;
    if (envSkipRepos.has(repo.name.toLowerCase())) continue;

    const key = repoKey(repo.owner.login, repo.name);
    const slug = plannedSlug(repo);
    let item = byRepo.get(key) || bySlug.get(slug);

    const readme = await getReadme(repo.name).catch(() => "");
    const liveUrl = findLiveUrl(repo, readme);

    if (!item && shouldCreateNew(repo, readme, liveUrl)) {
      if (newCount >= maxNewItems) continue;
      const languages = await getLanguages(repo.name).catch(() => []);
      const data = {
        code: nextCode(existing, newCount + 1),
        title: repo.name.replace(/[-_]+/g, " ").trim(),
        summary: extractTextSummary(repo, readme),
        status: inferStatus(repo, readme),
        role: ["GitHub archive", "Product record"],
        period: `${yearMonth(repo.created_at)} - ${yearMonth(repo.pushed_at || repo.updated_at)} GitHub sync`,
        tags: Array.from(new Set([...(repo.topics || []), ...languages])).slice(0, 5),
        tools: languages.length ? languages : ["GitHub"],
        links: uniqueLinks([
          { label: "GitHub", url: repo.html_url },
          ...(liveUrl ? [{ label: "Live", url: liveUrl }] : []),
        ]),
        cover: liveUrl ? `/images/work/${slug}.png` : undefined,
        featured: false,
        date: dateOnly(repo.pushed_at || repo.updated_at || repo.created_at),
      };
      const body = buildNewBody(repo, readme, liveUrl);
      item = {
        slug,
        file: `${slug}.mdx`,
        filePath: path.join(workDir, `${slug}.mdx`),
        raw: "",
        body,
        data,
        repoKey: key,
      };
      bySlug.set(slug, item);
      byRepo.set(key, item);
      existing.push(item);
      newCount += 1;
      log(`planned new work item ${slug}`);
    }

    if (!item) continue;

    const links = getLinks(item.data);
    const hasGithub = links.some((link) => repoFromGithubUrl(link.url) === key);
    const hasLive = liveUrl && links.some((link) => link.label.toLowerCase() === "live");
    const nextData = {
      ...item.data,
      links: uniqueLinks([
        ...(hasGithub ? links : [{ label: "GitHub", url: repo.html_url }, ...links]),
        ...(!hasLive && liveUrl ? [{ label: "Live", url: liveUrl }] : []),
      ]),
    };

    const standardCover = `/images/work/${item.slug}.png`;
    const hasCustomCover = Boolean(nextData.cover && nextData.cover !== standardCover);
    const canRefreshCover = !hasCustomCover || refreshCustomCovers;

    if (liveUrl && !nextData.cover) {
      nextData.cover = standardCover;
    }

    if (liveUrl && refreshCovers && canRefreshCover) {
      nextData.cover = nextData.cover || standardCover;
    }

    const nextContent = serializeWork(nextData, item.body);
    if (await writeIfChanged(item.filePath, nextContent)) {
      changedFiles += 1;
      item.data = nextData;
      log(`${dryRun ? "would update" : "updated"} ${item.file}`);
    }

    const shouldCaptureCover =
      liveUrl &&
      nextData.cover &&
      ((refreshCovers && canRefreshCover) || !item.data.cover);

    if (shouldCaptureCover) {
      screenshotQueue.push({ item, liveUrl, cover: nextData.cover });
    }
  }

  let changedImages = 0;
  if (screenshotQueue.length > 0 && !noScreenshots) {
    let chromium;
    try {
      ({ chromium } = await import("playwright"));
    } catch (error) {
      log(`playwright unavailable; skipping screenshots (${error.message})`);
    }

    if (chromium) {
      const browser = await chromium.launch();
      try {
        for (const entry of screenshotQueue) {
          try {
            if (
              await captureCover(
                browser,
                entry.item,
                entry.liveUrl,
                entry.cover,
              )
            ) {
              changedImages += 1;
            }
          } catch (error) {
            log(`failed to capture ${entry.item.slug}: ${error.message}`);
          }
        }
      } finally {
        await browser.close().catch(() => {});
      }
    }
  }

  log(
    `${dryRun ? "dry run: " : ""}${changedFiles} content file(s), ${changedImages} cover image(s), ${newCount} new item(s)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
