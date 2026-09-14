import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/**
 * Espacement vertical généreux entre les sections (voir CLAUDE.md §5 —
 * homepage aérée, beaucoup d'espace négatif).
 *
 * `cn` (tailwind-merge) plutôt qu'une simple concaténation : un simple
 * gabarit littéral laissait `md:py-32` (défini ici) l'emporter en cascade
 * CSS sur un override `pt-8`/`pt-16` passé par une page, à partir du
 * breakpoint `md` — l'espace au-dessus de chaque section restait bien plus
 * grand que voulu (constaté sur /notre-approche entre l'intro et les
 * étapes). `cn` résout le conflit par propriété et garde l'override.
 */
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-24 md:py-32", className)} {...props} />;
}
