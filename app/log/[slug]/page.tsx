import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CaptionLabel } from "@/components/CaptionLabel";
import { mdxComponents } from "@/components/MDXComponents";
import { getAllLogs, getLogBySlug } from "@/lib/content";

type LogDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllLogs().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: LogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getLogBySlug(slug);
  return {
    title: item ? item.title : "Log",
    description: item?.summary,
  };
}

export default async function LogDetailPage({ params }: LogDetailProps) {
  const { slug } = await params;
  const item = getLogBySlug(slug);
  if (!item) notFound();

  return (
    <main className="page-shell page-main enter-soft">
      <article className="mx-auto max-w-[760px]">
        <header className="border-b border-line pb-7 md:pb-8">
          <CaptionLabel>
            LOG / {item.date} / {item.readingTime}
          </CaptionLabel>
          <h1 className="responsive-title wordmark mt-5 md:mt-6">
            {item.title}
          </h1>
          <p className="fluid-copy mt-5 text-ink-soft md:mt-6">
            {item.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="caption-label border border-line px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        </header>
        <section className="prose-hyperreal py-10">
          <MDXRemote source={item.body} components={mdxComponents} />
        </section>
      </article>
    </main>
  );
}
