export type ServiceSlug = "applications" | "web-platforms" | "applied-ai";

export type Service = {
  slug: ServiceSlug;
  n: string;
  title: string;
  kicker: string;
  summary: string;
  tone: "brass" | "sage" | "oak";
  deliverables: { title: string; body: string }[];
  stack: string[];
  sampleEngagements: { client: string; blurb: string; result: string }[];
  faqs: { q: string; a: string }[];
  pricing: { tier: string; duration: string; from: string; fit: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "applications",
    n: "01",
    title: "Native Applications",
    kicker: "iOS · Android · Desktop",
    summary:
      "Native apps with the motion discipline of first-party products. Swift, Kotlin, React Native, and Electron — chosen per engagement, never ideology. Our consumer work has been shipped on App Store editorial, picked up for Apple Design Awards, and powers daily rituals for 4M+ people.",
    tone: "brass",
    deliverables: [
      {
        title: "Design system in code",
        body:
          "Typographic scale, motion tokens, and accessibility annotations shipped as a usable package on day one — never a Figma file you have to reverse-engineer.",
      },
      {
        title: "Offline-first sync",
        body:
          "CRDTs or event-sourced state where the product demands it. We treat cold-start, airplane-mode, and bad-3G as first-class environments, not afterthoughts.",
      },
      {
        title: "On-device intelligence",
        body:
          "Core ML, TensorFlow Lite, ExecuTorch — distilled models that run locally. Zero server round-trip means faster UX and a real privacy story.",
      },
      {
        title: "Launch operations",
        body:
          "App Store submission, ASO, crash-free target ≥99.5% at GA, and a 90-day telemetry-driven retention program included.",
      },
    ],
    stack: [
      "Swift 6 · SwiftUI",
      "Kotlin · Jetpack Compose",
      "React Native + Expo",
      "Core ML · ExecuTorch",
      "Realm · SQLite · WatermelonDB",
      "Sentry · RevenueCat",
    ],
    sampleEngagements: [
      {
        client: "Meridian Health",
        blurb: "Daily ritual app with on-device coaching model.",
        result: "1.2M launch-week downloads · Apple Design Award '25",
      },
      {
        client: "AURORA Trader",
        blurb: "Prosumer options terminal (iOS + iPadOS).",
        result: "18ms median order ack · 4.9★ avg review",
      },
    ],
    faqs: [
      {
        q: "React Native or native Swift/Kotlin — how do you decide?",
        a: "Native whenever interaction fidelity, sensor access, or on-device ML is in the critical path. React Native when time-to-market, team continuity, and shared business logic outweigh a 3-5% fidelity gap. We defend the choice in writing before any code is written.",
      },
      {
        q: "Can you take over an existing app?",
        a: "Yes — roughly 40% of our app engagements are surgical work inside an inherited codebase. Discovery includes a line-by-line audit and we often ship the first improvement within the first two weeks.",
      },
      {
        q: "Who handles App Store submission and review replies?",
        a: "We do. Our launch ops lead handles metadata, screenshots, TestFlight cohorts, and reviewer back-and-forth through GA +30 days.",
      },
    ],
    pricing: [
      { tier: "Consumer app · greenfield", duration: "14–20 weeks", from: "$180k", fit: "One-platform launch, 1 ML feature, full brand design" },
      { tier: "Cross-platform rebuild", duration: "20–28 weeks", from: "$280k", fit: "iOS + Android, shared sync layer, on-device ML" },
      { tier: "Existing-codebase audit + pod", duration: "4–12 weeks", from: "$85k", fit: "Ship velocity boost, no rewrite" },
    ],
  },
  {
    slug: "web-platforms",
    n: "02",
    title: "Web Platforms",
    kicker: "Marketing · SaaS · Console",
    summary:
      "High-conversion marketing surfaces and dense SaaS consoles. Every page a statement, every interaction sub-150ms. Built on Next.js + Fluid Compute with a typed query layer that outlives whoever writes the first version.",
    tone: "sage",
    deliverables: [
      {
        title: "Typed end-to-end",
        body:
          "TypeScript from the schema to the pixel. No `any`, no runtime mismatches. We generate API clients, Zod validators, and DB types from a single source of truth.",
      },
      {
        title: "Design tokens in TS",
        body:
          "Semantic tokens (`surface`, `fg`, `accent`), not paint names. Dark mode becomes a config swap; brand refresh becomes a PR.",
      },
      {
        title: "Core Web Vitals 98+",
        body:
          "LCP under 1.2s, CLS near-zero, interaction latency under 100ms. Budgets enforced in CI; regressions block merges.",
      },
      {
        title: "Headless CMS + MDX",
        body:
          "Content ownership for marketing and product teams — branch-preview workflow, structured content, no drift between Figma and production.",
      },
    ],
    stack: [
      "Next.js 16 · RSC · Fluid Compute",
      "TypeScript · tRPC · Zod",
      "Tailwind 4 · Radix Primitives",
      "Postgres · Drizzle · Neon",
      "MDX · Sanity · Contentful",
      "Vercel · Cloudflare · Turnstile",
    ],
    sampleEngagements: [
      {
        client: "Orbit Logistics",
        blurb: "Ops console replacing 150 internal dashboards.",
        result: "3.4× faster task completion · $1.8M annualized savings",
      },
      {
        client: "Parallax Labs",
        blurb: "Enterprise marketing + docs relaunch.",
        result: "+62% organic, 99 Lighthouse, sub-1s LCP",
      },
    ],
    faqs: [
      {
        q: "Do you work in our existing Next.js app or rebuild?",
        a: "Both. Most engagements start with a 2-week audit; in roughly half we recommend surgical work inside the existing repo. The rest are clean rebuilds — usually when the current stack is pre-App-Router Pages + no types.",
      },
      {
        q: "How do you handle SEO and content migrations?",
        a: "We run a redirect map against Search Console data before any URL moves, migrate structured data, and monitor rankings for 60 days post-launch. Zero-loss migrations are standard.",
      },
      {
        q: "Can you integrate with our existing design system?",
        a: "Yes — we can adopt your tokens and primitives or extend them. We only propose a new system when the existing one blocks product velocity, and only with a written migration plan.",
      },
    ],
    pricing: [
      { tier: "Marketing relaunch", duration: "6–10 weeks", from: "$85k", fit: "Homepage, key product pages, blog + CMS" },
      { tier: "SaaS console MVP", duration: "12–18 weeks", from: "$220k", fit: "Typed console, 5-7 core workflows, auth + billing" },
      { tier: "Platform rebuild", duration: "20–32 weeks", from: "$420k", fit: "Full frontend + API, design system, analytics" },
    ],
  },
  {
    slug: "applied-ai",
    n: "03",
    title: "Applied AI Systems",
    kicker: "Agents · RAG · Evals",
    summary:
      "Agents, retrieval pipelines, and evaluation harnesses that survive contact with real users. Typed, observable, cost-instrumented from day one. We have shipped production AI inside Fortune 100 banks, consumer apps, and fintech — the common thread is that every change runs an eval suite before it merges.",
    tone: "oak",
    deliverables: [
      {
        title: "Evaluation-first workflow",
        body:
          "A versioned gold set and LLM-as-judge rubric land before the first prompt. Every model swap, prompt edit, or index rebuild runs the suite in CI — regressions block deploys.",
      },
      {
        title: "Tenant-isolated RAG",
        body:
          "Vector + BM25 hybrid retrieval with reranking, ACL-aware filtering at the chunk level, and citation-first answer rendering. Compliant with SOC 2 and HIPAA postures.",
      },
      {
        title: "Agent architectures that don't hallucinate tools",
        body:
          "Typed tool schemas, deterministic retries, trace-every-step observability, and cost caps per session. We treat agents as distributed systems — because that's what they are.",
      },
      {
        title: "Observability and cost control",
        body:
          "Per-request token/latency/cost traces, anomaly alerting, and a budget envelope you can actually defend to a CFO.",
      },
    ],
    stack: [
      "Anthropic Claude · OpenAI · open-weight",
      "LangGraph · custom orchestrators",
      "Qdrant · pgvector · Pinecone",
      "vLLM · Triton · Modal",
      "Weights & Biases · LangSmith",
      "Temporal · Inngest",
    ],
    sampleEngagements: [
      {
        client: "Lumen Bank",
        blurb: "Internal-knowledge agent over 42k documents (Fortune 100).",
        result: "96% red-team accuracy · 0 citation hallucinations · 11k DAU",
      },
      {
        client: "AURORA Trader (ML)",
        blurb: "On-device trade-suggestion model (distilled, 480MB).",
        result: "WebGPU inference <200ms · zero server round-trip",
      },
    ],
    faqs: [
      {
        q: "Can you work with our existing model provider contracts?",
        a: "Yes — we are provider-agnostic and often design systems that can fall over between Anthropic, OpenAI, and open-weight hosts. Contracts stay with you.",
      },
      {
        q: "Do you do fine-tuning or stick to prompting + RAG?",
        a: "Both, but we push back on fine-tuning until the eval suite proves prompting + retrieval have hit their ceiling. Most teams discover the ceiling is higher than they thought.",
      },
      {
        q: "What about regulated industries?",
        a: "We have shipped under SOC 2 Type II, HIPAA, and FINRA postures. Tenant isolation, audit logging, and a no-training-on-customer-data posture are defaults. Our MSA includes a DPA suitable for EU and UK teams.",
      },
    ],
    pricing: [
      { tier: "RAG MVP", duration: "6–10 weeks", from: "$120k", fit: "One corpus, hybrid retrieval, eval harness, basic UI" },
      { tier: "Agent + tool integration", duration: "10–16 weeks", from: "$220k", fit: "Multi-tool agent, observability, cost controls" },
      { tier: "Enterprise AI platform", duration: "20–32 weeks", from: "$480k", fit: "Tenant isolation, ACLs, compliance-ready, SLA retainer" },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
