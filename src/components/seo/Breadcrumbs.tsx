import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: Array<{ name: string; path: string }> }) {
  const all = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-slate">
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((it, i) => {
          const last = i === all.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {it.name}
                </span>
              ) : (
                <>
                  <Link href={it.path} className="hover:text-ink">
                    {it.name}
                  </Link>
                  <ChevronRight className="size-3.5" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
