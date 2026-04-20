import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES, getService } from "@/lib/services";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://kernelandoak.vercel.app";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ discipline: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ discipline: string }>;
}): Promise<Metadata> {
  const { discipline } = await params;
  const s = getService(discipline);
  if (!s) return { title: "Service not found" };
  return {
    title: `${s.title} — ${s.kicker}`,
    description: s.summary,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      type: "website",
      title: `${s.title} · Kernel & Oak`,
      description: s.summary,
      url: `${SITE_URL}/services/${s.slug}`,
    },
  };
}

const TONE_CLASSES: Record<string, string> = {
  brass: "from-[color-mix(in_oklab,var(--k-brass)_35%,transparent)] via-transparent to-transparent",
  sage: "from-[color-mix(in_oklab,var(--k-sage)_30%,transparent)] via-transparent to-transparent",
  oak: "from-[color-mix(in_oklab,var(--k-oak)_45%,transparent)] via-transparent to-transparent",
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ discipline: string }>;
}) {
  const { discipline } = await params;
  const s = getService(discipline);
  if (!s) notFound();

  const idx = SERVICES.findIndex((x) => x.slug === discipline);
  const next = SERVICES[(idx + 1) % SERVICES.length];

  return (
    <>
      <Nav />
      <main>
        <header className="relative pt-36 sm:pt-44 md:pt-56 pb-16 md:pb-24 overflow-hidden">
          <div className="aurora opacity-60" aria-hidden="true">
            <span /><span /><span />
          </div>
          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-gradient-to-br ${TONE_CLASSES[s.tone]}`}
          />

          <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 md:px-10">
            <nav aria-label="Breadcrumb" className="eyebrow mb-10">
              <Link href="/" className="hover:text-text">Home</Link>
              <span className="mx-2 text-text-mute">/</span>
              <Link href="/#services" className="hover:text-text">Services</Link>
              <span className="mx-2 text-text-mute">/</span>
              <span className="text-text">{s.title}</span>
            </nav>

            <p className="eyebrow mb-6">
              <span className="dot" />Service · {s.n} of 03
            </p>
            <h1
              className="font-[family-name:var(--font-display)] leading-[0.92] tracking-tightest"
              style={{ fontSize: "clamp(3rem, 10.5vw, 11rem)" }}
            >
              {s.title.split(" ").map((w, i, arr) => (
                <span key={w} className={i === arr.length - 1 ? "text-accent" : ""}>
                  {w}
                  {i < arr.length - 1 && " "}
                </span>
              ))}
            </h1>
            <p className="mt-8 text-lg md:text-2xl text-text-dim max-w-[60ch] leading-relaxed">
              {s.summary}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className="btn-primary magnetic rounded-full px-6 py-3 text-sm font-medium"
              >
                Brief us on your {s.kicker.split(" · ")[0].toLowerCase()} project
              </Link>
              <span className="text-sm text-text-dim">
                {s.kicker} · engagements from {s.pricing[s.pricing.length - 1].from.replace("$", "$")}
              </span>
            </div>
          </div>
        </header>

        {/* Deliverables */}
        <section className="relative py-20 sm:py-28 md:py-36 border-t border-border">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 gap-6 mb-12">
              <div className="col-span-12 md:col-span-4">
                <p className="eyebrow"><span className="dot" />01 / Deliverables</p>
              </div>
              <h2 className="col-span-12 md:col-span-8 font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight leading-tight">
                What ships in the box.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border-hi">
              {s.deliverables.map((d, i) => (
                <article
                  key={d.title}
                  className="border-r border-b border-border-hi p-6 sm:p-8 md:p-10 min-h-[260px] flex flex-col"
                >
                  <span className="font-[family-name:var(--font-mono)] text-xs text-text-mute">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-tight">
                    {d.title}
                  </h3>
                  <p className="mt-4 text-text-dim leading-relaxed">{d.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="relative py-16 md:py-28 border-t border-border bg-surface-2/40">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 gap-6 mb-8">
              <div className="col-span-12 md:col-span-4">
                <p className="eyebrow"><span className="dot" />02 / Stack</p>
              </div>
              <h2 className="col-span-12 md:col-span-8 font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight leading-tight">
                Tools we reach for first.
              </h2>
            </div>
            <ul className="flex flex-wrap gap-2 md:gap-3">
              {s.stack.map((t) => (
                <li
                  key={t}
                  className="font-[family-name:var(--font-mono)] text-xs md:text-sm px-3.5 py-2 rounded-full border border-border-hi text-text-dim"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Sample engagements */}
        <section className="relative py-20 md:py-36 border-t border-border">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 gap-6 mb-12">
              <div className="col-span-12 md:col-span-4">
                <p className="eyebrow"><span className="dot" />03 / Sample engagements</p>
              </div>
              <h2 className="col-span-12 md:col-span-8 font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight leading-tight">
                Recent work in this discipline.
              </h2>
            </div>
            <ul className="divide-y divide-border-hi border-y border-border-hi">
              {s.sampleEngagements.map((eng) => (
                <li
                  key={eng.client}
                  className="grid grid-cols-12 gap-4 md:gap-6 py-6 md:py-8 px-2 sm:px-4 md:px-6"
                >
                  <p className="col-span-12 md:col-span-3 font-[family-name:var(--font-display)] text-xl md:text-2xl">
                    {eng.client}
                  </p>
                  <p className="col-span-12 md:col-span-5 text-text-dim leading-relaxed">
                    {eng.blurb}
                  </p>
                  <p className="col-span-12 md:col-span-4 text-sm md:text-right text-accent font-[family-name:var(--font-mono)]">
                    {eng.result}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pricing */}
        <section className="relative py-20 md:py-36 border-t border-border bg-surface">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 gap-6 mb-12">
              <div className="col-span-12 md:col-span-4">
                <p className="eyebrow"><span className="dot" />04 / Pricing</p>
              </div>
              <h2 className="col-span-12 md:col-span-8 font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight leading-tight">
                Fixed-price engagements. No hourly.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-border-hi">
              {s.pricing.map((p, i) => (
                <article
                  key={p.tier}
                  className={`border-r border-b border-border-hi p-6 sm:p-8 md:p-10 ${
                    i === s.pricing.length - 1 ? "bg-surface-2/60" : ""
                  }`}
                >
                  <p className="eyebrow">{p.duration}</p>
                  <p className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight">
                    from <span className="text-accent">{p.from}</span>
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-lg md:text-xl">
                    {p.tier}
                  </p>
                  <p className="mt-4 text-sm text-text-dim leading-relaxed">{p.fit}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="relative py-20 md:py-36 border-t border-border">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 gap-6 mb-10">
              <div className="col-span-12 md:col-span-4">
                <p className="eyebrow"><span className="dot" />05 / FAQ</p>
              </div>
              <h2 className="col-span-12 md:col-span-8 font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight leading-tight">
                Common questions.
              </h2>
            </div>
            <ul className="divide-y divide-border-hi border-y border-border-hi">
              {s.faqs.map((f) => (
                <li key={f.q} className="grid grid-cols-12 gap-6 py-8 md:py-10 px-2 sm:px-4 md:px-6">
                  <h3 className="col-span-12 md:col-span-5 font-[family-name:var(--font-display)] text-xl md:text-2xl tracking-tight">
                    {f.q}
                  </h3>
                  <p className="col-span-12 md:col-span-7 text-text-dim leading-relaxed">{f.a}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Next service + contact */}
        <section className="relative py-24 md:py-36 border-t border-border bg-surface">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-12 md:col-span-7">
                <p className="eyebrow mb-4">Next discipline</p>
                <Link
                  href={`/services/${next.slug}`}
                  className="block font-[family-name:var(--font-display)] text-4xl md:text-7xl tracking-tightest leading-[0.95] hover:text-accent transition-colors"
                >
                  {next.title} →
                </Link>
                <p className="mt-4 text-text-dim max-w-[60ch]">{next.summary}</p>
              </div>
              <div className="col-span-12 md:col-span-5 md:text-right space-y-4">
                <p className="eyebrow">Or brief us</p>
                <div className="flex md:justify-end flex-wrap gap-3">
                  <Link
                    href="/#contact"
                    className="btn-primary magnetic rounded-full px-6 py-3 text-sm font-medium"
                  >
                    Start a project
                  </Link>
                  <Link
                    href="/#services"
                    className="btn-ghost magnetic rounded-full px-6 py-3 text-sm"
                  >
                    All disciplines
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
