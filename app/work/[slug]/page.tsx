import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CaptionLabel } from "@/components/CaptionLabel";
import { mdxComponents } from "@/components/MDXComponents";
import { StatusBadge } from "@/components/StatusBadge";
import {
  getAdjacentWork,
  getAllWork,
  getWorkBySlug,
  type WorkItem,
} from "@/lib/content";

type WorkDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllWork().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  return {
    title: item ? item.title : "Work",
    description: item?.summary,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailProps) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) notFound();
  const { previous, next } = getAdjacentWork(slug);
  const liveLink = getLiveLink(item);

  return (
    <main className="page-shell page-main enter-soft">
      <article>
        <header className="grid gap-5 border-b border-line pb-7 md:grid-cols-[160px_1fr] md:gap-8 md:pb-8">
          <CaptionLabel>{item.code} / DETAIL</CaptionLabel>
          <div>
            <h1 className="detail-title responsive-title wordmark max-w-5xl">
              {item.title}
            </h1>
            <p className="fluid-copy mt-5 text-ink-soft md:mt-6">
              {item.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 md:mt-8">
              <StatusBadge status={item.status} />
              <span className="border border-line px-2.5 py-1 text-xs font-black">
                {item.period}
              </span>
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="caption-label border border-line px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-5 border-b border-line py-7 md:grid-cols-[160px_1fr] md:gap-8 md:py-8">
          <CaptionLabel>METADATA / STACK</CaptionLabel>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <MetaBlock label="Role" values={item.role} />
            <MetaBlock label="Tools" values={item.tools} />
            <div>
              <CaptionLabel>Links</CaptionLabel>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.links.length ? (
                  item.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex min-h-10 items-center border border-line px-3 py-2 text-sm font-black ${
                        link.label.toLowerCase() === "live"
                          ? "bg-ink text-paper hover:bg-signal-red"
                          : "hover:bg-ink hover:text-paper"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-ink-soft">Internal archive</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {item.cover ? (
          <section className="border-b border-line py-7 md:py-8">
            <div className="relative aspect-[16/10] overflow-hidden border border-line bg-paper">
              <Image
                src={item.cover}
                alt={`${item.title} project cover`}
                fill
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
          </section>
        ) : null}

        {liveLink ? (
          <section
            id="live-embed"
            className="grid scroll-mt-[calc(var(--header-height)+24px)] gap-5 border-b border-line py-7 md:grid-cols-[160px_1fr] md:gap-8 md:py-8"
          >
            <CaptionLabel>LIVE / EMBED</CaptionLabel>
            <div className="overflow-hidden border border-line bg-paper-strong">
              <div className="flex min-h-12 items-center justify-between gap-2 border-b border-line px-3 py-2 sm:gap-4">
                <div
                  aria-hidden="true"
                  className="flex shrink-0 items-center gap-1.5"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-signal-red" />
                  <span className="h-2.5 w-2.5 rounded-full bg-signal-yellow" />
                  <span className="h-2.5 w-2.5 rounded-full bg-signal-blue" />
                </div>
                <p className="hidden min-w-0 truncate border border-line bg-paper px-3 py-1 text-xs font-black text-ink-soft sm:block">
                  {liveLink.url}
                </p>
                <a
                  href={liveLink.url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 border border-line bg-ink px-3 py-1.5 text-xs font-black text-paper hover:bg-signal-red"
                >
                  OPEN
                </a>
              </div>
              <div className="relative aspect-[9/12] min-h-[420px] bg-paper sm:aspect-[16/10] sm:min-h-0">
                <iframe
                  src={liveLink.url}
                  title={`${item.title} live preview`}
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-[760px] py-9 md:py-12">
          <div className="prose-hyperreal">
            <MDXRemote source={item.body} components={mdxComponents} />
          </div>
        </section>
      </article>

      <nav className="grid gap-4 border-t border-line pt-6 md:grid-cols-2">
        <AdjacentLink label="Previous" item={previous} />
        <AdjacentLink label="Next" item={next} alignRight />
      </nav>
    </main>
  );
}

function getLiveLink(item: WorkItem) {
  return item.links.find((link) => link.label.toLowerCase() === "live");
}

function MetaBlock({ label, values }: { label: string; values: string[] }) {
  return (
    <div>
      <CaptionLabel>{label}</CaptionLabel>
      <p className="mt-3 text-sm leading-7 text-ink-soft">
        {values.length ? values.join(" / ") : "Not specified"}
      </p>
    </div>
  );
}

function AdjacentLink({
  label,
  item,
  alignRight = false,
}: {
  label: string;
  item?: { slug: string; title: string; code: string };
  alignRight?: boolean;
}) {
  if (!item) return <div />;
  return (
    <Link
      href={`/work/${item.slug}`}
      className={`border border-line p-4 hover:bg-ink hover:text-paper ${
        alignRight ? "md:text-right" : ""
      }`}
    >
      <CaptionLabel>{label}</CaptionLabel>
      <p className="mt-2 text-lg font-black leading-snug">
        {item.code} / {item.title}
      </p>
    </Link>
  );
}
