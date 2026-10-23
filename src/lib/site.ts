/**
 * Configuration centrale de l'entreprise.
 *
 * ⚠️  Toute valeur contenant "[À COMPLÉTER" est un placeholder.
 *     `npm run check:placeholders` liste ce qui reste à renseigner avant publication.
 *     Ne jamais remplacer un placeholder par une information non vérifiée
 *     (certification, assurance, garantie, partenariat, qualification RGE...).
 */

export const TODO = (label: string) => `[À COMPLÉTER : ${label}]` as const;

export const site = {
  name: "ERE Habitat",
  legalName: "ERE Habitat", // Dénomination exacte telle qu'inscrite au registre
  tagline: "Étude · Rénovation · Énergie",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ere-habitat.com").replace(/\/$/, ""),
  locale: "fr_FR",

  /** Rôle réel de l'entreprise — affiché sur le site, ne pas surestimer. */
  role:
    "ERE Habitat conçoit et commercialise des solutions photovoltaïques et de stockage d'énergie. L'installation est réalisée par des installateurs professionnels qualifiés, partenaires d'ERE Habitat, dont l'identité et les qualifications figurent sur chaque devis.",

  contact: {
    phoneDisplay: "02 XX XX XX XX", // [À COMPLÉTER : numéro de téléphone]
    phoneHref: "tel:+33000000000", // [À COMPLÉTER : numéro au format international]
    email: "contact@ere-habitat.com", // [À COMPLÉTER : adresse e-mail vérifiée]
    hours: "Du lundi au vendredi, 9h – 18h", // [À COMPLÉTER : horaires réels]
  },

  address: {
    street: TODO("adresse postale"),
    postalCode: "14123",
    city: "Ifs",
    region: "Normandie",
    department: "Calvados",
    country: "FR",
    /** Passer à true uniquement si l'adresse est réelle et peut recevoir du public / du courrier. */
    verified: false,
    geo: { latitude: 49.1406, longitude: -0.3511 }, // Ifs (centre-ville) — à affiner avec l'adresse exacte
  },

  legal: {
    form: "Micro-entreprise (entrepreneur individuel)", // [À COMPLÉTER : vérifier la forme juridique définitive]
    owner: TODO("nom du responsable de la publication"),
    siret: TODO("SIRET"),
    rcs: TODO("immatriculation RCS / RNE"),
    vat: TODO("n° TVA intracommunautaire ou mention « TVA non applicable, art. 293 B du CGI »"),
    insurance: TODO("assureur et n° de police RC Pro — uniquement si souscrite"),
    host: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis", // à adapter si autre hébergeur
  },

  /**
   * Installateurs partenaires : n'afficher que des informations vérifiées
   * (raison sociale, qualifications, n° de qualification consultable sur france-renov.gouv.fr).
   */
  partners: [] as Array<{ name: string; qualification?: string; qualificationUrl?: string }>,

  /** Éléments de réassurance — uniquement des engagements réellement tenus. */
  reassurance: [
    "Étude personnalisée gratuite",
    "Devis détaillé et sans engagement",
    "Interlocuteur unique basé à Ifs",
  ],

  social: {
    googleBusinessProfile: "", // URL de la fiche Google Business Profile, si elle existe
    facebook: "",
    instagram: "",
    linkedin: "",
  },

  /** Zone d'intervention prioritaire. */
  areaServed: [
    "Caen",
    "Hérouville-Saint-Clair",
    "Mondeville",
    "Ifs",
    "Fleury-sur-Orne",
    "Ouistreham",
    "Bayeux",
    "Lisieux",
    "Falaise",
    "Vire Normandie",
    "Deauville",
    "Honfleur",
    "Cabourg",
    "Dives-sur-Mer",
  ],
  departments: ["Calvados (14)"],
  extendedDepartments: ["Manche (50)", "Orne (61)", "Eure (27)", "Seine-Maritime (76)"],
} as const;

export type Site = typeof site;
