import Link from "next/link";
import { CaptionLabel } from "@/components/CaptionLabel";
import { StatusBadge } from "@/components/StatusBadge";
import type { WorkItem } from "@/lib/content";

type WorkCardProps = {
  item: WorkItem;
};

export function WorkCard({ item }: WorkCardProps) {
  return (
    <article className="draft-card group flex min-h-[420px] flex-col">
      <Link href={`/work/${item.slug}`} className="flex h-full flex-col">
        <div className="relative min-h-44 border-b border-line bg-paper">
          {item.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.cover}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute left-8 top-8 h-24 w-36 border border-line" />
              <div className="absolute bottom-8 right-8 h-16 w-28 border border-line" />
              <div className="absolute left-10 right-10 top-1/2 h-px bg-line" />
              <div className="absolute bottom-12 left-20 top-10 w-px bg-line" />
              <div className="stripe-hazard absolute bottom-0 left-0 h-3 w-24" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <CaptionLabel>
            {item.code} / {item.title}
          </CaptionLabel>
          <h2 className="wordmark mt-5 text-3xl leading-none">
            {item.title}
          </h2>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-ink-soft">
            {item.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <StatusBadge status={item.status} />
            <span className="border border-line bg-paper px-2.5 py-1 text-xs font-black">
              {item.year}
            </span>
          </div>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {item.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="caption-label border border-line px-2 py-1 text-ink-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="h-0.5 w-0 bg-signal-red transition-all duration-200 group-hover:w-full" />
      </Link>
    </article>
  );
}
