import type { Metadata } from "next";
import { Archivo, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hyperreal.vercel.app"),
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
    <html
      lang="ko"
      className={`${archivo.variable} ${notoSansKr.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
