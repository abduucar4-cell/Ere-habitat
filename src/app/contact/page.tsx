import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FinalContact } from "@/components/home/FinalContact";

export const metadata: Metadata = buildMetadata({
  title: "Contact — ERE Habitat, panneaux solaires à Caen | ERE Habitat",
  description: "Contactez ERE Habitat à Ifs pour votre projet de panneaux solaires ou de batterie de stockage dans le Calvados. Rappel gratuit.",
  path: "/contact/",
});

const crumbs = [{ name: "Contact", path: "/contact/" }];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <div className="container-x pt-10">
        <Breadcrumbs items={crumbs} />
        <h1 className="sr-only">Contacter ERE Habitat</h1>
      </div>
      <FinalContact index="—" />
    </>
  );
}
