/**
 * Photos d'illustration — banque Unsplash (licence Unsplash : usage commercial
 * autorisé, sans attribution obligatoire). Elles illustrent le propos et ne sont
 * PAS présentées comme des réalisations d'ERE Habitat.
 * Remplacer progressivement par de vraies photos de chantiers (voir content/proof.ts).
 */
export type Photo = { src: string; alt: string; page: string };

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80`;

export const photos = {
  heroHouses: {
    src: u("1730807908064-c087959dd52c"),
    alt: "Maisons en brique avec panneaux solaires en toiture et jardins verdoyants sous un ciel bleu",
    page: "https://unsplash.com/photos/yxiP843xyrI",
  },
  slateRoof: {
    src: u("1655300256335-beef51a914fe"),
    alt: "Maison au toit d'ardoise équipée de panneaux photovoltaïques noirs",
    page: "https://unsplash.com/photos/Ja8t8nJN2I4",
  },
  installers: {
    src: u("1660330589243-4c640d878052"),
    alt: "Installateurs posant des panneaux solaires sur un toit",
    page: "https://unsplash.com/photos/pIcseKMisrs",
  },
  batteryWall: {
    src: u("1780445392417-68b9dccc45f2"),
    alt: "Onduleur et batteries de stockage solaire fixés au mur d'un local technique",
    page: "https://unsplash.com/s/photos/home-battery-storage",
  },
  evGarage: {
    src: u("1791221254344-c196eadb6110"),
    alt: "Voiture électrique dans un garage avec une borne de recharge murale",
    page: "https://unsplash.com/s/photos/home-battery-storage",
  },
  gardenHouse: {
    src: u("1655300283246-1ef0317a565d"),
    alt: "Maison individuelle avec panneaux solaires, entourée d'un jardin fleuri",
    page: "https://unsplash.com/photos/gqpuuF3a2tY",
  },
  tileRoof: {
    src: u("1780445392792-556e5609c5ab"),
    alt: "Panneaux solaires installés sur un toit résidentiel en tuiles",
    page: "https://unsplash.com/photos/VAegToqdX3A",
  },
  normanHouse: {
    src: u("1692098074912-a6c4183b6550"),
    alt: "Maison normande à colombages",
    page: "https://unsplash.com/s/photos/normandie-campagne",
  },
  bocage: {
    src: u("1688054004870-b6057c0020b2"),
    alt: "Vaches dans un pré verdoyant du bocage normand",
    page: "https://unsplash.com/s/photos/normandie-campagne",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
