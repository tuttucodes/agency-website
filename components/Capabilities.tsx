const COLS = [
  { label: "Languages", items: ["TypeScript", "Swift", "Kotlin", "Rust", "Python", "Go"] },
  {
    label: "Frameworks",
    items: ["Next.js", "React Native / Expo", "SwiftUI", "Jetpack Compose", "FastAPI", "Hono"],
  },
  {
    label: "AI / ML",
    items: [
      "Claude / GPT / Gemini",
      "vLLM · Triton",
      "LangGraph",
      "Pinecone · Qdrant",
      "Core ML · ONNX",
      "Weights & Biases",
    ],
  },
  {
    label: "Infrastructure",
    items: [
      "Vercel · Cloudflare",
      "Supabase · Neon",
      "AWS · GCP",
      "Temporal",
      "Terraform",
      "Datadog · Sentry",
    ],
  },
  { label: "Design", items: ["Figma · Framer", "Design tokens", "Brand systems", "Motion design", "Illustration", "3D · WebGL"] },
  {
    label: "Product",
    items: ["Discovery sprints", "JTBD research", "Roadmapping", "GTM advisory", "A/B & analytics", "Pricing design"],
  },
  {
    label: "Quality",
    items: ["TDD · contract tests", "Playwright · Detox", "Load & chaos", "SOC 2 · HIPAA prep", "Accessibility AAA", "Security audits"],
  },
  {
    label: "Growth",
    items: ["SEO architecture", "Paid creative", "Lifecycle email", "Referral loops", "Activation tuning", "Analytics infra"],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-20 sm:py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 mb-10 sm:mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow"><span className="dot" />04 / Capabilities</p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[0.98]">
              A stack chosen for{" "}
              <span className="italic text-text-dim font-normal">longevity</span>,
              <br />
              not novelty.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-l border-border-hi text-sm">
          {COLS.map((col) => (
            <div key={col.label} className="p-4 sm:p-6 border-b border-r border-border-hi min-w-0">
              <p className="eyebrow mb-3">{col.label}</p>
              <ul className="space-y-1.5 text-text">
                {col.items.map((it) => (
                  <li key={it} className="break-words">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
