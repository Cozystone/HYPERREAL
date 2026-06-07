import type { Metadata } from "next";
import { LogList } from "@/components/LogList";
import { SectionHeader } from "@/components/SectionHeader";
import { getAllLogs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Log",
};

export default function LogPage() {
  const logs = getAllLogs();

  return (
    <main className="page-shell page-main enter-soft">
      <SectionHeader
        eyebrow="LOG"
        title="Log Index"
        intro="기획, 회고, 생각을 날짜순으로 남기는 기록."
      />
      <section className="mt-8 md:mt-10">
        <LogList items={logs} />
      </section>
    </main>
  );
}
