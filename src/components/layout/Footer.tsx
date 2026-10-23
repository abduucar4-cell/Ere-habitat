import Link from "next/link";
import { footerNav } from "@/content/nav";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { PhoneLink } from "./PhoneLink";
import { ConsentReopen } from "@/components/consent/ConsentReopen";

function Col({ title, links }: { title: string; links: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <div>
      <h2 className="eyebrow text-white/60">{title}</h2>
      <ul className="mt-5 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[0.94rem] text-white/80 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink pb-28 text-white sm:pb-0">
      <div className="container-x grid gap-14 py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo inverted />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/70">
            Solutions photovoltaïques et batteries de stockage pour les particuliers et les professionnels du Calvados.
          </p>
          <address className="mt-8 space-y-1.5 text-[0.95rem] not-italic text-white/80">
            <p>
              {site.address.postalCode} {site.address.city} — {site.address.department}
            </p>
            <p>
              <PhoneLink location="footer" className="hover:text-white">
                {site.contact.phoneDisplay}
              </PhoneLink>
            </p>
            <p>
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                {site.contact.email}
              </a>
            </p>
            <p className="text-white/60">{site.contact.hours}</p>
          </address>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
          <Col title="Solutions" links={footerNav.solutions} />
          <Col title="Prix & devis" links={footerNav.prix} />
          <Col title="Zone d'intervention" links={footerNav.local} />
          <Col title="ERE Habitat" links={footerNav.entreprise} />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Tous droits réservés.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <ConsentReopen />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
