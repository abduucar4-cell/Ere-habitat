"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Monte son contenu lorsqu'il approche de la zone visible.
 * Diffère le JavaScript des formulaires et du simulateur (sous la ligne de flottaison)
 * pour améliorer LCP et INP. La réservation de hauteur évite tout décalage (CLS).
 */
export function LazyMount({ children, minHeight, label }: { children: ReactNode; minHeight: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={show ? undefined : { minHeight }} aria-busy={!show}>
      {show ? children : <span className="sr-only">{label}…</span>}
    </div>
  );
}
