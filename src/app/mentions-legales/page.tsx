import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/page/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales | ERE Habitat",
  description: "Mentions légales du site ERE Habitat : éditeur, hébergeur, propriété intellectuelle.",
  path: "/mentions-legales/",
});

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales" path="/mentions-legales/" updated="22 octobre 2026">
      <h2>Éditeur du site</h2>
      <p>
        <strong>{site.legalName}</strong> — {site.legal.form}
        <br />
        Adresse : {site.address.street}, {site.address.postalCode} {site.address.city}
        <br />
        SIRET : {site.legal.siret}
        <br />
        Immatriculation : {site.legal.rcs}
        <br />
        TVA : {site.legal.vat}
        <br />
        Téléphone : {site.contact.phoneDisplay} — E-mail : {site.contact.email}
        <br />
        Responsable de la publication : {site.legal.owner}
      </p>
      <h2>Activité</h2>
      <p>{site.role}</p>
      <p>Assurance professionnelle : {site.legal.insurance}</p>
      <h2>Hébergement</h2>
      <p>{site.legal.host}</p>
      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus de ce site (textes, illustrations, logo, mise en page) est la propriété de {site.name}, sauf mention
        contraire. Toute reproduction sans autorisation préalable est interdite.
      </p>
      <h2>Crédits photos</h2>
      <p>
        Photos d&apos;illustration issues de la banque d&apos;images Unsplash (licence Unsplash). Elles illustrent nos solutions et ne
        représentent pas des réalisations d&apos;ERE Habitat.
      </p>
      <h2>Informations et estimations</h2>
      <p>
        Les informations publiées sur ce site sont données à titre général. Les estimations du simulateur sont des ordres de grandeur
        calculés à partir d&apos;hypothèses affichées ; elles ne constituent ni un devis, ni un engagement de production, d&apos;économie
        ou de rentabilité.
      </p>
      <h2>Médiation de la consommation</h2>
      <p>
        Conformément aux articles L.612-1 et suivants du Code de la consommation, le consommateur peut recourir gratuitement à un
        médiateur de la consommation : [À COMPLÉTER : nom et coordonnées du médiateur auquel l&apos;entreprise a adhéré].
      </p>
    </LegalPage>
  );
}
