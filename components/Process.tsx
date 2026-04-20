const PHASES = [
  {
    n: "01",
    title: "Discovery",
    len: "2 weeks",
    body:
      "Workshops, customer interviews, and a full technical audit. Delivered as a single principal-grade document — scope, success metrics, architecture, and a fixed-price proposal.",
    accent: false,
  },
  {
    n: "02",
    title: "Design & Prototyping",
    len: "3–6 weeks",
    body:
      "Production-grade interfaces in Figma, then coded prototype on the real stack. You interact with the actual thing, not slides. We iterate against live telemetry.",
    accent: false,
  },
  {
    n: "03",
    title: "Build",
    len: "8–16 weeks",
    body:
      "Two-week sprints, weekly demos, full access to our GitHub and Linear. CI/CD, preview environments, and instrumentation land before the first feature ever ships.",
    accent: true,
  },
  {
    n: "04",
    title: "Launch & Evolve",
    len: "Ongoing",
    body:
      "Launch support, on-call rotation, and a continuous-improvement retainer. We stay until your team outgrows us — and train them on the way out.",
    accent: false,
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-20 sm:py-28 md:py-40 border-t border-border">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow"><span className="dot" />05 / Engagement</p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[0.98]">
              Four phases.
              <br />
              <span className="text-text-dim">Fixed scope, fixed price, no surprises.</span>
            </h2>
          </div>
        </div>

        <ol className="divide-y divide-border-hi border-y border-border-hi">
          {PHASES.map((p) => (
            <li
              key={p.n}
              className="grid grid-cols-12 items-start gap-3 md:gap-6 py-6 md:py-12 group hover:bg-surface-2/40 transition-colors px-3 sm:px-4 md:px-6"
            >
              <span
                className={`col-span-12 md:col-span-1 font-[family-name:var(--font-mono)] text-xs md:text-sm ${
                  p.accent ? "text-accent" : "text-text-mute"
                }`}
              >
                [{p.n}]
              </span>
              <div className="col-span-12 md:col-span-3">
                <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-tight break-words">
                  {p.title}
                </h3>
                <p className="eyebrow mt-2">{p.len}</p>
              </div>
              <p className="col-span-12 md:col-span-7 text-text-dim leading-relaxed md:pl-8">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
