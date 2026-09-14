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
  /**
   * Joue l'apparition au montage plutôt qu'au scroll — réservé au contenu
   * déjà visible au chargement (ex. le titre de SceneExperience, ancré en
   * bas du premier écran). Sans ça, le déclencheur "top 85%" attend que
   * l'élément franchisse ce seuil en scrollant, ce qu'un contenu déjà
   * affiché à l'écran au chargement (scrollY = 0) ne fait jamais tant que
   * l'utilisateur n'a pas bougé — le texte resterait invisible en
   * permanence pour un premier visiteur qui ne scrolle pas encore (§5/§11).
   */
  immediate?: boolean;
};

/**
 * Apparition au scroll, déclenchée une seule fois par élément puis rejouée
 * en sens inverse si on remonte — jamais d'effet gratuit, seulement de quoi
 * guider la lecture ou, pour "mask", marquer une rupture (§5/§11).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  variant = "fade",
  immediate = false,
}: RevealProps) {
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
            ...(immediate
              ? {}
              : {
                  scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                  },
                }),
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
          ...(immediate
            ? {}
            : {
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }),
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, y, variant, immediate]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
