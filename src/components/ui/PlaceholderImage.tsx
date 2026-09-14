type PlaceholderImageProps = {
  /** Ratio largeur/hauteur, ex. "16/9", "4/5" — voir CLAUDE.md §4. */
  ratio?: string;
  /** Repère éditorial discret (ex. "Piscine — vue d'ensemble"). */
  label?: string;
  className?: string;
};

/**
 * Substitut sobre en attendant les vraies photos éditoriales (§4) : un
 * dégradé dans la palette de marque plutôt qu'une image de stock —
 * conserve le bon ratio pour ne pas avoir à retoucher la mise en page
 * quand les photos définitives arriveront (via Sanity).
 */
export function PlaceholderImage({
  ratio = "4/3",
  label,
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative flex items-end overflow-hidden bg-gradient-to-br from-sage/40 via-sand/30 to-offwhite ${className ?? ""}`.trim()}
      style={{ aspectRatio: ratio }}
    >
      {label ? (
        <span className="m-4 font-sans text-[11px] uppercase tracking-[0.2em] text-anthracite/50">
          {label}
        </span>
      ) : null}
    </div>
  );
}
