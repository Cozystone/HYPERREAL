import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CaptionLabel } from "@/components/CaptionLabel";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About / Anseok Kim",
  description:
    "Personal archive for Anseok Kim: education, roles, taste, projects, awards, travel, and lived experience.",
};

const roles = [
  "Vibe Coder",
  "Artist",
  "Designer",
  "Poet",
  "Planner",
  "Speaker",
];

const education = [
  {
    period: "~ 2025",
    title: "경기고등학교",
    note: "고등학교까지의 기초 기록과 실험을 쌓은 시기.",
  },
  {
    period: "2026 ~",
    title: "넥스트챌린지스쿨(NCS)",
    note: "창업, 기술, 문제정의, 제작을 더 직접적인 언어로 다루는 현재.",
  },
];

const tastes = [
  "인간다움",
  "아날로그",
  "기술 & 인문학",
  "철학",
  "본질",
  "Virgil Abloh",
  "시",
  "헌책",
  "정(情)",
  "사람에 관련된 모든 것",
];

const experienceSignals = [
  { value: "300+", label: "Poems" },
  { value: "2026", label: "NCS / Now" },
  { value: "300+", label: "Startup Team" },
  { value: "14", label: "Countries" },
];

const experienceTracks = [
  {
    code: "E-01",
    scope: "Writing / Human",
    title: "사람을 문장으로 오래 보관하는 일",
    summary:
      "시, 소설, 비평, 계정 운영을 통해 감정과 관계의 결을 관찰하고 구조화한다.",
    proof: [
      "시 300편 이상 작성",
      "소설 『모범생』 집필 및 구조 설계",
      "독립영화 시청과 비평 기록",
      "글쓰기 대회 다수 참여 및 수상",
    ],
  },
  {
    code: "E-02",
    scope: "Product / Startup",
    title: "문학 SNS에서 공교육 AI까지",
    summary:
      "문학, 청소년 네트워크, 심리상담, 진로 설계를 제품 언어로 바꾸는 프로젝트들을 이어 왔다.",
    proof: [
      "SINABRO: 문학인을 위한 SNS, 학생창업유망팀 300+ 도약트랙 선정",
      "WETHUS: 청소년 학생주도 프로젝트 플랫폼",
      "BELIFE / LIFENET: 개인화 분석과 진로 네트워킹 피벗",
      "Withyou+: 전략기획 및 유저플로우 담당",
    ],
  },
  {
    code: "E-03",
    scope: "Research / Security",
    title: "AI 서비스의 데이터 윤리를 점검하는 시선",
    summary:
      "Inflexus AI에서는 업무 로그, RAG 권한, 개인정보, 보안 리스크를 분석하며 제품의 보이지 않는 층을 다뤘다.",
    proof: [
      "INPLEXUS AI 보안 분석 보고서 작성",
      "역할 기반 접근권한, 로그, 토큰, AI 데이터 보존 리스크 검토",
      "경쟁사/레퍼런스 서비스 보안 흐름 비교",
      "AI 데이터 거버넌스와 인증 전략 제안",
    ],
  },
  {
    code: "E-04",
    scope: "Stage / Voice",
    title: "보이지 않던 행복을 보는 방법",
    summary:
      "무대와 발표를 통해 개인적 경험을 공적인 언어로 바꾸고, 듣는 사람에게 남는 문장으로 압축한다.",
    href: "https://youtu.be/soi0wcKx2kI?si=xsKfFlZi2SGvEibw",
    hrefLabel: "세바시 발표 영상",
    proof: [
      "세바시 청소년캠프 8기 수료생 발표",
      "중고등학교 교내축제 보컬 및 오케스트라 부문 참가",
      "하나고등학교 지원 및 면접 경험",
      "대전시 창업컨퍼런스 오퍼레이터 참여",
    ],
  },
  {
    code: "E-05",
    scope: "Art / Sound",
    title: "손과 귀로 만든 감각의 레이어",
    summary:
      "악기, 보컬, 그림, 작곡, 조향, 영화와 패션을 한 사람의 취향 체계 안에서 연결한다.",
    proof: [
      "바이올린, 클라리넷, 우쿨렐레, 리코더, 단소 등 악기 연주",
      "Moscato d'Asti 크리에이티브 크루 기획 및 비주얼 디렉션",
      "무진장 AI 영상광고제 기획과 제작 흐름 참여",
      "연작 「박제」 Highschool 및 유화 사계 기획",
    ],
  },
  {
    code: "E-06",
    scope: "Learning / Field",
    title: "과학, 유산, 천문, 학교 밖의 현장",
    summary:
      "제도 안팎의 학습 경험을 축적하며 관찰, 설명, 운영, 탐구의 감각을 넓혀 왔다.",
    proof: [
      "2026 한국 뇌캠프 수료",
      "하남어린이천문대 수료",
      "경복궁 문화유산해설사 취득",
      "Besir 해커톤 참여 및 2023 송파구 장학생 선정",
    ],
  },
  {
    code: "E-07",
    scope: "School / Community",
    title: "작은 조직 안에서 배운 운영 감각",
    summary:
      "학교와 커뮤니티 안에서 말하고, 정리하고, 이끌고, 기록하는 역할을 반복해 왔다.",
    proof: [
      "초등학교 전교부회장",
      "중학교 전과목 A 및 방송부 활동",
      "고등학교 과학기술정보통신부 동아리 활동",
      "중학교 미술전시 출품",
    ],
  },
];

