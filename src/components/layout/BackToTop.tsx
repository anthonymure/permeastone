"use client";

import { useEffect, useState } from "react";

/**
 * Bouton discret « remonter en haut » : n'apparaît qu'après un scroll
 * significatif, jamais imposé à l'écran (§5 — sobriété, pas d'effet
 * gratuit). Utilise l'instance Lenis exposée par `SmoothScroll` pour un
 * défilement cohérent avec le smooth scroll du site ; repli natif sinon
 * (ex. page affichée hors de ce provider).
 */
type BackToTopProps = {
  /** `microcopie.ariaRemonterHaut`. */
  ariaLabel?: string;
};

export function BackToTop({ ariaLabel }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel || "Remonter en haut de page"}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-anthracite/15 bg-offwhite/90 text-anthracite/60 shadow-sm backdrop-blur transition-all duration-500 hover:border-primary hover:text-primary ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M12 19V5" />
        <path d="M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
