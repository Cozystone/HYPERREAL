import Link from "next/link";
import { CaptionLabel } from "@/components/CaptionLabel";
import type { LogItem } from "@/lib/content";

export function LogList({ items }: { items: LogItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <article key={item.slug} className="border-b border-line">
          <Link
            href={`/log/${item.slug}`}
            className="grid gap-3 py-5 hover:bg-paper-strong md:grid-cols-[160px_1fr_220px] md:items-center"
          >
            <CaptionLabel>{item.date}</CaptionLabel>
            <div>
              <h2 className="break-keep text-xl font-black leading-snug md:text-2xl">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-ink-soft md:leading-6">
                {item.summary}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-1 md:justify-end md:pt-0">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="caption-label border border-line px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
