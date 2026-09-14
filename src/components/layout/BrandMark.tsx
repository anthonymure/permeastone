import { urlFor } from "@/sanity/lib/image";
import type { SanityImageValue } from "@/sanity/lib/queries";

type BrandMarkProps = {
  /** `siteSettings.nomSite` — utilisé comme repli texte tant qu'aucun logo n'est renseigné (§4/§6). */
  nomSite?: string;
  /** `siteSettings.logo` (fond clair) — nav et footer sont toujours sur fond clair. */
  logo?: SanityImageValue;
  /** Hauteur du logo en pixels (le rendu texte s'y ajuste via la taille de police). */
  heightPx?: number;
  className?: string;
};

/**
 * Nom/logo de la marque, partagé par `Nav` et `Footer` (§11 — éviter de
 * dupliquer la logique « image si renseignée, sinon texte »). Le logo
 * vectoriel est disponible côté client (§4) mais pas encore chargé dans le
 * Studio au lancement : le texte `nomSite` reste le repli tant qu'il n'y a
 * pas d'image.
 */
export function BrandMark({ nomSite, logo, heightPx = 28, className }: BrandMarkProps) {
  if (logo?.asset) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- logo de marque, taille intrinsèque inconnue à l'avance (§4)
      <img
        src={urlFor(logo).height(heightPx * 2).fit("max").auto("format").url()}
        alt={logo.alt || nomSite || "PermeaStone"}
        style={{ height: heightPx }}
        className={`w-auto ${className ?? ""}`.trim()}
      />
    );
  }

  return (
    <span className={`font-serif tracking-tight text-anthracite ${className ?? ""}`.trim()}>
      {nomSite || "PermeaStone"}
    </span>
  );
}
