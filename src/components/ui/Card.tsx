import type { ComponentProps } from "react";

/**
 * Chrome de carte commun aux grilles de contenu (Solutions, Applications,
 * Réalisations, Notre approche) — un contour sobre et un fond légèrement
 * teinté sable, jamais une ombre portée ou un relief marqué (§5/§11 : la
 * retenue plutôt que la quantité d'effets). Le contenu (image, titres,
 * texte, badges) reste composé par chaque appelant : ce composant n'est
 * que l'habillage.
 */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-lg border border-sand/60 bg-sand/10 transition-colors duration-300 hover:border-primary/30 ${className ?? ""}`.trim()}
      {...props}
    />
  );
}

/** Zone de contenu texte d'une carte — espacement interne cohérent. */
export function CardBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`flex flex-1 flex-col gap-2 p-6 ${className ?? ""}`.trim()}
      {...props}
    />
  );
}
