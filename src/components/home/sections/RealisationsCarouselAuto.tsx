"use client";

import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { SanityImage } from "@/components/ui/SanityImage";
import type { RealisationCardDoc } from "@/sanity/lib/queries";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Vitesse de défilement automatique, en pixels par seconde. */
const AUTOPLAY_SPEED_PX_S = 44;

/** Amplitude verticale max de l'arc (en px) : les cartes au centre du ruban
 *  descendent légèrement, comme posées au creux d'une vague — écho discret
 *  au thème du sol, jamais un effet gratuit (§5/§11). */
const ARC_DEPTH_PX = 26;

/** Inclinaison max (en degrés) appliquée aux cartes selon leur écart au centre. */
const ARC_TILT_DEG = 5;

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
 * Le jeu de cartes est dupliqué une fois pour boucler sans couture : dès que
 * le ruban a défilé la largeur d'un jeu complet, GSAP le ramène exactement à
 * son point de départ (repeat: -1 sur un tween de 0 → -halfWidth).
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

  const loopedItems = items.length >= 2 ? [...items, ...items] : items;

  useIsomorphicLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track || items.length < 2) return;

    const cards = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (cards.length < 2) return;

    const setX = gsap.quickSetter(track, "x", "px") as (value: number) => void;
    const cardSetters = cards.map((card) => ({
      y: gsap.quickSetter(card, "y", "px") as (value: number) => void,
      rotate: gsap.quickSetter(card, "rotate", "deg") as (value: number) => void,
    }));

    const applyArc = () => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const center = wrapperRect.left + wrapperRect.width / 2;
      const halfWidth = wrapperRect.width / 2 || 1;
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const dx = Math.max(-1, Math.min(1, (cardCenter - center) / halfWidth));
        cardSetters[index].y(ARC_DEPTH_PX * (1 - dx * dx));
        cardSetters[index].rotate(ARC_TILT_DEG * dx);
      });
    };

    applyArc();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const state = { x: 0 };
    const halfTrackWidth = track.scrollWidth / 2;

    const tween = gsap.to(state, {
      x: -halfTrackWidth,
      duration: halfTrackWidth / AUTOPLAY_SPEED_PX_S,
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

    return () => {
      tween.kill();
      tweenRef.current = null;
      setCanToggle(false);
      clearTimeout(resumeTimeout);
      wrapper.removeEventListener("mouseenter", pause);
      wrapper.removeEventListener("mouseleave", resume);
      wrapper.removeEventListener("touchstart", pauseOnTouch);
    };
  }, [items]);

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

      <div ref={trackRef} className="flex items-center gap-8 py-6 will-change-transform sm:gap-10">
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
        <div className="mt-2 flex justify-center">
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
