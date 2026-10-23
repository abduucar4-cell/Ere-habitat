import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "À propos d'ERE Habitat — solaire et stockage à Caen | ERE Habitat",
  description:
    "ERE Habitat (Étude, Rénovation, Énergie) conçoit et accompagne des projets photovoltaïques et de stockage d'énergie dans le Calvados, depuis Ifs.",
  path: "/a-propos/",
});

const crumbs = [{ name: "À propos", path: "/a-propos/" }];

const principles = [
  { t: "Étudier avant de proposer", d: "Aucune proposition sans analyse de la toiture et de la consommation." },
  { t: "Dire ce qui est utile", d: "Si une batterie ou une puissance supplémentaire n'apporte pas assez, nous le disons." },
  { t: "Écrire ce qui est promis", d: "Matériel, intervenants, démarches et hypothèses figurent sur le devis." },
  { t: "Rester joignable", d: "Un interlocuteur local, avant, pendant et après le projet." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="À propos"
        title="Un bureau d'étude local pour vos projets solaires."
        lead="ERE Habitat — pour Étude, Rénovation, Énergie — accompagne les particuliers et les professionnels du Calvados dans leurs projets photovoltaïques et de stockage d'énergie."
        photo="bocage"
      />
      <div className="container-x grid gap-16 py-16 md:py-24 lg:grid-cols-12">
        <div className="prose-ere lg:col-span-7">
          <h2>Notre rôle</h2>
          <p>{site.role}</p>
          <p>
            Nous intervenons à chaque étape où un regard indépendant est utile : comprendre vos besoins, analyser votre logement, concevoir
            la solution, la chiffrer clairement, puis coordonner les démarches et la pose jusqu&apos;à la mise en service.
          </p>
          <h2>Pourquoi « ERE »</h2>
          <p>
            <strong>Étude</strong>, parce que tout projet commence par des mesures. <strong>Rénovation</strong>, parce que le solaire
            s&apos;inscrit dans la performance globale d&apos;un logement. <strong>Énergie</strong>, parce que l&apos;objectif est de
            consommer mieux ce que vous produisez.
          </p>
          <h2>Basés à {site.address.city}</h2>
          <p>
            Implantés à {site.address.city}, aux portes de Caen, nous intervenons en priorité dans le Calvados et étudions les demandes des
            départements voisins.
          </p>
          {/* [À COMPLÉTER] Présentation du fondateur : parcours, photo, motivations — uniquement des éléments réels. */}
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <p className="eyebrow">Nos principes</p>
          <ol className="mt-6 border-t border-line">
            {principles.map((p, i) => (
              <li key={p.t} className="border-b border-line py-6">
                <span className="font-mono text-xs text-slate">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-lg text-ink">{p.t}</h3>
                <p className="mt-1.5 text-slate">{p.d}</p>
              </li>
            ))}
          </ol>
          {site.partners.length ? (
            <div className="mt-10">
              <p className="eyebrow">Installateurs partenaires</p>
              <ul className="mt-4 space-y-3 text-ink-700">
                {site.partners.map((p) => (
                  <li key={p.name}>
                    {p.name}
                    {p.qualification ? ` — ${p.qualification}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
      <div className="container-x pb-10">
        <CtaBand variant="devis" />
      </div>
    </>
  );
}
