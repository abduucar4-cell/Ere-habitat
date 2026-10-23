import { ArrowRight, BatteryCharging, Check, ClipboardCheck, MapPin, Sun, UserRound, Wrench } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/lib/site";

const specs = [
  { k: "Zone", v: "Caen et tout le Calvados", Icon: MapPin },
  { k: "Étude", v: "Gratuite, à partir de vos usages", Icon: ClipboardCheck },
  { k: "Pose", v: "Installateurs qualifiés partenaires", Icon: Wrench },
  { k: "Interlocuteur", v: "Unique, basé à Ifs", Icon: UserRound },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-mist">
      {/* Soleil décoratif */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-32 size-[520px] rounded-full bg-sun/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-40 size-[480px] rounded-full bg-leaf-400/15 blur-3xl" />

      <div className="container-x relative grid items-center gap-12 pt-10 pb-14 md:pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-20">
        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-leaf shadow-[0_4px_16px_-8px_rgba(27,122,61,0.35)]">
            <MapPin className="size-4" aria-hidden="true" />
            Caen · Calvados · Normandie
          </p>
          <h1 id="hero-title" className="mt-6 text-display text-ink">
            Panneaux solaires et batteries de stockage à{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">Caen</span>
              <span aria-hidden="true" className="absolute inset-x-[-4px] bottom-[0.08em] z-0 h-[0.38em] rounded-sm bg-sun" />
            </span>{" "}
            et dans le <span className="text-leaf">Calvados</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate md:text-xl">
            Produisez votre électricité, optimisez votre autoconsommation et découvrez les solutions photovoltaïques adaptées à votre
            habitation. Étude personnalisée et accompagnement local.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/devis-panneaux-solaires/" size="lg" data-cta="hero-devis">
              Obtenir mon devis gratuit
              <ArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="#simulateur" variant="sun" size="lg" data-cta="hero-simulateur">
              <Sun className="size-4" aria-hidden="true" />
              Étudier mon projet solaire
            </LinkButton>
          </div>
          <ul className="mt-8 flex flex-col gap-2.5 text-[0.95rem] text-ink-700 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {site.reassurance.map((r) => (
              <li key={r} className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-leaf text-white">
                  <Check className="size-3" aria-hidden="true" strokeWidth={3} />
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6">
          <Photo name="heroHouses" priority ratio="aspect-[5/4]" sizes="(min-width: 1024px) 48vw, 100vw" className="shadow-[0_40px_80px_-40px_rgba(19,41,29,0.55)]" />
          {/* Cartes flottantes */}
          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_40px_-20px_rgba(19,41,29,0.45)] sm:left-[-24px]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-leaf-50 text-leaf">
              <BatteryCharging className="size-5" aria-hidden="true" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-semibold text-ink">Batterie de stockage</span>
              <span className="text-slate">L&apos;énergie du jour, le soir</span>
            </span>
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-sun px-4 py-2 text-sm font-semibold text-ink shadow-[0_12px_28px_-14px_rgba(200,150,0,0.8)]">
            <Sun className="size-4" aria-hidden="true" /> Étude gratuite
          </div>
        </div>
      </div>

      <div className="container-x relative pb-12">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {specs.map(({ k, v, Icon }) => (
            <div key={k} className="relative rounded-2xl bg-white p-4 pl-[4.25rem] md:p-5 md:pl-[4.5rem]">
              <dt className="text-xs font-medium tracking-wide text-slate uppercase">
                <span className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-xl bg-leaf-50 text-leaf md:top-5 md:left-5">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                {k}
              </dt>
              <dd className="mt-1 font-display text-[1rem] leading-snug font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
