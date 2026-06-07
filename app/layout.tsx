import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hyperreal-iota.vercel.app"),
  title: {
    default: "HYPERREAL",
    template: "%s / HYPERREAL",
  },
  description:
    "Maker & Founder portfolio archive for projects, logs, and experiments.",
  openGraph: {
    title: "HYPERREAL",
    description:
      "A precise archive of maker projects, founder notes, and experiments.",
    images: ["/images/cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
