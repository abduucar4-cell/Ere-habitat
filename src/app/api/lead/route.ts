import { NextResponse, type NextRequest } from "next/server";
import { leadSchema, MIN_FILL_MS } from "@/lib/lead-schema";
import { rateLimit } from "@/lib/rate-limit";
import { notifyLead } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 16_000;

export async function POST(req: NextRequest) {
  // Même origine uniquement (protection CSRF basique).
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return NextResponse.json({ ok: false, error: "Origine non autorisée" }, { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const limited = rateLimit(`lead:${ip}`, Number(process.env.LEAD_RATE_LIMIT ?? 5));
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "Trop de demandes. Réessayez dans quelques minutes ou appelez-nous." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) return NextResponse.json({ ok: false, error: "Requête trop volumineuse" }, { status: 413 });

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Format invalide" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Certains champs sont invalides", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const lead = parsed.data;
  // Honeypot rempli ou formulaire envoyé trop vite : réponse neutre, rien n'est transmis.
  if (lead.website || Date.now() - lead.startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  try {
    const result = await notifyLead(lead, {
      page: req.headers.get("referer") ?? undefined,
      receivedAt: new Date().toISOString(),
    });
    if (!result.delivered) {
      return NextResponse.json(
        { ok: false, error: "Le service est momentanément indisponible. Merci de nous appeler." },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Le service est momentanément indisponible. Merci de nous appeler." },
      { status: 503 },
    );
  }
}

export function GET() {
  return NextResponse.json({ ok: false }, { status: 405, headers: { Allow: "POST" } });
}
