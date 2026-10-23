import { Section, SectionHeading } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";

const items = [
  { t: "Accompagnement personnalisé", d: "Un projet solaire se prépare avec vous : vos questions, vos contraintes, votre calendrier." },
  { t: "Étude adaptée à la consommation", d: "Nous partons de vos factures ou de votre courbe Linky, pas d'un kit standard." },
  { t: "Solutions adaptées aux besoins", d: "Panneaux seuls, batterie seule ou les deux : nous recommandons ce qui est utile, même si c'est moins." },
  { t: "Interlocuteur local", d: "Basés à Ifs, nous connaissons les toitures, l'urbanisme et le climat du Calvados." },
  { t: "Transparence des devis", d: "Matériel, références, démarches et intervenants : tout est écrit, poste par poste." },
  { t: "Suivi du projet", d: "De la déclaration en mairie à la mise en service, vous savez où en est votre dossier." },
];

export function WhyUs() {
  return (
    <Section labelledBy="why-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionHeading
            id="why-title"
            index="03"
            label="Pourquoi ERE Habitat"
            title="Un bureau d'étude avant d'être un vendeur."
            intro="ERE signifie Étude, Rénovation, Énergie. Notre rôle : concevoir le bon projet et le coordonner, avec des installateurs qualifiés pour la pose."
            className="mb-8 md:mb-8"
          />
          <Photo name="installers" ratio="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, 100vw" className="hidden lg:block" />
        </div>
        <ol className="grid border-t border-line sm:grid-cols-2 lg:col-span-8">
          {items.map((it, i) => (
            <li
              key={it.t}
              className={`border-b border-line py-8 sm:py-10 ${i % 2 === 0 ? "sm:pr-10" : "sm:border-l sm:pl-10"}`}
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-sun-100 font-display text-sm font-bold text-ink">{i + 1}</span>
              <h3 className="mt-4 text-[1.3rem] text-ink">{it.t}</h3>
              <p className="mt-3 text-slate">{it.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
