"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ScrollZoomProps = {
  children: ReactNode;
  className?: string;
  /** Échelle de départ — légèrement resserrée pour suggérer un rapprochement (§5, étape 2). */
  from?: number;
  /** Échelle d'arrivée, atteinte quand la scène quitte le haut de l'écran. */
  to?: number;
  /** Bornes du scrub — par défaut réglées pour un resserrement à l'entrée de la scène. */
  start?: string;
  end?: string;
};

/**
 * Rapprochement progressif du cadrage, asservi au scroll (scrub) plutôt
 * qu'à une durée fixe : le zoom avance et recule exactement avec le
 * défilement, jamais en roue libre — sobre et fonctionnel (§5/§11).
 *
 * Réservé aux scènes où le brief décrit explicitement un mouvement de
 * caméra (« le cadrage se rapproche progressivement du sol », étape 2) —
 * ne pas dupliquer sur des scènes qui n'appellent pas cet effet.
 */
export function ScrollZoom({
  children,
  className,
  from = 1.12,
  to = 1,
  start = "top bottom",
  end = "top top",
}: ScrollZoomProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: from },
        {
          scale: to,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: true,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [from, to, start, end]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
