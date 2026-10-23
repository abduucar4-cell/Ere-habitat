import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/page/LegalPage";
import { ConsentReopenButton } from "@/components/consent/ConsentReopenButton";

export const metadata: Metadata = buildMetadata({
  title: "Politique cookies | ERE Habitat",
  description: "Cookies et traceurs utilisés sur le site ERE Habitat et gestion de vos préférences.",
  path: "/cookies/",
});

export default function CookiesPage() {
  return (
    <LegalPage title="Politique cookies" path="/cookies/" updated="22 octobre 2026">
      <h2>Ce que nous utilisons</h2>
      <p>Aucun cookie publicitaire n&apos;est déposé sur ce site.</p>
      <ul>
        <li>
          <strong>Mémorisation de votre choix</strong> (stockage local « ere-consent-v1 ») : nécessaire pour respecter votre décision.
          Exempté de consentement.
        </li>
        <li>
          <strong>Mesure d&apos;audience</strong> (Google Tag Manager / Google Analytics, si activés) : déposés uniquement si vous
          cliquez sur « Accepter ». Ils nous permettent de connaître la fréquentation des pages, les clics sur le téléphone et
          l&apos;envoi des formulaires.
        </li>
      </ul>
      <h2>Modifier votre choix</h2>
      <p>Vous pouvez revenir sur votre choix à tout moment, aussi facilement que vous l&apos;avez exprimé.</p>
      <ConsentReopenButton />
    </LegalPage>
  );
}
