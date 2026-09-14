"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Décalage en secondes, pour échelonner plusieurs éléments d'une même scène. */
  delay?: number;
  /** Distance de départ en px — sobre par défaut (§5 : animations lentes, précises, rares). */
  y?: number;
  /**
   * "fade" (défaut) : apparition douce, utilisée partout.
   * "mask" : dévoilement par balayage (clip-path) — réservé à la seule
   * transition forte du récit (« Sous la surface », §5 étape 4), pour
   * qu'elle reste identifiable comme un moment de rupture, pas un fade de plus.
   */
  variant?: "fade" | "mask";
};

/**
 * Apparition au scroll, déclenchée une seule fois par élément puis rejouée
 * en sens inverse si on remonte — jamais d'effet gratuit, seulement de quoi
 * guider la lecture ou, pour "mask", marquer une rupture (§5/§11).
 */
export function Reveal({ children, className, delay = 0, y = 24, variant = "fade" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (variant === "mask") {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)", autoAlpha: 1 },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.6,
            delay,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
        return;
      }

      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, y, variant]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
