import Link from "next/link";
import type { Metadata } from "next";
import { INSIGHTS } from "@/lib/insights";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Journal — Engineering, Applied AI, Design",
  description:
    "Long-form essays from the Kernel & Oak studio — engineering discipline, applied AI, and design taste, written by the people shipping the work.",
  alternates: { canonical: "/journal" },
};

const FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function JournalIndex() {
  return (
    <>
      <Nav />
      <main className="pt-36 sm:pt-44 md:pt-56">
        <header className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 mb-16 md:mb-24">
          <p className="eyebrow mb-6"><span className="dot" />Journal</p>
          <h1 className="font-[family-name:var(--font-display)] text-[10vw] md:text-[8vw] leading-[0.95] tracking-tightest break-words">
            Notes from
            <br />
            <span className="text-text-dim italic font-normal">inside</span> the studio.
          </h1>
          <p className="mt-8 text-text-dim text-lg max-w-[60ch]">
            Engineering, applied AI, and design — written by the people shipping the work.
            One essay a month, no SEO bait, no sponsored posts.
          </p>
        </header>

        <section className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 pb-32">
          <ul className="border-t border-border-hi divide-y divide-border-hi">
            {INSIGHTS.map((post, i) => (
              <li key={post.slug}>
                <Link
                  href={`/journal/${post.slug}`}
                  className="group grid grid-cols-12 gap-4 sm:gap-6 py-8 md:py-12 px-2 sm:px-4 md:px-6 hover:bg-surface-2/40 transition-colors"
                >
                  <span className="col-span-2 md:col-span-1 font-[family-name:var(--font-mono)] text-xs text-text-mute pt-2">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <div className="col-span-10 md:col-span-7">
                    <p className="eyebrow mb-3">
                      {post.category} · {post.readMins} min
                    </p>
                    <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-4xl tracking-tight leading-tight group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-text-dim max-w-[60ch]">{post.dek}</p>
                  </div>
                  <div className="col-span-12 md:col-span-4 md:text-right text-sm text-text-mute font-[family-name:var(--font-mono)] flex md:flex-col md:items-end justify-between md:justify-start gap-2">
                    <time dateTime={post.date}>{FORMATTER.format(new Date(post.date))}</time>
                    <span>by {post.author}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
