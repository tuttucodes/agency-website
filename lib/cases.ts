export type CaseSlug = "aurora-trader" | "lumen" | "orbit" | "meridian";

export type CaseSize = "wide" | "tall";

export type Case = {
  slug: CaseSlug;
  n: string;
  size: CaseSize;
  tags: string[];
  client: string;
  title: string;
  blurb: string;
  tone: string;
  img: string;
  alt: string;
  year: string;
  duration: string;
  team: string;
  industry: string;
  context: string;
  problem: string[];
  approach: { heading: string; body: string }[];
  outcome: { value: string; label: string; accent?: boolean }[];
  stack: string[];
  gallery: { src: string; alt: string }[];
};

export const CASES: Case[] = [
  {
    slug: "aurora-trader",
    n: "01",
    size: "wide",
    tags: ["Fintech", "iOS · Web · ML", "2025 → 2026"],
    client: "AURORA Capital",
    title: "AURORA Trader — zero-latency options terminal for prosumer traders.",
    blurb:
      "Full-stack rebuild on Rust + Next.js. 18ms median order ack, ML-driven trade suggestions.",
    tone: "from-[#0b2a2a] to-[#1b0a2c]",
    img: "https://images.unsplash.com/photo-1642052519254-6b14d6d4e5f0?w=1600&q=80&auto=format&fit=crop",
    alt: "Screenshot of AURORA trading terminal with real-time order book and candlestick charts in dark interface",
    year: "2025 → 2026",
    duration: "11 months",
    team: "5 engineers · 2 designers · 1 ML lead",
    industry: "Fintech · Retail derivatives",
    context:
      "AURORA serves 14,000 prosumer options traders who pay $400–$1,200/month for sub-second execution. Their Java + jQuery stack from 2017 was leaking ~8% of users per quarter to faster competitors. Goal: rebuild the terminal end-to-end without losing a single live customer.",
    problem: [
      "200ms median order acknowledgement on the legacy stack — table stakes is now under 50ms.",
      "Six-month feature throughput shrinking as the front-end calcified into untyped Backbone modules.",
      "No on-platform analytics — traders exported CSVs and built dashboards in Excel.",
      "Compliance team asking for a unified audit trail across order, position, and notification surfaces.",
    ],
    approach: [
      {
        heading: "Rust matching gateway",
        body:
          "Replaced the Java order router with a Rust gRPC service co-located with the broker. Microsecond-level instrumentation; every request traceable to a single span.",
      },
      {
        heading: "Next.js + RSC trading canvas",
        body:
          "React 19 Server Components for the heavy market-data shell, client islands for the live ladder. Dropped JS payload from 1.4MB to 180KB compressed.",
      },
      {
        heading: "On-device suggestion model",
        body:
          "Distilled a 7B trade-context model down to 480MB; runs in-browser via WebGPU. Sub-200ms inference, zero server round-trip, full data residency.",
      },
      {
        heading: "Zero-downtime cutover",
        body:
          "Shadowed live traffic to the new stack for 6 weeks. Switched 3% of users per day for a month. Migrated the entire book without a single missed fill.",
      },
    ],
    outcome: [
      { value: "18ms", label: "Median order ack", accent: true },
      { value: "11×", label: "Throughput vs legacy" },
      { value: "$94M", label: "Net new ARR · 12mo" },
      { value: "0", label: "Production incidents" },
    ],
    stack: [
      "Rust + Tokio",
      "Next.js 16 / RSC",
      "TypeScript",
      "WebGPU + ONNX",
      "Postgres + Timescale",
      "Vercel Fluid Compute",
      "Datadog · OpenTelemetry",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80&auto=format&fit=crop",
        alt: "Multi-monitor trading workstation showing real-time market data",
      },
      {
        src: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=1600&q=80&auto=format&fit=crop",
        alt: "Close-up of options chain with bid-ask spreads on dark interface",
      },
    ],
  },
  {
    slug: "lumen",
    n: "02",
    size: "tall",
    tags: ["AI · Enterprise", "RAG · Agents"],
    client: "Lumen Bank (Fortune 100)",
    title: "Lumen — internal-knowledge agent for a Fortune 100 bank.",
    blurb: "42k documents, SOC 2, 96% answer accuracy under red-team evaluation.",
    tone: "from-[#1a0f2e] to-[#0a0a1e]",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80&auto=format&fit=crop",
    alt: "Abstract violet and teal neural network visualization, glowing nodes on dark canvas",
    year: "2025",
    duration: "7 months",
    team: "3 engineers · 1 AI lead · 1 designer",
    industry: "Enterprise banking",
    context:
      "Compliance and operations staff at a global bank were spending 14% of their week searching internal wikis, policy PDFs, and Confluence. Existing enterprise search returned 11 keyword matches and zero answers. Goal: a grounded, auditable assistant that respects existing entitlements and never hallucinates a policy.",
    problem: [
      "42,000 documents across SharePoint, Confluence, and a legacy IBM repository — half scanned PDFs.",
      "Every answer must cite the source paragraph; regulators do not accept generative summaries.",
      "Strict SOC 2 + internal data-residency: no document leaves the bank's tenant.",
      "Per-document ACLs must propagate to retrieval — answers vary by user.",
    ],
    approach: [
      {
        heading: "Tenant-isolated RAG pipeline",
        body:
          "Vector + BM25 hybrid retrieval with reranking, all running in the bank's own VPC. Embeddings via a self-hosted open-weight encoder.",
      },
      {
        heading: "ACL-aware retrieval",
        body:
          "Every chunk carries the originating ACL. The retriever filters before the model ever sees a candidate — no leakage class possible at the prompt layer.",
      },
      {
        heading: "Eval harness as the product",
        body:
          "Built a 1,400-question gold set with subject-matter experts. Every model swap, prompt change, or index rebuild runs the suite before promotion.",
      },
      {
        heading: "Citation-first UX",
        body:
          "Answers render alongside the source paragraph and a one-click jump to the original document. No citation, no answer.",
      },
    ],
    outcome: [
      { value: "96%", label: "Red-team accuracy", accent: true },
      { value: "14%", label: "Time-saved per analyst" },
      { value: "0", label: "Citation hallucinations" },
      { value: "11k", label: "Daily active users" },
    ],
    stack: [
      "Python + FastAPI",
      "Anthropic Claude (private deployment)",
      "Qdrant",
      "Postgres + pgvector",
      "Temporal",
      "Datadog",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop",
        alt: "Server room with blue indicator lights",
      },
    ],
  },
  {
    slug: "orbit",
    n: "03",
    size: "tall",
    tags: ["SaaS", "Web Platform"],
    client: "Orbit Logistics (Series C)",
    title: "Orbit — ops console for a Series-C logistics startup.",
    blurb: "150 internal dashboards → one typed canvas. 3.4× faster task completion.",
    tone: "from-[#0a2013] to-[#08120a]",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop",
    alt: "Analytics dashboard on laptop showing charts, growth metrics, and KPI cards in dark UI",
    year: "2024 → 2025",
    duration: "6 months",
    team: "4 engineers · 2 designers",
    industry: "Logistics SaaS",
    context:
      "Orbit's ops team was clicking between 150 Retool, Metabase, and Jupyter dashboards to triage a single freight exception. After Series C, they needed one console their 80-person ops org could actually learn in a week.",
    problem: [
      "Tribal-knowledge workflows — every shift had a different exception protocol.",
      "Five data sources, each with its own latency and freshness guarantees.",
      "Engineering bandwidth: ops requests stuck in a 6-week queue.",
      "No source of truth for SLA — disputes with carriers took days to resolve.",
    ],
    approach: [
      {
        heading: "Single typed canvas",
        body:
          "Replaced 150 dashboards with a single console built on a typed query layer. Every metric is one line of TypeScript, type-checked end-to-end.",
      },
      {
        heading: "Workflow templates",
        body:
          "Codified the top 12 exception workflows into runbooks the console executes. Ops teams approve, edit, and ship runbooks without filing a ticket.",
      },
      {
        heading: "Carrier SLA ledger",
        body:
          "Append-only event log of every commitment, exception, and resolution. Disputes resolve in minutes from a shareable URL.",
      },
    ],
    outcome: [
      { value: "3.4×", label: "Faster task completion", accent: true },
      { value: "150 → 1", label: "Dashboards consolidated" },
      { value: "$1.8M", label: "Annualized labor savings" },
      { value: "5 days", label: "Onboarding time, was 6 weeks" },
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "tRPC",
      "Postgres + materialized views",
      "ClickHouse",
      "Inngest",
      "Vercel",
    ],
    gallery: [],
  },
  {
    slug: "meridian",
    n: "04",
    size: "wide",
    tags: ["Consumer iOS", "Apple Design Award '25"],
    client: "Meridian Health",
    title: "Meridian — daily ritual app with on-device coaching model.",
    blurb: "SwiftUI + Core ML. 1.2M downloads in launch week, 4.9★ average.",
    tone: "from-[#2a1a08] to-[#0a0a0a]",
    img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1600&q=80&auto=format&fit=crop",
    alt: "Close-up of iPhone showing a minimal fitness tracking app with typographic stats and dark theme",
    year: "2024 → 2025",
    duration: "9 months",
    team: "3 iOS engineers · 1 ML · 2 designers",
    industry: "Consumer health",
    context:
      "Meridian wanted a habit-coaching app that felt as personal as a journal and as smart as a trainer — without ever sending personal data to a server. The category is crowded, retention is the only moat.",
    problem: [
      "Every competitor's coaching is generic and cloud-bound.",
      "On-device LLM coaching meant fitting under 600MB and 200ms latency.",
      "The interface had to feel like a single fluid surface — no tab bars, no settings buried four taps deep.",
    ],
    approach: [
      {
        heading: "Distilled coaching model",
        body:
          "Fine-tuned a 3B parameter model on 40k coaching transcripts, distilled to 480MB via 4-bit quantization. Runs entirely on the Neural Engine.",
      },
      {
        heading: "Single-canvas SwiftUI",
        body:
          "One screen, gesture-first navigation. Forty-eight custom transitions hand-tuned in TestFlight against a 22-person beta cohort.",
      },
      {
        heading: "Privacy by architecture",
        body:
          "App ships with zero analytics SDKs. All telemetry is on-device aggregates uploaded weekly with differential privacy.",
      },
    ],
    outcome: [
      { value: "1.2M", label: "Downloads · launch week", accent: true },
      { value: "4.9★", label: "Average App Store rating" },
      { value: "Apple", label: "Design Award · 2025" },
      { value: "62%", label: "D30 retention" },
    ],
    stack: [
      "Swift 6 · SwiftUI",
      "Core ML · Neural Engine",
      "MLX (training)",
      "CloudKit",
      "Sentry",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=80&auto=format&fit=crop",
        alt: "Hand holding iPhone with minimal app interface",
      },
    ],
  },
];

export function getCase(slug: string): Case | undefined {
  return CASES.find((c) => c.slug === slug);
}
