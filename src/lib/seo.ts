import type { Metadata } from "next";
import { site } from "./site";
import { absoluteUrl } from "./utils";
import type { FaqItem } from "@/content/types";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
};

const OG_IMAGE = "/opengraph-image/";

/** Métadonnées complètes : canonical, Open Graph, Twitter, robots. */
export function buildMetadata({ title, description, path, noindex, type = "website", publishedTime }: MetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}

/* ---------------------------- JSON-LD ---------------------------- */

const orgId = `${site.url}/#organization`;
const businessId = `${site.url}/#localbusiness`;

export function organizationJsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/logo-ere-habitat.svg"),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/**
 * LocalBusiness : émis UNIQUEMENT si l'adresse a été vérifiée (site.address.verified).
 * Google exige des informations réelles et cohérentes avec la fiche Google Business Profile.
 */
export function localBusinessJsonLd() {
  if (!site.address.verified) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": businessId,
    name: site.name,
    url: site.url,
    image: absoluteUrl("/opengraph-image/"),
    telephone: site.contact.phoneHref.replace("tel:", ""),
    email: site.contact.email,
    parentOrganization: { "@id": orgId },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", ...site.address.geo },
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "fr-FR",
    publisher: { "@id": orgId },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Accueil", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function serviceJsonLd(input: { name: string; serviceType: string; description: string; path: string; areaName?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": site.address.verified ? businessId : orgId },
    areaServed: input.areaName
      ? { "@type": "Place", name: input.areaName }
      : [{ "@type": "AdministrativeArea", name: "Calvados" }, { "@type": "AdministrativeArea", name: "Normandie" }],
  };
}

/**
 * FAQPage : depuis 2023, Google n'affiche plus les résultats enrichis FAQ que pour
 * des sites gouvernementaux ou de santé faisant autorité. Le balisage reste valide
 * et utile à la compréhension de la page ; il n'est émis que sur /faq/.
 */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function articleJsonLd(input: { title: string; description: string; path: string; publishedAt: string; updatedAt?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    inLanguage: "fr-FR",
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}
