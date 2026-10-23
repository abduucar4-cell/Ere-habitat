import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, FileText, Mail, MapPin, Phone } from "lucide-react";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/page/PageHero";
import { PhoneLink } from "@/components/layout/PhoneLink";
import { LazyQuickLeadForm } from "@/components/lazy";
import { FaqAccordion } from "@/components/ui/Accordion";
import { Photo } from "@/components/ui/Photo";

export const metadata: Metadata = buildMetadata({
  title: "Nous contacter — panneaux solaires à Caen | ERE Habitat",
  description:
    "Contactez ERE Habitat à Ifs, près de Caen : appelez le 07 56 84 93 04 ou demandez à être rappelé pour votre projet de panneaux solaires ou de batterie dans le Calvados.",
  path: "/contact/",
});

const crumbs = [{ name: "Nous contacter", path: "/contact/" }];

const faq = [
  {
    q: "Sous quel délai êtes-vous recontacté ?",
    a: "Nous revenons vers vous rapidement pour un premier échange sur votre projet, aux horaires indiqués sur cette page.",
  },
  {
    q: "Que préparer avant notre échange ?",
    a: "Vos dernières factures d'électricité ou l'accès à votre espace Linky, quelques photos de votre toiture et, si vous êtes déjà équipé, la référence de votre onduleur.",
  },
  {
    q: "L'étude est-elle payante ?",
    a: "Non. L'étude de votre projet et le devis sont gratuits et sans engagement.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Nous contacter"
        title="Parlons de votre projet solaire."
        lead="Une question sur les panneaux, une batterie ou un devis ? Appelez-nous ou laissez vos coordonnées : un interlocuteur basé à Ifs vous répond."
        photo="gardenHouse"
      />

      {/* Moyens de contact */}
      <section aria-label="Nos coordonnées" className="container-x -mt-2 py-12 md:py-16">
        <ul className="grid gap-5 md:grid-cols-3">
          <li className="relative rounded-[var(--radius-card)] bg-sun p-7 text-ink">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/70">
              <Phone className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-[1.25rem]">Appelez-nous</h2>
            <PhoneLink
              location="contact-card"
              className="mt-2 block font-display text-[1.7rem] font-semibold tracking-[-0.02em] after:absolute after:inset-0 after:content-['']"
            >
              {site.contact.phoneDisplay}
            </PhoneLink>
            <p className="mt-2 text-sm text-ink-700">{site.contact.hours}</p>
          </li>
          <li className="relative rounded-[var(--radius-card)] bg-leaf p-7 text-white">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15">
              <Mail className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-[1.25rem] text-white">Écrivez-nous</h2>
            <a
              href={`mailto:${site.contact.email}`}
              className="mt-2 block font-display text-[1.2rem] font-semibold break-all after:absolute after:inset-0 after:content-['']"
            >
              {site.contact.email}
            </a>
            <p className="mt-2 text-sm text-white">Pour une question ou l&apos;envoi de documents</p>
          </li>
          <li className="rounded-[var(--radius-card)] border border-line bg-white p-7">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-leaf-50 text-leaf">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-[1.25rem] text-ink">Où intervenons-nous ?</h2>
            <p className="mt-2 font-display text-[1.2rem] font-semibold text-ink">
              {site.address.city} ({site.address.postalCode}) · Calvados
            </p>
            <p className="mt-2 text-sm text-slate">Caen, Bayeux, Lisieux, Falaise, Côte Fleurie… et départements voisins sur demande.</p>
          </li>
        </ul>
      </section>

      {/* Formulaire */}
      <section id="formulaire" aria-labelledby="form-title" className="bg-mist py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="form-title" className="text-h2 text-ink">
              Être rappelé gratuitement
            </h2>
            <p className="mt-5 text-lg text-slate">
              Laissez votre nom, votre téléphone et votre code postal. Nous vous rappelons pour faire le point sur votre projet.
            </p>
            <ul className="mt-8 space-y-3 text-ink-700">
              <li className="flex items-center gap-3">
                <Clock className="size-5 text-leaf" aria-hidden="true" /> {site.contact.hours}
              </li>
              <li className="flex items-center gap-3">
                <FileText className="size-5 text-leaf" aria-hidden="true" /> Étude et devis gratuits, sans engagement
              </li>
            </ul>
            <Link
              href="/devis-panneaux-solaires/"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white p-4 pr-5 font-medium text-ink shadow-[0_12px_32px_-24px_rgba(19,41,29,0.5)] hover:text-leaf"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-sun">
                <FileText className="size-5" aria-hidden="true" />
              </span>
              Vous préférez détailler votre projet ? Demande de devis complète
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Photo name="slateRoof" ratio="aspect-[16/10]" className="mt-10 hidden lg:block" sizes="40vw" />
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[0_32px_64px_-48px_rgba(19,41,29,0.4)] md:p-10">
              <LazyQuickLeadForm idPrefix="contact" />
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section aria-labelledby="contact-faq" className="container-x py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="contact-faq" className="text-h2 text-ink lg:col-span-4">
            Avant de nous contacter
          </h2>
          <div className="lg:col-span-8">
            <FaqAccordion items={faq} />
          </div>
        </div>
      </section>
    </>
  );
}
