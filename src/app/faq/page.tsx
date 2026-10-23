import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { faqGroups } from "@/content/faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/page/PageHero";
import { FaqAccordion } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/page/CtaBand";
import { slugify } from "@/components/page/Blocks";

export const metadata: Metadata = buildMetadata({
  title: "FAQ panneaux solaires et batteries en Normandie | ERE Habitat",
  description:
    "Production en Normandie, batteries de stockage, démarches, aides, déroulement d'un projet : les réponses aux questions fréquentes sur le photovoltaïque.",
  path: "/faq/",
});

const crumbs = [{ name: "FAQ", path: "/faq/" }];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(faqGroups.flatMap((g) => g.items))]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Questions fréquentes"
        title="Panneaux solaires et batteries : vos questions, nos réponses."
        lead="Des réponses factuelles, sans promesse chiffrée. Pour votre situation précise, l'étude reste la meilleure réponse."
      />
      <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <nav aria-label="Thèmes" className="hidden lg:col-span-3 lg:block">
          <ul className="sticky top-28 space-y-2.5 border-l border-line">
            {faqGroups.map((g) => (
              <li key={g.title}>
                <a href={`#${slugify(g.title)}`} className="-ml-px block border-l border-transparent pl-4 text-[0.95rem] text-slate hover:border-ink hover:text-ink">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-16 lg:col-span-9">
          {faqGroups.map((g) => (
            <section key={g.title} aria-labelledby={slugify(g.title)}>
              <h2 id={slugify(g.title)} className="scroll-mt-28 mb-4 text-[1.8rem] text-ink">
                {g.title}
              </h2>
              <FaqAccordion items={g.items} />
            </section>
          ))}
          <CtaBand variant="devis" />
        </div>
      </div>
    </>
  );
}
