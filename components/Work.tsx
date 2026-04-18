import Image from "next/image";

type Case = {
  id: string;
  size: "wide" | "tall";
  tags: string[];
  title: string;
  blurb: string;
  tone: string;
  img: string;
  alt: string;
};

const CASES: Case[] = [
  {
    id: "01",
    size: "wide",
    tags: ["Fintech", "iOS · Web · ML", "2025 → 2026"],
    title: "AURORA Trader — zero-latency options terminal for prosumer traders.",
    blurb:
      "Full-stack rebuild on Rust + Next.js. 18ms median order ack, ML-driven trade suggestions.",
    tone: "from-[#0b2a2a] to-[#1b0a2c]",
    img: "https://images.unsplash.com/photo-1642052519254-6b14d6d4e5f0?w=1600&q=80&auto=format&fit=crop",
    alt: "Screenshot of AURORA trading terminal with real-time order book and candlestick charts in dark interface",
  },
  {
    id: "02",
    size: "tall",
    tags: ["AI · Enterprise", "RAG · Agents"],
    title: "Lumen — internal-knowledge agent for a Fortune 100 bank.",
    blurb: "42k documents, SOC 2, 96% answer accuracy under red-team evaluation.",
    tone: "from-[#1a0f2e] to-[#0a0a1e]",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80&auto=format&fit=crop",
    alt: "Abstract violet and teal neural network visualization, glowing nodes on dark canvas",
  },
  {
    id: "03",
    size: "tall",
    tags: ["SaaS", "Web Platform"],
    title: "Orbit — ops console for a Series-C logistics startup.",
    blurb: "150 internal dashboards → one typed canvas. 3.4× faster task completion.",
    tone: "from-[#0a2013] to-[#08120a]",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop",
    alt: "Analytics dashboard on laptop showing charts, growth metrics, and KPI cards in dark UI",
  },
  {
    id: "04",
    size: "wide",
    tags: ["Consumer iOS", "Apple Design Award '25"],
    title: "Meridian — daily ritual app with on-device coaching model.",
    blurb: "SwiftUI + Core ML. 1.2M downloads in launch week, 4.9★ average.",
    tone: "from-[#2a1a08] to-[#0a0a0a]",
    img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1600&q=80&auto=format&fit=crop",
    alt: "Close-up of iPhone showing a minimal fitness tracking app with typographic stats and dark theme",
  },
];

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
            href="mailto:hello@helix.studio?subject=Request%20full%20archive"
            className="link-sweep text-sm text-text-dim hover:text-text"
          >
            Full archive (24) →
          </a>
        </div>

        <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8">
          {CASES.map((c) => (
            <a
              key={c.id}
              href={`mailto:hello@helix.studio?subject=${encodeURIComponent(
                `Case study: ${c.title}`,
              )}`}
              aria-label={`Request full case study — ${c.title}`}
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
                    CASE · {c.id}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
