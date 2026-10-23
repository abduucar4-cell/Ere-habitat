import type { ReactNode } from "react";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  const crumbs = [{ name: title, path }];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <div className="container-x py-10 md:py-16">
        <Breadcrumbs items={crumbs} />
        <div className="mx-auto mt-10 max-w-3xl">
          <h1 className="text-[clamp(2rem,1.6rem+1.6vw,3rem)] leading-tight text-ink">{title}</h1>
          <p className="mt-3 text-sm text-slate">Dernière mise à jour : {updated}</p>
          <div className="prose-ere mt-10">{children}</div>
        </div>
      </div>
    </>
  );
}
