import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/lib/site";
import { Photo } from "@/components/ui/Photo";

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
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        <Photo name="normanHouse" ratio="aspect-[16/9]" sizes="(min-width: 640px) 50vw, 100vw" />
        <Photo name="bocage" ratio="aspect-[16/9]" sizes="(min-width: 640px) 50vw, 100vw" />
      </div>
      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((f) => (
          <li key={f.href} className="group relative rounded-2xl border border-line bg-white p-5 transition-colors duration-300 hover:border-leaf-400 hover:bg-leaf-50">
            <Link href={f.href} className="flex items-start justify-between gap-6 after:absolute after:inset-0 after:content-['']">
              <span>
                <span className="block font-display text-xl text-ink">{f.name}</span>
                <span className="mt-1 block text-[0.95rem] text-slate">{f.note}</span>
              </span>
              <ArrowUpRight className="mt-1 size-5 shrink-0 text-leaf transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
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
