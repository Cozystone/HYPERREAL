import type { Metadata } from "next";
import { CaptionLabel } from "@/components/CaptionLabel";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About",
};

const interests = [
  "AI product systems",
  "Founder tools",
  "Narrative strategy",
  "Personal data interfaces",
  "Archive design",
];

export default function AboutPage() {
  return (
    <main className="page-shell enter-soft pt-[calc(var(--header-height)+56px)]">
      <SectionHeader
        eyebrow="ABOUT"
        title="Maker, Founder, Archivist"
        intro="HYPERREAL은 완성된 결과물보다 만드는 과정의 밀도와 의사결정의 흔적을 보존하는 포트폴리오입니다."
      />

      <section className="mt-12 grid gap-10 md:grid-cols-[1fr_1fr]">
        <div className="draft-card p-6 md:p-8">
          <CaptionLabel>IDENTITY / STATEMENT</CaptionLabel>
          <p className="mt-8 text-2xl font-black leading-snug md:text-4xl">
            좋은 제품은 설명보다 구조로 먼저 설득한다고 믿습니다.
          </p>
          <p className="mt-6 leading-8 text-ink-soft">
            그래서 HYPERREAL은 예쁜 포트폴리오보다 기록 시스템에 가깝게
            설계되었습니다. 프로젝트, 글, 실험을 같은 규칙 안에 두고 시간이
            지나도 읽히는 아카이브로 쌓습니다.
          </p>
        </div>

        <div className="grid content-start gap-8">
          <div>
            <CaptionLabel>FIELDS / SIGNALS</CaptionLabel>
            <div className="mt-4 flex flex-wrap gap-2">
              {interests.map((item) => (
                <span
                  key={item}
                  className="border border-line bg-paper-strong px-3 py-2 text-sm font-black"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="blueprint-line" />
          <div>
            <CaptionLabel>CONTACT / LINKS</CaptionLabel>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="mailto:anseokkim@gmail.com"
                className="border border-line bg-ink px-4 py-3 text-sm font-black text-paper hover:bg-signal-red"
              >
                EMAIL
              </a>
              <a
                href="https://github.com/Cozystone/HYPERREAL"
                target="_blank"
                rel="noreferrer"
                className="border border-line px-4 py-3 text-sm font-black hover:bg-ink hover:text-paper"
              >
                GITHUB
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
