import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeoPage, seoPages } from "@/content/pages";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/page/PageHero";
import { RenderBlock, blockHeading, slugify } from "@/components/page/Blocks";
import { RelatedLinks } from "@/components/page/RelatedLinks";
import { CtaBand } from "@/components/page/CtaBand";
import { FaqAccordion } from "@/components/ui/Accordion";
import type { PhotoKey } from "@/content/photos";

export const dynamicParams = false;

export function generateStaticParams() {
  return seoPages.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getSeoPage((await params).slug);
  if (!page) return {};
  return buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/${page.slug}/` });
}

/** Photo d'en-tête selon le sujet de la page. */
function photoFor(slug: string): PhotoKey {
  if (slug === "panneaux-solaires-lisieux" || slug === "panneaux-solaires-bayeux") return "normanHouse";
  if (slug === "panneaux-solaires-falaise" || slug === "batterie-stockage-calvados") return "bocage";
  if (slug.includes("installation-batterie") || slug === "autoconsommation-solaire") return "evGarage";
  if (slug.includes("batterie")) return "batteryWall";
  if (slug.startsWith("installation")) return "installers";
  if (slug.startsWith("prix") || slug.startsWith("devis")) return "tileRoof";
  if (slug === "panneaux-solaires-caen" || slug === "panneaux-solaires-deauville") return "gardenHouse";
  if (slug === "panneaux-solaires-calvados") return "heroHouses";
  return "slateRoof";
}

const PROJECT_BY_SLUG: Record<string, string> = {
  "devis-batterie-solaire": "batterie",
  "batterie-solaire-installation-existante": "batterie-existante",
  "batterie-solaire-caen": "batterie-existante",
};

export default async function SeoPageRoute({ params }: Props) {
  const page = getSeoPage((await params).slug);
  if (!page) notFound();

  const path = `/${page.slug}/`;
  const crumbs = [{ name: page.breadcrumb, path }];
  const toc = page.blocks.map(blockHeading).filter((h): h is string => Boolean(h));
  const hasCtaBlock = page.blocks.some((b) => b.type === "cta" || b.type === "leadForm");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          page.service
            ? serviceJsonLd({
                name: page.service.name,
                serviceType: page.service.serviceType,
                description: page.metaDescription,
                path,
                areaName: page.city?.name,
              })
            : null,
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={page.eyebrow}
        title={page.h1}
        lead={page.lead}
        points={page.heroPoints}
        cta={page.primaryCta}
        photo={photoFor(page.slug)}
      />

      <div className="container-x grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        {toc.length > 2 ? (
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="Sommaire" className="sticky top-28">
              <p className="eyebrow">Sommaire</p>
              <ol className="mt-4 space-y-2.5 border-l border-line">
                {toc.map((h) => (
                  <li key={h}>
                    <a href={`#${slugify(h)}`} className="-ml-px block border-l border-transparent pl-4 text-[0.92rem] leading-snug text-slate transition-colors hover:border-ink hover:text-ink">
                      {h}
                    </a>
                  </li>
                ))}
                {page.faq.length ? (
                  <li>
                    <a href="#questions-frequentes" className="-ml-px block border-l border-transparent pl-4 text-[0.92rem] text-slate hover:border-ink hover:text-ink">
                      Questions fréquentes
                    </a>
                  </li>
                ) : null}
              </ol>
            </nav>
          </aside>
        ) : null}

        <article className={toc.length > 2 ? "lg:col-span-9" : "lg:col-span-10 lg:col-start-2"}>
          <div className="divide-y divide-line [&>*:first-child]:pt-0">
            {page.blocks.map((b, i) => (
              <RenderBlock key={i} block={b} defaultProject={PROJECT_BY_SLUG[page.slug]} />
            ))}
          </div>

          {page.faq.length ? (
            <section aria-labelledby="questions-frequentes" className="mt-6 border-t border-line pt-12">
              <h2 id="questions-frequentes" className="scroll-mt-28 text-[clamp(1.6rem,1.3rem+1vw,2.15rem)] leading-tight tracking-[-0.025em] text-ink">
                Questions fréquentes
              </h2>
              <div className="mt-6">
                <FaqAccordion items={page.faq} />
              </div>
            </section>
          ) : null}

          {!hasCtaBlock ? <CtaBand variant={page.slug.includes("batterie") ? "batterie" : "devis"} /> : null}
        </article>
      </div>

      <RelatedLinks slugs={page.related} />
    </>
  );
}
