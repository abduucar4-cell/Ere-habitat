import type { MetadataRoute } from "next";
import { seoPages } from "@/content/pages";
import { publishedArticles } from "@/content/blog";
import { realisations } from "@/content/proof";
import { absoluteUrl } from "@/lib/utils";

/** Sitemap dynamique : uniquement les pages indexables. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const priority = (kind: string) => (kind === "local" ? 0.8 : kind === "conversion" ? 0.8 : 0.9);
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...seoPages.map((p) => ({
      url: absoluteUrl(`/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: priority(p.kind),
    })),
    { url: absoluteUrl("/a-propos/"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/faq/"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact/"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/blog/"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    ...publishedArticles.map((a) => ({
      url: absoluteUrl(`/blog/${a.slug}/`),
      lastModified: new Date(a.updatedAt ?? a.publishedAt ?? now),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...(realisations.length ? [{ url: absoluteUrl("/nos-realisations/"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 }] : []),
    { url: absoluteUrl("/mentions-legales/"), lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: absoluteUrl("/politique-confidentialite/"), lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: absoluteUrl("/cookies/"), lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];
}
