import type { ReactNode } from "react";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { PhoneLink } from "@/components/layout/PhoneLink";
import type { PhotoKey } from "@/content/photos";
import { site } from "@/lib/site";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  points,
  cta,
  aside,
  photo,
}: {
  crumbs: Array<{ name: string; path: string }>;
  eyebrow: string;
  title: string;
  lead?: string;
  points?: string[];
  cta?: { label: string; href: string };
  aside?: ReactNode;
  photo?: PhotoKey;
}) {
  return (
    <section className="relative overflow-hidden bg-mist">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 size-[460px] rounded-full bg-sun/20 blur-3xl" />
      <div className="container-x relative py-10 md:py-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className={photo ? "lg:col-span-7" : "lg:col-span-8"}>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-leaf">
              <span aria-hidden="true" className="size-2 rounded-full bg-sun" />
              {eyebrow}
            </p>
            <h1 className="mt-5 text-[clamp(2.1rem,1.5rem+2.2vw,3.4rem)] leading-[1.06] tracking-[-0.032em] text-ink">{title}</h1>
            {lead ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate md:text-xl">{lead}</p> : null}
            {points?.length ? (
              <ul className="mt-6 flex flex-col gap-2 text-[0.95rem] text-ink-700 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="flex size-5 items-center justify-center rounded-full bg-leaf text-white">
                      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            ) : null}
            {cta ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LinkButton href={cta.href} size="lg">
                  {cta.label} <ArrowRight className="size-4" aria-hidden="true" />
                </LinkButton>
                <PhoneLink
                  location="page-hero"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-5 font-medium text-ink hover:bg-leaf-50"
                >
                  <Phone className="size-4 text-leaf" aria-hidden="true" /> {site.contact.phoneDisplay}
                </PhoneLink>
              </div>
            ) : null}
          </div>
          {aside ??
            (photo ? (
              <div className="lg:col-span-5">
                <Photo name={photo} priority ratio="aspect-[4/3]" sizes="(min-width: 1024px) 40vw, 100vw" className="shadow-[0_30px_60px_-30px_rgba(19,41,29,0.5)]" />
              </div>
            ) : null)}
        </div>
      </div>
    </section>
  );
}
