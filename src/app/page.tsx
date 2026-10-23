import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { ExistingBattery } from "@/components/home/ExistingBattery";
import { WhyUs } from "@/components/home/WhyUs";
import { Process } from "@/components/home/Process";
import { SimulatorSection } from "@/components/home/SimulatorSection";
import { AreaServed } from "@/components/home/AreaServed";
import { Realisations, Reviews } from "@/components/home/Proof";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalContact } from "@/components/home/FinalContact";

export const metadata: Metadata = buildMetadata({
  title: "Panneaux solaires et batteries à Caen et dans le Calvados | ERE Habitat",
  description:
    "Panneaux photovoltaïques et batteries de stockage à Caen et dans le Calvados. Étude personnalisée, devis gratuit et sans engagement, interlocuteur local basé à Ifs.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ExistingBattery />
      <WhyUs />
      <Process />
      <SimulatorSection />
      <AreaServed />
      <Realisations />
      <Reviews />
      <FaqSection />
      <FinalContact />
    </>
  );
}
