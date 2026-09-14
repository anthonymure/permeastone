"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /**
   * Amplitude du décalage vertical en px, appliquée symétriquement
   * (l'élément part à `+offset` et remonte jusqu'à `-offset` pendant sa
   * traversée de l'écran). Volontairement modeste par défaut — un léger
   * différentiel de vitesse avec le texte qui l'entoure, jamais un effet de
   * parallax marqué façon site vitrine générique (§5/§11).
   */
  offset?: number;
};

/**
 * Léger différentiel de vitesse au scroll (scrub), pour donner de la
 * profondeur continue aux photos qui n'ont pas de mouvement de caméra dédié
 * (contrairement à `ScrollZoom`, réservé aux scènes où le brief décrit
 * explicitement un rapprochement, §5 étape 2). Incarne le contraste
 * Surface/Profondeur du territoire visuel (§2) : la photo semble posée sur
 * un plan légèrement différent du texte, plutôt que collée à la page.
 *
 * Comme `ScrollZoom`, asservi au scroll plutôt qu'à une durée fixe — le
 * mouvement avance et recule exactement avec le défilement, jamais en roue
 * libre (§5/§11).
 */
export function Parallax({ children, className, offset = 28 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: offset },
        {
          y: -offset,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [offset]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
