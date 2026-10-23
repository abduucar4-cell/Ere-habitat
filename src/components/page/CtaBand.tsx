import { ArrowRight, Phone } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { PhoneLink } from "@/components/layout/PhoneLink";
import { site } from "@/lib/site";

const VARIANTS = {
  devis: {
    title: "Recevez une étude et un devis détaillés, gratuitement.",
    text: "Nous analysons votre toiture et votre consommation avant de vous proposer une installation.",
    href: "/devis-panneaux-solaires/",
    label: "Obtenir mon devis gratuit",
  },
  batterie: {
    title: "Une batterie est-elle utile chez vous ? Vérifions-le.",
    text: "Étude de compatibilité gratuite à partir de votre onduleur, de votre production et de votre consommation.",
    href: "/devis-batterie-solaire/",
    label: "Demander une étude batterie",
  },
  simulateur: {
    title: "Obtenez un premier ordre de grandeur en deux minutes.",
    text: "Puissance, production et capacité de batterie indicatives, avec des hypothèses affichées.",
    href: "/#simulateur",
    label: "Lancer le simulateur",
  },
} as const;

export function CtaBand({ variant = "devis" }: { variant?: keyof typeof VARIANTS }) {
  const v = VARIANTS[variant];
  return (
    <aside className="my-14 overflow-hidden rounded-[20px] bg-ink p-8 text-white md:p-12" aria-label="Demande d'étude">
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="font-display text-[1.6rem] leading-tight font-semibold tracking-[-0.02em] text-white md:text-[2rem]">{v.title}</p>
          <p className="mt-3 text-white/75">{v.text}</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <LinkButton href={v.href} variant="inverse" size="lg" data-cta={`band-${variant}`}>
            {v.label} <ArrowRight className="size-4" aria-hidden="true" />
          </LinkButton>
          <PhoneLink location={`band-${variant}`} className="inline-flex items-center gap-2 px-2 text-[0.95rem] text-white/80 hover:text-white">
            <Phone className="size-4" aria-hidden="true" /> {site.contact.phoneDisplay}
          </PhoneLink>
        </div>
      </div>
    </aside>
  );
}
