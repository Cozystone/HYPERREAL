import { CaptionLabel } from "@/components/CaptionLabel";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  index?: string;
  intro?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  index = "01",
  intro,
}: SectionHeaderProps) {
  return (
    <section className="grid gap-8 border-b border-line pb-8 md:grid-cols-[160px_1fr]">
      <div>
        <CaptionLabel>
          {index} / {eyebrow}
        </CaptionLabel>
      </div>
      <div>
        <h1 className="wordmark max-w-4xl text-5xl leading-none md:text-7xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-base leading-8 text-ink-soft md:text-lg">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
