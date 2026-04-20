// Legacy shim — keeps existing `Insights` and OG code working while the
// journal layer fully migrates to MDX. New code should import from
// `@/lib/journal` directly.
import { getAllJournalMeta, getJournalPost, type JournalMeta } from "@/lib/journal";

export type InsightCategory = JournalMeta["category"];

export type Insight = JournalMeta;

export const INSIGHTS: Insight[] = getAllJournalMeta();

export function getInsight(slug: string): Insight | undefined {
  const post = getJournalPost(slug);
  if (!post) return undefined;
  const { source: _source, ...meta } = post;
  return meta;
}
