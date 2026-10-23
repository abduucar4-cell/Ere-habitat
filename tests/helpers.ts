import type { Page } from "@playwright/test";

/** Ferme le bandeau cookies (refus) pour ne pas gêner les interactions. */
export async function dismissConsent(page: Page) {
  const refuse = page.getByRole("button", { name: "Refuser" });
  if (await refuse.isVisible().catch(() => false)) await refuse.click();
}

/** Liste des URL du sitemap, converties en chemins locaux. */
export async function sitemapPaths(page: Page) {
  const res = await page.request.get("/sitemap.xml");
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
}
