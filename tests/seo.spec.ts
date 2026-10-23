import { test, expect, type Page } from "@playwright/test";

async function jsonLd(page: Page) {
  const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
  return raw.map((r) => JSON.parse(r) as Record<string, unknown>);
}

test("JSON-LD valide : Organization, WebSite, Service, BreadcrumbList", async ({ page }) => {
  await page.goto("/");
  const home = await jsonLd(page);
  const types = home.map((d) => d["@type"]);
  expect(types).toContain("Organization");
  expect(types).toContain("WebSite");
  // LocalBusiness n'est émis qu'avec une adresse vérifiée
  expect(types).not.toContain("HomeAndConstructionBusiness");

  await page.goto("/panneaux-solaires-caen/");
  const local = await jsonLd(page);
  const service = local.find((d) => d["@type"] === "Service")!;
  expect(service).toBeTruthy();
  expect((service.areaServed as { name: string }).name).toBe("Caen");
  const bc = local.find((d) => d["@type"] === "BreadcrumbList") as { itemListElement: unknown[] };
  expect(bc.itemListElement).toHaveLength(2);
});

test("FAQPage uniquement sur /faq/", async ({ page }) => {
  await page.goto("/faq/");
  expect((await jsonLd(page)).some((d) => d["@type"] === "FAQPage")).toBeTruthy();
  await page.goto("/");
  expect((await jsonLd(page)).some((d) => d["@type"] === "FAQPage")).toBeFalsy();
});

test("robots.txt, sitemap et pages non indexables", async ({ page, request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://www.ere-habitat.com/sitemap.xml");
  expect(robots).toContain("Disallow: /api/");

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/merci/");
  expect(sitemap).not.toContain("prix-batterie-solaire-2027"); // brouillon de blog

  await page.goto("/merci/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("404, redirections 301 et brouillons non publiés", async ({ request }) => {
  expect((await request.get("/page-inexistante/")).status()).toBe(404);
  expect((await request.get("/blog/prix-batterie-solaire-2027/")).status()).toBe(404);
  const r = await request.get("/devis/", { maxRedirects: 0 });
  expect([301, 308]).toContain(r.status());
  expect(r.headers()["location"]).toContain("/devis-panneaux-solaires/");
  const followed = await request.get("/devis");
  expect(followed.url()).toContain("/devis-panneaux-solaires/");
  expect(followed.status()).toBe(200);
});

test("Open Graph, Twitter et en-têtes de sécurité", async ({ page }) => {
  const res = await page.goto("/batterie-stockage-solaire/");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Batterie/);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  const h = res!.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["x-powered-by"]).toBeUndefined();
});
