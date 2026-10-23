import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
  tone = "white",
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "white" | "mist" | "ink";
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-20 md:py-28",
        tone === "mist" && "bg-mist",
        tone === "ink" && "bg-ink text-white",
        className,
      )}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

/** En-tête de section : index technique en mono + titre + chapô. */
export function SectionHeading({
  label,
  title,
  intro,
  id,
  align = "left",
  inverted = false,
  className,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "split";
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "split" && "grid gap-6 md:grid-cols-12 md:items-end",
        className,
      )}
    >
      <div className={cn(align === "split" && "md:col-span-7")}>
        <p
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-leaf ring-1 ring-leaf-100",
            inverted && "bg-white/10 text-sun ring-white/15",
          )}
        >
          <span aria-hidden="true" className={cn("size-2 rounded-full bg-sun", inverted && "bg-sun")} />
          {label}
        </p>
        <h2 id={id} className={cn("mt-5 text-h2 text-ink", inverted && "text-white")}>
          {title}
        </h2>
      </div>
      {intro ? (
        <div className={cn("text-lg text-slate", align === "split" ? "md:col-span-5" : "mt-5 max-w-2xl", inverted && "text-white/75")}>
          {intro}
        </div>
      ) : null}
    </div>
  );
}
