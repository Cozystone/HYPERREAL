import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

export type WorkStatus = "done" | "in-progress" | "experiment";

export type WorkLink = {
  label: string;
  url: string;
};

export type WorkItem = {
  slug: string;
  body: string;
  code: string;
  title: string;
  summary: string;
  status: WorkStatus;
  role: string[];
  period: string;
  tags: string[];
  tools: string[];
  links: WorkLink[];
  cover?: string;
  featured: boolean;
  date: string;
  year: string;
};

export type LogItem = {
  slug: string;
  body: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  year: string;
  readingTime: string;
};

const contentRoot = path.join(process.cwd(), "content");

function readDir(kind: "work" | "log") {
  const dir = path.join(contentRoot, kind);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function asWorkStatus(value: unknown): WorkStatus {
  if (value === "done" || value === "in-progress" || value === "experiment") {
    return value;
  }
  return "experiment";
}

function asLinks(value: unknown): WorkLink[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (
      item &&
      typeof item === "object" &&
      "label" in item &&
      "url" in item &&
      typeof item.label === "string" &&
      typeof item.url === "string"
    ) {
      return [{ label: item.label, url: item.url }];
    }
    return [];
  });
}

function readingTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function readFile(kind: "work" | "log", file: string) {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(contentRoot, kind, file), "utf8");
  const { data, content } = matter(raw);
  return { slug, data, content };
}

export const getAllWork = cache((): WorkItem[] => {
  return readDir("work")
    .map((file) => {
      const { slug, data, content } = readFile("work", file);
      const date = asString(data.date, "1970-01-01");
      return {
        slug,
        body: content,
        code: asString(data.code, "PRJ-000"),
        title: asString(data.title, slug),
        summary: asString(data.summary),
        status: asWorkStatus(data.status),
        role: asStringArray(data.role),
        period: asString(data.period),
        tags: asStringArray(data.tags),
        tools: asStringArray(data.tools),
        links: asLinks(data.links),
        cover: asString(data.cover) || undefined,
        featured: Boolean(data.featured),
        date,
        year: date.slice(0, 4),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const getFeaturedWork = cache(() => {
  const featured = getAllWork().filter((item) => item.featured);
  return (featured.length ? featured : getAllWork()).slice(0, 4);
});

export const getWorkBySlug = cache((slug: string) => {
  return getAllWork().find((item) => item.slug === slug);
});

export const getWorkTags = cache(() => {
  return Array.from(new Set(getAllWork().flatMap((item) => item.tags))).sort(
    (a, b) => a.localeCompare(b, "ko"),
  );
});

export const getAdjacentWork = cache((slug: string) => {
  const items = getAllWork();
  const index = items.findIndex((item) => item.slug === slug);
  return {
    previous: index > 0 ? items[index - 1] : undefined,
    next: index >= 0 && index < items.length - 1 ? items[index + 1] : undefined,
  };
});

export const getAllLogs = cache((): LogItem[] => {
  return readDir("log")
    .map((file) => {
      const { slug, data, content } = readFile("log", file);
      const date = asString(data.date, "1970-01-01");
      return {
        slug,
        body: content,
        title: asString(data.title, slug),
        date,
        tags: asStringArray(data.tags),
        summary: asString(data.summary),
        year: date.slice(0, 4),
        readingTime: readingTime(content),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const getLogBySlug = cache((slug: string) => {
  return getAllLogs().find((item) => item.slug === slug);
});
