import { test, expect } from "@playwright/test";
import { dismissConsent } from "./helpers";

test("formulaire rapide : erreurs accessibles puis envoi réussi", async ({ page }) => {
  await page.goto("/contact/");
  await dismissConsent(page);
  const form = page.getByRole("form", { name: "Demande de rappel rapide" });
  await form.getByRole("button", { name: "Être rappelé" }).click();
  await expect(form.getByText("Indiquez votre nom")).toBeVisible();
  await expect(form.getByLabel("Téléphone")).toHaveAttribute("aria-invalid", "true");

  await form.getByLabel("Prénom et nom").fill("Camille Martin");
  await form.getByLabel("Téléphone").fill("06 12 34 56 78");
  await form.getByLabel("Code postal").fill("14123");
  await form.getByLabel("Type de projet").selectOption("batterie-existante");
  await form.getByLabel(/J'accepte que ERE Habitat/).check();
  await expect(form.getByLabel(/recevoir occasionnellement/)).not.toBeChecked(); // aucune case marketing précochée
  await page.waitForTimeout(2600);
  await form.getByRole("button", { name: "Être rappelé" }).click();
  await expect(page).toHaveURL(/\/merci\/\?demande=quick/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Merci");
});

test("formulaire détaillé : envoi réussi", async ({ page }) => {
  await page.goto("/devis-panneaux-solaires/");
  await dismissConsent(page);
  const form = page.getByRole("form", { name: "Demande de devis détaillée" });
  await form.getByLabel("Prénom et nom").fill("Louis Durand");
  await form.getByLabel("Téléphone").fill("0231000000");
  await form.getByLabel("E-mail").fill("louis@example.fr");
  await form.getByLabel("Commune").fill("Bayeux");
  await form.getByLabel("Code postal").fill("14400");
  await form.getByLabel("Type de logement").selectOption("maison");
  await form.getByText("non", { exact: true }).click();
  await form.getByLabel("Type de projet").selectOption("panneaux-batterie");
  await form.getByLabel("Délai souhaité").selectOption("3-mois");
  await form.getByLabel(/J'accepte que ERE Habitat/).check();
  await page.waitForTimeout(2600);
  await form.getByRole("button", { name: /Envoyer ma demande/ }).click();
  await expect(page).toHaveURL(/\/merci\/\?demande=detailed/);
});
