import type { ReactNode } from "react";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { PhoneLink } from "@/components/layout/PhoneLink";
import { site } from "@/lib/site";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  points,
  cta,
  aside,
}: {
  crumbs: Array<{ name: string; path: string }>;
  eyebrow: string;
  title: string;
  lead?: string;
  points?: string[];
  cta?: { label: string; href: string };
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,#eceef0_1px,transparent_1px),linear-gradient(to_bottom,#eceef0_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_left,black,transparent_70%)]"
      />
      <div className="container-x relative py-10 md:py-16">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-5 text-[clamp(2.1rem,1.5rem+2.2vw,3.4rem)] leading-[1.06] tracking-[-0.032em] text-ink">{title}</h1>
            {lead ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate md:text-xl">{lead}</p> : null}
            {cta ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LinkButton href={cta.href} size="lg">
                  {cta.label} <ArrowRight className="size-4" aria-hidden="true" />
                </LinkButton>
                <PhoneLink location="page-hero" className="inline-flex h-13 items-center justify-center gap-2 rounded-full px-5 font-medium text-ink hover:bg-mist">
                  <Phone className="size-4 text-leaf" aria-hidden="true" /> {site.contact.phoneDisplay}
                </PhoneLink>
              </div>
            ) : null}
          </div>
          {aside ??
            (points?.length ? (
              <div className="lg:col-span-4 lg:col-start-9">
                <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
                  <p className="eyebrow">En bref</p>
                  <ul className="mt-4 space-y-3">
                    {points.map((p) => (
                      <li key={p} className="flex gap-3 text-ink-700">
                        <Check className="mt-1 size-4 shrink-0 text-leaf" strokeWidth={2.4} aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null)}
        </div>
      </div>
    </section>
  );
}
