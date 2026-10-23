import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/page/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité | ERE Habitat",
  description: "Comment ERE Habitat collecte, utilise et protège vos données personnelles, et comment exercer vos droits.",
  path: "/politique-confidentialite/",
});

export default function Privacy() {
  return (
    <LegalPage title="Politique de confidentialité" path="/politique-confidentialite/" updated="22 octobre 2026">
      <h2>Responsable du traitement</h2>
      <p>
        {site.legalName}, {site.address.street}, {site.address.postalCode} {site.address.city}. Contact : {site.contact.email}.
      </p>
      <h2>Données collectées</h2>
      <p>Via nos formulaires et notre simulateur, nous collectons uniquement les informations que vous saisissez :</p>
      <ul>
        <li>identité (nom, prénom), téléphone, e-mail, commune et code postal ;</li>
        <li>informations sur votre logement, votre consommation et votre projet ;</li>
        <li>vos réponses au simulateur, si vous demandez une étude à partir de celui-ci.</li>
      </ul>
      <h2>Finalités et bases légales</h2>
      <ul>
        <li>
          <strong>Répondre à votre demande</strong> et préparer une étude ou un devis : mesures précontractuelles prises à votre demande
          (art. 6.1.b du RGPD).
        </li>
        <li>
          <strong>Vous adresser des informations</strong> sur nos offres : uniquement si vous avez coché la case prévue à cet effet
          (consentement, art. 6.1.a). Vous pouvez retirer ce consentement à tout moment.
        </li>
        <li>
          <strong>Mesurer l&apos;audience</strong> du site : uniquement avec votre consentement (voir la{" "}
          <Link href="/cookies/">politique cookies</Link>).
        </li>
        <li>
          <strong>Sécuriser</strong> le site et lutter contre les envois abusifs : intérêt légitime (art. 6.1.f). L&apos;adresse IP est
          utilisée de façon temporaire, en mémoire, pour limiter le nombre de demandes.
        </li>
      </ul>
      <h2>Destinataires</h2>
      <p>
        Vos données sont destinées à {site.name}. Elles peuvent être transmises à l&apos;installateur partenaire chargé de la pose,
        uniquement si vous donnez suite à la proposition. Elles ne sont jamais vendues ni louées. Nos sous-traitants techniques
        (hébergement du site, envoi des notifications par e-mail, outil de gestion des demandes) n&apos;y accèdent que pour assurer leur
        prestation : [À COMPLÉTER : liste des sous-traitants utilisés et encadrement des transferts hors UE].
      </p>
      <h2>Durée de conservation</h2>
      <ul>
        <li>Demandes sans suite : 3 ans à compter du dernier contact de votre part.</li>
        <li>Clients : durée de la relation contractuelle, puis durées légales de conservation des documents commerciaux et comptables.</li>
        <li>Choix relatifs aux cookies : 6 mois, après quoi votre accord est à nouveau demandé.</li>
      </ul>
      <p>Le site lui-même ne stocke pas les demandes : elles sont transmises directement à {site.name}.</p>
      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de
        portabilité, ainsi que du droit de définir des directives relatives au sort de vos données après votre décès. Pour les exercer :{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. Vous pouvez introduire une réclamation auprès de la CNIL
        (cnil.fr).
      </p>
      <p>
        Vous pouvez également vous inscrire gratuitement sur la liste d&apos;opposition au démarchage téléphonique Bloctel.
      </p>
    </LegalPage>
  );
}
