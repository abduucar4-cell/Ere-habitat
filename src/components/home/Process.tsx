import { Section, SectionHeading } from "@/components/ui/Section";

const steps = [
  { t: "Demande d'étude", d: "Formulaire, simulateur ou appel : nous revenons vers vous pour un premier échange sur votre projet." },
  { t: "Analyse du logement et de la consommation", d: "Visite technique, relevé de toiture, ombrages, tableau électrique et analyse de vos consommations." },
  { t: "Proposition technique et commerciale", d: "Puissance, matériel, implantation, estimation de production à votre adresse et devis détaillé." },
  { t: "Organisation du projet et suivi", d: "Démarches administratives, planification de la pose par un installateur qualifié, mise en service et suivi." },
];

export function Process() {
  return (
    <Section labelledBy="process-title" className="bg-sun-100/60">
      <SectionHeading
        id="process-title"
        index="04"
        label="Fonctionnement"
        title="Quatre étapes, un seul interlocuteur."
        intro="Vous savez à chaque instant ce qui a été fait, ce qui reste à faire et qui intervient chez vous."
        align="split"
      />
      <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
        <span aria-hidden="true" className="absolute top-5 right-0 left-0 hidden border-t-2 border-dashed border-leaf-400/50 md:block" />
        <span aria-hidden="true" className="absolute top-0 bottom-0 left-5 border-l-2 border-dashed border-leaf-400/50 md:hidden" />
        {steps.map((s, i) => (
          <li key={s.t} className="relative pl-16 md:pl-0">
            <span className="absolute left-0 flex size-10 items-center justify-center rounded-full bg-sun font-display text-base font-bold text-ink shadow-[0_8px_20px_-10px_rgba(200,150,0,0.9)] md:relative">
              {i + 1}
            </span>
            <h3 className="text-[1.2rem] leading-snug text-ink md:mt-8">{s.t}</h3>
            <p className="mt-3 text-[0.98rem] text-slate">{s.d}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
