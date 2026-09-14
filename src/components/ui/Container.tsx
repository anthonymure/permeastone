import type { ComponentProps } from "react";

/**
 * Grille de base : largeur maximale + marges horizontales cohérentes,
 * réutilisée par la nav, le footer et les sections de contenu.
 */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className ?? ""}`.trim()}
      {...props}
    />
  );
}
