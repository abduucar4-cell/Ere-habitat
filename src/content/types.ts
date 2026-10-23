import type { PhotoKey } from "./photos";

export type FeatureIcon = "sun" | "ruler" | "file" | "clipboard" | "battery" | "plug" | "shield" | "smartphone" | "home" | "leaf";

export type FaqItem = { q: string; a: string };

export type Block =
  | { type: "prose"; id?: string; h2: string; body: string[]; list?: string[] }
  | { type: "split"; id?: string; h2: string; body: string[]; aside: { title: string; items: string[] } }
  | { type: "specs"; id?: string; h2: string; intro?: string; rows: Array<[string, string]>; note?: string }
  | { type: "steps"; id?: string; h2: string; intro?: string; steps: Array<{ title: string; text: string }> }
  | {
      type: "compare";
      id?: string;
      h2: string;
      intro?: string;
      columns: [string, string];
      rows: Array<{ label: string; a: string; b: string }>;
    }
  | {
      type: "features";
      id?: string;
      h2: string;
      intro?: string;
      items: Array<{ icon: FeatureIcon; title: string; text: string }>;
    }
  | { type: "gallery"; id?: string; h2?: string; photos: Array<{ name: PhotoKey; caption: string }> }
  | { type: "cta"; variant: "devis" | "batterie" | "simulateur" }
  | { type: "simulator"; h2?: string }
  | { type: "leadForm"; h2: string; intro?: string; variant: "quick" | "detailed" };

export type SeoPage = {
  slug: string;
  kind: "service" | "local" | "conversion";
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  lead: string;
  heroPoints: string[];
  primaryCta: { label: string; href: string };
  blocks: Block[];
  faq: FaqItem[];
  related: string[];
  breadcrumb: string;
  service?: { name: string; serviceType: string };
  city?: { name: string; postalCode?: string };
};
