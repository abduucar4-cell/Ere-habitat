import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

function IconPanels() {
  return (
    <svg viewBox="0 0 64 64" className="size-14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M10 44 22 16h32L42 44Z" />
      <path d="M16 30h32M14 37h31M19 23h32M30 16l-8 28M42 16l-8 28" />
      <path d="M26 44v8M38 44v8M20 52h24" />
    </svg>
  );
}
function IconBattery() {
  return (
    <svg viewBox="0 0 64 64" className="size-14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="18" y="10" width="28" height="44" rx="3" />
      <path d="M27 6h10" />
      <path d="M24 44h16M24 38h16M24 32h16" className="text-leaf-500" stroke="currentColor" />
      <path d="m33 17-4 7h6l-4 7" />
    </svg>
  );
}
function IconRetrofit() {
  return (
    <svg viewBox="0 0 64 64" className="size-14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M6 30 26 12l20 18" />
      <path d="M11 26v24h30V26" />
      <path d="m15 22 7-6h10l-3 6Z" />
      <rect x="44" y="34" width="14" height="20" rx="2" />
      <path d="M48 40h6M48 45h6M48 50h6" className="text-leaf-500" stroke="currentColor" />
      <path d="M41 44h3" strokeDasharray="1 2" />
    </svg>
  );
}

const services = [
  {
    n: "A",
    title: "Panneaux photovoltaïques",
    text: "Des solutions pour produire votre propre électricité, dimensionnées à partir de votre toiture et de votre consommation réelle.",
    meta: ["Maisons et locaux professionnels", "Étude de toiture et d'ombrages"],
    href: "/panneaux-solaires/",
    cta: "Panneaux solaires",
    Icon: IconPanels,
  },
  {
    n: "B",
    title: "Batteries de stockage solaire",
    text: "Stockez une partie de l'énergie produite en journée pour l'utiliser plus tard, le soir et une partie de la nuit.",
    meta: ["Couplage AC ou DC", "Fonction secours sur demande"],
    href: "/batterie-stockage-solaire/",
    cta: "Batteries de stockage",
    Icon: IconBattery,
  },
  {
    n: "C",
    title: "Batterie sur installation existante",
    text: "Vous êtes déjà équipé ? Nous étudions l'ajout d'une batterie compatible avec votre onduleur et vos habitudes.",
    meta: ["Toutes marques d'onduleurs étudiées", "Dimensionné sur vos relevés"],
    href: "/batterie-solaire-installation-existante/",
    cta: "Ajouter une batterie",
    Icon: IconRetrofit,
  },
];

export function Services() {
  return (
    <Section id="solutions" labelledBy="services-title">
      <SectionHeading
        id="services-title"
        index="01"
        label="Nos solutions"
        title="Produire, stocker, consommer au bon moment."
        intro="Trois solutions complémentaires, toujours précédées d'une étude. Nous vous recommandons ce qui est utile pour votre logement — pas davantage."
        align="split"
      />
      <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-3">
        {services.map(({ n, title, text, meta, href, cta, Icon }) => (
          <li key={href} className="group relative flex flex-col bg-white p-7 transition-colors duration-500 hover:bg-paper md:p-9">
            <div className="flex items-start justify-between text-ink">
              <Icon />
              <span className="font-mono text-xs text-slate">{n}</span>
            </div>
            <h3 className="mt-10 text-[1.55rem] leading-tight text-ink">{title}</h3>
            <p className="mt-4 text-slate">{text}</p>
            <ul className="mt-8 space-y-2 border-t border-line pt-5 font-mono text-[0.72rem] tracking-[0.04em] text-ink-700 uppercase">
              {meta.map((m) => (
                <li key={m} className="flex gap-2">
                  <span aria-hidden="true" className="text-leaf">—</span>
                  {m}
                </li>
              ))}
            </ul>
            <Link
              href={href}
              className="mt-8 inline-flex items-center gap-2 self-start font-medium text-ink after:absolute after:inset-0 after:content-['']"
            >
              {cta}
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-line-strong transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
