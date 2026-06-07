"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaptionLabel } from "@/components/CaptionLabel";
import { Wordmark } from "@/components/Wordmark";

const navItems = [
  { href: "/work", label: "WORK" },
  { href: "/log", label: "LOG" },
  { href: "/about", label: "ABOUT" },
];

function sectionFromPath(pathname: string) {
  if (pathname.startsWith("/work")) return "WORK";
  if (pathname.startsWith("/log")) return "LOG";
  if (pathname.startsWith("/about")) return "ABOUT";
  return "COVER";
}

export function SiteHeader() {
  const pathname = usePathname();
  const section = sectionFromPath(pathname);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/95">
      <div className="page-shell flex h-[var(--header-height)] items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          <CaptionLabel>PORTFOLIO / {section}</CaptionLabel>
          <Wordmark />
        </div>
        <nav
          className="flex shrink-0 items-center gap-1 text-[0.82rem] font-black md:gap-2 md:text-sm"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border border-line px-2.5 py-2 transition-colors hover:bg-ink hover:text-paper md:px-4 ${
                  active ? "bg-ink text-paper" : "bg-paper"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
