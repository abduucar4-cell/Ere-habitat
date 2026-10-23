import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { realisations } from "@/content/proof";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";

// Tant qu'aucune réalisation réelle n'est publiée, la page n'est pas indexée.
export const metadata: Metadata = buildMetadata({
  title: "Nos réalisations solaires dans le Calvados | ERE Habitat",
  description: "Installations photovoltaïques et batteries de stockage réalisées par ERE Habitat et ses installateurs partenaires dans le Calvados.",
  path: "/nos-realisations/",
  noindex: realisations.length === 0,
});

const crumbs = [{ name: "Nos réalisations", path: "/nos-realisations/" }];

export default function RealisationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Réalisations"
        title="Nos réalisations dans le Calvados."
        lead="Chaque projet présenté ici est une installation réelle, publiée avec l'accord de son propriétaire."
      />
      <div className="container-x py-16 md:py-24">
        {realisations.length ? (
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {realisations.map((r) => (
              <li key={r.slug}>
                <Image src={r.image.src} alt={r.image.alt} width={r.image.width} height={r.image.height} sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover" />
                <p className="eyebrow mt-4">
                  {r.city} · {r.date}
                </p>
                <h2 className="mt-2 text-xl text-ink">{r.title}</h2>
                <p className="mt-1 font-mono text-sm text-ink-700">{r.system}</p>
                <p className="mt-3 text-slate">{r.summary}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto max-w-2xl rounded-[20px] border border-dashed border-line-strong p-10 text-center">
            <h2 className="text-2xl text-ink">Nos premières réalisations arrivent.</h2>
            <p className="mt-4 text-slate">
              Nous publions uniquement des installations réelles, photographiées avec l&apos;accord de leurs propriétaires. En attendant,
              nous pouvons vous présenter des projets comparables au vôtre lors de l&apos;étude.
            </p>
          </div>
        )}
        <CtaBand variant="devis" />
      </div>
    </>
  );
}
