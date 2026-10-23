/**
 * Blog — architecture éditoriale.
 *
 * `status: "published"` : article publié, indexé, présent dans le sitemap.
 * `status: "draft"`     : sujet planifié avec son brief, NON publié.
 *   Les sujets qui exigent des prix ou des chiffres à jour ne doivent être
 *   publiés qu'après vérification de sources datées (voir `brief.sources`).
 */

export type Article = {
  slug: string;
  title: string;
  description: string;
  status: "published" | "draft";
  publishedAt?: string;
  updatedAt?: string;
  category: "Batteries" | "Panneaux solaires" | "Autoconsommation" | "Conseils";
  readingMinutes?: number;
  intro?: string;
  sections?: Array<{ h2: string; body: string[]; list?: string[] }>;
  related: string[];
  brief?: { angle: string; sources: string[] };
};

export const articles: Article[] = [
  {
    slug: "batterie-sur-panneaux-solaires-existants",
    title: "Peut-on installer une batterie sur des panneaux solaires existants ?",
    description:
      "Onduleur central, hybride ou micro-onduleurs : comment savoir si votre installation photovoltaïque peut accueillir une batterie, et comment la raccorder.",
    status: "published",
    publishedAt: "2026-10-22",
    category: "Batteries",
    readingMinutes: 6,
    intro:
      "Oui, dans la très grande majorité des cas. La vraie question n'est pas « est-ce possible ? » mais « comment la raccorder, et est-ce utile pour moi ? ». Les réponses tiennent dans trois éléments : votre onduleur, votre production et votre consommation.",
    sections: [
      {
        h2: "Étape 1 : identifier votre onduleur",
        body: [
          "L'onduleur convertit le courant continu produit par les panneaux en courant alternatif utilisable dans la maison. Sa nature détermine la façon d'ajouter une batterie. Vous trouverez sa marque et son modèle sur l'étiquette de l'appareil, généralement installé dans le garage ou près du tableau électrique, ou dans votre application de suivi.",
        ],
        list: [
          "Onduleur hybride : il dispose d'une entrée prévue pour une batterie compatible.",
          "Onduleur central classique : il n'accepte pas de batterie directement.",
          "Micro-onduleurs : un petit onduleur est fixé sous chaque panneau.",
        ],
      },
      {
        h2: "Étape 2 : choisir le type de couplage",
        body: [
          "Avec un onduleur hybride, la batterie se raccorde côté courant continu, directement sur l'onduleur. C'est la solution la plus simple, à condition que la batterie fasse partie des modèles compatibles avec votre onduleur.",
          "Avec un onduleur central classique ou des micro-onduleurs, on installe une batterie couplée côté courant alternatif. Elle possède son propre convertisseur et se raccorde au réseau électrique de la maison. Vos panneaux et votre onduleur ne sont pas modifiés.",
        ],
      },
      {
        h2: "Étape 3 : vérifier que la batterie sera utile",
        body: [
          "Une batterie ne crée pas d'énergie : elle déplace dans le temps le surplus de production. Elle est donc utile si vous injectez une part importante de votre production sur le réseau en journée, et si vous consommez significativement le soir et la nuit.",
          "Votre application de suivi indique généralement l'énergie injectée. Si elle est faible, parce que vous consommez déjà l'essentiel de votre production, une batterie apportera peu.",
        ],
      },
      {
        h2: "Étape 4 : tenir compte de votre contrat",
        body: [
          "Si vous revendez votre surplus, une batterie diminuera la quantité injectée, donc vendue. Ce n'est pas un problème en soi, mais cela doit être intégré à votre réflexion. Selon la configuration, certaines démarches peuvent être nécessaires auprès du gestionnaire de réseau ou de votre acheteur.",
        ],
      },
      {
        h2: "Ce qu'il faut préparer pour une étude",
        body: ["Avec ces éléments, une étude de compatibilité se fait rapidement :"],
        list: [
          "Photo de l'étiquette de l'onduleur",
          "Puissance de l'installation en kWc",
          "Historique de production et d'injection",
          "Factures d'électricité ou accès Linky",
          "Contrat de revente, le cas échéant",
        ],
      },
    ],
    related: ["batterie-solaire-installation-existante", "batterie-stockage-solaire", "devis-batterie-solaire"],
  },
  {
    slug: "fonctionnement-autoconsommation-photovoltaique",
    title: "Comment fonctionne l'autoconsommation photovoltaïque ?",
    description:
      "Production, consommation, surplus, taux d'autoconsommation et d'autoproduction : le fonctionnement de l'autoconsommation solaire expliqué simplement.",
    status: "published",
    publishedAt: "2026-10-22",
    category: "Autoconsommation",
    readingMinutes: 5,
    intro:
      "L'autoconsommation, c'est consommer directement l'électricité produite par ses panneaux. Simple sur le papier, elle repose sur un équilibre permanent entre ce que la maison produit et ce qu'elle consomme, seconde après seconde.",
    sections: [
      {
        h2: "Le trajet de l'électricité solaire",
        body: [
          "Les panneaux produisent du courant continu, converti en courant alternatif par l'onduleur. Cette électricité alimente en priorité les appareils en fonctionnement dans la maison. Si la production dépasse la consommation, le surplus part sur le réseau public. Si elle est insuffisante, le réseau complète automatiquement.",
          "Vous n'avez rien à faire : la répartition est instantanée et transparente.",
        ],
      },
      {
        h2: "Deux taux à bien distinguer",
        body: [
          "Le taux d'autoconsommation mesure la part de votre production que vous consommez vous-même. Le taux d'autoproduction mesure la part de votre consommation couverte par vos panneaux.",
          "Une très petite installation peut afficher un taux d'autoconsommation proche de 100 % tout en couvrant une faible part de vos besoins. À l'inverse, une grande installation couvre davantage, mais une partie plus importante de sa production part sur le réseau. Le bon projet trouve l'équilibre entre les deux.",
        ],
      },
      {
        h2: "Augmenter son autoconsommation",
        body: ["Plusieurs leviers existent, du plus simple au plus complet :"],
        list: [
          "Programmer les appareils (lave-linge, lave-vaisselle) en milieu de journée",
          "Piloter le chauffe-eau électrique sur la production solaire",
          "Recharger un véhicule électrique sur le surplus",
          "Installer une batterie pour restituer le surplus le soir",
        ],
      },
      {
        h2: "Et le surplus ?",
        body: [
          "L'électricité non consommée est injectée sur le réseau. Elle peut être vendue dans le cadre d'un contrat d'obligation d'achat, selon les conditions en vigueur, ou cédée sans rémunération. Le choix se fait au moment du raccordement.",
        ],
      },
    ],
    related: ["autoconsommation-solaire", "batterie-stockage-solaire", "panneaux-solaires"],
  },
  {
    slug: "choisir-installateur-photovoltaique-calvados",
    title: "Comment choisir son installateur photovoltaïque dans le Calvados ?",
    description:
      "Qualifications, assurances, devis détaillé, étude de production, démarchage : les points à vérifier avant de choisir une entreprise de panneaux solaires dans le Calvados.",
    status: "published",
    publishedAt: "2026-10-22",
    category: "Conseils",
    readingMinutes: 6,
    intro:
      "Le photovoltaïque attire des acteurs très sérieux et d'autres beaucoup moins. Quelques vérifications simples permettent de distinguer une offre solide d'une promesse commerciale.",
    sections: [
      {
        h2: "Vérifier l'entreprise",
        body: [
          "Demandez la raison sociale et le numéro SIRET de l'entreprise qui vous vend l'installation et de celle qui la pose, si ce n'est pas la même. Vous pouvez vérifier leur existence sur l'annuaire des entreprises de l'administration.",
          "Si une qualification est mise en avant, notamment RGE, vérifiez-la sur l'annuaire officiel de France Rénov'. Certaines aides ne sont accessibles qu'avec un installateur qualifié.",
        ],
      },
      {
        h2: "Exiger une étude, pas un argumentaire",
        body: [
          "Une proposition sérieuse repose sur votre toiture et votre consommation. Elle indique l'outil utilisé pour estimer la production (PVGIS, logiciel de simulation), l'orientation et l'inclinaison retenues, et les ombrages pris en compte.",
          "Méfiez-vous des promesses d'autonomie totale, d'économies garanties ou d'installations « autofinancées » sans hypothèses écrites.",
        ],
      },
      {
        h2: "Lire le devis ligne par ligne",
        body: ["Un devis complet précise au minimum :"],
        list: [
          "La marque, le modèle et le nombre de panneaux",
          "Le type et la référence de l'onduleur",
          "Le système de fixation",
          "Les démarches administratives incluses",
          "Les garanties, et qui les porte",
          "Le calendrier prévisionnel",
        ],
      },
      {
        h2: "Prendre son temps",
        body: [
          "Un vendeur qui exige une signature le jour même n'agit pas dans votre intérêt. En cas de vente à domicile, vous disposez d'un délai légal de rétractation de quatorze jours. Comparez plusieurs offres sur un même périmètre avant de vous décider.",
        ],
      },
      {
        h2: "Privilégier la proximité",
        body: [
          "Une entreprise implantée dans le Calvados connaît les toitures, les règles d'urbanisme et les contraintes climatiques locales, et reste joignable après la pose. C'est un critère concret, pas seulement un argument.",
        ],
      },
    ],
    related: ["installation-panneaux-solaires", "prix-panneaux-solaires", "panneaux-solaires-calvados"],
  },
  {
    slug: "panneaux-solaires-normandie-production",
    title: "Panneaux solaires en Normandie : quelle production attendre ?",
    description:
      "Climat normand, lumière diffuse, orientation, saisons : comment estimer de façon fiable la production d'une installation photovoltaïque en Normandie.",
    status: "published",
    publishedAt: "2026-10-22",
    category: "Panneaux solaires",
    readingMinutes: 5,
    intro:
      "La Normandie n'est pas la Provence, mais les panneaux solaires y fonctionnent. La clé est d'estimer la production avec un outil fiable, pour votre adresse, plutôt que de se fier à une moyenne nationale.",
    sections: [
      {
        h2: "Un ordre de grandeur",
        body: [
          "Pour une toiture orientée au sud avec une inclinaison favorable, l'outil européen PVGIS donne pour le Calvados un ordre de grandeur d'environ 1 000 à 1 150 kWh par an pour chaque kWc installé. Une installation de 3 kWc produirait donc de l'ordre de 3 000 à 3 500 kWh par an dans de bonnes conditions.",
          "Ces valeurs varient selon l'emplacement précis, l'orientation, l'inclinaison, les ombrages et le matériel. Elles constituent un point de départ, pas une garantie.",
        ],
      },
      {
        h2: "Ce qui fait varier la production",
        body: ["Plusieurs facteurs ont plus d'influence que la région elle-même :"],
        list: [
          "L'orientation : une toiture est-ouest produit moins sur l'année qu'une toiture sud, mais répartit mieux la production dans la journée",
          "L'inclinaison du toit",
          "Les ombrages, parfois uniquement en hiver quand le soleil est bas",
          "La température : les panneaux sont plus efficaces au frais",
        ],
      },
      {
        h2: "Une production très saisonnière",
        body: [
          "En Normandie, l'essentiel de la production a lieu d'avril à septembre. En hiver, elle est nettement plus faible, alors que la consommation augmente souvent. Un bon dimensionnement tient compte de ce décalage, mois par mois.",
        ],
      },
      {
        h2: "Faire sa propre estimation",
        body: [
          "PVGIS, développé par le Centre commun de recherche de la Commission européenne, est gratuit et accessible en ligne. Il suffit de placer votre maison sur la carte et d'indiquer la puissance, l'orientation et l'inclinaison. Notre simulateur en donne un premier ordre de grandeur ; l'étude affine ensuite à partir de votre toiture réelle.",
        ],
      },
    ],
    related: ["panneaux-solaires-calvados", "autoconsommation-solaire", "panneaux-solaires"],
  },

  /* ---------------------- Sujets planifiés (non publiés) ---------------------- */
  {
    slug: "prix-batterie-solaire-2027",
    title: "Quel prix pour une batterie solaire en 2027 ?",
    description: "Fourchettes de prix au kWh utile, coût de l'installation, évolution du marché.",
    status: "draft",
    category: "Batteries",
    related: ["prix-batterie-solaire", "devis-batterie-solaire"],
    brief: {
      angle: "Prix au kWh utile observés sur devis réels ERE Habitat, ventilés matériel / pose. Publier uniquement avec des données datées.",
      sources: ["Devis réels anonymisés ERE Habitat", "Observatoires de prix publiés (à identifier, datés)"],
    },
  },
  {
    slug: "rentabilite-batterie-panneaux-solaires",
    title: "Est-il rentable d'ajouter une batterie à ses panneaux solaires ?",
    description: "Méthode de calcul, hypothèses, cas où la batterie est pertinente ou non.",
    status: "draft",
    category: "Batteries",
    related: ["batterie-solaire-installation-existante", "prix-batterie-solaire"],
    brief: {
      angle: "Méthode transparente (surplus injecté × part restituable × prix du kWh − perte de revente) avec 2–3 cas types réels.",
      sources: ["Tarifs réglementés en vigueur (CRE)", "Arrêté tarifaire obligation d'achat en vigueur", "Données de production réelles clients (avec accord)"],
    },
  },
  {
    slug: "quelle-batterie-choisir-maison",
    title: "Quelle batterie choisir pour une maison ?",
    description: "Capacité utile, puissance, chimie LFP, couplage, garantie, fonction secours.",
    status: "draft",
    category: "Batteries",
    related: ["batterie-stockage-solaire", "installation-batterie-solaire"],
    brief: { angle: "Grille de choix neutre, sans classement de marques non testées.", sources: ["Fiches techniques constructeurs datées"] },
  },
  {
    slug: "batterie-solaire-5-ou-10-kwh",
    title: "Batterie solaire 5 kWh ou 10 kWh ?",
    description: "Dimensionner sa batterie selon sa consommation du soir et son surplus.",
    status: "draft",
    category: "Batteries",
    related: ["prix-batterie-solaire", "batterie-stockage-solaire"],
    brief: { angle: "Exemples à partir de courbes de charge Linky réelles (anonymisées).", sources: ["Courbes Linky clients avec accord"] },
  },
  {
    slug: "cout-panneaux-solaires-caen",
    title: "Combien coûtent les panneaux solaires à Caen ?",
    description: "Prix constatés localement, facteurs de variation, aides en vigueur.",
    status: "draft",
    category: "Panneaux solaires",
    related: ["prix-panneaux-solaires", "panneaux-solaires-caen"],
    brief: { angle: "À publier uniquement avec des prix réels et datés issus des devis ERE Habitat.", sources: ["Devis réels anonymisés", "Dispositifs d'aide en vigueur (service-public.fr)"] },
  },
  {
    slug: "batterie-solaire-avec-ou-sans-panneaux",
    title: "Batterie solaire avec ou sans panneaux ?",
    description: "Batterie seule chargée en heures creuses : dans quels cas cela a du sens.",
    status: "draft",
    category: "Batteries",
    related: ["batterie-stockage-solaire", "devis-batterie-solaire"],
    brief: { angle: "Comparer avec des écarts HP/HC réels du tarif en vigueur.", sources: ["Grille tarifaire en vigueur (CRE)"] },
  },
];

export const publishedArticles = articles.filter((a) => a.status === "published");
export const getArticle = (slug: string) => publishedArticles.find((a) => a.slug === slug);
