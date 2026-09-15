/**
 * Grammaire visuelle partagée par les deux mises en scène du carrousel de
 * réalisations (`RealisationsCarouselAuto`, en défilement continu sur la
 * homepage, et `RealisationsCarousel`, piloté par le scroll sur
 * `/realisations`) : un ruban de cartes disposées en arc doux — celles
 * proches du centre du ruban descendent légèrement, celles en bord
 * remontent, comme posées au creux d'une vague. Toutes les cartes restent
 * visibles en continu (contrairement à un carrousel classique une-carte-à-
 * la-fois), seule leur position verticale sur l'arc change — jamais de
 * rotation, sur demande explicite du client (les cartes restent bien
 * droites).
 *
 * Volontairement subtil : une amplitude faible, jamais un effet gratuit
 * (§5/§11 — sobriété, pas de 3D qui n'explique rien).
 */

/** Amplitude verticale max de l'arc, en px. */
export const ARC_DEPTH_PX = 96;

/**
 * Décalage vertical à appliquer à une carte selon son écart horizontal au
 * centre du ruban, normalisé dans [-1, 1] (-1 = bord gauche, 0 = centre,
 * 1 = bord droit).
 */
export function arcOffsetFor(dx: number): number {
  const clamped = Math.max(-1, Math.min(1, dx));
  return ARC_DEPTH_PX * (1 - clamped * clamped);
}
