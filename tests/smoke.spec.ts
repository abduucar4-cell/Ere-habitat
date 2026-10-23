import { test, expect } from "@playwright/test";
import { sitemapPaths } from "./helpers";

test("toutes les pages du sitemap répondent, avec un H1 unique, un title et une meta description uniques", async ({ page }) => {
  const paths = await sitemapPaths(page);
  expect(paths.length).toBeGreaterThan(25);
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`${page.url()} → ${e.message}`));

  for (const path of paths) {
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(200);
    await expect(page.locator("h1"), `${path} : un seul H1`).toHaveCount(1);
    const title = await page.title();
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(title.length, `${path} title`).toBeGreaterThan(20);
    expect(title.length, `${path} title trop long`).toBeLessThanOrEqual(75);
    expect(desc?.length ?? 0, `${path} description`).toBeGreaterThan(70);
    expect(canonical, `${path} canonical`).toBe(`https://www.ere-habitat.com${path}`);
    expect(titles.has(title), `title dupliqué : ${title}`).toBeFalsy();
    expect(descriptions.has(desc!), `description dupliquée sur ${path}`).toBeFalsy();
    titles.add(title);
    descriptions.add(desc!);
  }
  expect(errors).toEqual([]);
});

test("les liens internes ne mènent à aucune page en erreur", async ({ page }) => {
  const seen = new Set<string>();
  for (const path of ["/", "/panneaux-solaires-caen/", "/blog/", "/faq/"]) {
    await page.goto(path);
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!));
    for (const h of hrefs) seen.add(h.split("#")[0]!);
  }
  seen.delete("");
  for (const h of seen) {
    const res = await page.request.get(h);
    expect(res.status(), h).toBeLessThan(400);
  }
});
