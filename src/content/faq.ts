import type { FaqItem } from "./types";

/** FAQ générale — orientée objections. Réponses factuelles, sans promesse chiffrée. */
export const faqGroups: Array<{ title: string; items: FaqItem[] }> = [
  {
    title: "Production et rentabilité",
    items: [
      {
        q: "Les panneaux solaires sont-ils intéressants en Normandie ?",
        a: "Oui, à condition que le projet soit bien dimensionné. Le Calvados reçoit moins de rayonnement que le sud de la France, mais les panneaux produisent aussi par lumière diffuse et leur rendement est meilleur lorsqu'il fait frais. L'intérêt réel dépend de votre toiture, de votre consommation et du moment où vous consommez : c'est précisément ce que l'étude mesure. Nous ne promettons pas d'économie chiffrée sans avoir analysé votre logement.",
      },
      {
        q: "Combien produit une installation dans le Calvados ?",
        a: "Pour une toiture bien orientée, l'outil européen PVGIS donne un ordre de grandeur d'environ 1 000 à 1 150 kWh par kWc installé et par an dans le Calvados. Ce chiffre varie avec l'orientation, l'inclinaison, les ombrages et le matériel. Votre étude repose sur une simulation à votre adresse exacte.",
      },
      {
        q: "Les panneaux produisent-ils quand le ciel est couvert ?",
        a: "Oui, mais moins. Par ciel couvert, la production baisse nettement sans s'arrêter. C'est pour cette raison que l'on raisonne en production annuelle et non en journée type.",
      },
    ],
  },
  {
    title: "Batteries de stockage",
    items: [
      {
        q: "Peut-on ajouter une batterie à des panneaux déjà installés ?",
        a: "Dans la plupart des cas, oui. Selon votre onduleur (central, hybride ou micro-onduleurs), on ajoute une batterie couplée côté courant alternatif ou côté courant continu. La compatibilité se vérifie à partir de la référence de votre matériel et de vos relevés de production.",
      },
      {
        q: "Une batterie me rend-elle indépendant du réseau ?",
        a: "Non, en général. Une batterie résidentielle augmente la part de votre propre production que vous consommez, notamment le soir. Elle ne couvre pas l'hiver entier et ne fonctionne pendant une coupure de courant que si le système dispose d'une fonction de secours prévue à cet effet.",
      },
      {
        q: "Quelle capacité de batterie choisir ?",
        a: "La bonne capacité correspond à ce que vous consommez le soir et la nuit, dans la limite du surplus que vos panneaux produisent en journée. Une batterie surdimensionnée reste souvent à moitié vide. Nous la dimensionnons à partir de vos courbes de consommation lorsque vous pouvez les fournir.",
      },
    ],
  },
  {
    title: "Démarches et déroulement",
    items: [
      {
        q: "Faut-il une autorisation pour poser des panneaux ?",
        a: "Une installation en toiture nécessite en règle générale une déclaration préalable de travaux en mairie. Dans le périmètre d'un monument historique ou d'un site patrimonial remarquable, l'avis de l'Architecte des Bâtiments de France est requis et le délai d'instruction est allongé. Nous préparons ces démarches avec vous.",
      },
      {
        q: "Qui réalise l'installation ?",
        a: "ERE Habitat réalise l'étude, la proposition technique et commerciale et coordonne votre projet. La pose est effectuée par des installateurs professionnels qualifiés, partenaires d'ERE Habitat. Leur identité et leurs qualifications sont indiquées sur votre devis.",
      },
      {
        q: "Combien de temps dure un projet ?",
        a: "Comptez plusieurs semaines entre l'étude et la mise en service. La pose elle-même est rapide ; ce sont surtout l'instruction de la déclaration préalable et les démarches de raccordement qui déterminent le calendrier.",
      },
      {
        q: "Que devient l'électricité que je ne consomme pas ?",
        a: "Le surplus est injecté sur le réseau. Selon votre choix et les conditions en vigueur, il peut être vendu dans le cadre d'un contrat d'obligation d'achat ou simplement cédé. Nous vous présentons les options applicables au moment de votre projet.",
      },
    ],
  },
  {
    title: "Devis et aides",
    items: [
      {
        q: "L'étude et le devis sont-ils payants ?",
        a: "Non. L'étude de votre projet et le devis sont gratuits et sans engagement.",
      },
      {
        q: "Quelles aides financières existent ?",
        a: "Les dispositifs de soutien au photovoltaïque (prime, tarif d'achat du surplus, fiscalité) évoluent régulièrement et certains exigent un installateur qualifié RGE. Plutôt que d'afficher des montants susceptibles d'être dépassés, nous vérifions les conditions en vigueur au moment de votre étude et les indiquons noir sur blanc dans la proposition.",
      },
      {
        q: "Les panneaux demandent-ils de l'entretien ?",
        a: "Peu. Il suffit de surveiller la production via l'application de suivi et de faire vérifier l'installation en cas de baisse anormale. Dans notre climat, la pluie assure l'essentiel du nettoyage.",
      },
    ],
  },
];

/** Sélection courte pour la page d'accueil. */
export const homeFaq: FaqItem[] = [
  faqGroups[0]!.items[0]!,
  faqGroups[1]!.items[0]!,
  faqGroups[1]!.items[1]!,
  faqGroups[2]!.items[0]!,
  faqGroups[2]!.items[1]!,
  faqGroups[3]!.items[1]!,
];
