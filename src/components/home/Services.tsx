import Link from "next/link";
import { ArrowUpRight, BatteryCharging, PlugZap, Sun } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import type { PhotoKey } from "@/content/photos";

const services: Array<{
  title: string;
  text: string;
  meta: string[];
  href: string;
  cta: string;
  photo: PhotoKey;
  Icon: typeof Sun;
  tone: string;
}> = [
  {
    title: "Panneaux photovoltaïques",
    text: "Des solutions pour produire votre propre électricité, dimensionnées à partir de votre toiture et de votre consommation réelle.",
    meta: ["Maisons et locaux professionnels", "Étude de toiture et d'ombrages"],
    href: "/panneaux-solaires/",
    cta: "Panneaux solaires",
    photo: "slateRoof",
    Icon: Sun,
    tone: "bg-sun text-ink",
  },
  {
    title: "Batteries de stockage solaire",
    text: "Stockez une partie de l'énergie produite en journée pour l'utiliser plus tard, le soir et une partie de la nuit.",
    meta: ["Couplage AC ou DC", "Fonction secours sur demande"],
    href: "/batterie-stockage-solaire/",
    cta: "Batteries de stockage",
    photo: "batteryWall",
    Icon: BatteryCharging,
    tone: "bg-leaf text-white",
  },
  {
    title: "Batterie sur installation existante",
    text: "Vous êtes déjà équipé ? Nous étudions l'ajout d'une batterie compatible avec votre onduleur et vos habitudes.",
    meta: ["Toutes marques d'onduleurs étudiées", "Dimensionné sur vos relevés"],
    href: "/batterie-solaire-installation-existante/",
    cta: "Ajouter une batterie",
    photo: "gardenHouse",
    Icon: PlugZap,
    tone: "bg-leaf-300 text-ink",
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
      <ul className="grid gap-6 md:grid-cols-3">
        {services.map(({ title, text, meta, href, cta, photo, Icon, tone }) => (
          <li
            key={href}
            className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(19,41,29,0.4)]"
          >
            <div className="relative">
              <Photo name={photo} ratio="aspect-[16/10]" className="rounded-none" sizes="(min-width: 768px) 33vw, 100vw" />
              <span className={`absolute bottom-0 left-6 flex size-12 translate-y-1/2 items-center justify-center rounded-2xl shadow-lg ${tone}`}>
                <Icon className="size-6" aria-hidden="true" />
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6 pt-10 md:p-7 md:pt-11">
              <h3 className="text-[1.45rem] leading-tight text-ink">{title}</h3>
              <p className="mt-3 text-slate">{text}</p>
              <ul className="mt-6 space-y-2 text-[0.92rem] text-ink-700">
                {meta.map((m) => (
                  <li key={m} className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-leaf-400" />
                    {m}
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                className="mt-auto inline-flex items-center gap-2 self-start pt-7 font-semibold text-leaf after:absolute after:inset-0 after:content-['']"
              >
                {cta}
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-leaf-50 transition-all duration-500 group-hover:bg-leaf group-hover:text-white">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
