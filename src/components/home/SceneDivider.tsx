"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Repère de transition entre deux étapes du récit homepage (§5) — un trait
 * qui se dessine au scroll avec un petit repère central, plutôt qu'un
 * simple espace vide entre deux scènes. Incarne « le sol relie » (§2 :
 * territoire verbal — lien, fondation, continuité) au niveau de la mise en
 * page elle-même, pas seulement du texte.
 *
 * Réservé aux ruptures de rythme du récit (une scène claire → une scène
 * sombre, une scène émotionnelle → une scène méthode) — jamais un ornement
 * répété entre chaque section (§5/§11 : fonction claire, animations rares).
 */
export function SceneDivider() {
  const lineRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const mark = markRef.current;
    if (!line || !mark) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: line,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
      tl.fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power2.inOut" },
      ).fromTo(
        mark,
        { autoAlpha: 0, scale: 0.3 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
        "-=0.3",
      );
    }, line);

    return () => ctx.revert();
  }, []);

  return (
    <div aria-hidden className="relative flex items-center justify-center bg-offwhite py-10">
      <div ref={lineRef} className="h-px w-full max-w-xs origin-center bg-primary/20" />
      <div ref={markRef} className="absolute h-2 w-2 rotate-45 bg-sand" />
    </div>
  );
}
