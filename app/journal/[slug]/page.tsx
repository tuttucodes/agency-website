import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllJournalMeta, getJournalPost } from "@/lib/journal";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://kernelandoak.vercel.app";

const FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function generateStaticParams() {
  return getAllJournalMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return { title: "Essay not found" };
  return {
    title: post.title,
    description: post.dek,
    alternates: { canonical: `/journal/${post.slug}` },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.dek,
      url: `${SITE_URL}/journal/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.dek },
  };
}

// MDX components map — all respect theme tokens via `.prose-k` CSS.
const components = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      {...props}
      className="pt-8 font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight leading-tight"
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p {...props} className="text-text text-lg leading-relaxed" />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul {...props} className="space-y-3 pl-0" />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li
      {...props}
      className="grid grid-cols-[18px_1fr] gap-3 text-text leading-relaxed before:content-['—'] before:text-accent before:leading-[1.5]"
    />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol {...props} className="space-y-3 list-decimal pl-6 marker:text-accent marker:font-[family-name:var(--font-mono)]" />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 border-accent pl-6 py-2 font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-snug tracking-tight italic text-text"
    />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code
      {...props}
      className="font-[family-name:var(--font-mono)] bg-surface px-1.5 py-0.5 rounded text-[0.92em]"
    />
  ),
  pre: (props: React.ComponentProps<"pre">) => (
    <pre
      {...props}
      className="bg-surface border border-border p-5 rounded font-[family-name:var(--font-mono)] text-sm overflow-x-auto"
    />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a {...props} className="text-accent underline underline-offset-[3px]" />
  ),
  hr: () => <hr className="my-10 border-border" />,
};

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const all = getAllJournalMeta();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  return (
    <>
      <Nav />
      <main className="pt-36 sm:pt-44 md:pt-56">
        <header className="mx-auto max-w-[900px] px-4 sm:px-6 md:px-10 mb-16">
          <nav aria-label="Breadcrumb" className="eyebrow mb-10">
            <Link href="/" className="hover:text-text">Home</Link>
            <span className="mx-2 text-text-mute">/</span>
            <Link href="/journal" className="hover:text-text">Journal</Link>
            <span className="mx-2 text-text-mute">/</span>
            <span className="text-text">{post.category}</span>
          </nav>
          <p className="eyebrow mb-6">
            {post.category} · {post.readMins} min · {FORMATTER.format(new Date(post.date))}
          </p>
          <h1
            className="font-[family-name:var(--font-display)] leading-[1.04] tracking-tightest break-words [overflow-wrap:anywhere]"
            style={{ fontSize: "clamp(1.875rem, 7vw, 5rem)" }}
          >
            {post.title}
          </h1>
          <p className="mt-8 text-text-dim text-lg md:text-xl leading-relaxed max-w-[60ch]">
            {post.dek}
          </p>
          <div className="mt-10 pt-6 border-t border-border-hi flex items-center justify-between text-sm text-text-dim font-[family-name:var(--font-mono)]">
            <span>By {post.author}</span>
            <time dateTime={post.date}>{FORMATTER.format(new Date(post.date))}</time>
          </div>
        </header>

        <article className="mx-auto max-w-[760px] px-4 sm:px-6 md:px-10 pb-32 space-y-6">
          <MDXRemote
            source={post.source}
            components={components}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>

        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 py-20 md:py-28">
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-12 md:col-span-7">
                <p className="eyebrow mb-4">Next essay</p>
                <Link
                  href={`/journal/${next.slug}`}
                  className="block font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-tightest leading-[0.98] hover:text-accent transition-colors"
                >
                  {next.title}
                </Link>
                <p className="mt-4 text-text-dim max-w-[60ch]">{next.dek}</p>
              </div>
              <div className="col-span-12 md:col-span-5 md:text-right space-y-4">
                <p className="eyebrow">Or work with us</p>
                <div className="flex md:justify-end flex-wrap gap-3">
                  <Link
                    href="/#contact"
                    className="btn-primary magnetic rounded-full px-6 py-3 text-sm font-medium"
                  >
                    Start a project
                  </Link>
                  <Link
                    href="/journal"
                    className="btn-ghost magnetic rounded-full px-6 py-3 text-sm"
                  >
                    All essays
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
