type SceneCaptionProps = {
  children: string;
  className?: string;
};

/**
 * Légende éditoriale en coin d'une scène plein cadre — repère discret
 * (lieu, moment, ambiance) posé sur la photo, à la manière d'une légende de
 * reportage plutôt que d'un habillage marketing. Donne à chaque grande
 * scène une texture éditoriale permanente, qu'elle affiche un placeholder
 * ou la photo définitive (§4) — contrairement au repère du placeholder
 * (`PlaceholderImage`), qui disparaît dès qu'une vraie photo est branchée.
 *
 * Réservé aux scènes plein cadre qui ouvrent/referment le récit
 * (`SceneExperience`, `SceneLoop`) — pas un habillage à généraliser à
 * toutes les scènes (§5 : rare et fonctionnel).
 */
export function SceneCaption({ children, className }: SceneCaptionProps) {
  return (
    <p
      className={`flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.25em] text-offwhite/60 ${className ?? ""}`.trim()}
    >
      <span aria-hidden className="h-px w-6 bg-offwhite/40" />
      {children}
    </p>
  );
}
