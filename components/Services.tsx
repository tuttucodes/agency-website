import Link from "next/link";
import { SERVICES } from "@/lib/services";

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 mb-10 sm:mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow"><span className="dot" />02 / Services</p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[0.98]">
              Three disciplines.
              <br />
              <span className="text-text-dim">One engineering standard.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border-hi">
          {SERVICES.map((s, i) => {
            const accent = s.slug === "applied-ai";
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                aria-label={`Explore ${s.title} — ${s.kicker}`}
                className={`svc-card group relative p-6 sm:p-8 md:p-10 border-b border-border-hi min-h-[420px] sm:min-h-[520px] flex flex-col ${
                  i < SERVICES.length - 1 ? "md:border-r" : ""
                } md:border-b-0 ${i === SERVICES.length - 1 ? "border-b-0" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-xs text-text-mute">
                    {s.n}
                  </span>
                  <svg className="arrow shrink-0" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path
                      d="M8 20 L20 8 M20 8 H10 M20 8 V18"
                      stroke={accent ? "var(--k-accent)" : "currentColor"}
                      strokeWidth="1.4"
                    />
                  </svg>
                </div>
                <h3 className="mt-14 sm:mt-20 font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl leading-[0.95] tracking-tight">
                  {s.title.split(" ").map((word, wi, arr) => (
                    <span key={word} className={wi === arr.length - 1 && accent ? "text-accent" : ""}>
                      {wi > 0 && " "}
                      {word}
                      {wi === 0 && arr.length > 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p className="mt-6 text-text-dim leading-relaxed">{s.summary.split(".").slice(0, 2).join(".")}.</p>
                <ul className="mt-auto pt-8 space-y-2.5 text-sm font-[family-name:var(--font-mono)] text-text-dim">
                  {s.stack.slice(0, 4).map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <span className={`h-px w-4 ${accent ? "bg-accent" : "bg-text-mute"}`} />
                      {b}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 text-xs font-[family-name:var(--font-mono)] text-text-mute group-hover:text-accent transition-colors">
                  Explore discipline →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
