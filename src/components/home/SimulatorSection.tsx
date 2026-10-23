import { Section, SectionHeading } from "@/components/ui/Section";
import { LazySimulator } from "@/components/lazy";

export function SimulatorSection({ index = "05", title = "Estimez votre projet en deux minutes." }: { index?: string; title?: string }) {
  return (
    <Section id="simulateur" tone="mist" labelledBy="simulateur-title">
      <SectionHeading
        id="simulateur-title"
        index={index}
        label="Simulateur"
        title={title}
        intro="Un premier ordre de grandeur, calculé avec des hypothèses affichées et modifiables. Pour un résultat précis, l'étude reste indispensable."
        align="split"
      />
      <LazySimulator />
    </Section>
  );
}
