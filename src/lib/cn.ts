import { twMerge } from "tailwind-merge";

/**
 * Fusionne des classes Tailwind en résolvant les conflits par propriété
 * (ex. `py-24 md:py-32` + `pt-8` ne doit garder que le bon `padding-top`,
 * pas les deux en cascade CSS — voir `Section`, qui override son padding
 * vertical par défaut au cas par cas selon la page).
 */
export function cn(...classes: Array<string | undefined | null | false>) {
  return twMerge(classes.filter(Boolean).join(" "));
}
