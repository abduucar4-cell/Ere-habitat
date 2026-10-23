import Link from "next/link";
import { cn } from "@/lib/utils";

/** Pictogramme ERE Habitat (toit, colonnes, feuilles) — repris du logo d'origine. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="84 16 352 304" className={className} aria-hidden="true" focusable="false">
      <rect x="128" y="96" width="24" height="76" fill="#2F8F4E" />
      <polygon points="150,202 196,161 196,310 150,310" fill="#D7221F" />
      <polygon points="208,151 254,110 254,310 208,310" fill="#EB8235" />
      <polygon points="266,110 312,151 312,310 266,310" fill="#F4E70F" />
      <polygon points="324,161 370,202 370,310 324,310" fill="#009C6D" />
      <path d="M95 210 L260 65 L425 210" fill="none" stroke="#2F8F4E" strokeWidth="24" strokeLinecap="square" />
      <g transform="translate(345,126) rotate(-12)">
        <path d="M0 0 C -34 -30 -34 -80 0 -108 C 34 -80 34 -30 0 0 Z" fill="#4CB050" />
      </g>
      <g transform="translate(352,130) rotate(52) scale(0.82)">
        <path d="M0 0 C -34 -30 -34 -80 0 -108 C 34 -80 34 -30 0 0 Z" fill="#9BD13B" />
      </g>
    </svg>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-auto" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.15rem] font-bold tracking-[-0.02em] whitespace-nowrap", inverted ? "text-white" : "text-ink")}>
          ERE Habitat
          <span className="sr-only"> — accueil</span>
        </span>
        <span className={cn("mt-1 font-mono text-[0.58rem] tracking-[0.12em] whitespace-nowrap uppercase", inverted ? "text-white/70" : "text-slate")}>
          Étude · Rénovation · Énergie
        </span>
      </span>
    </Link>
  );
}
