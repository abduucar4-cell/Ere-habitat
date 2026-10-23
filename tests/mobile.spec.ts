import { test, expect } from "@playwright/test";

test.describe("mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile uniquement");

  for (const path of ["/", "/panneaux-solaires-deauville/", "/devis-batterie-solaire/", "/blog/"]) {
    test(`aucun défilement horizontal : ${path}`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }

  test("barre d'action fixe avec appel et devis", async ({ page }) => {
    await page.goto("/");
    const bar = page.locator("div.fixed.inset-x-0.bottom-0");
    await expect(bar.getByRole("link", { name: "Appeler" })).toHaveAttribute("href", /^tel:/);
    await expect(bar.getByRole("link", { name: "Devis gratuit" })).toBeVisible();
  });

  test("menu mobile : ouverture, navigation, fermeture", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Refuser" }).click();
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    const nav = page.getByRole("navigation", { name: "Navigation mobile" });
    await expect(nav).toBeVisible();
    await nav.getByRole("link", { name: "Sur installation existante" }).click();
    await expect(page).toHaveURL(/batterie-solaire-installation-existante/);
    await expect(nav).toBeHidden();
  });
});

test("bandeau cookies : refuser est aussi visible qu'accepter, aucun GTM sans accord", async ({ page }) => {
  await page.goto("/");
  const dialog = page.getByRole("dialog", { name: /mesure d'audience/ });
  await expect(dialog.getByRole("button", { name: "Refuser" })).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Accepter" })).toBeVisible();
  await dialog.getByRole("button", { name: "Refuser" }).click();
  await expect(dialog).toBeHidden();
  await page.reload();
  await expect(page.getByRole("dialog", { name: /mesure d'audience/ })).toBeHidden();
  expect(await page.locator('script[src*="googletagmanager"]').count()).toBe(0);
});
