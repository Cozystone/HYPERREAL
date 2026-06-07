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
    <section className="grid gap-5 border-b border-line pb-7 md:grid-cols-[160px_1fr] md:gap-8 md:pb-8">
      <div>
        <CaptionLabel>
          {index} / {eyebrow}
        </CaptionLabel>
      </div>
      <div>
        <h1 className="detail-title responsive-title wordmark max-w-4xl">
          {title}
        </h1>
        {intro ? (
          <p className="fluid-copy mt-5 text-ink-soft md:mt-6">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
