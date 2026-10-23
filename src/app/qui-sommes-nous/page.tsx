import type { Metadata } from "next";
import { ClipboardCheck, Handshake, MapPin, MessageCircle, ShieldCheck, Sun } from "lucide-react";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { Photo } from "@/components/ui/Photo";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "Qui sommes-nous ? ERE Habitat, solaire à Caen | ERE Habitat",
  description:
    "ERE Habitat (Étude, Rénovation, Énergie), basé à Ifs près de Caen, conçoit et accompagne vos projets de panneaux solaires et de batteries de stockage dans le Calvados.",
  path: "/qui-sommes-nous/",
});

const crumbs = [{ name: "Qui sommes-nous", path: "/qui-sommes-nous/" }];

const letters = [
  {
    l: "É",
    t: "Étude",
    d: "Tout projet commence par des mesures : toiture, ombrages, consommation. Nous proposons seulement ce que l'étude justifie.",
    tone: "bg-leaf text-white",
  },
  {
    l: "R",
    t: "Rénovation",
    d: "Le solaire s'inscrit dans la performance globale de votre logement. Nous le pensons avec votre maison, pas à côté.",
    tone: "bg-sun text-ink",
  },
  {
    l: "E",
    t: "Énergie",
    d: "L'objectif : consommer davantage l'électricité que vous produisez, grâce au bon dimensionnement et au stockage.",
    tone: "bg-leaf-300 text-ink",
  },
];

const principles = [
  { Icon: ClipboardCheck, t: "Étudier avant de proposer", d: "Aucune proposition sans analyse de votre toiture et de votre consommation." },
  { Icon: MessageCircle, t: "Dire ce qui est utile", d: "Si une batterie ou des panneaux supplémentaires n'apportent pas assez, nous vous le disons." },
  { Icon: ShieldCheck, t: "Écrire ce qui est promis", d: "Matériel, intervenants, démarches et hypothèses figurent noir sur blanc sur le devis." },
  { Icon: Handshake, t: "Rester joignable", d: "Un interlocuteur unique, avant, pendant et après votre projet." },
];

export default function WhoWeArePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Qui sommes-nous"
        title="Une entreprise locale qui étudie avant de vendre."
        lead="ERE Habitat accompagne les particuliers et les professionnels du Calvados dans leurs projets de panneaux solaires et de batteries de stockage, depuis Ifs, aux portes de Caen."
        points={["Basés à Ifs (14)", "Étude gratuite", "Interlocuteur unique"]}
        cta={{ label: "Demander une étude gratuite", href: "/devis-panneaux-solaires/" }}
        photo="installers"
      />

      {/* ERE = Étude · Rénovation · Énergie */}
      <Section labelledBy="ere-title">
        <SectionHeading
          id="ere-title"
          label="Notre nom, notre méthode"
          title="ERE : Étude, Rénovation, Énergie."
          intro="Trois mots qui résument notre façon de travailler, du premier appel à la mise en service."
          align="split"
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {letters.map((x) => (
            <li key={x.t} className="rounded-[var(--radius-card)] border border-line bg-white p-7">
              <span className={`flex size-14 items-center justify-center rounded-2xl font-display text-2xl font-bold ${x.tone}`}>{x.l}</span>
              <h3 className="mt-6 text-[1.35rem] text-ink">{x.t}</h3>
              <p className="mt-2.5 text-slate">{x.d}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Notre rôle */}
      <Section tone="mist" labelledBy="role-title">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Photo name="normanHouse" ratio="aspect-[4/3]" sizes="(min-width: 1024px) 45vw, 100vw" />
          <div>
            <SectionHeading id="role-title" label="Notre rôle" title="Votre interlocuteur, du projet à la mise en service." className="mb-6 md:mb-8" />
            <div className="prose-ere">
              <p>{site.role}</p>
              <p>
                Nous intervenons là où un regard indépendant est utile : comprendre vos besoins, analyser votre logement, concevoir la
                solution, la chiffrer clairement, puis coordonner les démarches et la pose.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              <li className="flex items-center gap-3 rounded-2xl bg-white p-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-sun text-ink">
                  <Sun className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-ink">Panneaux et batteries</span>
              </li>
              <li className="flex items-center gap-3 rounded-2xl bg-white p-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-leaf text-white">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-ink">Tout le Calvados</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Principes */}
      <Section labelledBy="principles-title">
        <SectionHeading id="principles-title" label="Nos engagements" title="Ce sur quoi vous pouvez compter." align="split" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ Icon, t, d }, i) => (
            <li key={t} className="rounded-[var(--radius-card)] bg-mist p-6">
              <span className={`flex size-11 items-center justify-center rounded-2xl ${i % 2 ? "bg-sun text-ink" : "bg-leaf text-white"}`}>
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[1.15rem] text-ink">{t}</h3>
              <p className="mt-2 text-[0.98rem] text-slate">{d}</p>
            </li>
          ))}
        </ul>

        {site.partners.length ? (
          <div className="mt-12 rounded-[var(--radius-card)] border border-line p-6">
            <h3 className="text-lg text-ink">Installateurs partenaires</h3>
            <ul className="mt-3 space-y-2 text-ink-700">
              {site.partners.map((p) => (
                <li key={p.name}>
                  {p.name}
                  {p.qualification ? ` — ${p.qualification}` : ""}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {/* [À COMPLÉTER] Présentation du fondateur : parcours, photo, motivations — uniquement des éléments réels. */}

        <CtaBand variant="devis" />
      </Section>
    </>
  );
}
