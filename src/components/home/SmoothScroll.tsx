"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Smooth scroll (Lenis) synchronisé avec GSAP ScrollTrigger (voir CLAUDE.md
 * §6) : Lenis pilote le défilement physique du site, ScrollTrigger s'aligne
 * dessus via `gsap.ticker` pour que les séquences de la homepage narrative
 * (§5) restent précises au pixel près.
 *
 * Placé dans le layout du groupe `(site)` uniquement : `/studio` garde son
 * propre défilement natif.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
