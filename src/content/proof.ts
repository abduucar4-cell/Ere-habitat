/**
 * Preuves sociales — à remplir UNIQUEMENT avec des éléments réels :
 * - réalisations : photos dont vous détenez les droits + accord écrit du client ;
 * - avis : avis authentiques, vérifiables (idéalement issus de la fiche Google Business Profile).
 * Les sections correspondantes ne s'affichent pas tant que ces listes sont vides.
 */

export type Realisation = {
  slug: string;
  title: string; // ex. "Maison individuelle — Ifs"
  city: string;
  date: string; // AAAA-MM
  system: string; // ex. "6 kWc + batterie 10 kWh"
  image: { src: string; alt: string; width: number; height: number };
  summary: string;
};

export type Review = {
  author: string; // prénom + initiale, avec accord
  city?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
  source: "Google" | "Autre";
  url?: string; // lien vers l'avis public
};

export const realisations: Realisation[] = [];
export const reviews: Review[] = [];
