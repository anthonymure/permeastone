/**
 * Variables d'environnement Sanity, centralisées et validées ici plutôt
 * que lues via `process.env` dispersé dans le code (voir CLAUDE.md §6/§11).
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-09-14";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Variable d'environnement manquante : NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Variable d'environnement manquante : NEXT_PUBLIC_SANITY_PROJECT_ID",
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
