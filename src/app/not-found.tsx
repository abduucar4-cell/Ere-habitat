import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] items-center py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Erreur 404</p>
        <h1 className="mt-5 text-[clamp(2.2rem,1.6rem+2vw,3.4rem)] leading-tight text-ink">Cette page n&apos;existe pas ou a été déplacée.</h1>
        <p className="mt-5 text-lg text-slate">Voici quelques pages qui pourraient vous intéresser :</p>
        <ul className="mt-6 space-y-2 text-ink">
          <li><Link className="underline underline-offset-4" href="/panneaux-solaires/">Panneaux solaires</Link></li>
          <li><Link className="underline underline-offset-4" href="/batterie-stockage-solaire/">Batteries de stockage</Link></li>
          <li><Link className="underline underline-offset-4" href="/panneaux-solaires-caen/">Panneaux solaires à Caen</Link></li>
          <li><Link className="underline underline-offset-4" href="/faq/">Questions fréquentes</Link></li>
        </ul>
        <LinkButton href="/" className="mt-10">Retour à l&apos;accueil</LinkButton>
      </div>
    </section>
  );
}
