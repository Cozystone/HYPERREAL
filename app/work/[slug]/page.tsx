import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CaptionLabel } from "@/components/CaptionLabel";
import { mdxComponents } from "@/components/MDXComponents";
import { StatusBadge } from "@/components/StatusBadge";
import { getAdjacentWork, getAllWork, getWorkBySlug } from "@/lib/content";

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

  return (
    <main className="page-shell enter-soft pt-[calc(var(--header-height)+56px)]">
      <article>
        <header className="grid gap-8 border-b border-line pb-8 md:grid-cols-[160px_1fr]">
          <CaptionLabel>{item.code} / DETAIL</CaptionLabel>
          <div>
            <h1 className="wordmark max-w-5xl text-5xl leading-none md:text-8xl">
              {item.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
              {item.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
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

        <section className="grid gap-8 border-b border-line py-8 md:grid-cols-[160px_1fr]">
          <CaptionLabel>METADATA / STACK</CaptionLabel>
          <div className="grid gap-5 md:grid-cols-3">
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
                      className="border border-line px-3 py-2 text-sm font-black hover:bg-ink hover:text-paper"
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

        <section className="mx-auto max-w-[760px] py-12">
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
      <p className="mt-2 text-lg font-black">
        {item.code} / {item.title}
      </p>
    </Link>
  );
}
