import "server-only";
import { createHmac } from "node:crypto";
import type { Lead } from "./lead-schema";

const LABELS: Record<string, string> = {
  fullName: "Nom",
  phone: "Téléphone",
  email: "E-mail",
  city: "Commune",
  postalCode: "Code postal",
  housing: "Logement",
  hasPanels: "Déjà équipé",
  consumption: "Consommation",
  projectType: "Projet",
  budget: "Budget indicatif",
  delay: "Délai",
  message: "Message",
  marketing: "Accepte les communications",
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function toRows(lead: Lead): Array<[string, string]> {
  const rows: Array<[string, string]> = [];
  for (const [k, v] of Object.entries(lead)) {
    if (["consent", "website", "startedAt", "formType", "summary"].includes(k)) continue;
    if (v === undefined || v === "") continue;
    rows.push([LABELS[k] ?? k, String(v)]);
  }
  if (lead.formType === "simulator") {
    for (const [k, v] of Object.entries(lead.summary)) rows.push([`Simulateur · ${k}`, String(v ?? "—")]);
  }
  return rows;
}

export type NotifyResult = { delivered: boolean; channels: string[] };

/** Champs du formulaire Netlify « devis » — doivent correspondre à public/__forms.html. */
const NETLIFY_FIELDS: Record<string, string> = {
  formType: "type_formulaire",
  fullName: "nom",
  phone: "telephone",
  email: "email",
  city: "commune",
  postalCode: "code_postal",
  housing: "logement",
  hasPanels: "deja_equipe",
  consumption: "consommation",
  projectType: "projet",
  budget: "budget",
  delay: "delai",
  message: "message",
  marketing: "accepte_informations",
};

/**
 * Netlify Forms : la demande est enregistrée dans l'onglet « Forms » de Netlify
 * et envoyée par e-mail (notification à configurer dans Netlify).
 * Nécessite public/__forms.html et la détection des formulaires activée.
 */
async function sendToNetlifyForms(lead: Lead, origin: string, page?: string) {
  const form = new URLSearchParams();
  form.set("form-name", "devis");
  for (const [k, v] of Object.entries(lead)) {
    const name = NETLIFY_FIELDS[k];
    if (!name || v === undefined || v === "") continue;
    form.set(name, typeof v === "boolean" ? (v ? "oui" : "non") : String(v));
  }
  if (lead.formType === "simulator") {
    form.set(
      "simulateur",
      Object.entries(lead.summary)
        .filter(([, v]) => v !== null && v !== "")
        .map(([k, v]) => `${k} : ${v}`)
        .join("\n"),
    );
  }
  if (page) form.set("page", page);
  const res = await fetch(`${origin}/__forms.html`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
    signal: AbortSignal.timeout(8000),
  });
  return res.ok;
}

/**
 * Transmet la demande au(x) canal(aux) configuré(s).
 * Aucune donnée n'est stockée par le site lui-même.
 */
export async function notifyLead(
  lead: Lead,
  meta: { page?: string; receivedAt: string; origin?: string },
): Promise<NotifyResult> {
  const channels: string[] = [];
  if (process.env.LEAD_DRY_RUN === "1") return { delivered: true, channels: ["dry-run"] };
  const payload = { ...lead, website: undefined, meta };
  const body = JSON.stringify(payload);

  if (meta.origin && process.env.LEAD_NETLIFY_FORMS !== "0") {
    try {
      if (await sendToNetlifyForms(lead, meta.origin, meta.page)) channels.push("netlify-forms");
    } catch {
      /* canal indisponible : on tente les suivants */
    }
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.LEAD_WEBHOOK_SECRET) {
      headers["X-Lead-Signature"] = createHmac("sha256", process.env.LEAD_WEBHOOK_SECRET).update(body).digest("hex");
    }
    const res = await fetch(webhook, { method: "POST", headers, body, signal: AbortSignal.timeout(8000) });
    if (res.ok) channels.push("webhook");
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  if (key && to) {
    const rows = toRows(lead)
      .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#5b6878">${escapeHtml(k)}</td><td style="padding:6px 12px">${escapeHtml(v)}</td></tr>`)
      .join("");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL ?? "ERE Habitat <onboarding@resend.dev>",
        to: [to],
        reply_to: "email" in lead && lead.email ? lead.email : undefined,
        subject: `Nouvelle demande (${lead.formType}) — ${lead.fullName} · ${lead.postalCode}`,
        html: `<h2 style="font-family:sans-serif">Nouvelle demande de devis</h2><p style="font-family:sans-serif;color:#5b6878">Page : ${escapeHtml(meta.page ?? "—")} · ${escapeHtml(meta.receivedAt)}</p><table style="font-family:sans-serif;border-collapse:collapse">${rows}</table>`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) channels.push("email");
  }

  if (channels.length === 0 && process.env.NODE_ENV !== "production") {
    // En développement sans canal configuré : trace minimale, sans données personnelles.
    console.info(`[lead] ${lead.formType} reçu (${meta.receivedAt}) — aucun canal configuré`);
    return { delivered: true, channels: ["dev-log"] };
  }

  return { delivered: channels.length > 0, channels };
}
