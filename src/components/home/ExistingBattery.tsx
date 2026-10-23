import { ArrowRight, Check } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

/* ---------- Courbes de principe (illustratives, non issues de mesures) ---------- */
const W = 560;
const H = 280;
const PAD = { l: 8, r: 8, t: 16, b: 34 };
const prod = (t: number) => {
  const d = (t - 13.5) / 7.2;
  return Math.abs(d) >= 1 ? 0 : 3.1 * Math.pow(Math.cos((d * Math.PI) / 2), 1.6);
};
const cons = (t: number) =>
  0.38 + 0.85 * Math.exp(-(((t - 7.5) / 1.1) ** 2)) + 0.35 * Math.exp(-(((t - 12.5) / 1.4) ** 2)) + 1.55 * Math.exp(-(((t - 19.6) / 1.9) ** 2));

const X = (t: number) => PAD.l + (t / 24) * (W - PAD.l - PAD.r);
const Y = (v: number) => H - PAD.b - (v / 3.4) * (H - PAD.t - PAD.b);
const steps = Array.from({ length: 241 }, (_, i) => i / 10);

const line = (f: (t: number) => number) => steps.map((t, i) => `${i ? "L" : "M"}${X(t).toFixed(1)} ${Y(f(t)).toFixed(1)}`).join("");
const area = (from: number, to: number, top: (t: number) => number, bottom: (t: number) => number) => {
  const ts = steps.filter((t) => t >= from && t <= to);
  const up = ts.map((t, i) => `${i ? "L" : "M"}${X(t).toFixed(1)} ${Y(top(t)).toFixed(1)}`).join("");
  const down = [...ts].reverse().map((t) => `L${X(t).toFixed(1)} ${Y(bottom(t)).toFixed(1)}`).join("");
  return `${up}${down}Z`;
};
// Fenêtre de surplus : production > consommation
const surplusStart = steps.find((t) => t > 8 && prod(t) > cons(t)) ?? 9.5;
const surplusEnd = [...steps].reverse().find((t) => t < 20 && prod(t) > cons(t)) ?? 17;

function DayChart() {
  return (
    <figure className="rounded-[var(--radius-card)] border border-white/12 bg-white/[0.03] p-5 md:p-7">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 font-mono text-[0.7rem] tracking-[0.06em] text-white/70 uppercase">
        <span>Une journée type d&apos;avril à septembre</span>
        <span className="text-white/50">Illustration de principe</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-5 h-auto w-full" role="img" aria-labelledby="day-chart-desc">
        <desc id="day-chart-desc">
          Schéma de principe : en milieu de journée, la production solaire dépasse la consommation de la maison. Ce surplus charge la
          batterie, qui le restitue en soirée lorsque la consommation augmente et que la production s&apos;arrête.
        </desc>
        <defs>
          <pattern id="rest" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 0V6" stroke="#7fc493" strokeWidth="1.6" />
          </pattern>
        </defs>
        {[0, 6, 12, 18, 24].map((h) => (
          <g key={h}>
            <path d={`M${X(h)} ${PAD.t} V${H - PAD.b}`} stroke="rgba(255,255,255,0.08)" />
            <text x={X(h)} y={H - 12} textAnchor={h === 0 ? "start" : h === 24 ? "end" : "middle"} fill="rgba(255,255,255,0.55)" fontSize="11" fontFamily="var(--font-plex-mono)">
              {String(h).padStart(2, "0")}h
            </text>
          </g>
        ))}
        <path d={`M${PAD.l} ${H - PAD.b} H${W - PAD.r}`} stroke="rgba(255,255,255,0.25)" />
        {/* Surplus stocké */}
        <path d={area(surplusStart, surplusEnd, prod, cons)} fill="#2f8f4e" fillOpacity="0.55" />
        {/* Restitution le soir */}
        <path d={area(surplusEnd + 0.4, 23.4, cons, (t) => Math.max(prod(t), 0.38))} fill="url(#rest)" />
        <path d={line(prod)} fill="none" stroke="#f2c14e" strokeWidth="2" />
        <path d={line(cons)} fill="none" stroke="#ffffff" strokeWidth="1.6" strokeDasharray="4 4" />
      </svg>
      <ul className="mt-4 grid gap-2 text-[0.85rem] text-white/80 sm:grid-cols-2">
        <li className="flex items-center gap-2.5">
          <span aria-hidden="true" className="h-0.5 w-5 bg-sun" /> Production solaire
        </li>
        <li className="flex items-center gap-2.5">
          <span aria-hidden="true" className="h-0 w-5 border-t-2 border-dashed border-white" /> Consommation de la maison
        </li>
        <li className="flex items-center gap-2.5">
          <span aria-hidden="true" className="size-3 rounded-sm bg-leaf-500/80" /> Surplus qui charge la batterie
        </li>
        <li className="flex items-center gap-2.5">
          <span aria-hidden="true" className="size-3 rounded-sm bg-[repeating-linear-gradient(45deg,#7fc493_0_2px,transparent_2px_5px)]" /> Énergie restituée le soir
        </li>
      </ul>
    </figure>
  );
}

const signals = [
  "Votre application montre une forte injection sur le réseau en milieu de journée",
  "La maison consomme surtout le soir (retour du travail, cuisine, éclairage)",
  "Vous souhaitez éventuellement alimenter des circuits essentiels en cas de coupure",
];

export function ExistingBattery() {
  return (
    <section id="deja-equipe" aria-labelledby="existing-title" className="bg-ink py-20 text-white md:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3 text-white/70">
            <span className="text-white">02</span>
            <span aria-hidden="true" className="h-px w-8 bg-white/30" />
            Déjà équipé en panneaux
          </p>
          <h2 id="existing-title" className="mt-5 text-h2 text-white">
            Vous avez déjà des panneaux solaires&nbsp;? Ajoutez une batterie de stockage.
          </h2>
          <p className="mt-6 text-lg text-white/75">
            Une grande partie de votre production part peut-être sur le réseau pendant que vous êtes absent. Une batterie compatible
            permet de l&apos;utiliser le soir. Nous vérifions d&apos;abord si elle est utile pour vous.
          </p>
          <ul className="mt-8 space-y-3.5">
            {signals.map((s) => (
              <li key={s} className="flex gap-3 text-white/85">
                <Check className="mt-1 size-4 shrink-0 text-[#7fc493]" aria-hidden="true" strokeWidth={2.4} />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/batterie-solaire-installation-existante/" variant="inverse" size="lg" data-cta="existing-battery">
              Vérifier la compatibilité
              <ArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="/devis-batterie-solaire/" size="lg" className="border border-white/25 bg-transparent shadow-none hover:bg-white/10">
              Devis batterie gratuit
            </LinkButton>
          </div>
        </div>
        <div className="lg:col-span-7">
          <DayChart />
        </div>
      </div>
    </section>
  );
}
