import Link from "next/link";

export function Wordmark() {
  return (
    <Link
      href="/"
      className="wordmark text-[1.15rem] leading-none md:text-[1.35rem]"
      aria-label="HYPERREAL home"
    >
      HYPERREAL
    </Link>
  );
}
