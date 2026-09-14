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
 *
 * Retour client (« cartes cheap ») : la version précédente (dégradé + fine
 * barre de couleur en pied) ressemblait à un gabarit générique une fois
 * mélangée à de vraies photos dans une même grille. L'hexagone en filigrane
 * reprend la forme du monogramme de marque (§3) plutôt qu'un ornement
 * arbitraire — perceptible sans jamais concurrencer une vraie photo.
 */
export function PlaceholderImage({
  ratio = "4/3",
  label,
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative flex items-end overflow-hidden bg-gradient-to-br from-sage/60 via-sand/50 to-offwhite ${className ?? ""}`.trim()}
      style={{ aspectRatio: ratio }}
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 text-primary/10"
      >
        <polygon
          points="50,4 92,27 92,73 50,96 8,73 8,27"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      {label ? (
        <span className="relative font-sans text-[11px] uppercase tracking-[0.2em] text-anthracite/60 m-4">
          {label}
        </span>
      ) : null}
    </div>
  );
}
