/**
 * Simulateur solaire — logique pure, sans dépendance UI.
 *
 * Toutes les hypothèses sont explicites, documentées et ajustables par
 * l'utilisateur dans l'interface. Le résultat est un ORDRE DE GRANDEUR
 * destiné à préparer une étude : il ne constitue ni un devis, ni une
 * promesse de production, d'économie ou de rentabilité.
 */

export type Housing = "maison" | "appartement" | "local-pro";
export type Orientation = "sud" | "sud-est-ouest" | "est-ouest" | "inconnue";
export type ProjectType = "panneaux" | "batterie" | "panneaux-batterie" | "conseil";

export type Assumptions = {
  /** Productible annuel en kWh par kWc installé, toiture bien orientée.
   *  Ordre de grandeur pour le Calvados issu de l'outil européen PVGIS
   *  (re.jrc.ec.europa.eu/pvg_tools) — à vérifier pour chaque adresse. */
  specificYield: number;
  /** Prix moyen TTC du kWh acheté, abonnement compris — modifiable. */
  pricePerKwh: number;
  /** Production annuelle visée, en part de la consommation annuelle :
   *  sans batterie on vise une production proche de la consommation de journée,
   *  avec batterie on peut dimensionner plus large pour recharger le soir. */
  productionShareNoBattery: number;
  productionShareWithBattery: number;
  /** Part de la consommation quotidienne qui a lieu le soir et la nuit. */
  eveningShare: number;
};

export const DEFAULT_ASSUMPTIONS: Assumptions = {
  specificYield: 1050,
  pricePerKwh: 0.25,
  productionShareNoBattery: 0.55,
  productionShareWithBattery: 0.85,
  eveningShare: 0.45,
};

/** Coefficients d'orientation approximatifs appliqués au productible. */
export const ORIENTATION_FACTOR: Record<Orientation, number> = {
  sud: 1,
  "sud-est-ouest": 0.95,
  "est-ouest": 0.82,
  inconnue: 0.9,
};

export const ORIENTATION_LABEL: Record<Orientation, string> = {
  sud: "Sud",
  "sud-est-ouest": "Sud-est ou sud-ouest",
  "est-ouest": "Est / ouest",
  inconnue: "Je ne sais pas",
};

/** Puissances courantes pour un particulier (kWc). */
const POWER_STEPS = [3, 4.5, 6, 7.5, 9];
/** Capacités de batteries résidentielles courantes (kWh utiles). */
const BATTERY_STEPS = [5, 7.5, 10, 12.5, 15];

export type SimulatorInput = {
  postalCode: string;
  housing: Housing;
  consumptionMode: "kwh" | "bill";
  annualKwh?: number;
  monthlyBill?: number;
  hasPanels: boolean;
  existingPowerKwc?: number;
  project: ProjectType;
  orientation: Orientation;
};

export type SimulatorResult = {
  annualConsumptionKwh: number;
  consumptionSource: "declaree" | "estimee-facture";
  recommendedPowerKwc: number | null;
  estimatedProductionKwh: number | null;
  recommendedBatteryKwh: number | null;
  dailyEveningKwh: number;
  inCoreArea: boolean;
  notes: string[];
};

const nearest = (steps: number[], value: number) =>
  steps.reduce((best, s) => (Math.abs(s - value) < Math.abs(best - value) ? s : best), steps[0]!);

export function isCalvados(postalCode: string) {
  return /^14\d{3}$/.test(postalCode.trim());
}

export function isNormandy(postalCode: string) {
  return /^(14|27|50|61|76)\d{3}$/.test(postalCode.trim());
}

export function annualConsumption(input: SimulatorInput, a: Assumptions = DEFAULT_ASSUMPTIONS) {
  if (input.consumptionMode === "kwh" && input.annualKwh && input.annualKwh > 0) {
    return { kwh: Math.round(input.annualKwh), source: "declaree" as const };
  }
  const bill = input.monthlyBill && input.monthlyBill > 0 ? input.monthlyBill : 0;
  return { kwh: Math.round((bill * 12) / a.pricePerKwh), source: "estimee-facture" as const };
}

export function simulate(input: SimulatorInput, a: Assumptions = DEFAULT_ASSUMPTIONS): SimulatorResult {
  const { kwh, source } = annualConsumption(input, a);
  const yieldKwhPerKwc = a.specificYield * ORIENTATION_FACTOR[input.orientation];
  const wantsPanels = input.project === "panneaux" || input.project === "panneaux-batterie" || input.project === "conseil";
  const wantsBattery = input.project === "batterie" || input.project === "panneaux-batterie" || input.project === "conseil";
  const notes: string[] = [];

  let recommendedPowerKwc: number | null = null;
  let estimatedProductionKwh: number | null = null;

  if (wantsPanels && !input.hasPanels && kwh > 0) {
    const share = wantsBattery ? a.productionShareWithBattery : a.productionShareNoBattery;
    // Puissance telle que la production annuelle ≈ `share` × consommation annuelle.
    const raw = (kwh * share) / yieldKwhPerKwc;
    recommendedPowerKwc = nearest(POWER_STEPS, Math.min(Math.max(raw, 3), 9));
    estimatedProductionKwh = Math.round((recommendedPowerKwc * yieldKwhPerKwc) / 10) * 10;
  }

  if (input.hasPanels && input.existingPowerKwc && input.existingPowerKwc > 0) {
    estimatedProductionKwh = Math.round((input.existingPowerKwc * yieldKwhPerKwc) / 10) * 10;
  }

  const dailyEveningKwh = Math.round(((kwh / 365) * a.eveningShare) * 10) / 10;

  let recommendedBatteryKwh: number | null = null;
  if (wantsBattery && kwh > 0) {
    // La batterie est dimensionnée sur la consommation du soir, plafonnée par
    // le surplus solaire journalier moyen lorsqu'il est connu.
    let target = dailyEveningKwh;
    const production = estimatedProductionKwh;
    if (production) {
      const dailySurplus = (production / 365) * 0.6;
      target = Math.min(target, Math.max(dailySurplus, 4));
    }
    recommendedBatteryKwh = nearest(BATTERY_STEPS, Math.min(Math.max(target, 5), 15));
  }

  if (input.housing === "appartement") {
    notes.push(
      "En appartement, une installation dépend de l'accord de la copropriété et de l'accès à une surface exploitable. Nous vérifions la faisabilité lors de l'étude.",
    );
  }
  if (input.hasPanels && wantsBattery) {
    notes.push(
      "L'ajout d'une batterie dépend de votre onduleur actuel (central, hybride ou micro-onduleurs). Munissez-vous de sa référence pour l'étude.",
    );
  }
  if (input.orientation === "inconnue") {
    notes.push("Orientation non renseignée : un coefficient prudent a été appliqué. L'étude précise votre toiture.");
  }
  if (!isNormandy(input.postalCode)) {
    notes.push("Votre code postal est hors de notre zone habituelle (Normandie). Contactez-nous pour vérifier si nous pouvons intervenir.");
  }

  return {
    annualConsumptionKwh: kwh,
    consumptionSource: source,
    recommendedPowerKwc,
    estimatedProductionKwh,
    recommendedBatteryKwh,
    dailyEveningKwh,
    inCoreArea: isCalvados(input.postalCode),
    notes,
  };
}

/** Espace insécable classique (U+00A0) : l'espace fine U+202F n'existe pas dans toutes les polices. */
export const formatNumber = (n: number, maxDecimals = 1) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: maxDecimals }).format(n).replace(/\u202f/g, "\u00a0");
export const formatKwh = (n: number) => `${formatNumber(n, 0)}\u00a0kWh`;
