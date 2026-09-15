"use client";

import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { SanityImage } from "@/components/ui/SanityImage";
import type { RealisationCardDoc } from "@/sanity/lib/queries";
import { arcOffsetFor } from "@/components/home/sections/realisationsArc";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Vitesse de défilement automatique, en pixels par seconde. */
const AUTOPLAY_SPEED_PX_S = 44;

/** Plafond de répétitions du jeu de cartes, pour éviter un nombre de nœuds
 *  DOM démesuré sur un écran ultra-large avec très peu de réalisations. */
const MAX_REPEAT_COUNT = 16;

/**
 * Nombre de répétitions du jeu de cartes nécessaire pour qu'un seul jeu
 * couvre au moins la largeur visible (+ une marge d'un jeu complet, pour
 * qu'une deuxième copie soit toujours prête à entrer dans le cadre pendant
 * le défilement).
 */
function neededRepeats(currentRepeatCount: number, oneSetWidth: number, wrapperWidth: number): number {
  if (oneSetWidth <= 0 || oneSetWidth >= wrapperWidth) return currentRepeatCount;
  // `oneSetWidth` est déjà la largeur d'un seul jeu (indépendante du nombre
  // de répétitions actuel) : pas besoin de la multiplier par
  // `currentRepeatCount`, sous peine de faire diverger le calcul.
  const needed = Math.ceil(wrapperWidth / oneSetWidth) + 1;
  return Math.min(MAX_REPEAT_COUNT, Math.max(currentRepeatCount, needed));
}

type RealisationsCarouselAutoProps = {
  items: RealisationCardDoc[];
};

/**
 * Étape 8 — Les réalisations (§5), variante homepage : un ruban de cartes
 * défilant seul, disposées en arc doux (les cartes proches du centre
 * descendent légèrement, celles en bord remontent) — direction validée avec
 * le client sur les exemples « curved carousel ». Toutes les cartes restent
 * visibles en continu (contrairement à `RealisationsCarousel`, l'anneau 3D
 * piloté par le scroll sur `/realisations`, où une seule carte fait face à
 * la caméra à la fois).
 *
 * Le jeu de cartes est dupliqué (au moins une fois, plus si besoin pour
 * couvrir toute la largeur visible — voir `repeatCount`) pour boucler sans
 * couture : dès que le ruban a défilé la largeur d'un jeu complet, GSAP le
 * ramène exactement à son point de départ (repeat: -1 sur un tween de
 * 0 → -oneSetWidth), sans jamais laisser apparaître d'espace blanc.
 */
