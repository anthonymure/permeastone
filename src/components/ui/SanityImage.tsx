import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { SanityImageValue } from "@/sanity/lib/queries";

import { PlaceholderImage } from "./PlaceholderImage";

type SanityImageProps = {
  /** Image Sanity (peut être vide tant que les vraies photos ne sont pas reçues, §4). */
  image?: SanityImageValue;
  /** Ratio largeur/hauteur — omis pour les scènes en plein cadre (h-full/w-full). */
  ratio?: string;
  /** Repère éditorial affiché uniquement sur le placeholder. */
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Affiche la photo Sanity si l'éditeur l'a renseignée, sinon retombe sur
 * `PlaceholderImage` (§4) — permet de brancher les vraies photos éditoriales
 * sans jamais retoucher la mise en page des scènes.
 */
export function SanityImage({
  image,
  ratio,
  label,
  className,
  sizes = "100vw",
  priority,
}: SanityImageProps) {
  if (!image?.asset) {
    return <PlaceholderImage ratio={ratio} label={label} className={className} />;
  }

  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`.trim()}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <Image
        src={urlFor(image).width(1920).fit("max").auto("format").url()}
        alt={image.alt || label || ""}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={
          image.hotspot
            ? { objectPosition: `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` }
            : undefined
        }
      />
    </div>
  );
}
