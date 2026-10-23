import { localPages } from "./local";
import { servicePages } from "./services";
import type { SeoPage } from "../types";

export const seoPages: SeoPage[] = [...servicePages, ...localPages];

export const pagesBySlug = new Map(seoPages.map((p) => [p.slug, p]));

export function getSeoPage(slug: string) {
  return pagesBySlug.get(slug);
}

/** Libellé court pour les liens internes. */
export function linkLabel(slug: string) {
  return pagesBySlug.get(slug)?.breadcrumb ?? slug;
}
