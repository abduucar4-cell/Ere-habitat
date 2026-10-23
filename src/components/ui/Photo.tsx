import Image from "next/image";
import { photos, type PhotoKey } from "@/content/photos";
import { cn } from "@/lib/utils";

/** Photo d'illustration arrondie, au ratio fixe (pas de décalage de mise en page). */
export function Photo({
  name,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  ratio = "aspect-[4/3]",
}: {
  name: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  ratio?: string;
}) {
  const p = photos[name];
  return (
    <div className={cn("relative overflow-hidden rounded-[var(--radius-card)] bg-leaf-50", ratio, className)}>
      <Image src={p.src} alt={p.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
