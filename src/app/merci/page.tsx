import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Demande envoyée | ERE Habitat",
  description: "Votre demande a bien été transmise à ERE Habitat.",
  path: "/merci/",
  noindex: true,
});

export default function ThanksPage() {
  return (
    <section className="container-x flex min-h-[70vh] items-center py-20">
      <div className="mx-auto max-w-2xl text-center">
        <CheckCircle2 className="mx-auto size-12 text-leaf" aria-hidden="true" strokeWidth={1.4} />
        <h1 className="mt-6 text-[clamp(2rem,1.6rem+1.6vw,3rem)] leading-tight text-ink">Merci, votre demande est bien envoyée.</h1>
        <p className="mt-5 text-lg text-slate">
          Un interlocuteur d&apos;{site.name} vous recontacte rapidement pour faire le point sur votre projet. Pensez à préparer vos
          dernières factures d&apos;électricité.
        </p>
        <ol className="mx-auto mt-10 max-w-md space-y-3 text-left text-ink-700">
          <li className="flex gap-3"><span className="font-mono text-sm text-slate">01</span> Premier échange téléphonique</li>
          <li className="flex gap-3"><span className="font-mono text-sm text-slate">02</span> Visite technique à votre domicile</li>
          <li className="flex gap-3"><span className="font-mono text-sm text-slate">03</span> Proposition détaillée et sans engagement</li>
        </ol>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href="/" variant="secondary">Retour à l&apos;accueil</LinkButton>
          <LinkButton href="/blog/">Lire nos conseils</LinkButton>
        </div>
        <p className="mt-8 text-sm text-slate">
          Une urgence ? <a href={site.contact.phoneHref} className="underline">{site.contact.phoneDisplay}</a>
        </p>
      </div>
    </section>
  );
}
