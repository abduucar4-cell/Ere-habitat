import Link from "next/link";
import { ChevronDown, Phone } from "lucide-react";
import { mainNav } from "@/content/nav";
import { site } from "@/lib/site";
import { LinkButton } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { PhoneLink } from "./PhoneLink";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/85 backdrop-blur-xl supports-[backdrop-filter]:bg-white/75">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu
      </a>
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) =>
              "children" in item ? (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 whitespace-nowrap text-[0.94rem] text-ink-700 transition-colors hover:text-ink"
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 text-slate transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
                  </Link>
                  <div className="invisible absolute top-full left-0 pt-2 opacity-0 transition-all duration-300 ease-[var(--ease-out-soft)] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="w-64 rounded-2xl border border-line bg-white p-2 shadow-[0_24px_48px_-24px_rgba(12,23,38,0.25)]">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block rounded-xl px-3.5 py-2.5 text-[0.94rem] text-ink-700 transition-colors hover:bg-mist hover:text-ink">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className="rounded-full px-3.5 py-2 whitespace-nowrap text-[0.94rem] text-ink-700 transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <PhoneLink
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.94rem] font-medium whitespace-nowrap text-ink xl:inline-flex"
            location="header"
          >
            <Phone className="size-4 text-leaf" aria-hidden="true" />
            {site.contact.phoneDisplay}
          </PhoneLink>
          <LinkButton href="/devis-panneaux-solaires/" className="hidden sm:inline-flex" data-cta="header-devis">
            Devis gratuit
          </LinkButton>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
