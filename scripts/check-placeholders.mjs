// Liste les informations à compléter avant mise en production.
// Usage : npm run check:placeholders   (code de sortie 1 s'il en reste)
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const PATTERNS = [/\[À COMPLÉTER[^\]]*\]/g, /TODO\("([^"]+)"\)/g, /02 XX XX XX XX/g, /tel:\+33000000000/g];
const hits = [];
function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(f)) {
      readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        for (const re of PATTERNS) for (const m of line.matchAll(re)) hits.push(`${p}:${i + 1}  ${m[0]}`);
      });
    }
  }
}
walk("src");
const site = readFileSync("src/lib/site.ts", "utf8");
if (/verified:\s*false/.test(site)) hits.push("src/lib/site.ts  address.verified = false (LocalBusiness JSON-LD désactivé)");
if (/partners:\s*\[\]/.test(site)) hits.push("src/lib/site.ts  partners vide (installateurs partenaires non renseignés)");

if (hits.length) {
  console.log(`\n${hits.length} élément(s) à compléter avant publication :\n`);
  for (const h of hits) console.log("  • " + h);
  process.exit(1);
}
console.log("Aucun placeholder restant.");
