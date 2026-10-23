import { test, expect } from "@playwright/test";
import { simulate, annualConsumption, DEFAULT_ASSUMPTIONS } from "../src/lib/simulator";

const base = {
  postalCode: "14000",
  housing: "maison" as const,
  consumptionMode: "kwh" as const,
  annualKwh: 6000,
  hasPanels: false,
  project: "panneaux" as const,
  orientation: "sud" as const,
};

test("conversion facture → kWh selon le prix supposé", () => {
  expect(annualConsumption({ ...base, consumptionMode: "bill", monthlyBill: 100 }).kwh).toBe(4800);
});

test("puissance arrondie à une valeur courante entre 3 et 9 kWc", () => {
  const r = simulate(base);
  expect([3, 4.5, 6, 7.5, 9]).toContain(r.recommendedPowerKwc);
  const big = simulate({ ...base, annualKwh: 60000 });
  expect(big.recommendedPowerKwc).toBe(9);
  const small = simulate({ ...base, annualKwh: 1000 });
  expect(small.recommendedPowerKwc).toBe(3);
});

test("production = puissance × productible × orientation", () => {
  const r = simulate({ ...base, orientation: "est-ouest" });
  expect(r.estimatedProductionKwh).toBe(Math.round((r.recommendedPowerKwc! * DEFAULT_ASSUMPTIONS.specificYield * 0.82) / 10) * 10);
});

test("batterie : pas de recommandation si projet panneaux seuls, bornée 5–15 kWh sinon", () => {
  expect(simulate(base).recommendedBatteryKwh).toBeNull();
  const b = simulate({ ...base, project: "panneaux-batterie", annualKwh: 9000 });
  expect(b.recommendedBatteryKwh).toBeGreaterThanOrEqual(5);
  expect(b.recommendedBatteryKwh).toBeLessThanOrEqual(15);
});

test("installation existante : pas de puissance proposée, note sur l'onduleur", () => {
  const r = simulate({ ...base, hasPanels: true, existingPowerKwc: 3, project: "batterie" });
  expect(r.recommendedPowerKwc).toBeNull();
  expect(r.estimatedProductionKwh).toBe(3150);
  expect(r.notes.join(" ")).toContain("onduleur");
});

test("hors Normandie : note d'information", () => {
  expect(simulate({ ...base, postalCode: "75001" }).notes.join(" ")).toContain("hors de notre zone");
});
