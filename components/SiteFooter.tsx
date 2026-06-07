import { CaptionLabel } from "@/components/CaptionLabel";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="stripe-hazard h-4 w-full" aria-hidden="true" />
      <div className="page-shell grid gap-8 py-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <CaptionLabel>ARCHIVE / CONTACT</CaptionLabel>
          <p className="mt-3 max-w-xl text-sm leading-7 text-ink-soft">
            Maker & Founder. 만들고 기록한다. 프로젝트, 기획, 실험을
            시간순으로 쌓는 HYPERREAL 포트폴리오 시스템.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-bold">
          <a
            className="border border-line px-3 py-2 hover:bg-ink hover:text-paper"
            href="mailto:anseokkim@gmail.com"
          >
            EMAIL
          </a>
          <a
            className="border border-line px-3 py-2 hover:bg-ink hover:text-paper"
            href="https://github.com/Cozystone/HYPERREAL"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB
          </a>
        </div>
      </div>
    </footer>
  );
}
