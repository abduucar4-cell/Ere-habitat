"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, Phone, X } from "lucide-react";
import { mainNav } from "@/content/nav";
import { site } from "@/lib/site";
import { buttonClasses } from "@/components/ui/Button";
import { PhoneLink } from "./PhoneLink";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Rendu dans <body> : le flou (backdrop-filter) du header piégerait un panneau fixe.
  const panelEl = (
      <div
        id={panelId}
        className="fixed inset-x-0 top-[72px] bottom-0 z-[60] overflow-y-auto border-t border-line bg-white"
      >
        <nav
          aria-label="Navigation mobile"
          className="container-x py-6"
          onClick={(e) => {
            // Fermer le menu lorsqu'un lien est suivi
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <ul className="divide-y divide-line">
            {mainNav.map((item) => (
              <li key={item.href} className="py-3">
                <Link href={item.href} className="block py-1 font-display text-xl text-ink">
                  {item.label}
                </Link>
                {"children" in item ? (
                  <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block py-1.5 text-[0.95rem] text-slate">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link href="/devis-panneaux-solaires/" className={buttonClasses("primary", "lg", "w-full")}>
              Obtenir mon devis gratuit
            </Link>
            <PhoneLink className={buttonClasses("secondary", "lg", "w-full")} location="mobile-menu">
              <Phone className="size-4" aria-hidden="true" /> {site.contact.phoneDisplay}
            </PhoneLink>
          </div>
        </nav>
      </div>
  );

  return (
    <div className="xl:hidden">
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-mist"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      {open ? createPortal(panelEl, document.body) : null}
    </div>
  );
}
