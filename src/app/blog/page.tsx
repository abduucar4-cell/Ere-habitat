import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { publishedArticles } from "@/content/blog";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/page/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Conseils photovoltaïque et batteries solaires | Blog ERE Habitat",
  description:
    "Guides pratiques sur les panneaux solaires, les batteries de stockage et l'autoconsommation en Normandie, rédigés par ERE Habitat.",
  path: "/blog/",
});

const crumbs = [{ name: "Blog", path: "/blog/" }];
const dateFr = (d: string) => new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(d));

export default function BlogIndex() {
  const [first, ...rest] = publishedArticles;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Conseils"
        title="Comprendre avant de décider."
        lead="Des guides factuels sur le photovoltaïque, le stockage et l'autoconsommation en Normandie."
      />
      <div className="container-x py-16 md:py-24">
        {first ? (
          <article className="group relative grid gap-6 border-b border-line pb-14 lg:grid-cols-12">
            <p className="eyebrow lg:col-span-3">
              {first.category} · {first.readingMinutes} min
            </p>
            <div className="lg:col-span-8">
              <h2 className="text-[clamp(1.8rem,1.4rem+1.6vw,2.8rem)] leading-tight text-ink">
                <Link href={`/blog/${first.slug}/`} className="after:absolute after:inset-0 after:content-['']">
                  {first.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-slate">{first.description}</p>
            </div>
            <ArrowUpRight className="hidden size-6 text-slate transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink lg:col-span-1 lg:block lg:justify-self-end" aria-hidden="true" />
          </article>
        ) : null}
        <ul className="grid gap-x-10 md:grid-cols-3">
          {rest.map((a) => (
            <li key={a.slug} className="group relative border-b border-line py-10">
              <p className="eyebrow">
                {a.category} · {a.readingMinutes} min
              </p>
              <h2 className="mt-4 text-[1.35rem] leading-snug text-ink">
                <Link href={`/blog/${a.slug}/`} className="after:absolute after:inset-0 after:content-['']">
                  {a.title}
                </Link>
              </h2>
              <p className="mt-3 text-slate">{a.description}</p>
              {a.publishedAt ? <p className="mt-5 text-sm text-slate">{dateFr(a.publishedAt)}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
