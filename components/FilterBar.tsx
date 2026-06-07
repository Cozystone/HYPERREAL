import Link from "next/link";
import { statusLabels } from "@/components/StatusBadge";
import type { WorkStatus } from "@/lib/content";

type FilterBarProps = {
  activeStatus: WorkStatus | "all";
  activeTags: string[];
  tags: string[];
  totalCount: number;
  resultCount: number;
};

const statuses: Array<{ value: WorkStatus | "all"; label: string }> = [
  { value: "all", label: "전체" },
  { value: "done", label: statusLabels.done },
  { value: "in-progress", label: statusLabels["in-progress"] },
  { value: "experiment", label: statusLabels.experiment },
];

function hrefFor(status: WorkStatus | "all", tags: string[]) {
  const params = new URLSearchParams();
  if (status !== "all") params.set("status", status);
  tags.forEach((tag) => params.append("tag", tag));
  const query = params.toString();
  return query ? `/work?${query}` : "/work";
}

function toggleTag(tags: string[], tag: string) {
  return tags.includes(tag)
    ? tags.filter((item) => item !== tag)
    : [...tags, tag];
}

export function FilterBar({
  activeStatus,
  activeTags,
  tags,
  totalCount,
  resultCount,
}: FilterBarProps) {
  const hasActiveFilter = activeStatus !== "all" || activeTags.length > 0;

  return (
    <section className="grid gap-5 border-y border-line py-5 md:grid-cols-[160px_1fr]">
      <div>
        <p className="caption-label">FILTER / INDEX</p>
        <p className="mt-2 text-sm font-black">
          {resultCount} / {totalCount}
        </p>
      </div>
      <div className="grid gap-4">
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => {
            const active = activeStatus === status.value;
            return (
              <Link
                key={status.value}
                href={hrefFor(status.value, activeTags)}
                aria-current={active ? "page" : undefined}
                className={`border border-line px-3 py-2 text-sm font-black ${
                  active ? "bg-signal-blue text-paper" : "bg-paper hover:bg-ink hover:text-paper"
                }`}
              >
                {status.label}
              </Link>
            );
          })}
          {hasActiveFilter ? (
            <Link
              href="/work"
              className="border border-line px-3 py-2 text-sm font-black hover:bg-ink hover:text-paper"
            >
              RESET
            </Link>
          ) : null}
        </div>
        <div className="max-h-44 overflow-y-auto pr-1">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const active = activeTags.includes(tag);
              return (
                <Link
                  key={tag}
                  href={hrefFor(activeStatus, toggleTag(activeTags, tag))}
                  className={`border border-line px-3 py-2 text-sm font-bold ${
                    active
                      ? "bg-signal-yellow text-ink"
                      : "bg-paper hover:bg-ink hover:text-paper"
                  }`}
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
