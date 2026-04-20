import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASES, getCase } from "@/lib/cases";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://kernelandoak.vercel.app";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "Case study not found" };
  return {
    title: `${c.client} — ${c.industry}`,
    description: c.blurb,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      type: "article",
      title: c.title,
      description: c.blurb,
      url: `${SITE_URL}/work/${c.slug}`,
      images: [{ url: c.img, width: 1600, height: 1000, alt: c.alt }],
    },
    twitter: { card: "summary_large_image", title: c.title, description: c.blurb, images: [c.img] },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const idx = CASES.findIndex((x) => x.slug === slug);
  const next = CASES[(idx + 1) % CASES.length];

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/#work` },
        { "@type": "ListItem", position: 3, name: c.client, item: `${SITE_URL}/work/${c.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: c.title,
      headline: c.title,
      about: c.industry,
      description: c.blurb,
      creator: { "@type": "Organization", name: "Kernel & Oak Studio", url: SITE_URL },
      datePublished: c.year.split(/\D/).filter(Boolean)[0] ?? "2025",
      image: c.img,
    },
  ];
  const ldJson = JSON.stringify(ld).replace(/</g, "\\u003c");

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        // Static JSON-LD for case study; `<` escape prevents script-tag breakout.
        dangerouslySetInnerHTML={{ __html: ldJson }}
      />
      <main>
        <header className="relative pt-36 sm:pt-44 md:pt-56 pb-16 md:pb-24 overflow-hidden">
          <div className="aurora opacity-50" aria-hidden="true">
            <span /><span /><span />
          </div>

          <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 md:px-10">
            <nav aria-label="Breadcrumb" className="eyebrow mb-10">
              <Link href="/" className="hover:text-text">Home</Link>
              <span className="mx-2 text-text-mute">/</span>
              <Link href="/#work" className="hover:text-text">Work</Link>
              <span className="mx-2 text-text-mute">/</span>
              <span className="text-text">Case · {c.n}</span>
            </nav>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {c.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <h1 className="font-[family-name:var(--font-display)] text-[9vw] md:text-[6.5vw] leading-[0.98] tracking-tightest break-words [overflow-wrap:anywhere]">
                  {c.title}
                </h1>
              </div>
              <aside className="col-span-12 md:col-span-4 md:pl-8 md:border-l border-border-hi">
                <dl className="grid grid-cols-2 md:grid-cols-1 gap-y-6 gap-x-4 text-sm">
                  <div>
                    <dt className="eyebrow mb-1.5">Client</dt>
                    <dd>{c.client}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1.5">Industry</dt>
                    <dd>{c.industry}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1.5">Engagement</dt>
                    <dd>{c.year}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1.5">Duration</dt>
                    <dd>{c.duration}</dd>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <dt className="eyebrow mb-1.5">Team</dt>
                    <dd>{c.team}</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </header>

        <section className="relative">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
            <div className={`relative overflow-hidden rounded-sm bg-gradient-to-br ${c.tone} aspect-[16/9]`}>
              <Image
                src={c.img}
                alt={c.alt}
                fill
                sizes="(min-width: 1024px) 1280px, 100vw"
                priority
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        <section className="relative py-20 sm:py-28 md:py-36">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-4">
                <p className="eyebrow"><span className="dot" />01 / Context</p>
              </div>
              <p className="col-span-12 md:col-span-8 text-xl md:text-2xl leading-relaxed text-text">
                {c.context}
              </p>
            </div>
          </div>
        </section>

        <section className="relative py-20 sm:py-28 md:py-36 border-t border-border">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 gap-6 mb-12">
              <div className="col-span-12 md:col-span-4">
                <p className="eyebrow"><span className="dot" />02 / The problem</p>
              </div>
              <h2 className="col-span-12 md:col-span-8 font-[family-name:var(--font-display)] text-3xl md:text-5xl leading-tight tracking-tight">
                What we walked into.
              </h2>
            </div>
            <ul className="grid grid-cols-12 gap-y-2 border-y border-border-hi divide-y divide-border-hi">
              {c.problem.map((p, i) => (
                <li key={p} className="col-span-12 grid grid-cols-12 gap-6 py-6 md:py-8 px-2 sm:px-4 md:px-6">
                  <span className="col-span-2 md:col-span-1 font-[family-name:var(--font-mono)] text-sm text-text-mute">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <p className="col-span-10 md:col-span-11 text-text leading-relaxed">{p}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative py-20 sm:py-28 md:py-36 border-t border-border">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 gap-6 mb-12">
              <div className="col-span-12 md:col-span-4">
                <p className="eyebrow"><span className="dot" />03 / Approach</p>
              </div>
              <h2 className="col-span-12 md:col-span-8 font-[family-name:var(--font-display)] text-3xl md:text-5xl leading-tight tracking-tight">
                How we built it.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border-hi">
              {c.approach.map((a, i) => (
                <article
                  key={a.heading}
                  className="border-r border-b border-border-hi p-6 sm:p-8 md:p-10 min-h-[280px] flex flex-col"
                >
                  <span className="font-[family-name:var(--font-mono)] text-xs text-text-mute">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-tight">
                    {a.heading}
                  </h3>
                  <p className="mt-4 text-text-dim leading-relaxed">{a.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 sm:py-28 md:py-36 border-t border-border bg-surface-2/40">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 gap-6 mb-12">
              <div className="col-span-12 md:col-span-4">
                <p className="eyebrow"><span className="dot" />04 / Outcome</p>
              </div>
              <h2 className="col-span-12 md:col-span-8 font-[family-name:var(--font-display)] text-3xl md:text-5xl leading-tight tracking-tight">
                What shipped.
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
              {c.outcome.map((m) => (
                <div key={m.label}>
                  <div
                    className={`num font-[family-name:var(--font-display)] text-5xl md:text-6xl tracking-tightest ${
                      m.accent ? "text-accent" : ""
                    }`}
                  >
                    {m.value}
                  </div>
                  <p className="eyebrow mt-2">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 sm:py-28 md:py-36 border-t border-border">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 gap-6 mb-10">
              <div className="col-span-12 md:col-span-4">
                <p className="eyebrow"><span className="dot" />05 / Stack</p>
              </div>
              <h2 className="col-span-12 md:col-span-8 font-[family-name:var(--font-display)] text-3xl md:text-5xl leading-tight tracking-tight">
                The tools we picked.
              </h2>
            </div>
            <ul className="flex flex-wrap gap-2">
              {c.stack.map((s) => (
                <li
                  key={s}
                  className="font-[family-name:var(--font-mono)] text-xs px-3.5 py-2 rounded-full border border-border-hi text-text-dim"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {c.gallery.length > 0 && (
          <section className="relative py-20 md:py-32 border-t border-border">
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
              <p className="eyebrow mb-8"><span className="dot" />06 / Gallery</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {c.gallery.map((g) => (
                  <div key={g.src} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="relative py-24 md:py-36 border-t border-border bg-surface">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-12 md:col-span-7">
                <p className="eyebrow mb-4">Next case</p>
                <Link
                  href={`/work/${next.slug}`}
                  className="block font-[family-name:var(--font-display)] text-4xl md:text-7xl tracking-tightest leading-[0.95] hover:text-accent transition-colors"
                >
                  {next.client} →
                </Link>
                <p className="mt-4 text-text-dim max-w-[60ch]">{next.blurb}</p>
              </div>
              <div className="col-span-12 md:col-span-5 md:text-right space-y-4">
                <p className="eyebrow">Or skip ahead</p>
                <div className="flex md:justify-end flex-wrap gap-3">
                  <Link
                    href="/#contact"
                    className="btn-primary magnetic rounded-full px-6 py-3 text-sm font-medium"
                  >
                    Start a project
                  </Link>
                  <Link
                    href="/#work"
                    className="btn-ghost magnetic rounded-full px-6 py-3 text-sm"
                  >
                    All work
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
