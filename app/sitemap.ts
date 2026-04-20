import type { MetadataRoute } from "next";
import { CASES } from "@/lib/cases";
import { INSIGHTS } from "@/lib/insights";
import { SERVICES } from "@/lib/services";

const BASE = "https://kernelandoak.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/#services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/#work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/#capabilities`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/#process`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/#studio`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/#insights`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/#faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/#contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];
  const services: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));
  const cases: MetadataRoute.Sitemap = CASES.map((c) => ({
    url: `${BASE}/work/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.85,
  }));
  const journal: MetadataRoute.Sitemap = INSIGHTS.map((p) => ({
    url: `${BASE}/journal/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));
  return [...sections, ...services, ...cases, ...journal];
}
