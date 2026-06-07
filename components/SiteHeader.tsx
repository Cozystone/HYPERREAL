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
  const isHome = pathname === "/";

  return (
    <header
      className={`site-header ${isHome ? "site-header--home" : "site-header--page"}`}
    >
      <div className="page-shell site-header-shell">
        {isHome ? null : (
          <div className="site-brand">
            <CaptionLabel>PORTFOLIO / {section}</CaptionLabel>
            <Wordmark />
          </div>
        )}
        <nav
          className="site-nav"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isHome
                    ? "site-nav-link site-nav-link--home"
                    : `site-nav-link site-nav-link--boxed ${
                        active ? "site-nav-link--active" : ""
                      }`
                }
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
