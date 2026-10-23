import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { realisations, reviews } from "@/content/proof";

/** Galerie : ne s'affiche que s'il existe de véritables réalisations. */
export function Realisations({ limit = 3 }: { limit?: number }) {
  if (realisations.length === 0) return null;
  return (
    <Section labelledBy="real-title">
      <SectionHeading id="real-title" label="Réalisations" title="Des installations réalisées dans le Calvados." align="split" />
      <ul className="grid gap-6 md:grid-cols-3">
        {realisations.slice(0, limit).map((r) => (
          <li key={r.slug} className="group">
            <div className="overflow-hidden rounded-[var(--radius-card)] bg-mist">
              <Image
                src={r.image.src}
                alt={r.image.alt}
                width={r.image.width}
                height={r.image.height}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <p className="eyebrow mt-4">
              {r.city} · {r.system}
            </p>
            <h3 className="mt-2 text-lg text-ink">{r.title}</h3>
          </li>
        ))}
      </ul>
      <Link href="/nos-realisations/" className="mt-8 inline-block font-medium text-ink underline underline-offset-4">
        Voir toutes les réalisations
      </Link>
    </Section>
  );
}

/** Avis : ne s'affichent que s'ils sont authentiques et renseignés. */
export function Reviews() {
  if (reviews.length === 0) return null;
  return (
    <Section tone="mist" labelledBy="reviews-title">
      <SectionHeading id="reviews-title" label="Avis clients" title="Ce qu'en disent nos clients." />
      <ul className="grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <li key={r.author + r.date} className="rounded-[var(--radius-card)] border border-line bg-white p-7">
            <p className="flex gap-0.5" aria-label={`${r.rating} sur 5`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className={`size-4 ${i < r.rating ? "fill-ink text-ink" : "text-line-strong"}`} aria-hidden="true" />
              ))}
            </p>
            <blockquote className="mt-4 text-ink-700">“{r.text}”</blockquote>
            <p className="mt-5 text-sm text-slate">
              {r.author}
              {r.city ? `, ${r.city}` : ""} · {r.source}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