const projects = [
  {
    name: "SINABRO",
    detail: "문학인을 위한 SNS 플랫폼",
  },
  {
    name: "K&K Company",
    detail: "영재교육원 창업프로젝트 편광가림판",
  },
  {
    name: "세바시 청소년캠프",
    detail: "프레젠테이션 참여 및 발표",
  },
  {
    name: "WETHUS",
    detail: "청소년을 위한 스타트업 팀빌딩 플랫폼 구상",
  },
  {
    name: "Withyou+",
    detail: "청소년 심리상담 플랫폼 전략기획 및 유저플로우 담당",
  },
  {
    name: "대전시 창업컨퍼런스",
    detail: "오퍼레이터 경험, 중단된 운영 기록 포함",
  },
];

const awards = [
  "글쓰기 대회 다수",
  "남산백일장 장려상",
  "교보문고 어린이 시화전 대상",
  "학생창업유망팀 300+ 본선진출 및 장관상 수상",
  "교내수상",
];

const travel = [
  "미국",
  "하와이",
  "괌",
  "사이판",
  "영국",
  "프랑스",
  "스위스",
  "이탈리아",
  "말레이시아",
  "오스트레일리아",
  "홍콩",
  "마카오",
  "일본",
  "싱가포르",
];

const sports = ["배드민턴", "테니스", "수영", "골프", "탁구", "농구"];

const interests = ["음악", "독서", "미술", "영화", "패션", "글쓰기"];

