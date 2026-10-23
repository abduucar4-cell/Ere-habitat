import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/lib/site";

const featured = [
  { name: "Caen et agglomération", href: "/panneaux-solaires-caen/", note: "Hérouville, Mondeville, Ifs, Fleury-sur-Orne" },
  { name: "Bayeux et le Bessin", href: "/panneaux-solaires-bayeux/", note: "Centre historique, longères, dépendances" },
  { name: "Lisieux et le Pays d'Auge", href: "/panneaux-solaires-lisieux/", note: "Colombages, tuiles plates, intégration" },
  { name: "Falaise et alentours", href: "/panneaux-solaires-falaise/", note: "Maisons, hangars, bâtiments agricoles" },
  { name: "Deauville et la Côte Fleurie", href: "/panneaux-solaires-deauville/", note: "Littoral, villas, résidences secondaires" },
  { name: "Tout le Calvados", href: "/panneaux-solaires-calvados/", note: "Climat, territoires et contraintes locales" },
];

export function AreaServed() {
  const others = site.areaServed.filter((c) => !["Caen", "Bayeux", "Lisieux", "Falaise", "Deauville"].includes(c));
  return (
    <Section labelledBy="area-title">
      <SectionHeading
        id="area-title"
        index="06"
        label="Zone d'intervention"
        title="Installateur solaire à Caen et dans tout le Calvados."
        intro={
          <>
            Basés à {site.address.city}, nous intervenons en priorité dans le Calvados. Manche, Orne, Eure et Seine-Maritime : chaque
            demande est étudiée.
          </>
        }
        align="split"
      />
      <ul className="grid border-t border-line md:grid-cols-2 lg:grid-cols-3">
        {featured.map((f) => (
          <li key={f.href} className="group relative border-b border-line py-6 md:odd:pr-8 lg:px-0 lg:pr-8">
            <Link href={f.href} className="flex items-start justify-between gap-6 after:absolute after:inset-0 after:content-['']">
              <span>
                <span className="block font-display text-xl text-ink">{f.name}</span>
                <span className="mt-1 block text-[0.95rem] text-slate">{f.note}</span>
              </span>
              <ArrowUpRight className="mt-1 size-5 shrink-0 text-slate transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-[0.95rem] text-slate">
        Également : {others.join(", ")}.
      </p>
    </Section>
  );
}
