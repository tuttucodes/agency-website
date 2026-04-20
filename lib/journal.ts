import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * MDX-backed journal.
 *
 * Essays live as `.mdx` files in `content/journal/` with frontmatter for the
 * card metadata. The filename (sans extension) becomes the slug. All reads
 * happen at build time inside Server Components; no fs access reaches the
 * edge.
 */

export type JournalCategory = "Engineering" | "Applied AI" | "Design";

export type JournalMeta = {
  slug: string;
  title: string;
  dek: string;
  category: JournalCategory;
  date: string;
  readMins: number;
  author: string;
};

export type JournalPost = JournalMeta & {
  source: string;
};

const JOURNAL_DIR = path.join(process.cwd(), "content", "journal");

function readRaw(slug: string): { meta: JournalMeta; source: string } | null {
  const file = path.join(JOURNAL_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const meta: JournalMeta = {
    slug,
    title: String(data.title ?? ""),
    dek: String(data.dek ?? ""),
    category: (data.category as JournalCategory) ?? "Engineering",
    date: String(data.date ?? ""),
    readMins: Number(data.readMins ?? 0),
    author: String(data.author ?? "Kernel & Oak Studio"),
  };
  return { meta, source: content };
}

export function getAllJournalMeta(): JournalMeta[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs
    .readdirSync(JOURNAL_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("._") && !f.startsWith("."))
    .map((f) => f.replace(/\.mdx$/, ""))
    .map((slug) => readRaw(slug)?.meta)
    .filter((m): m is JournalMeta => Boolean(m))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getJournalPost(slug: string): JournalPost | null {
  const r = readRaw(slug);
  if (!r) return null;
  return { ...r.meta, source: r.source };
}
