import { client } from "./client";

/**
 * Point d'entrée unique pour lire le contenu Sanity côté serveur.
 *
 * Revalidation temporisée (60s) pour l'instant ; à remplacer par une
 * revalidation à la demande (webhook Sanity → route Next.js) une fois cette
 * brique mise en place — voir CLAUDE.md §6, roadmap §8 phase 6/7. Centraliser
 * l'appel ici évite d'avoir à changer chaque composant à ce moment-là.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60 },
  });
}
