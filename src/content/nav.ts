export const mainNav = [
  {
    label: "Panneaux photovoltaïques",
    short: "Panneaux solaires",
    href: "/panneaux-solaires/",
    children: [
      { label: "Nos panneaux photovoltaïques", href: "/panneaux-solaires/" },
      { label: "Installation", href: "/installation-panneaux-solaires/" },
      { label: "Autoconsommation", href: "/autoconsommation-solaire/" },
      { label: "Prix", href: "/prix-panneaux-solaires/" },
      { label: "Zone d'intervention", href: "/panneaux-solaires-calvados/" },
    ],
  },
  {
    label: "Batteries de stockage",
    short: "Batteries",
    href: "/batterie-stockage-solaire/",
    children: [
      { label: "Nos batteries de stockage", href: "/batterie-stockage-solaire/" },
      { label: "Sur installation existante", href: "/batterie-solaire-installation-existante/" },
      { label: "Installation", href: "/installation-batterie-solaire/" },
      { label: "Prix", href: "/prix-batterie-solaire/" },
    ],
  },
  { label: "Qui sommes-nous", short: "Qui sommes-nous", href: "/qui-sommes-nous/" },
  { label: "Nous contacter", short: "Contact", href: "/contact/" },
] as const;

export const footerNav = {
  solutions: [
    { label: "Panneaux solaires", href: "/panneaux-solaires/" },
    { label: "Installation photovoltaïque", href: "/installation-panneaux-solaires/" },
    { label: "Batterie de stockage", href: "/batterie-stockage-solaire/" },
    { label: "Batterie sur installation existante", href: "/batterie-solaire-installation-existante/" },
    { label: "Installation de batterie", href: "/installation-batterie-solaire/" },
    { label: "Autoconsommation", href: "/autoconsommation-solaire/" },
  ],
  prix: [
    { label: "Prix panneaux solaires", href: "/prix-panneaux-solaires/" },
    { label: "Prix batterie solaire", href: "/prix-batterie-solaire/" },
    { label: "Devis panneaux solaires", href: "/devis-panneaux-solaires/" },
    { label: "Devis batterie solaire", href: "/devis-batterie-solaire/" },
  ],
  local: [
    { label: "Panneaux solaires Caen", href: "/panneaux-solaires-caen/" },
    { label: "Batterie solaire Caen", href: "/batterie-solaire-caen/" },
    { label: "Panneaux solaires Calvados", href: "/panneaux-solaires-calvados/" },
    { label: "Batterie stockage Calvados", href: "/batterie-stockage-calvados/" },
    { label: "Bayeux", href: "/panneaux-solaires-bayeux/" },
    { label: "Lisieux", href: "/panneaux-solaires-lisieux/" },
    { label: "Falaise", href: "/panneaux-solaires-falaise/" },
    { label: "Deauville", href: "/panneaux-solaires-deauville/" },
  ],
  entreprise: [
    { label: "Qui sommes-nous", href: "/qui-sommes-nous/" },
    { label: "Nos réalisations", href: "/nos-realisations/" },
    { label: "Blog", href: "/blog/" },
    { label: "FAQ", href: "/faq/" },
    { label: "Nous contacter", href: "/contact/" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales/" },
    { label: "Confidentialité", href: "/politique-confidentialite/" },
    { label: "Cookies", href: "/cookies/" },
  ],
};
