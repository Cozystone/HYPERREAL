import type { Metadata } from "next";
import Link from "next/link";
import { FilterBar } from "@/components/FilterBar";
import { SectionHeader } from "@/components/SectionHeader";
import { WorkCard } from "@/components/WorkCard";
import {
  getAllWork,
  getWorkTags,
  type WorkStatus,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
};

type WorkPageProps = {
  searchParams?: Promise<{
    status?: string;
    tag?: string | string[];
  }>;
};

function normalizeTags(value: string | string[] | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function normalizeStatus(value: string | undefined): WorkStatus | "all" {
  if (
    value === "done" ||
    value === "in-progress" ||
    value === "mvp" ||
    value === "prototype" ||
    value === "experiment"
  ) {
    return value;
  }
  return "all";
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const params = (await searchParams) ?? {};
  const activeStatus = normalizeStatus(params.status);
  const activeTags = normalizeTags(params.tag);
  const allWork = getAllWork();
  const tags = getWorkTags();
  const filtered = allWork.filter((item) => {
    const statusMatch =
      activeStatus === "all" ? true : item.status === activeStatus;
    const tagMatch = activeTags.length
      ? activeTags.every((tag) => item.tags.includes(tag))
      : true;
    return statusMatch && tagMatch;
  });

  return (
    <main className="page-shell page-main enter-soft">
      <SectionHeader
        eyebrow="WORK"
        title="Work Index"
        intro="프로젝트를 상태와 태그로 걸러 보는 제작 아카이브."
      />
      <div className="mt-8">
        <FilterBar
          activeStatus={activeStatus}
          activeTags={activeTags}
          tags={tags}
          totalCount={allWork.length}
          resultCount={filtered.length}
        />
      </div>
      <section className="work-grid mt-7 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </section>
      {filtered.length === 0 ? (
        <div className="mt-8 border border-line p-6">
          <p className="text-sm text-ink-soft">
            현재 조건에 맞는 프로젝트가 없습니다.
          </p>
          <Link
            href="/work"
            className="mt-4 inline-flex border border-line px-3 py-2 text-sm font-black hover:bg-ink hover:text-paper"
          >
            RESET FILTER
          </Link>
        </div>
      ) : null}
    </main>
  );
}
