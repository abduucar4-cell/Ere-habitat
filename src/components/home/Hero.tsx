import { ArrowRight, Check, MapPin } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { HouseIllustration, houseCallouts } from "./HouseIllustration";

const specs = [
  { k: "Zone", v: "Caen et tout le Calvados" },
  { k: "Étude", v: "Gratuite, à partir de vos usages" },
  { k: "Pose", v: "Installateurs qualifiés partenaires" },
  { k: "Interlocuteur", v: "Unique, basé à Ifs" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      {/* Trame technique discrète */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,#eef0f2_1px,transparent_1px),linear-gradient(to_bottom,#eef0f2_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)]"
      />
      <div className="container-x relative grid items-center gap-12 pt-10 pb-12 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-16">
        <div className="lg:col-span-6">
          <p className="eyebrow flex items-center gap-2">
            <MapPin className="size-3.5 text-leaf" aria-hidden="true" />
            Caen · Calvados · Normandie
          </p>
          <h1 id="hero-title" className="mt-6 text-display text-ink">
            Panneaux solaires et batteries de stockage à Caen et dans le Calvados
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate md:text-xl">
            Produisez votre électricité, optimisez votre autoconsommation et découvrez les solutions photovoltaïques adaptées à votre
            habitation. Étude personnalisée et accompagnement local.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/devis-panneaux-solaires/" size="lg" data-cta="hero-devis">
              Obtenir mon devis gratuit
              <ArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="#simulateur" variant="secondary" size="lg" data-cta="hero-simulateur">
              Étudier mon projet solaire
            </LinkButton>
          </div>
          <ul className="mt-9 flex flex-col gap-2.5 text-[0.95rem] text-ink-700 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {site.reassurance.map((r) => (
              <li key={r} className="flex items-center gap-2">
                <Check className="size-4 text-leaf" aria-hidden="true" strokeWidth={2.4} />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6">
          <HouseIllustration className="mx-auto max-w-[640px] lg:-mr-6" />
          <ol className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[0.7rem] tracking-[0.05em] text-slate uppercase md:hidden">
            {houseCallouts.map((c) => (
              <li key={c.n}>
                <span className="text-ink">{c.n}</span> {c.label}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="container-x relative">
        <dl className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {specs.map((s, i) => (
            <div
              key={s.k}
              className={`py-6 pr-4 ${i % 2 === 1 ? "pl-4 border-l border-line lg:pl-6" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
            >
              <dt className="eyebrow">{s.k}</dt>
              <dd className="mt-2 font-display text-[1.05rem] font-medium text-ink">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
