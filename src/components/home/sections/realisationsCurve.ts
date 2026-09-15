/**
 * Grammaire visuelle partagée par les deux mises en scène du carrousel de
 * réalisations (`RealisationsCarousel`, piloté par le scroll sur
 * `/realisations`, et `RealisationsCarouselAuto`, en rotation continue sur
 * la homepage) : un vrai carrousel 3D en cercle. Chaque carte occupe une
 * position fixe sur le cercle (angle = index * angleStep, voir
 * `angleStepFor`) et ne bouge plus jamais individuellement — c'est l'anneau
 * entier qui tourne (au scroll ou en continu), la 3D CSS se charge du reste
 * nativement (§5 — « comme si elle décrivait un cercle »).
 *
 * Volontairement aucun zoom artificiel : la taille des cartes ne varie
 * jamais (pas de `scale`), seule la perspective CSS donne la profondeur —
 * une carte qui s'éloigne du centre recule et s'efface, elle ne grossit
 * jamais (§5/§11 — sobriété, pas d'effet gratuit).
 */

/** Angle (en degrés) entre deux cartes voisines, réparties à égale distance sur le cercle complet. */
export function angleStepFor(count: number): number {
  if (count <= 1) return 360;
  return 360 / count;
}

/**
 * Espace réel (en px) voulu entre deux cartes voisines une fois posées sur
 * le cercle — pas un simple `gap` entre cases, un vrai écart visible entre
 * les images telles qu'elles apparaissent à l'écran.
 */
export const REAL_GAP_PX = 96;

/**
 * Rayon du cercle (en px) : déduit de la largeur réelle des cartes, de
 * l'angle qui les sépare et de l'espace réel voulu (`REAL_GAP_PX`), par
 * simple trigonométrie sur la corde entre deux cartes voisines.
 */
export function radiusFor(cardWidth: number, angleStepDeg: number, gap = REAL_GAP_PX): number {
  const chord = cardWidth + gap;
  const halfAngleRad = (angleStepDeg * Math.PI) / 360;
  return chord / (2 * Math.sin(halfAngleRad));
}

/** Ramène un angle quelconque dans [-180, 180]. */
export function normalizeAngle(deg: number): number {
  let a = deg % 360;
  if (a > 180) a -= 360;
  if (a < -180) a += 360;
  return a;
}

/**
 * Opacité d'une carte selon son angle courant par rapport à la caméra (0° =
 * face à l'écran, au centre). Rejoint exactement 0 à 90°, là où
 * `backface-visibility: hidden` masque de toute façon la carte (elle
 * montrerait son dos) — l'opacité éteint la carte un peu avant ce point pour
 * une disparition douce plutôt qu'une coupure nette.
 */
export function opacityForAngle(deg: number): number {
  const rad = (deg * Math.PI) / 180;
  return Math.max(0, Math.min(1, Math.cos(rad) * 1.3));
}
