import Image from "next/image";
import Link from "next/link";
import { CASES } from "@/lib/cases";

export function Work() {
  return (
    <section id="work" className="relative py-20 sm:py-28 md:py-40 border-t border-border">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
        <div className="flex items-end justify-between mb-10 sm:mb-14 md:mb-20 gap-4 sm:gap-6 flex-wrap">
          <div>
            <p className="eyebrow mb-4 sm:mb-5"><span className="dot" />03 / Selected Work</p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[0.98] max-w-[18ch]">
              Shipped with partners{" "}
              <span className="italic text-text-dim font-normal">who</span> demand&nbsp;excellence.
            </h2>
          </div>
          <a
            href="mailto:hello@kernelandoak.com?subject=Request%20full%20archive"
            className="link-sweep text-sm text-text-dim hover:text-text"
          >
            Full archive (24) →
          </a>
        </div>

        <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8">
          {CASES.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              aria-label={`Read case study — ${c.title}`}
              className={`case bg-surface border border-border-hi rounded-sm overflow-hidden col-span-12 block focus-visible:outline-accent ${
                c.size === "wide" ? "lg:col-span-7" : "lg:col-span-5"
              }`}
            >
              <div
                className={`${
                  c.size === "wide" ? "aspect-[16/10]" : "aspect-[4/5]"
                } overflow-hidden bg-gradient-to-br ${c.tone} relative`}
              >
                <Image
                  src={c.img}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="p-5 sm:p-6 md:p-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 flex-wrap">
                  {c.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight">
                  {c.title}
                </h3>
                <div className="mt-4 sm:mt-6 flex items-end justify-between gap-4">
                  <p className="text-text-dim text-sm max-w-[48ch]">{c.blurb}</p>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-text-mute shrink-0">
                    CASE · {c.n}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
