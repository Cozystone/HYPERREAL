import type { WorkStatus } from "@/lib/content";

const statusLabels: Record<WorkStatus, string> = {
  done: "완성",
  "in-progress": "진행 중",
  experiment: "실험",
};

const statusClasses: Record<WorkStatus, string> = {
  done: "bg-signal-blue text-paper",
  "in-progress": "bg-signal-red text-paper",
  experiment: "bg-signal-yellow text-ink",
};

export function StatusBadge({ status }: { status: WorkStatus }) {
  return (
    <span
      className={`inline-flex border border-line px-2.5 py-1 text-xs font-black ${statusClasses[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

export { statusLabels };
