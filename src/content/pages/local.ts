import type { SeoPage } from "../types";

/**
 * Pages locales : chacune apporte un contenu propre au territoire
 * (bâti, urbanisme, usages). Ne pas dupliquer ce modèle pour des villes
 * sans contenu réellement distinct.
 */

const DEVIS = { label: "Obtenir mon devis gratuit", href: "/devis-panneaux-solaires/" };
const DEVIS_BAT = { label: "Étudier ma batterie", href: "/devis-batterie-solaire/" };

export const localPages: SeoPage[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "panneaux-solaires-caen",
    kind: "local",
    breadcrumb: "Panneaux solaires Caen",
    city: { name: "Caen", postalCode: "14000" },
    metaTitle: "Panneaux solaires à Caen — étude et installation | ERE Habitat",
    metaDescription:
      "Installation de panneaux solaires à Caen et dans l'agglomération (Hérouville, Mondeville, Ifs, Fleury-sur-Orne) : étude gratuite par un interlocuteur local.",
    eyebrow: "Caen et agglomération",
    h1: "Panneaux solaires à Caen et dans l'agglomération caennaise",
    lead: "Basés à Ifs, nous accompagnons les propriétaires de Caen et des communes voisines, de la maison de la Reconstruction au pavillon récent, avec une étude adaptée à chaque toiture.",
    heroPoints: ["Interlocuteur basé à Ifs", "Démarches en mairie préparées", "Visite technique sur place"],
    primaryCta: DEVIS,
    service: { name: "Panneaux solaires à Caen", serviceType: "Solar panel installation" },
    blocks: [
      {
        type: "prose",
        h2: "Un bâti caennais très varié",
        body: [
          "Caen associe un centre largement reconstruit après 1944, des quartiers plus anciens préservés, des copropriétés et une couronne pavillonnaire étendue vers Ifs, Fleury-sur-Orne, Mondeville ou Hérouville-Saint-Clair. Chaque type de bâti appelle une approche différente.",
          "Les toitures de la Reconstruction, souvent en ardoise ou en tuile avec des pentes marquées, se prêtent bien au photovoltaïque lorsqu'elles sont orientées favorablement. Les pavillons plus récents offrent généralement des toitures simples et dégagées.",
        ],
      },
      {
        type: "split",
        h2: "Urbanisme : ce qu'il faut savoir à Caen",
        body: [
          "La ville compte de nombreux monuments historiques. Dans leurs abords, votre déclaration préalable est soumise à l'avis de l'Architecte des Bâtiments de France, qui peut demander une implantation plus discrète ou des panneaux d'aspect spécifique.",
          "Nous vérifions la situation de votre parcelle avant de concevoir l'implantation, afin d'éviter un refus ou une demande de modification tardive.",
        ],
        aside: {
          title: "Communes accompagnées",
          items: ["Caen", "Hérouville-Saint-Clair", "Mondeville", "Ifs", "Fleury-sur-Orne", "Ouistreham", "Et l'ensemble de l'agglomération"],
        },
      },
      {
        type: "prose",
        h2: "En copropriété",
        body: [
          "Une installation sur un immeuble nécessite l'accord de la copropriété et une réflexion sur la répartition de l'électricité produite. C'est un projet plus long, que nous pouvons étudier avec le conseil syndical.",
        ],
      },
      { type: "simulator", h2: "Estimez votre projet à Caen" },
    ],
    faq: [
      {
        q: "Intervenez-vous dans toutes les communes autour de Caen ?",
        a: "Oui, l'agglomération caennaise est notre zone d'intervention prioritaire, à quelques minutes de nos locaux à Ifs.",
      },
      {
        q: "Ma maison est proche d'un monument historique, est-ce bloquant ?",
        a: "Pas forcément. L'avis de l'Architecte des Bâtiments de France est alors requis et peut conduire à adapter le projet. Nous en tenons compte dès la conception.",
      },
    ],
    related: ["batterie-solaire-caen", "installation-panneaux-solaires", "panneaux-solaires-calvados", "devis-panneaux-solaires"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "batterie-solaire-caen",
    kind: "local",
    breadcrumb: "Batterie solaire Caen",
    city: { name: "Caen", postalCode: "14000" },
    metaTitle: "Batterie solaire à Caen — installation et ajout sur existant | ERE Habitat",
    metaDescription:
      "Batterie de stockage solaire à Caen : installation neuve ou ajout sur des panneaux existants. Étude de compatibilité gratuite par une entreprise basée à Ifs.",
    eyebrow: "Caen et agglomération",
    h1: "Batterie solaire à Caen : stocker votre production pour le soir",
    lead: "De nombreuses maisons de l'agglomération caennaise sont déjà équipées de panneaux. Une batterie bien dimensionnée permet d'utiliser le soir ce qui part aujourd'hui sur le réseau.",
    heroPoints: ["Ajout sur installation existante", "Étude de compatibilité gratuite", "Intervention rapide sur l'agglomération"],
    primaryCta: DEVIS_BAT,
    service: { name: "Batterie de stockage solaire à Caen", serviceType: "Solar battery storage" },
    blocks: [
      {
        type: "prose",
        h2: "Pour qui une batterie a du sens",
        body: [
          "Une batterie est particulièrement intéressante pour les foyers absents en journée et qui consomment surtout le soir : cuisine, éclairage, multimédia, recharge. C'est le profil de nombreux actifs travaillant à Caen ou dans sa périphérie.",
          "Si vous êtes en télétravail ou si votre chauffe-eau est déjà piloté sur le solaire, votre autoconsommation est peut-être déjà élevée. L'étude le montre, et nous vous déconseillerons une batterie si elle n'apporte pas assez.",
        ],
      },
      {
        type: "specs",
        h2: "Les informations utiles pour votre étude",
        rows: [
          ["Installation existante", "Puissance (kWc), marque et modèle de l'onduleur, année de mise en service"],
          ["Production", "Export ou captures de l'application de suivi"],
          ["Consommation", "Factures ou accès à l'espace client Linky"],
          ["Emplacement", "Garage, cellier ou buanderie disponible"],
        ],
      },
      { type: "leadForm", variant: "quick", h2: "Être rappelé pour une étude batterie" },
    ],
    faq: [
      {
        q: "Combien de temps pour installer une batterie à Caen ?",
        a: "Une fois la compatibilité validée et le matériel disponible, l'installation se fait généralement en une journée.",
      },
    ],
    related: ["batterie-solaire-installation-existante", "panneaux-solaires-caen", "batterie-stockage-calvados", "prix-batterie-solaire"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "panneaux-solaires-calvados",
    kind: "local",
    breadcrumb: "Panneaux solaires Calvados",
    city: { name: "Calvados" },
    metaTitle: "Entreprise de panneaux solaires dans le Calvados (14) | ERE Habitat",
    metaDescription:
      "Panneaux photovoltaïques dans tout le Calvados : Bessin, Pays d'Auge, Côte Fleurie, Bocage, Plaine de Caen. Étude gratuite par une entreprise locale basée à Ifs.",
    eyebrow: "Calvados (14)",
    h1: "Panneaux solaires dans le Calvados, du Bessin au Pays d'Auge",
    lead: "Le Calvados réunit des territoires très différents : littoral, bocage, plaine céréalière, bourgs patrimoniaux. Une étude locale tient compte de ces réalités, du climat comme du bâti.",
    heroPoints: ["Tout le département", "Production estimée à votre adresse", "Contraintes locales anticipées"],
    primaryCta: DEVIS,
    service: { name: "Panneaux solaires dans le Calvados", serviceType: "Solar panel installation" },
    blocks: [
      {
        type: "prose",
        h2: "Le climat du Calvados et le photovoltaïque",
        body: [
          "Le climat océanique du Calvados apporte un ciel souvent changeant et une lumière fréquemment diffuse. Les panneaux produisent dans ces conditions, avec un rendement favorisé par des températures modérées : un panneau perd en efficacité lorsqu'il chauffe.",
          "Pour une toiture bien orientée, l'outil européen PVGIS donne un ordre de grandeur d'environ 1 000 à 1 150 kWh produits par kWc installé et par an dans le département. Nous réalisons une simulation à votre adresse exacte, avec l'orientation et l'inclinaison réelles de votre toit.",
        ],
      },
      {
        type: "specs",
        h2: "Des territoires, des contraintes",
        rows: [
          ["Plaine de Caen", "Pavillons et lotissements, toitures dégagées, nombreuses maisons récentes"],
          ["Bessin", "Bâti en pierre, longères et corps de ferme, terrains permettant parfois une pose au sol"],
          ["Pays d'Auge", "Colombages et toitures en tuile plate ou ardoise, sensibilité paysagère forte"],
          ["Côte de Nacre et Côte Fleurie", "Environnement marin : matériel et fixations adaptés aux embruns"],
          ["Bocage virois et Suisse normande", "Habitat dispersé, ombrages liés aux haies et au relief"],
        ],
      },
      {
        type: "split",
        h2: "Où intervenons-nous ?",
        body: [
          "Notre zone prioritaire couvre l'ensemble du Calvados. Pour les départements voisins — Manche, Orne, Eure et Seine-Maritime —, contactez-nous : nous étudions chaque demande.",
        ],
        aside: {
          title: "Principales communes",
          items: ["Caen et agglomération", "Bayeux", "Lisieux", "Falaise", "Vire Normandie", "Deauville et Honfleur", "Cabourg et Dives-sur-Mer"],
        },
      },
      { type: "cta", variant: "simulateur" },
    ],
    faq: [
      {
        q: "Le Calvados est-il assez ensoleillé ?",
        a: "Oui pour un projet bien dimensionné. La production est inférieure à celle du sud de la France, mais suffisante pour couvrir une part significative de la consommation d'une maison, surtout d'avril à septembre.",
      },
    ],
    related: ["batterie-stockage-calvados", "panneaux-solaires-caen", "panneaux-solaires-bayeux", "panneaux-solaires-lisieux"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "batterie-stockage-calvados",
    kind: "local",
    breadcrumb: "Batterie de stockage Calvados",
    city: { name: "Calvados" },
    metaTitle: "Batterie de stockage photovoltaïque dans le Calvados | ERE Habitat",
    metaDescription:
      "Batterie de stockage pour panneaux solaires dans tout le Calvados : maisons principales, résidences secondaires, exploitations. Étude de compatibilité gratuite.",
    eyebrow: "Calvados (14)",
    h1: "Batterie de stockage photovoltaïque dans le Calvados",
    lead: "Résidence principale, résidence secondaire sur la côte, maison isolée dans le bocage : l'intérêt d'une batterie dépend de la façon dont la maison est occupée.",
    heroPoints: ["Étude selon votre occupation", "Fonction secours étudiée", "Tout le département"],
    primaryCta: DEVIS_BAT,
    service: { name: "Batterie de stockage dans le Calvados", serviceType: "Solar battery storage" },
    blocks: [
      {
        type: "compare",
        h2: "Selon l'usage de votre maison",
        columns: ["Résidence principale", "Résidence secondaire"],
        rows: [
          { label: "Consommation", a: "Régulière, souvent concentrée le soir", b: "Irrégulière, week-ends et vacances" },
          { label: "Intérêt d'une batterie", a: "Souvent pertinent si le surplus de journée est important", b: "À étudier avec soin : la batterie reste peu utilisée hors séjours" },
          { label: "Point d'attention", a: "Dimensionner sur la consommation du soir", b: "Privilégier parfois la revente du surplus ou le pilotage à distance" },
        ],
      },
      {
        type: "prose",
        h2: "Coupures de courant en zone rurale",
        body: [
          "Dans certaines zones rurales ou exposées aux tempêtes, la question de l'alimentation de secours revient souvent. Toutes les batteries ne la proposent pas : il faut un système prévu pour fonctionner isolé du réseau et un câblage des circuits prioritaires.",
          "Si c'est un critère pour vous, signalez-le dès la demande : il oriente le choix du matériel.",
        ],
      },
      { type: "cta", variant: "batterie" },
    ],
    faq: [
      {
        q: "Une batterie est-elle utile pour une résidence secondaire à Cabourg ou Deauville ?",
        a: "Rarement en priorité. Lorsque la maison est inoccupée, la batterie se charge mais se vide peu. Nous étudions d'abord votre calendrier d'occupation.",
      },
    ],
    related: ["batterie-solaire-caen", "batterie-stockage-solaire", "panneaux-solaires-calvados", "batterie-solaire-installation-existante"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "panneaux-solaires-bayeux",
    kind: "local",
    breadcrumb: "Panneaux solaires Bayeux",
    city: { name: "Bayeux", postalCode: "14400" },
    metaTitle: "Panneaux solaires à Bayeux et dans le Bessin | ERE Habitat",
    metaDescription:
      "Installation de panneaux solaires à Bayeux et dans le Bessin : centre historique protégé, longères, pose au sol. Étude gratuite et démarches préparées.",
    eyebrow: "Bayeux · Bessin",
    h1: "Panneaux solaires à Bayeux et dans le Bessin",
    lead: "Entre un centre historique protégé et une campagne de corps de ferme en pierre, un projet solaire à Bayeux demande une conception soignée et des démarches bien préparées.",
    heroPoints: ["Projets en secteur protégé", "Pose au sol ou sur dépendance", "Démarches préparées"],
    primaryCta: DEVIS,
    service: { name: "Panneaux solaires à Bayeux", serviceType: "Solar panel installation" },
    blocks: [
      {
        type: "prose",
        h2: "Dans le centre historique",
        body: [
          "Le centre de Bayeux, autour de la cathédrale, fait l'objet de protections patrimoniales. Un projet visible depuis l'espace public y est soumis à l'avis de l'Architecte des Bâtiments de France, et certaines implantations peuvent être refusées.",
          "Avant tout engagement, nous vérifions les règles applicables à votre adresse et étudions les alternatives : pan de toiture non visible, dépendance, jardin.",
        ],
      },
      {
        type: "prose",
        h2: "Dans le Bessin",
        body: [
          "Longères, corps de ferme et maisons en pierre offrent souvent des dépendances — granges, hangars, garages — dont la toiture peut accueillir des panneaux sans toucher à la maison principale. Les terrains permettent parfois aussi une pose au sol, plus simple à orienter.",
        ],
        list: ["Toiture de dépendance ou de hangar", "Structure au sol orientée plein sud", "Carport photovoltaïque"],
      },
      { type: "cta", variant: "devis" },
    ],
    faq: [
      {
        q: "Une pose au sol nécessite-t-elle une autorisation ?",
        a: "Oui, selon la puissance et la hauteur, une déclaration préalable ou un permis peut être requis. Nous vérifions les règles applicables à votre terrain.",
      },
    ],
    related: ["panneaux-solaires-calvados", "installation-panneaux-solaires", "panneaux-solaires-caen", "devis-panneaux-solaires"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "panneaux-solaires-lisieux",
    kind: "local",
    breadcrumb: "Panneaux solaires Lisieux",
    city: { name: "Lisieux", postalCode: "14100" },
    metaTitle: "Panneaux solaires à Lisieux et dans le Pays d'Auge | ERE Habitat",
    metaDescription:
      "Panneaux photovoltaïques à Lisieux et dans le Pays d'Auge : maisons à colombages, tuiles plates, intégration paysagère. Étude gratuite et accompagnement local.",
    eyebrow: "Lisieux · Pays d'Auge",
    h1: "Panneaux solaires à Lisieux et dans le Pays d'Auge",
    lead: "Le Pays d'Auge a une identité architecturale forte. Un projet photovoltaïque réussi s'y fait discret : implantation, couleur des panneaux et choix du support comptent autant que la puissance.",
    heroPoints: ["Intégration paysagère soignée", "Toitures anciennes vérifiées", "Alternatives étudiées"],
    primaryCta: DEVIS,
    service: { name: "Panneaux solaires à Lisieux", serviceType: "Solar panel installation" },
    blocks: [
      {
        type: "prose",
        h2: "Colombages, tuiles plates et ardoise",
        body: [
          "Les maisons augeronnes à pans de bois, souvent coiffées de tuiles plates ou d'ardoise, ont des charpentes et des couvertures qu'il faut examiner avec attention avant toute pose. La visite technique vérifie l'état de la toiture et la faisabilité des fixations.",
          "Des panneaux à cadre et fond noirs, implantés en un rectangle régulier, s'intègrent généralement mieux qu'un assemblage dispersé.",
        ],
      },
      {
        type: "split",
        h2: "À Lisieux",
        body: [
          "La ville mêle maisons anciennes, quartiers reconstruits et pavillons récents en périphérie. Autour des monuments protégés, dont la basilique, l'avis de l'Architecte des Bâtiments de France peut être requis.",
        ],
        aside: {
          title: "Bon à savoir",
          items: [
            "Privilégier un pan de toiture peu visible depuis la rue",
            "Choisir des panneaux d'aspect uniforme",
            "Étudier les dépendances et appentis",
          ],
        },
      },
      { type: "cta", variant: "simulateur" },
    ],
    faq: [
      {
        q: "Peut-on poser des panneaux sur une maison à colombages ?",
        a: "Souvent oui, si la charpente et la couverture le permettent et que les règles d'urbanisme l'autorisent. Une dépendance est parfois une meilleure option.",
      },
    ],
    related: ["panneaux-solaires-calvados", "panneaux-solaires-deauville", "installation-panneaux-solaires", "devis-panneaux-solaires"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "panneaux-solaires-falaise",
    kind: "local",
    breadcrumb: "Panneaux solaires Falaise",
    city: { name: "Falaise", postalCode: "14700" },
    metaTitle: "Panneaux solaires à Falaise et alentours | ERE Habitat",
    metaDescription:
      "Panneaux solaires à Falaise, dans la plaine et vers la Suisse normande : maisons individuelles, bâtiments agricoles, pose au sol. Étude gratuite.",
    eyebrow: "Falaise · Pays de Falaise",
    h1: "Panneaux solaires à Falaise et dans le Pays de Falaise",
    lead: "Entre plaine dégagée et premiers reliefs de la Suisse normande, le Pays de Falaise offre souvent de belles surfaces : toitures de maisons, hangars et terrains.",
    heroPoints: ["Particuliers et professionnels", "Bâtiments agricoles étudiés", "Ombrages et relief analysés"],
    primaryCta: DEVIS,
    service: { name: "Panneaux solaires à Falaise", serviceType: "Solar panel installation" },
    blocks: [
      {
        type: "prose",
        h2: "Maisons individuelles",
        body: [
          "Les maisons de la plaine, souvent bien dégagées, se prêtent bien au photovoltaïque. Vers le sud et la Suisse normande, le relief et les haies bocagères créent des ombrages qu'il faut mesurer précisément, à différentes saisons.",
          "À proximité du château, l'avis de l'Architecte des Bâtiments de France peut être requis pour un projet visible.",
        ],
      },
      {
        type: "prose",
        h2: "Exploitations et professionnels",
        body: [
          "Hangars, ateliers et bâtiments agricoles offrent de grandes toitures. Un projet professionnel s'étudie différemment : profil de consommation de l'activité, solidité de la charpente, puissance de raccordement, cadre fiscal.",
          "Nous vous proposons une première analyse de faisabilité avant toute étude détaillée.",
        ],
      },
      { type: "cta", variant: "devis" },
    ],
    faq: [
      {
        q: "Étudiez-vous les projets agricoles ?",
        a: "Oui, nous étudions les projets des exploitations et des professionnels. Leur faisabilité dépend notamment de l'état de la charpente et des conditions de raccordement.",
      },
    ],
    related: ["panneaux-solaires-calvados", "panneaux-solaires-caen", "autoconsommation-solaire", "devis-panneaux-solaires"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "panneaux-solaires-deauville",
    kind: "local",
    breadcrumb: "Panneaux solaires Deauville",
    city: { name: "Deauville", postalCode: "14800" },
    metaTitle: "Panneaux solaires à Deauville et sur la Côte Fleurie | ERE Habitat",
    metaDescription:
      "Panneaux solaires à Deauville, Trouville, Honfleur, Cabourg : matériel adapté aux embruns, villas et résidences secondaires, intégration soignée. Étude gratuite.",
    eyebrow: "Deauville · Côte Fleurie",
    h1: "Panneaux solaires à Deauville et sur la Côte Fleurie",
    lead: "Air salin, villas à l'architecture travaillée, résidences secondaires : un projet sur la Côte Fleurie se conçoit avec des exigences particulières, du choix du matériel au mode d'occupation.",
    heroPoints: ["Matériel adapté au littoral", "Intégration architecturale", "Pilotage à distance"],
    primaryCta: DEVIS,
    service: { name: "Panneaux solaires à Deauville", serviceType: "Solar panel installation" },
    blocks: [
      {
        type: "specs",
        h2: "Le littoral impose ses règles",
        intro: "À proximité de la mer, les embruns accélèrent la corrosion. Le matériel est choisi en conséquence.",
        rows: [
          ["Panneaux", "Modèles testés à la corrosion par brouillard salin (norme IEC 61701)"],
          ["Fixations", "Aluminium et visserie inox adaptés à l'environnement marin"],
          ["Onduleur", "Emplacement abrité et ventilé, indice de protection adapté"],
          ["Vent", "Dimensionnement des fixations selon l'exposition"],
        ],
      },
      {
        type: "prose",
        h2: "Villas et architecture balnéaire",
        body: [
          "Les villas de la Côte Fleurie présentent souvent des toitures complexes — lucarnes, tourelles, épis — et certains secteurs font l'objet de protections patrimoniales, comme à Honfleur. L'implantation est étudiée pour rester discrète et conforme aux règles locales.",
        ],
      },
      {
        type: "prose",
        h2: "Résidence secondaire : bien dimensionner",
        body: [
          "Une maison occupée par intermittence consomme peu la plupart du temps. Le dimensionnement doit en tenir compte : une petite installation, éventuellement associée à la revente du surplus et à un pilotage à distance du chauffage ou de l'eau chaude, est souvent plus pertinente qu'une grande installation avec batterie.",
        ],
        list: ["Deauville", "Trouville-sur-Mer", "Honfleur", "Cabourg", "Dives-sur-Mer", "Houlgate"],
      },
      { type: "cta", variant: "devis" },
    ],
    faq: [
      {
        q: "Les panneaux résistent-ils à l'air marin ?",
        a: "Oui, à condition de choisir des modèles certifiés pour la corrosion saline et des fixations adaptées. Ce point est précisé sur nos devis pour les projets du littoral.",
      },
    ],
    related: ["panneaux-solaires-calvados", "batterie-stockage-calvados", "panneaux-solaires-lisieux", "devis-panneaux-solaires"],
  },
];
