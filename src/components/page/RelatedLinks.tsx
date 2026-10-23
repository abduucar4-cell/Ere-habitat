import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSeoPage } from "@/content/pages";

export function RelatedLinks({ slugs, title = "À consulter aussi" }: { slugs: string[]; title?: string }) {
  const pages = slugs.map((s) => getSeoPage(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  if (!pages.length) return null;
  return (
    <nav aria-labelledby="related-title" className="border-t border-line py-16">
      <div className="container-x">
        <h2 id="related-title" className="eyebrow text-ink">
          {title}
        </h2>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pages.map((p) => (
            <li key={p.slug} className="group relative bg-white p-6 transition-colors hover:bg-paper">
              <Link href={`/${p.slug}/`} className="flex h-full flex-col justify-between gap-6 after:absolute after:inset-0 after:content-['']">
                <span className="font-display text-[1.1rem] font-medium text-ink">{p.breadcrumb}</span>
                <span className="flex items-center justify-between text-sm text-slate">
                  {p.eyebrow}
                  <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