export function RealisationsCarouselAuto({ items }: RealisationsCarouselAutoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  // Distinct de l'état "en pause au survol/toucher" : reflète le choix
  // explicite de l'utilisateur via le bouton, pour qu'une interaction
  // passagère n'annule pas ce choix.
  const userPausedRef = useRef(false);
  const [canToggle, setCanToggle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  // Nombre de fois où le jeu de cartes est répété dans le ruban. Doit
  // suffire à ce qu'un seul jeu couvre au moins la largeur visible : sinon,
  // au moment du bouclage GSAP, le ruban n'a pas encore assez de contenu
  // pour remplir la fin de l'écran et on voit un espace blanc. Ajusté
  // dynamiquement ci-dessous selon le nombre réel de réalisations et la
  // largeur de l'écran (peu de cartes ou grand écran => plus de répétitions).
  const [repeatCount, setRepeatCount] = useState(2);

  const loopedItems =
    items.length >= 2 ? Array.from({ length: repeatCount }, () => items).flat() : items;

  useIsomorphicLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track || items.length < 2) return;

    const cards = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (cards.length < 2) return;

    // Un seul jeu de cartes doit couvrir toute la largeur visible : sinon le
    // bouclage du ruban laisse apparaître un espace blanc avant de reprendre.
    // Calculé directement (plutôt qu'en incrémentant d'une répétition à la
    // fois) pour converger en un ou deux rendus même avec peu de contenu
    // (ex. 2-3 réalisations) sur un très grand écran.
    const oneSetWidth = track.scrollWidth / repeatCount;
    const neededRepeatCount = neededRepeats(repeatCount, oneSetWidth, wrapper.getBoundingClientRect().width);
    if (neededRepeatCount !== repeatCount) {
      setRepeatCount(neededRepeatCount);
      return;
    }

    const setX = gsap.quickSetter(track, "x", "px") as (value: number) => void;
    const cardSetters = cards.map((card) => gsap.quickSetter(card, "y", "px") as (value: number) => void);

    const applyArc = () => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const center = wrapperRect.left + wrapperRect.width / 2;
      const halfWidth = wrapperRect.width / 2 || 1;
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        cardSetters[index](arcOffsetFor((cardCenter - center) / halfWidth));
      });
    };

    applyArc();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const state = { x: 0 };

    const tween = gsap.to(state, {
      x: -oneSetWidth,
      duration: oneSetWidth / AUTOPLAY_SPEED_PX_S,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        setX(state.x);
        applyArc();
      },
    });
    tweenRef.current = tween;
    setCanToggle(true);
    if (userPausedRef.current) tween.pause();

    // Le survol (souris) et le toucher mettent en pause temporairement, sans
    // annuler une pause explicite via le bouton — au départ de la souris ou
    // après un temps d'inactivité tactile, on ne relance que si
    // l'utilisateur n'a pas lui-même mis en pause.
    const pause = () => tween.pause();
    const resume = () => {
      if (!userPausedRef.current) tween.play();
    };
    let resumeTimeout: ReturnType<typeof setTimeout>;
    const pauseOnTouch = () => {
      pause();
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(resume, 4000);
    };
    wrapper.addEventListener("mouseenter", pause);
    wrapper.addEventListener("mouseleave", resume);
    wrapper.addEventListener("touchstart", pauseOnTouch, { passive: true });

    // Si l'écran s'agrandit (rotation, redimensionnement, changement de
    // moniteur) au point qu'un seul jeu de cartes ne couvre plus la largeur
    // visible, on relance la vérification ci-dessus pour ajouter une
    // répétition plutôt que de laisser un espace blanc apparaître.
    const handleResize = () => {
      const next = neededRepeats(repeatCount, track.scrollWidth / repeatCount, wrapper.getBoundingClientRect().width);
      if (next !== repeatCount) setRepeatCount(next);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      tween.kill();
      tweenRef.current = null;
      setCanToggle(false);
      clearTimeout(resumeTimeout);
      wrapper.removeEventListener("mouseenter", pause);
      wrapper.removeEventListener("mouseleave", resume);
      wrapper.removeEventListener("touchstart", pauseOnTouch);
      window.removeEventListener("resize", handleResize);
    };
  }, [items, repeatCount]);

  const toggle = () => {
    const tween = tweenRef.current;
    if (!tween) return;
    if (userPausedRef.current) {
      userPausedRef.current = false;
      tween.play();
      setIsPlaying(true);
    } else {
      userPausedRef.current = true;
      tween.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-24" />

      <div ref={trackRef} className="flex items-center gap-8 pt-6 pb-20 will-change-transform sm:gap-10">
        {loopedItems.map((item, index) => (
          <div
            key={`${item.titre}-${index}`}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="w-[180px] shrink-0 sm:w-[220px] lg:w-[240px]"
          >
            <SanityImage
              image={item.photo}
              ratio="3/4"
              label={item.lieu}
              className="rounded-sm shadow-[0_24px_48px_-24px_rgba(43,43,43,0.45)]"
              sizes="(min-width: 1024px) 240px, (min-width: 640px) 220px, 180px"
            />
            <p className="mt-3 text-center font-serif text-sm text-anthracite">{item.titre}</p>
            {item.lieu ? (
              <p className="mt-0.5 text-center font-sans text-xs text-anthracite/60">{item.lieu}</p>
            ) : null}
          </div>
        ))}
      </div>

      {canToggle ? (
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "Mettre en pause le défilement" : "Reprendre le défilement"}
            aria-pressed={!isPlaying}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-anthracite/15 text-anthracite/60 transition-colors duration-300 hover:border-anthracite/30 hover:text-anthracite"
          >
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                <rect x="1" y="0.5" width="3" height="11" />
                <rect x="8" y="0.5" width="3" height="11" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                <path d="M1 0.5 L11 6 L1 11.5 Z" />
              </svg>
            )}
          </button>
        </div>
      ) : null}
    </div>
  );
}
