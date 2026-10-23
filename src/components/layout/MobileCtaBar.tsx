import Link from "next/link";
import { FileText, Phone } from "lucide-react";
import { PhoneLink } from "./PhoneLink";

/** Barre d'action fixe en bas d'écran sur mobile : appel + devis. */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:hidden">
      <div className="grid grid-cols-2 gap-2">
        <PhoneLink
          location="mobile-bar"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong text-[0.95rem] font-medium text-ink"
        >
          <Phone className="size-4 text-leaf" aria-hidden="true" /> Appeler
        </PhoneLink>
        <Link
          href="/devis-panneaux-solaires/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-leaf text-[0.95rem] font-medium text-white"
        >
          <FileText className="size-4" aria-hidden="true" /> Devis gratuit
        </Link>
      </div>
    </div>
  );
}
