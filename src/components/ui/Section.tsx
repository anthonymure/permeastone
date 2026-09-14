import type { ComponentProps } from "react";

/**
 * Espacement vertical généreux entre les sections (voir CLAUDE.md §5 —
 * homepage aérée, beaucoup d'espace négatif).
 */
export function Section({ className, ...props }: ComponentProps<"section">) {
  return (
    <section className={`py-24 md:py-32 ${className ?? ""}`.trim()} {...props} />
  );
}
