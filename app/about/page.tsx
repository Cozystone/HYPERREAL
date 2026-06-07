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

const experienceGroups = [
  {
    title: "Arts / Sound",
    items: [
      "바이올린, 클라리넷, 우쿨렐레, 리코더, 단소 등 악기 연주",
      "보컬, 작곡, 그림을 포함한 예술 활동",
      "중고등학교 교내축제 보컬 및 오케스트라 부문 참가",
      "서울 학생필하모닉오케스트라 지원 경험",
    ],
  },
  {
    title: "Writing / Critique",
    items: [
      "시 300편 이상 작성",
      "글쓰기 대회 다수 참여 및 수상",
      "독립영화 등 영화 시청과 비평",
      "계정 운영을 통한 문장, 감정, 관심사 기록",
    ],
  },
  {
    title: "School / Community",
    items: [
      "초등학교 전교부회장",
      "중학교 전과목 A",
      "중학교 방송부 활동",
      "고등학교 과학기술정보통신부 동아리 활동",
      "중학교 미술전시 출품",
    ],
  },
  {
    title: "Learning / Field",
    items: [
      "조향학 공부 및 실험",
      "하남어린이천문대 수료",
      "경복궁 문화유산해설사 취득",
      "하나고등학교 지원 및 면접",
      "Besir 해커톤 참여",
      "세바시 청소년캠프 참여 및 발표",
      "2023년도 송파구 장학생 선정",
    ],
  },
  {
    title: "Human Data",
    items: [
      "이별, 관계, 정서의 흔적을 글과 기획의 재료로 보관",
      "사람을 관찰하고, 말과 태도와 기억이 남기는 결을 기록",
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
    <main className="page-shell enter-soft pt-[calc(var(--header-height)+56px)]">
      <SectionHeader
        eyebrow="ABOUT"
        title="Kim Anseok / Anseok Kim"
        intro="기술과 인문학, 아날로그와 미래감, 시와 제품 사이에서 사람에 관한 기록을 만든다."
      />

      <section className="mt-12 grid gap-8 border-b border-line pb-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="draft-card p-6 md:p-8">
          <CaptionLabel>IDENTITY / SIGNAL</CaptionLabel>
          <p className="mt-8 text-3xl font-black leading-none md:text-6xl">
            바이브코더, 예술가, 디자이너, 시인, 기획자, 연설가.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-ink-soft">
            김안석은 감각을 구조로 바꾸고, 경험을 제품과 문장으로 옮기는
            사람이다. HYPERREAL의 About은 이력서보다 개인 운영체제에 가깝다.
            무엇을 배웠고, 무엇을 좋아하고, 어떤 장면을 지나왔는지 압축해 둔
            인덱스다.
          </p>
        </div>

        <div className="grid content-start gap-8">
          <ArchivePanel label="NAME">
            <p className="text-2xl font-black">김안석</p>
            <p className="mt-1 text-sm font-black text-ink-soft">Anseok Kim</p>
          </ArchivePanel>

          <ArchivePanel label="ROLES">
            <TagCloud items={roles} />
          </ArchivePanel>
        </div>
      </section>

      <section className="grid gap-8 border-b border-line py-12 md:grid-cols-[160px_1fr]">
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

      <section className="grid gap-8 border-b border-line py-12 md:grid-cols-[160px_1fr]">
        <CaptionLabel>TASTE / MATERIAL</CaptionLabel>
        <div>
          <p className="max-w-3xl text-2xl font-black leading-snug md:text-4xl">
            인간다움, 오래된 물성, 본질을 묻는 태도. 그리고 기술이 사람을 더
            사람답게 만들 수 있는지에 대한 질문.
          </p>
          <div className="mt-8">
            <TagCloud items={tastes} large />
          </div>
        </div>
      </section>

      <section className="grid gap-8 border-b border-line py-12 md:grid-cols-[160px_1fr]">
        <CaptionLabel>EXPERIENCE / INDEX</CaptionLabel>
        <div className="grid gap-5 md:grid-cols-2">
          {experienceGroups.map((group) => (
            <ArchiveList
              key={group.title}
              title={group.title}
              items={group.items}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-8 border-b border-line py-12 md:grid-cols-[160px_1fr]">
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

      <section className="grid gap-8 border-b border-line py-12 md:grid-cols-[160px_1fr]">
        <CaptionLabel>AWARDS / PROOF</CaptionLabel>
        <TagCloud items={awards} large />
      </section>

      <section className="grid gap-8 py-12 md:grid-cols-3">
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
    <section className="border border-line p-5">
      <CaptionLabel>{label}</CaptionLabel>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ArchiveList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="draft-card p-5">
      <CaptionLabel>{title}</CaptionLabel>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="grid grid-cols-[12px_1fr] gap-3 text-sm leading-7">
            <span className="mt-3 h-1.5 w-1.5 bg-signal-red" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
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
            large ? "px-3 py-2 text-sm md:text-base" : "px-2.5 py-1.5 text-sm"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
