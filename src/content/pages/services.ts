import type { SeoPage } from "../types";

const DEVIS = { label: "Obtenir mon devis gratuit", href: "/devis-panneaux-solaires/" };
const DEVIS_BAT = { label: "Étudier l'ajout d'une batterie", href: "/devis-batterie-solaire/" };

export const servicePages: SeoPage[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "panneaux-solaires",
    kind: "service",
    breadcrumb: "Panneaux solaires",
    metaTitle: "Panneaux solaires pour maison en Normandie | ERE Habitat",
    metaDescription:
      "Panneaux photovoltaïques pour particuliers et professionnels dans le Calvados : étude de votre toiture, dimensionnement selon votre consommation et accompagnement local.",
    eyebrow: "Panneaux photovoltaïques",
    h1: "Des panneaux solaires dimensionnés pour votre consommation",
    lead: "Une installation photovoltaïque réussie ne se choisit pas sur catalogue. Elle se calcule à partir de votre toiture, de vos usages et du moment où vous consommez l'électricité.",
    heroPoints: ["Étude de toiture et d'ombrages", "Puissance adaptée à vos usages", "Matériel détaillé sur le devis"],
    primaryCta: DEVIS,
    service: { name: "Vente et étude d'installations photovoltaïques", serviceType: "Solar panel installation" },
    blocks: [
      {
        type: "prose",
        h2: "Produire une partie de son électricité",
        body: [
          "Des panneaux photovoltaïques transforment la lumière en électricité. Un onduleur la convertit pour qu'elle alimente directement les appareils de la maison : réfrigérateur, chauffe-eau, pompe à chaleur, recharge de véhicule. Ce que vous ne consommez pas au moment où il est produit part sur le réseau public.",
          "L'objectif d'une installation résidentielle bien pensée est donc moins de produire « le plus possible » que de produire au bon moment, en cohérence avec votre façon de vivre. C'est ce que nous appelons l'autoconsommation.",
        ],
      },
      {
        type: "features",
        h2: "Ce que comprend notre accompagnement",
        items: [
          { icon: "clipboard", title: "Étude gratuite de votre projet", text: "Analyse de votre toiture, de vos ombrages et de vos factures, avant toute proposition." },
          { icon: "ruler", title: "Une puissance sur mesure", text: "Le nombre de panneaux est calculé sur votre consommation réelle, pas sur un kit standard." },
          { icon: "file", title: "Un devis clair et détaillé", text: "Marque, références, garanties constructeur, démarches et calendrier : tout est écrit." },
          { icon: "shield", title: "Une pose par des professionnels", text: "Installation réalisée par des installateurs qualifiés partenaires, identifiés sur le devis." },
        ],
      },
      {
        type: "gallery",
        photos: [
          { name: "slateRoof", caption: "Panneaux noirs sur toiture en ardoise" },
          { name: "tileRoof", caption: "Implantation sur toiture en tuiles" },
          { name: "installers", caption: "Pose par des installateurs qualifiés" },
        ],
      },
      {
        type: "specs",
        h2: "Ce que nous étudions avant de vous proposer une puissance",
        rows: [
          ["Toiture", "Orientation, inclinaison, surface exploitable, nature de la couverture (ardoise, tuile, bac acier)"],
          ["Ombrages", "Arbres, cheminées, bâtiments voisins, relief — à différentes saisons"],
          ["Consommation", "Factures ou courbe de charge Linky, présence de chauffage électrique, pompe à chaleur, véhicule électrique"],
          ["Habitudes", "Présence en journée, télétravail, programmation possible des appareils"],
          ["Réseau", "Type de compteur, puissance souscrite, monophasé ou triphasé"],
          ["Urbanisme", "Règles locales, périmètres protégés, avis éventuel de l'Architecte des Bâtiments de France"],
        ],
      },
      {
        type: "compare",
        h2: "Onduleur central ou micro-onduleurs ?",
        intro: "Deux architectures dominent le marché résidentiel. Aucune n'est meilleure dans l'absolu : le choix dépend de votre toiture.",
        columns: ["Onduleur central (ou hybride)", "Micro-onduleurs"],
        rows: [
          { label: "Principe", a: "Un seul appareil convertit la production de tous les panneaux", b: "Un petit onduleur sous chaque panneau" },
          { label: "Ombrages partiels", a: "Un panneau ombragé peut pénaliser sa chaîne", b: "Chaque panneau produit indépendamment" },
          { label: "Batterie", a: "Un onduleur hybride accueille directement une batterie", b: "Batterie couplée côté courant alternatif" },
          { label: "Suivi", a: "Suivi global de l'installation", b: "Suivi panneau par panneau" },
        ],
      },
      {
        type: "prose",
        h2: "Le matériel, détaillé noir sur blanc",
        body: [
          "Votre devis précise la marque, la référence et la puissance unitaire des panneaux, le type d'onduleur, le système de fixation et les garanties constructeur applicables. Vous pouvez ainsi comparer nos propositions à d'autres offres sur une base objective.",
          "Nous ne mettons pas en avant de « kit universel » : la composition de l'installation découle de l'étude.",
        ],
      },
      { type: "cta", variant: "simulateur" },
    ],
    faq: [
      {
        q: "Quelle puissance installer sur une maison ?",
        a: "Les installations résidentielles se situent le plus souvent entre 3 et 9 kWc. La bonne puissance est celle qui correspond à votre consommation de journée, éventuellement augmentée si vous ajoutez une batterie ou un véhicule électrique.",
      },
      {
        q: "Mon toit est orienté est-ouest, est-ce possible ?",
        a: "Oui. Une toiture est-ouest produit un peu moins sur l'année qu'une toiture plein sud, mais répartit la production sur la matinée et la fin de journée, ce qui peut favoriser l'autoconsommation.",
      },
    ],
    related: ["installation-panneaux-solaires", "autoconsommation-solaire", "prix-panneaux-solaires", "panneaux-solaires-caen"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "installation-panneaux-solaires",
    kind: "service",
    breadcrumb: "Installation",
    metaTitle: "Installation de panneaux solaires : étapes et démarches | ERE Habitat",
    metaDescription:
      "Comment se déroule l'installation de panneaux solaires dans le Calvados : étude, déclaration préalable, pose par un installateur qualifié, raccordement et mise en service.",
    eyebrow: "Installation photovoltaïque",
    h1: "Installation de panneaux solaires : comment se déroule votre projet",
    lead: "De la première visite à la mise en service, chaque étape est planifiée. Vous savez à tout moment où en est votre dossier et qui intervient chez vous.",
    heroPoints: ["Démarches administratives préparées", "Pose par un installateur qualifié", "Un interlocuteur unique"],
    primaryCta: DEVIS,
    service: { name: "Coordination de l'installation photovoltaïque", serviceType: "Solar panel installation" },
    blocks: [
      {
        type: "steps",
        h2: "Les grandes étapes",
        steps: [
          { title: "Étude et visite technique", text: "Relevé de la toiture, analyse des ombrages, vérification du tableau électrique et de l'emplacement de l'onduleur." },
          { title: "Proposition détaillée", text: "Puissance, matériel, implantation des panneaux, calendrier prévisionnel et conditions financières." },
          { title: "Déclaration préalable", text: "Dépôt du dossier en mairie. Le délai d'instruction est d'un mois, allongé si l'avis de l'Architecte des Bâtiments de France est requis." },
          { title: "Pose", text: "Réalisée par un installateur professionnel qualifié, partenaire d'ERE Habitat, identifié sur votre devis." },
          { title: "Raccordement et mise en service", text: "Demande de raccordement auprès du gestionnaire de réseau, attestation de conformité électrique lorsqu'elle est requise, puis mise en service." },
          { title: "Suivi", text: "Prise en main de l'application de suivi de production et interlocuteur disponible après l'installation." },
        ],
      },
      {
        type: "split",
        h2: "Qui fait quoi ?",
        body: [
          "ERE Habitat est votre interlocuteur du début à la fin : étude, conception, proposition technique et commerciale, coordination des démarches et du chantier.",
          "La pose et le raccordement électrique sont confiés à des installateurs professionnels qualifiés avec lesquels nous travaillons. Nous vous communiquons leur raison sociale et leurs qualifications avant toute signature, afin que vous puissiez les vérifier.",
        ],
        aside: {
          title: "À vérifier sur tout devis",
          items: [
            "Raison sociale et SIRET de l'installateur",
            "Qualifications et assurances de l'entreprise de pose",
            "Marque et références du matériel",
            "Détail des démarches incluses",
            "Calendrier prévisionnel",
          ],
        },
      },
      {
        type: "prose",
        h2: "Une installation adaptée aux toitures normandes",
        body: [
          "Ardoise, tuile plate, tuile mécanique, bac acier : chaque couverture demande un système de fixation adapté et une attention particulière à l'étanchéité. La visite technique permet de vérifier l'état de la charpente et de la couverture avant de proposer une implantation.",
          "Lorsque la toiture ne s'y prête pas, d'autres solutions peuvent être étudiées : pose au sol, sur un carport ou sur une dépendance.",
        ],
      },
      { type: "cta", variant: "devis" },
    ],
    faq: [
      {
        q: "Combien de temps dure la pose ?",
        a: "Pour une maison individuelle, la pose est généralement réalisée en une à deux journées. Le délai global dépend surtout des démarches administratives.",
      },
      {
        q: "Dois-je être présent le jour de la pose ?",
        a: "Votre présence est utile en début et en fin d'intervention, notamment pour l'accès au tableau électrique et la prise en main du suivi.",
      },
    ],
    related: ["panneaux-solaires", "devis-panneaux-solaires", "panneaux-solaires-calvados", "batterie-stockage-solaire"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "batterie-stockage-solaire",
    kind: "service",
    breadcrumb: "Batterie de stockage",
    metaTitle: "Batterie de stockage solaire pour maison | ERE Habitat Calvados",
    metaDescription:
      "Batterie de stockage photovoltaïque : fonctionnement, dimensionnement, couplage AC ou DC. Étude personnalisée pour les maisons du Calvados et de Normandie.",
    eyebrow: "Stockage d'énergie",
    h1: "Batterie de stockage solaire : utilisez le soir l'énergie produite le jour",
    lead: "Vos panneaux produisent surtout en milieu de journée, quand la maison consomme peu. Une batterie conserve une partie de ce surplus pour les heures où vous en avez besoin.",
    heroPoints: ["Dimensionnée sur votre consommation du soir", "Compatible installation neuve ou existante", "Fonction secours étudiée si besoin"],
    primaryCta: DEVIS_BAT,
    service: { name: "Vente et installation de batteries de stockage solaire", serviceType: "Solar battery storage" },
    blocks: [
      {
        type: "prose",
        h2: "À quoi sert une batterie domestique ?",
        body: [
          "Sans stockage, l'électricité solaire non consommée immédiatement est injectée sur le réseau. Avec une batterie, ce surplus est stocké puis restitué automatiquement en fin de journée, le soir et une partie de la nuit.",
          "La batterie augmente ainsi votre taux d'autoconsommation : la part de votre production que vous utilisez vous-même. Elle ne remplace pas le réseau, qui reste nécessaire en hiver et lors des pointes de consommation.",
        ],
      },
      {
        type: "features",
        h2: "Ce qu'une batterie vous apporte",
        items: [
          { icon: "battery", title: "Le surplus du jour, utilisé le soir", text: "L'énergie produite en votre absence est stockée puis restituée automatiquement en soirée." },
          { icon: "home", title: "Compatible avec votre installation", text: "Batterie neuve ou ajoutée à des panneaux existants : nous vérifions la compatibilité de votre onduleur." },
          { icon: "plug", title: "Fonction secours possible", text: "Alimentation de circuits prioritaires pendant une coupure, avec un système prévu pour cela." },
          { icon: "smartphone", title: "Suivi depuis votre téléphone", text: "Charge, décharge et autoconsommation visibles dans l'application du fabricant, selon le modèle." },
        ],
      },
      {
        type: "gallery",
        photos: [
          { name: "batteryWall", caption: "Onduleur et batteries dans un local technique" },
          { name: "evGarage", caption: "Batterie et borne de recharge au garage" },
          { name: "gardenHouse", caption: "Maison équipée de panneaux solaires" },
        ],
      },
      {
        type: "compare",
        h2: "Couplage AC ou DC",
        intro: "La batterie se raccorde de deux façons. Le choix dépend surtout de l'onduleur.",
        columns: ["Couplage DC", "Couplage AC"],
        rows: [
          { label: "Raccordement", a: "Sur l'onduleur hybride, côté courant continu", b: "Sur le réseau électrique de la maison, avec son propre convertisseur" },
          { label: "Idéal pour", a: "Installation neuve avec onduleur hybride", b: "Ajout sur une installation existante, micro-onduleurs" },
          { label: "Conversions", a: "Moins de conversions entre panneaux et batterie", b: "Une conversion supplémentaire" },
          { label: "Évolutivité", a: "Liée au modèle d'onduleur", b: "Indépendante de l'onduleur existant" },
        ],
      },
      {
        type: "specs",
        h2: "Les critères qui comptent vraiment",
        rows: [
          ["Capacité utile", "En kWh — l'énergie réellement disponible, à distinguer de la capacité nominale"],
          ["Puissance", "En kW — ce que la batterie peut fournir en même temps (plaques, four, pompe à chaleur)"],
          ["Chimie", "Le lithium-fer-phosphate (LFP) est aujourd'hui la technologie la plus répandue en résidentiel"],
          ["Cycles et garantie", "Nombre de cycles ou durée garantis par le fabricant, et capacité minimale en fin de garantie"],
          ["Fonction secours", "Alimentation de circuits prioritaires en cas de coupure — uniquement si le système le prévoit"],
          ["Emplacement", "Local tempéré, ventilé et accessible : garage, cellier, buanderie"],
        ],
      },
      { type: "cta", variant: "batterie" },
    ],
    faq: [
      {
        q: "Une batterie est-elle utile si je suis absent en journée ?",
        a: "C'est justement dans ce cas qu'elle a le plus de sens : la production de journée, non consommée, peut être restituée le soir à votre retour.",
      },
      {
        q: "Une batterie peut-elle fonctionner sans panneaux ?",
        a: "Techniquement oui, en se chargeant sur le réseau aux heures creuses. L'intérêt dépend alors de votre contrat d'électricité ; nous l'étudions au cas par cas.",
      },
    ],
    related: ["batterie-solaire-installation-existante", "installation-batterie-solaire", "prix-batterie-solaire", "batterie-solaire-caen"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "installation-batterie-solaire",
    kind: "service",
    breadcrumb: "Installation batterie",
    metaTitle: "Installation d'une batterie solaire : déroulement | ERE Habitat",
    metaDescription:
      "Installer une batterie solaire dans le Calvados : vérification de compatibilité, choix de l'emplacement, raccordement et paramétrage. Étude gratuite.",
    eyebrow: "Installation de batterie",
    h1: "Installation d'une batterie solaire, étape par étape",
    lead: "Une batterie bien installée est une batterie qu'on oublie. Tout se joue en amont : compatibilité, emplacement, protections électriques et paramétrage.",
    heroPoints: ["Vérification de compatibilité", "Emplacement adapté", "Paramétrage et suivi"],
    primaryCta: DEVIS_BAT,
    service: { name: "Installation de batteries de stockage solaire", serviceType: "Solar battery installation" },
    blocks: [
      {
        type: "steps",
        h2: "Déroulement",
        steps: [
          { title: "Analyse de vos données", text: "Production de vos panneaux, consommation, référence de l'onduleur. Une courbe de charge Linky affine le dimensionnement." },
          { title: "Choix de l'emplacement", text: "Local tempéré et ventilé, à l'abri du gel et des fortes chaleurs, accessible pour la maintenance." },
          { title: "Proposition", text: "Capacité utile, puissance, type de couplage, fonction secours éventuelle et garanties constructeur." },
          { title: "Pose et raccordement", text: "Installation par un professionnel qualifié, mise en place des protections électriques." },
          { title: "Paramétrage", text: "Configuration des priorités de charge et de décharge, connexion à l'application de suivi." },
        ],
      },
      {
        type: "prose",
        h2: "Le paramétrage, souvent négligé",
        body: [
          "Une batterie peut être programmée pour privilégier l'autoconsommation, conserver une réserve en cas de coupure ou tenir compte des heures creuses. Ces réglages ont un impact direct sur son utilité au quotidien.",
          "Nous les définissons avec vous lors de la mise en service et vous expliquons comment les ajuster.",
        ],
      },
      { type: "cta", variant: "batterie" },
    ],
    faq: [
      {
        q: "Faut-il une déclaration en mairie pour une batterie ?",
        a: "Une batterie installée à l'intérieur ne modifie pas l'aspect extérieur du bâtiment et ne relève donc pas, en principe, d'une déclaration préalable. Nous vérifions les obligations applicables à votre situation.",
      },
    ],
    related: ["batterie-stockage-solaire", "batterie-solaire-installation-existante", "devis-batterie-solaire", "batterie-stockage-calvados"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "batterie-solaire-installation-existante",
    kind: "service",
    breadcrumb: "Batterie sur installation existante",
    metaTitle: "Ajouter une batterie à ses panneaux solaires existants | ERE Habitat",
    metaDescription:
      "Vous avez déjà des panneaux solaires ? Étude de compatibilité gratuite pour ajouter une batterie de stockage à votre installation dans le Calvados.",
    eyebrow: "Déjà équipé en panneaux",
    h1: "Ajouter une batterie à vos panneaux solaires existants",
    lead: "Vous produisez déjà votre électricité, mais une grande partie part sur le réseau en journée ? Une batterie peut vous permettre de l'utiliser le soir. Encore faut-il qu'elle soit compatible et bien dimensionnée.",
    heroPoints: ["Étude de compatibilité gratuite", "Toutes marques d'onduleurs étudiées", "Dimensionnement sur vos relevés réels"],
    primaryCta: DEVIS_BAT,
    service: { name: "Ajout de batterie sur installation photovoltaïque existante", serviceType: "Solar battery retrofit" },
    blocks: [
      {
        type: "split",
        h2: "Votre installation est-elle compatible ?",
        body: [
          "Dans la grande majorité des cas, une solution existe. Ce qui change, c'est la façon de raccorder la batterie.",
          "Avec un onduleur hybride, la batterie se branche directement sur l'onduleur. Avec un onduleur central classique ou des micro-onduleurs, on ajoute une batterie couplée côté courant alternatif, équipée de son propre convertisseur, sans toucher à vos panneaux.",
        ],
        aside: {
          title: "Pour l'étude, préparez",
          items: [
            "Une photo de l'étiquette de votre onduleur",
            "La puissance de votre installation (kWc)",
            "Vos relevés de production (application de suivi)",
            "Vos factures ou l'accès à votre compte Linky",
            "Votre contrat de revente du surplus, le cas échéant",
          ],
        },
      },
      {
        type: "prose",
        h2: "Le bon signal : beaucoup de surplus, une consommation surtout le soir",
        body: [
          "Une batterie est particulièrement pertinente si votre application montre une injection importante sur le réseau en milieu de journée et une consommation élevée le soir. À l'inverse, si vous consommez déjà l'essentiel de votre production, son intérêt est plus limité. Nous vous le dirons.",
          "Si vous revendez votre surplus, l'ajout d'une batterie réduit mécaniquement la quantité injectée. Nous intégrons cet élément à l'analyse.",
        ],
      },
      {
        type: "specs",
        h2: "Ce que nous vérifions",
        rows: [
          ["Onduleur", "Marque, modèle, compatibilité batterie, version logicielle"],
          ["Production", "Historique annuel et profil journalier de votre installation"],
          ["Consommation", "Part consommée le soir et la nuit, appareils énergivores"],
          ["Tableau électrique", "Place disponible, protections, type de raccordement"],
          ["Contrat", "Conditions de revente ou d'injection du surplus"],
        ],
      },
      { type: "leadForm", variant: "quick", h2: "Demander une étude de compatibilité", intro: "Indiquez simplement vos coordonnées : nous vous rappelons pour recueillir les informations sur votre installation." },
    ],
    faq: [
      {
        q: "Mon installation a plus de dix ans, est-ce un problème ?",
        a: "Pas nécessairement. Une batterie couplée côté courant alternatif fonctionne indépendamment de l'onduleur existant. L'âge de l'installation est en revanche un bon moment pour faire vérifier son état.",
      },
      {
        q: "Puis-je ajouter une batterie à des micro-onduleurs ?",
        a: "Oui, avec une batterie couplée côté courant alternatif. Certains fabricants de micro-onduleurs proposent leur propre solution de stockage, d'autres solutions sont compatibles.",
      },
      {
        q: "Faut-il prévenir mon fournisseur ou le gestionnaire de réseau ?",
        a: "Selon votre contrat et la configuration retenue, des démarches peuvent être nécessaires. Nous les identifions lors de l'étude.",
      },
    ],
    related: ["batterie-stockage-solaire", "installation-batterie-solaire", "prix-batterie-solaire", "batterie-solaire-caen"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "autoconsommation-solaire",
    kind: "service",
    breadcrumb: "Autoconsommation",
    metaTitle: "Autoconsommation solaire en Normandie : bien la comprendre | ERE Habitat",
    metaDescription:
      "Taux d'autoconsommation, taux d'autoproduction, surplus, pilotage des appareils : comprendre l'autoconsommation photovoltaïque pour une maison en Normandie.",
    eyebrow: "Autoconsommation photovoltaïque",
    h1: "Autoconsommation solaire : consommer ce que vous produisez",
    lead: "Deux chiffres résument une installation : la part de votre production que vous consommez, et la part de votre consommation couverte par le soleil. Les confondre conduit à de mauvais dimensionnements.",
    heroPoints: ["Indicateurs expliqués simplement", "Pilotage des appareils", "Avec ou sans batterie"],
    primaryCta: { label: "Estimer mon projet", href: "/#simulateur" },
    service: { name: "Optimisation de l'autoconsommation solaire", serviceType: "Solar self-consumption optimisation" },
    blocks: [
      {
        type: "compare",
        h2: "Deux indicateurs à ne pas confondre",
        columns: ["Taux d'autoconsommation", "Taux d'autoproduction"],
        rows: [
          { label: "Question", a: "Quelle part de ma production est-ce que je consomme ?", b: "Quelle part de ma consommation vient de mes panneaux ?" },
          { label: "Augmente si", a: "On consomme davantage aux heures de production, ou on stocke", b: "On produit davantage ou on stocke" },
          { label: "Piège", a: "Facile à maximiser avec une petite installation", b: "Facile à gonfler en surdimensionnant" },
        ],
      },
      {
        type: "prose",
        h2: "Consommer au bon moment",
        body: [
          "Avant même d'ajouter une batterie, il est souvent possible de décaler une partie de sa consommation vers le milieu de journée : programmation du chauffe-eau, du lave-linge, du lave-vaisselle, recharge du véhicule électrique.",
          "Un gestionnaire d'énergie ou un routeur solaire peut automatiser ces décalages, par exemple en chauffant l'eau sanitaire avec le surplus de production.",
        ],
        list: [
          "Chauffe-eau électrique piloté en journée",
          "Électroménager programmé",
          "Recharge du véhicule sur le surplus",
          "Pompe à chaleur avec régulation adaptée",
        ],
      },
      {
        type: "prose",
        h2: "Le climat normand change-t-il la donne ?",
        body: [
          "En Normandie, la production est plus faible en hiver, période où la consommation est souvent la plus élevée, notamment avec un chauffage électrique. L'autoconsommation se joue donc principalement d'avril à septembre.",
          "C'est pourquoi nous raisonnons sur l'année entière et mois par mois, plutôt que sur une journée d'été idéale.",
        ],
      },
      { type: "simulator", h2: "Estimez l'ordre de grandeur de votre projet" },
    ],
    faq: [
      {
        q: "Quel taux d'autoconsommation viser ?",
        a: "Il n'existe pas de chiffre universel. L'important est l'équilibre entre une production suffisante et une part consommée élevée. Nous vous présentons les deux indicateurs dans l'étude.",
      },
    ],
    related: ["panneaux-solaires", "batterie-stockage-solaire", "panneaux-solaires-calvados", "devis-panneaux-solaires"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "prix-panneaux-solaires",
    kind: "service",
    breadcrumb: "Prix panneaux solaires",
    metaTitle: "Prix des panneaux solaires : ce qui fait le coût | ERE Habitat",
    metaDescription:
      "De quoi dépend le prix d'une installation photovoltaïque ? Puissance, matériel, toiture, démarches : comprendre un devis de panneaux solaires dans le Calvados.",
    eyebrow: "Prix et devis",
    h1: "Prix des panneaux solaires : comprendre ce que vous payez",
    lead: "Deux devis pour une même puissance peuvent varier fortement. Les écarts s'expliquent presque toujours par le matériel, la complexité du chantier et ce qui est réellement inclus.",
    heroPoints: ["Postes de coût détaillés", "Comparaison de devis facilitée", "Aides vérifiées au cas par cas"],
    primaryCta: DEVIS,
    service: { name: "Devis d'installation photovoltaïque", serviceType: "Solar panel quotation" },
    blocks: [
      {
        type: "specs",
        h2: "Les postes qui composent le prix",
        rows: [
          ["Panneaux", "Puissance unitaire, technologie, marque et garanties produit et performance"],
          ["Onduleur(s)", "Central, hybride ou micro-onduleurs — prêt ou non à accueillir une batterie"],
          ["Fixations", "Système d'intégration ou de surimposition adapté à la couverture"],
          ["Pose", "Accès au toit, échafaudage, complexité de la toiture, longueur des câbles"],
          ["Électricité", "Protections, mise à niveau éventuelle du tableau"],
          ["Démarches", "Déclaration préalable, raccordement, attestation de conformité"],
          ["Suivi", "Monitoring de la production, garanties de main-d'œuvre"],
        ],
      },
      {
        type: "prose",
        h2: "Pourquoi nous n'affichons pas de prix « à partir de »",
        body: [
          "Un prix d'appel ne dit rien de votre projet : il suppose une toiture simple, un matériel d'entrée de gamme et exclut souvent une partie des démarches. Nous préférons vous remettre un devis détaillé, poste par poste, après étude.",
          "Les dispositifs d'aide et de revente du surplus évoluent régulièrement. Ils sont intégrés à votre proposition selon les conditions en vigueur au moment de l'étude, avec leurs sources.",
        ],
      },
      {
        type: "split",
        h2: "Comparer deux devis sereinement",
        body: [
          "Ramenez chaque offre au même périmètre : même puissance, matériel de gamme comparable, mêmes prestations incluses. Un devis moins cher qui exclut les démarches ou propose un onduleur incompatible avec une future batterie peut coûter davantage à terme.",
        ],
        aside: {
          title: "Questions à poser",
          items: [
            "Quelle production annuelle est estimée, avec quel outil ?",
            "Qui réalise la pose et avec quelles qualifications ?",
            "Les démarches administratives sont-elles incluses ?",
            "L'onduleur accepte-t-il une batterie plus tard ?",
            "Quelles garanties, et qui les porte ?",
          ],
        },
      },
      { type: "cta", variant: "devis" },
    ],
    faq: [
      {
        q: "Le devis est-il gratuit ?",
        a: "Oui, l'étude et le devis sont gratuits et sans engagement.",
      },
    ],
    related: ["devis-panneaux-solaires", "panneaux-solaires", "prix-batterie-solaire", "panneaux-solaires-caen"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "prix-batterie-solaire",
    kind: "service",
    breadcrumb: "Prix batterie solaire",
    metaTitle: "Prix d'une batterie solaire pour maison : les critères | ERE Habitat",
    metaDescription:
      "Capacité, puissance, technologie, couplage, installation : ce qui détermine le prix d'une batterie de stockage solaire pour une maison dans le Calvados.",
    eyebrow: "Prix et devis",
    h1: "Prix d'une batterie solaire : ce qui fait vraiment la différence",
    lead: "Le prix d'une batterie se lit d'abord au kWh utile. Mais une batterie trop grande, ou mal adaptée à votre onduleur, n'est jamais une bonne affaire.",
    heroPoints: ["Raisonner en kWh utiles", "Éviter le surdimensionnement", "Installation incluse et détaillée"],
    primaryCta: DEVIS_BAT,
    service: { name: "Devis de batterie de stockage solaire", serviceType: "Solar battery quotation" },
    blocks: [
      {
        type: "specs",
        h2: "Ce qui détermine le prix",
        rows: [
          ["Capacité utile", "Le premier facteur de coût. À dimensionner sur votre consommation du soir"],
          ["Puissance de décharge", "Utile si vous utilisez plusieurs appareils puissants en même temps"],
          ["Couplage", "Un couplage côté courant alternatif inclut un convertisseur dédié"],
          ["Fonction secours", "Nécessite un équipement et un câblage spécifiques"],
          ["Modularité", "Possibilité d'ajouter des modules plus tard"],
          ["Installation", "Emplacement, distance au tableau, protections électriques"],
        ],
      },
      {
        type: "prose",
        h2: "La batterie la plus rentable n'est pas la plus grande",
        body: [
          "Chaque kWh de capacité ne sert que s'il est rempli par du surplus solaire et vidé par votre consommation. Au-delà de votre besoin du soir, la capacité supplémentaire reste inutilisée une grande partie de l'année, surtout en hiver.",
          "Nous dimensionnons donc la batterie à partir de vos données réelles et vous indiquons clairement l'effet attendu sur votre autoconsommation, sans promesse d'économie que nous ne pourrions pas garantir.",
        ],
      },
      { type: "cta", variant: "batterie" },
    ],
    faq: [
      {
        q: "Vaut-il mieux une batterie de 5 ou de 10 kWh ?",
        a: "Cela dépend de ce que vous consommez entre la fin de la production solaire et le lendemain matin, et du surplus disponible en journée. Pour beaucoup de foyers, la bonne réponse se situe entre les deux.",
      },
    ],
    related: ["devis-batterie-solaire", "batterie-stockage-solaire", "batterie-solaire-installation-existante", "batterie-stockage-calvados"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "devis-panneaux-solaires",
    kind: "conversion",
    breadcrumb: "Devis panneaux solaires",
    metaTitle: "Devis panneaux solaires gratuit — Caen et Calvados | ERE Habitat",
    metaDescription:
      "Demandez votre devis gratuit pour une installation de panneaux solaires à Caen et dans le Calvados. Étude personnalisée, réponse rapide, sans engagement.",
    eyebrow: "Devis gratuit",
    h1: "Votre devis de panneaux solaires, gratuit et détaillé",
    lead: "Quelques informations suffisent pour lancer l'étude. Nous vous recontactons pour préciser votre projet et organiser la visite technique.",
    heroPoints: ["Gratuit et sans engagement", "Devis détaillé poste par poste", "Interlocuteur basé à Ifs"],
    primaryCta: { label: "Remplir le formulaire", href: "#formulaire" },
    service: { name: "Devis d'installation photovoltaïque", serviceType: "Solar panel quotation" },
    blocks: [
      { type: "leadForm", variant: "detailed", h2: "Décrivez votre projet", intro: "Les champs marqués d'un astérisque sont obligatoires. Plus vous êtes précis, plus notre premier échange sera utile." },
      {
        type: "steps",
        h2: "Après votre demande",
        steps: [
          { title: "Nous vous rappelons", text: "Pour faire le point sur votre logement et votre consommation." },
          { title: "Visite technique", text: "Relevés sur place : toiture, ombrages, installation électrique." },
          { title: "Proposition", text: "Devis détaillé et estimation de production à votre adresse." },
        ],
      },
    ],
    faq: [
      {
        q: "Quels documents préparer ?",
        a: "Vos dernières factures d'électricité, ou un accès à votre espace Linky, et si possible quelques photos de votre toiture et de votre tableau électrique.",
      },
    ],
    related: ["prix-panneaux-solaires", "installation-panneaux-solaires", "panneaux-solaires-caen", "panneaux-solaires-calvados"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "devis-batterie-solaire",
    kind: "conversion",
    breadcrumb: "Devis batterie solaire",
    metaTitle: "Devis batterie solaire gratuit — Caen et Calvados | ERE Habitat",
    metaDescription:
      "Devis gratuit pour une batterie de stockage solaire, sur installation neuve ou existante, à Caen et dans le Calvados. Étude de compatibilité incluse.",
    eyebrow: "Devis gratuit",
    h1: "Votre devis de batterie solaire, avec étude de compatibilité",
    lead: "Que vous soyez déjà équipé ou non, nous vérifions la compatibilité de votre installation et dimensionnons la batterie sur vos usages réels.",
    heroPoints: ["Étude de compatibilité incluse", "Gratuit et sans engagement", "Installation neuve ou existante"],
    primaryCta: { label: "Remplir le formulaire", href: "#formulaire" },
    service: { name: "Devis de batterie de stockage solaire", serviceType: "Solar battery quotation" },
    blocks: [
      { type: "leadForm", variant: "detailed", h2: "Décrivez votre projet", intro: "Si vous avez déjà des panneaux, indiquez-le : nous vous demanderons ensuite la référence de votre onduleur." },
      { type: "simulator", h2: "Ou estimez d'abord la capacité adaptée" },
    ],
    faq: [
      {
        q: "Je n'ai pas encore de panneaux, puis-je demander un devis batterie ?",
        a: "Oui. Nous étudions alors un ensemble panneaux et batterie, ou une batterie seule si votre situation s'y prête.",
      },
    ],
    related: ["prix-batterie-solaire", "batterie-solaire-installation-existante", "batterie-stockage-solaire", "batterie-solaire-caen"],
  },
];
