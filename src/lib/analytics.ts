/**
 * Suivi des conversions — n'envoie rien tant que l'utilisateur n'a pas
 * accepté la mesure d'audience (voir components/consent/ConsentBanner).
 */
export type ConversionEvent =
  | "phone_click"
  | "lead_submit"
  | "lead_error"
  | "simulator_step"
  | "simulator_complete"
  | "cta_click";

export const CONSENT_KEY = "ere-consent-v1";
export const CONSENT_MAX_AGE_MS = 182 * 24 * 60 * 60 * 1000;

export type Consent = { analytics: boolean; date: string };

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    // Recommandation CNIL : redemander le consentement au bout de 6 mois.
    if (Date.now() - new Date(c.date).getTime() > CONSENT_MAX_AGE_MS) return null;
    return c;
  } catch {
    return null;
  }
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: ConversionEvent, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  if (!readConsent()?.analytics) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
