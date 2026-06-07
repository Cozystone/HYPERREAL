import Image from "next/image";
import Link from "next/link";
import { CaptionLabel } from "@/components/CaptionLabel";
import { StatusBadge } from "@/components/StatusBadge";
import type { WorkItem } from "@/lib/content";

type WorkCardProps = {
  item: WorkItem;
};

export function WorkCard({ item }: WorkCardProps) {
  return (
    <article className="work-card draft-card group flex min-h-[360px] overflow-hidden sm:min-h-[400px]">
      <Link
        href={`/work/${item.slug}`}
        className="flex h-full w-full flex-col"
        aria-label={`${item.title} detail`}
      >
        <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-paper sm:aspect-[16/10]">
          {item.cover ? (
            <Image
              src={item.cover}
              alt={`${item.title} project cover`}
              fill
              sizes="(min-width: 1536px) 34vw, (min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
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
        <div className="work-card-body flex flex-1 flex-col p-4 sm:p-5">
          <CaptionLabel>
            {item.code} / {item.title}
          </CaptionLabel>
          <h2 className="work-card-title wordmark mt-4 text-2xl leading-none md:mt-5 md:text-3xl">
            {item.title}
          </h2>
          <p className="work-card-copy mt-3 line-clamp-3 text-sm leading-7 text-ink-soft sm:mt-4">
            {item.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
            <StatusBadge status={item.status} />
            <span className="border border-line bg-paper px-2.5 py-1 text-xs font-black">
              {item.year}
            </span>
          </div>
          <div className="mt-auto flex flex-wrap gap-2 pt-5 sm:pt-6">
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
