"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type MethodConnectorProps = {
  /** Décalage en secondes — calé sur le stagger des étapes qu'il relie. */
  delay?: number;
};

/**
 * Trait qui relie deux étapes de la méthode (`SceneMethod`) — se dessine au
 * scroll, dans le même rythme que le numéro qui le précède, plutôt que
 * d'apparaître d'un bloc. Sert « le sol relie » (§2) : sans lui, les six
 * étapes flottent sans qu'aucun fil ne les tienne ensemble — pas un effet
 * décoratif ajouté après coup (§5/§11).
 *
 * Réservé au `lg`+ : une seule ligne n'a de sens que sur la rangée à six
 * colonnes ; en dessous, les étapes s'empilent sur plusieurs lignes et une
 * ligne unique n'y raconterait plus rien.
 */
export function MethodConnector({ delay = 0 }: MethodConnectorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          delay,
          ease: "power2.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="mt-[18px] hidden h-px flex-1 self-start bg-primary/25 lg:block"
    />
  );
}
