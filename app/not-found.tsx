import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="aurora opacity-60" aria-hidden="true">
        <span /><span /><span />
      </div>
      <div className="relative mx-auto max-w-[1100px] w-full px-6 md:px-10 text-center">
        <p className="eyebrow mb-8">
          <span className="dot" />Error 404 · Lost in the helix
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-[28vw] md:text-[18vw] leading-[0.82] tracking-tightest">
          4<span className="text-accent">0</span>4
        </h1>
        <p className="mt-8 text-text-dim text-lg max-w-[44ch] mx-auto">
          The page you were looking for either never existed or has been retired.
          The work continues elsewhere.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-primary magnetic rounded-full px-7 py-3.5 text-sm font-medium"
          >
            Back to home
          </Link>
          <a
            href="mailto:hello@kernelandoak.com"
            className="btn-ghost magnetic rounded-full px-7 py-3.5 text-sm"
          >
            hello@kernelandoak.com
          </a>
        </div>
      </div>
    </main>
  );
}
