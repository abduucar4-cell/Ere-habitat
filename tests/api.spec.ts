import { test, expect } from "@playwright/test";

const valid = (ip: string) => ({
  headers: { "x-forwarded-for": ip },
  data: {
    formType: "quick",
    fullName: "Camille Martin",
    phone: "06 12 34 56 78",
    postalCode: "14000",
    projectType: "panneaux",
    consent: true,
    startedAt: Date.now() - 10_000,
  },
});

test("refuse une demande invalide (validation serveur)", async ({ request }) => {
  const res = await request.post("/api/lead/", { headers: { "x-forwarded-for": "10.0.0.1" }, data: { formType: "quick", fullName: "A" } });
  expect(res.status()).toBe(422);
  const body = await res.json();
  expect(body.fields.phone).toBeTruthy();
});

test("refuse un numéro de téléphone non français et un consentement absent", async ({ request }) => {
  const v = valid("10.0.0.2");
  const res = await request.post("/api/lead/", { ...v, data: { ...v.data, phone: "12345", consent: false } });
  expect(res.status()).toBe(422);
});

test("accepte une demande valide", async ({ request }) => {
  const res = await request.post("/api/lead/", valid("10.0.0.3"));
  expect(res.status()).toBe(200);
  expect((await res.json()).ok).toBe(true);
});

test("le honeypot et l'envoi trop rapide sont neutralisés sans erreur visible", async ({ request }) => {
  const v = valid("10.0.0.4");
  const bot = await request.post("/api/lead/", { ...v, data: { ...v.data, website: "spam" } });
  expect([200, 422]).toContain(bot.status());
  const fast = await request.post("/api/lead/", { ...v, data: { ...v.data, startedAt: Date.now() } });
  expect(fast.status()).toBe(200);
});

test("limite le nombre de requêtes par IP", async ({ request }) => {
  let last = 0;
  for (let i = 0; i < 31; i++) {
    last = (await request.post("/api/lead/", { headers: { "x-forwarded-for": "10.0.0.99" }, data: "{}" })).status();
  }
  expect(last).toBe(429);
});

test("refuse les requêtes d'une autre origine et les GET", async ({ request }) => {
  const res = await request.post("/api/lead/", { ...valid("10.0.0.5"), headers: { origin: "https://evil.example", "x-forwarded-for": "10.0.0.5" } });
  expect(res.status()).toBe(403);
  expect((await request.get("/api/lead/")).status()).toBe(405);
});
