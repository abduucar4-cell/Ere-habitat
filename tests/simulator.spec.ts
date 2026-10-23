import { test, expect } from "@playwright/test";
import { dismissConsent } from "./helpers";

test("simulateur : parcours complet, hypothèses ajustables, demande d'étude", async ({ page }) => {
  await page.goto("/#simulateur");
  await dismissConsent(page);
  const sim = page.locator("#simulateur");

  await sim.getByRole("button", { name: "Continuer" }).click();
  await expect(sim.getByRole("alert")).toContainText("code postal");

  await sim.getByLabel("Code postal").fill("14000");
  await sim.getByRole("button", { name: "Continuer" }).click();
  await sim.getByText("Maison", { exact: true }).click();
  await sim.getByRole("button", { name: "Continuer" }).click();
  await sim.getByLabel(/Facture d'électricité/).fill("150");
  await sim.getByRole("button", { name: "Continuer" }).click();
  await sim.getByText("Non", { exact: true }).click();
  await sim.getByRole("button", { name: "Continuer" }).click();
  await sim.getByText("Panneaux + batterie").click();
  await sim.getByRole("button", { name: "Continuer" }).click();
  await sim.getByText("Sud-est ou sud-ouest").click();
  await sim.getByRole("button", { name: "Voir mon estimation" }).click();

  await expect(sim.getByRole("heading", { name: /ordre de grandeur/ })).toBeVisible();
  // 150 €/mois × 12 / 0,25 €/kWh = 7 200 kWh
  await expect(sim.getByText("7 200 kWh").first()).toBeVisible();
  await expect(sim.getByText(/kWc/).first()).toBeVisible();
  await expect(sim.getByText(/ne constitue ni un devis/)).toBeVisible();

  await sim.getByText("Hypothèses de calcul").click();
  await sim.locator('input[type="range"]').nth(1).fill("0.3");
  await expect(sim.getByText("6 000 kWh").first()).toBeVisible();

  const form = sim.getByRole("form", { name: "Demande d'étude détaillée" });
  await form.getByLabel("Prénom et nom").fill("Inès Leroy");
  await form.getByLabel("Téléphone").fill("+33612345678");
  await form.getByLabel(/J'accepte que ERE Habitat/).check();
  await page.waitForTimeout(500);
  await form.getByRole("button", { name: "Demander mon étude" }).click();
  await expect(page).toHaveURL(/\/merci\/\?demande=simulator/);
});
