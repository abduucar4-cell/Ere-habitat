import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getArticle, publishedArticles } from "@/content/blog";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CtaBand } from "@/components/page/CtaBand";
import { RelatedLinks } from "@/components/page/RelatedLinks";

export const dynamicParams = false;
export function generateStaticParams() {
  return publishedArticles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return buildMetadata({
    title: a.title.length > 56 ? a.title : `${a.title} | ERE Habitat`,
    description: a.description,
    path: `/blog/${a.slug}/`,
    type: "article",
    publishedTime: a.publishedAt,
  });
}

const dateFr = (d: string) => new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(d));

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a || !a.sections) notFound();
  const path = `/blog/${a.slug}/`;
  const crumbs = [
    { name: "Blog", path: "/blog/" },
    { name: a.title, path },
  ];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          articleJsonLd({ title: a.title, description: a.description, path, publishedAt: a.publishedAt!, updatedAt: a.updatedAt }),
        ]}
      />
      <article>
        <header className="border-b border-line bg-paper">
          <div className="container-x py-10 md:py-16">
            <Breadcrumbs items={crumbs} />
            <div className="mx-auto mt-12 max-w-3xl">
              <p className="eyebrow">
                {a.category} · {a.readingMinutes} min de lecture
              </p>
              <h1 className="mt-5 text-[clamp(2rem,1.5rem+2vw,3.2rem)] leading-[1.08] tracking-[-0.03em] text-ink">{a.title}</h1>
              {a.publishedAt ? (
                <p className="mt-6 text-sm text-slate">
                  Publié le <time dateTime={a.publishedAt}>{dateFr(a.publishedAt)}</time>
                  {a.updatedAt ? (
                    <>
                      {" "}· Mis à jour le <time dateTime={a.updatedAt}>{dateFr(a.updatedAt)}</time>
                    </>
                  ) : null}
                </p>
              ) : null}
            </div>
          </div>
        </header>
        <div className="container-x py-14 md:py-20">
          <div className="prose-ere mx-auto max-w-3xl text-[1.08rem]">
            {a.intro ? <p className="text-xl leading-relaxed text-ink">{a.intro}</p> : null}
            {a.sections.map((s) => (
              <section key={s.h2}>
                <h2>{s.h2}</h2>
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.list ? (
                  <ul>
                    {s.list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
          <div className="mx-auto max-w-3xl">
            <CtaBand variant={a.category === "Batteries" ? "batterie" : "devis"} />
          </div>
        </div>
      </article>
      <RelatedLinks slugs={a.related} title="Pour aller plus loin" />
    </>
  );
}
