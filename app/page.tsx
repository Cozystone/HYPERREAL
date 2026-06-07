import Image from "next/image";
import Link from "next/link";
import { CaptionLabel } from "@/components/CaptionLabel";
import { LogList } from "@/components/LogList";
import { SectionHeader } from "@/components/SectionHeader";
import { WorkCard } from "@/components/WorkCard";
import { getAllLogs, getFeaturedWork } from "@/lib/content";

export default function Home() {
  const featuredWork = getFeaturedWork();
  const recentLogs = getAllLogs().slice(0, 3);

  return (
    <main className="enter-soft">
      <section className="relative h-[calc(100svh-20px)] min-h-[620px] overflow-hidden border-b border-line bg-paper md:min-h-[720px]">
        <Image
          src="/images/cover.png"
          alt="HYPERREAL — Portfolio Cover"
          fill
          priority
          sizes="100vw"
          className="cover-image"
        />
      </section>

      <div className="page-shell mt-14">
        <section className="grid gap-6 border-b border-line pb-10 md:grid-cols-[160px_1fr_auto] md:items-end">
          <CaptionLabel>01 / STATEMENT</CaptionLabel>
          <h1 className="wordmark max-w-4xl text-4xl leading-none md:text-7xl">
            Maker & Founder. 만들고 기록한다.
          </h1>
          <Link
            href="/work"
            className="w-fit border border-line bg-ink px-4 py-3 text-sm font-black text-paper hover:bg-signal-red"
          >
            WORK INDEX
          </Link>
        </section>

        <section className="mt-16">
          <SectionHeader
            eyebrow="SELECTED WORK"
            index="02"
            title="Selected Work"
            intro="완성, 진행 중, 실험을 같은 아카이브 질서로 정리한 프로젝트 기록."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredWork.map((item) => (
              <WorkCard key={item.slug} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <SectionHeader
            eyebrow="RECENT LOG"
            index="03"
            title="Recent Log"
            intro="기획, 회고, 생각을 시간순으로 남기는 짧은 기록."
          />
          <div className="mt-8">
            <LogList items={recentLogs} />
          </div>
        </section>
      </div>
    </main>
  );
}
