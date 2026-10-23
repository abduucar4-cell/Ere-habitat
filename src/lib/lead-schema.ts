import { z } from "zod";

// Pas de compilation JIT (new Function) : compatible avec notre Content-Security-Policy sans 'unsafe-eval'.
z.config({ jitless: true });

/** Schémas partagés client / serveur pour les demandes de devis. */

const phoneFr = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s.\-()]/g, ""))
  .refine((v) => /^(?:\+33|0033|0)[1-9]\d{8}$/.test(v), "Numéro de téléphone français invalide");

const postalCode = z.string().trim().regex(/^\d{5}$/, "Code postal à 5 chiffres");

export const PROJECT_TYPES = [
  { value: "panneaux", label: "Panneaux solaires" },
  { value: "panneaux-batterie", label: "Panneaux + batterie" },
  { value: "batterie", label: "Batterie seule" },
  { value: "batterie-existante", label: "Batterie sur installation existante" },
  { value: "conseil", label: "Je souhaite être conseillé" },
] as const;

export const HOUSING_TYPES = [
  { value: "maison", label: "Maison individuelle" },
  { value: "appartement", label: "Appartement" },
  { value: "local-pro", label: "Local professionnel" },
] as const;

export const DELAYS = [
  { value: "rapide", label: "Dès que possible" },
  { value: "3-mois", label: "Dans les 3 mois" },
  { value: "6-mois", label: "Dans les 6 mois" },
  { value: "reflexion", label: "Je me renseigne" },
] as const;

const projectType = z.enum(PROJECT_TYPES.map((p) => p.value) as [string, ...string[]], {
  message: "Choisissez un type de projet",
});

/** Champs anti-spam communs (honeypot + délai minimal de remplissage). */
const antiSpam = {
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number().int().positive(),
};

const consent = z.literal(true, { message: "Votre accord est nécessaire pour traiter la demande" });

export const quickLeadSchema = z.object({
  formType: z.literal("quick"),
  fullName: z.string().trim().min(2, "Indiquez votre nom").max(80),
  phone: phoneFr,
  postalCode,
  projectType,
  message: z.string().trim().max(1500).optional().or(z.literal("")),
  consent,
  marketing: z.boolean().optional(),
  ...antiSpam,
});

export const detailedLeadSchema = z.object({
  formType: z.literal("detailed"),
  fullName: z.string().trim().min(2, "Indiquez votre nom").max(80),
  phone: phoneFr,
  email: z.string().trim().email("Adresse e-mail invalide").max(120),
  city: z.string().trim().min(2, "Indiquez votre commune").max(80),
  postalCode,
  housing: z.enum(HOUSING_TYPES.map((h) => h.value) as [string, ...string[]], { message: "Choisissez un type de logement" }),
  hasPanels: z.enum(["oui", "non"], { message: "Précisez si vous êtes déjà équipé" }),
  consumption: z.string().trim().max(60).optional().or(z.literal("")),
  projectType,
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  delay: z.enum(DELAYS.map((d) => d.value) as [string, ...string[]], { message: "Choisissez un délai" }),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent,
  marketing: z.boolean().optional(),
  ...antiSpam,
});

export const simulatorLeadSchema = z.object({
  formType: z.literal("simulator"),
  fullName: z.string().trim().min(2, "Indiquez votre nom").max(80),
  phone: phoneFr,
  email: z.string().trim().email("Adresse e-mail invalide").max(120).optional().or(z.literal("")),
  postalCode,
  summary: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])),
  consent,
  marketing: z.boolean().optional(),
  ...antiSpam,
});

export const leadSchema = z.discriminatedUnion("formType", [quickLeadSchema, detailedLeadSchema, simulatorLeadSchema]);

export type QuickLead = z.input<typeof quickLeadSchema>;
export type DetailedLead = z.input<typeof detailedLeadSchema>;
export type Lead = z.output<typeof leadSchema>;

/** Délai minimal (ms) entre l'affichage et l'envoi d'un formulaire : filtre les robots. */
export const MIN_FILL_MS = 2500;