export default function AboutPage() {
  return (
    <main className="page-shell page-main enter-soft">
      <SectionHeader
        eyebrow="ABOUT"
        title="Kim Anseok / Anseok Kim"
        intro="기술과 인문학, 아날로그와 미래감, 시와 제품 사이에서 사람에 관한 기록을 만든다."
      />

      <section className="mt-10 grid gap-5 border-b border-line pb-10 md:mt-12 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:pb-12">
        <div className="draft-card p-5 md:p-8">
          <CaptionLabel>IDENTITY / SIGNAL</CaptionLabel>
          <p className="mt-7 break-keep text-2xl font-black leading-tight sm:text-3xl md:mt-8 md:text-6xl md:leading-none">
            바이브코더, 예술가, 디자이너, 시인, 기획자, 연설가.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-ink-soft sm:text-base sm:leading-8 md:mt-6">
            김안석은 감각을 구조로 바꾸고, 경험을 제품과 문장으로 옮기는
            사람이다. HYPERREAL의 About은 이력서보다 개인 운영체제에 가깝다.
            무엇을 배웠고, 무엇을 좋아하고, 어떤 장면을 지나왔는지 압축해 둔
            인덱스다.
          </p>
        </div>

        <div className="grid content-start gap-5 md:gap-8">
          <ArchivePanel label="NAME">
            <p className="text-2xl font-black">김안석</p>
            <p className="mt-1 text-sm font-black text-ink-soft">Anseok Kim</p>
          </ArchivePanel>

          <ArchivePanel label="ROLES">
            <TagCloud items={roles} />
          </ArchivePanel>
        </div>
      </section>

      <section className="grid gap-5 border-b border-line py-10 md:grid-cols-[160px_1fr] md:gap-8 md:py-12">
        <CaptionLabel>EDUCATION / NOW</CaptionLabel>
        <div className="grid gap-4 md:grid-cols-2">
          {education.map((item) => (
            <div key={item.title} className="border border-line p-5">
              <p className="text-sm font-black text-signal-red">
                {item.period}
              </p>
              <h2 className="mt-4 text-2xl font-black">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 border-b border-line py-10 md:grid-cols-[160px_1fr] md:gap-8 md:py-12">
        <CaptionLabel>TASTE / MATERIAL</CaptionLabel>
        <div>
          <p className="max-w-3xl break-keep text-xl font-black leading-snug sm:text-2xl md:text-4xl">
            인간다움, 오래된 물성, 본질을 묻는 태도. 그리고 기술이 사람을 더
            사람답게 만들 수 있는지에 대한 질문.
          </p>
          <div className="mt-8">
            <TagCloud items={tastes} large />
          </div>
        </div>
      </section>

      <section className="grid gap-5 border-b border-line py-10 md:grid-cols-[160px_1fr] md:gap-8 md:py-12">
        <div className="content-start md:sticky md:top-[calc(var(--header-height)+24px)]">
          <CaptionLabel>EXPERIENCE / INDEX</CaptionLabel>
          <div className="mt-8 hidden border-y border-line md:grid">
            {experienceSignals.map((signal) => (
              <div
                key={signal.label}
                className="grid grid-cols-[1fr_64px] items-baseline border-b border-line py-3 last:border-b-0"
              >
                <p className="caption-label">{signal.label}</p>
                <p className="text-right text-xl font-black">
                  {signal.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="border-y border-line">
            {experienceTracks.map((track) => (
              <article
                key={track.code}
                className="grid gap-5 border-b border-line py-6 last:border-b-0 md:grid-cols-[72px_minmax(210px,0.46fr)_1fr]"
              >
                <div className="flex items-baseline justify-between gap-4 md:block">
                  <p className="text-sm font-black text-signal-red">
                    {track.code}
                  </p>
                  <p className="caption-label mt-0 md:mt-3">{track.scope}</p>
                </div>

                <div>
                  <h2 className="break-keep text-xl font-black leading-tight sm:text-2xl">
                    {track.title}
                  </h2>
                  <p className="mt-4 break-keep text-sm leading-7 text-ink-soft">
                    {track.summary}
                  </p>
                  {track.href ? (
                    <a
                      href={track.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex min-h-9 items-center border border-line bg-ink px-3 py-2 text-xs font-black text-paper hover:bg-signal-red"
                    >
                      {track.hrefLabel}
                    </a>
                  ) : null}
                </div>

                <ul className="grid content-start gap-0 border-t border-line md:border-t-0">
                  {track.proof.map((item, index) => (
                    <li
                      key={item}
                      className="grid grid-cols-[52px_1fr] gap-4 border-b border-line py-3 text-sm leading-6 last:border-b-0 md:grid-cols-[64px_1fr]"
                    >
                      <span className="caption-label">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="break-keep">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-4 border border-line bg-paper-strong p-4 md:grid-cols-[160px_1fr]">
            <CaptionLabel>READING / SOURCE</CaptionLabel>
            <p className="text-sm leading-7 text-ink-soft">
              Drive 문서, 2026 프로젝트 스프레드시트, 세바시 발표 영상, 프로젝트
              라이브 UI를 기준으로 정리한 경험 인덱스.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 border-b border-line py-10 md:grid-cols-[160px_1fr] md:gap-8 md:py-12">
        <CaptionLabel>PROJECTS / EARLY WORK</CaptionLabel>
        <div className="grid gap-3">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="grid gap-3 border border-line p-4 md:grid-cols-[120px_220px_1fr] md:items-center"
            >
              <p className="caption-label">P-{String(index + 1).padStart(2, "0")}</p>
              <p className="text-lg font-black">{project.name}</p>
              <p className="text-sm leading-7 text-ink-soft">
                {project.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 border-b border-line py-10 md:grid-cols-[160px_1fr] md:gap-8 md:py-12">
        <CaptionLabel>AWARDS / PROOF</CaptionLabel>
        <TagCloud items={awards} large />
      </section>

      <section className="grid gap-5 py-10 md:grid-cols-3 md:gap-8 md:py-12">
        <ArchivePanel label="INTERESTS">
          <TagCloud items={interests} />
        </ArchivePanel>
        <ArchivePanel label="TRAVEL">
          <TagCloud items={travel} />
        </ArchivePanel>
        <ArchivePanel label="SPORTS">
          <TagCloud items={sports} />
        </ArchivePanel>
      </section>
    </main>
  );
}

function ArchivePanel({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="border border-line p-4 sm:p-5">
      <CaptionLabel>{label}</CaptionLabel>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function TagCloud({ items, large = false }: { items: string[]; large?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`border border-line bg-paper-strong font-black ${
            large
              ? "min-h-10 px-3 py-2 text-sm md:text-base"
              : "min-h-9 px-2.5 py-1.5 text-sm"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
