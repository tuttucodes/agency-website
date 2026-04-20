import Link from "next/link";
import { INSIGHTS } from "@/lib/insights";

const FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function Insights() {
  return (
    <section id="insights" className="relative py-20 sm:py-28 md:py-40 border-t border-border">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 mb-10 sm:mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow"><span className="dot" />07 / Insights</p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[0.98]">
              Notes from inside{" "}
              <span className="italic text-text-dim font-normal">the</span> studio.
            </h2>
            <p className="mt-6 text-text-dim max-w-[60ch]">
              Long-form essays on engineering, applied AI, and design — written by the people
              shipping the work, not the marketing team.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-border-hi">
          {INSIGHTS.map((post, i) => (
            <li key={post.slug} className="border-r border-b border-border-hi">
              <Link
                href={`/journal/${post.slug}`}
                className="group block h-full p-6 sm:p-8 md:p-10 hover:bg-surface-2/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-10 sm:mb-14">
                  <span className="font-[family-name:var(--font-mono)] text-xs text-text-mute">
                    {String(i + 1).padStart(2, "0")} · {post.category}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-text-mute">
                    {post.readMins} min
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-[28px] tracking-tight leading-[1.1] group-hover:text-accent transition-colors break-words [overflow-wrap:anywhere]">
                  {post.title}
                </h3>
                <p className="mt-4 text-text-dim text-sm leading-relaxed">{post.dek}</p>
                <div className="mt-10 pt-6 border-t border-border-hi flex items-center justify-between text-xs text-text-mute font-[family-name:var(--font-mono)]">
                  <span>{post.author}</span>
                  <time dateTime={post.date}>{FORMATTER.format(new Date(post.date))}</time>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
          <Link href="/journal" className="link-sweep text-sm text-text">
            Read the archive →
          </Link>
          <a
            href="mailto:hello@kernelandoak.com?subject=Subscribe%20to%20Kernel%20%26%20Oak%20Journal"
            className="link-sweep text-sm text-text-dim hover:text-text"
          >
            Subscribe (monthly · low volume)
          </a>
        </div>
      </div>
    </section>
  );
}
