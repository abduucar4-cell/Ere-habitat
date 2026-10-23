import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { LazyQuickLeadForm } from "@/components/lazy";
import { PhoneLink } from "@/components/layout/PhoneLink";

export function FinalContact({ index = "08" }: { index?: string }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 md:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-ink">{index}</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            Contact
          </p>
          <h2 id="contact-title" className="mt-5 text-h2 text-ink">
            Parlons de votre projet.
          </h2>
          <p className="mt-6 max-w-md text-lg text-slate">
            Laissez vos coordonnées, nous vous rappelons pour un premier échange. Ou appelez-nous directement.
          </p>
          <PhoneLink
            location="contact-section"
            className="mt-10 inline-flex items-center gap-4 font-display text-[2rem] font-semibold tracking-[-0.03em] text-ink hover:text-leaf"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-leaf-50">
              <Phone className="size-5 text-leaf" aria-hidden="true" />
            </span>
            {site.contact.phoneDisplay}
          </PhoneLink>
          <ul className="mt-10 space-y-3 border-t border-line pt-8 text-ink-700">
            <li className="flex items-center gap-3">
              <Clock className="size-4 text-slate" aria-hidden="true" />
              {site.contact.hours}
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-slate" aria-hidden="true" />
              <a href={`mailto:${site.contact.email}`} className="hover:text-ink">
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-slate" aria-hidden="true" />
              {site.address.city} ({site.address.postalCode}), {site.address.department}
            </li>
          </ul>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-[0_32px_64px_-48px_rgba(12,23,38,0.4)] md:p-10">
            <h3 className="font-display text-[1.4rem] text-ink">Être rappelé gratuitement</h3>
            <p className="mt-1.5 mb-8 text-slate">Réponse par un interlocuteur basé à {site.address.city}.</p>
            <LazyQuickLeadForm idPrefix="home" />
          </div>
        </div>
      </div>
    </section>
  );
}
