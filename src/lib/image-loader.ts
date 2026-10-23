/**
 * Chargeur d'images next/image.
 * - Photos Unsplash : redimensionnées et converties (AVIF/WebP) directement par le CDN Unsplash.
 * - Images locales : servies telles quelles (à placer optimisées dans /public).
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    return url.toString();
  }
  return src;
}
