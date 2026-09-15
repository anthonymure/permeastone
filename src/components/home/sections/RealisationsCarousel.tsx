"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

import { SanityImage } from "@/components/ui/SanityImage";
import type { RealisationCardDoc } from "@/sanity/lib/queries";
import { arcOffsetFor } from "@/components/home/sections/realisationsArc";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Même raison que `MethodProgress` : nettoyage synchrone avant que React ne
 *  détache un nœud que le pin de ScrollTrigger a déplacé dans un pin-spacer. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type RealisationsCarouselProps = {
  items: RealisationCardDoc[];
};

/** Ouvre la fiche projet quand la carte a un `slug` (page `/realisations`) ; simple `div` sinon (aperçu homepage). */
function CardLink({
  slug,
  className,
  children,
}: {
  slug?: string;
  className?: string;
  children: ReactNode;
}) {
  if (!slug) return <div className={className}>{children}</div>;
  return (
    <Link href={`/realisations/${slug}`} className={className}>
      {children}
    </Link>
  );
}

/**
 * Grammaire de profondeur propre à CE carrousel (page `/realisations`
 * uniquement — inspirée de
 * https://dribbble.com/shots/20474244-Curved-Carousel-Effect-Smart-Animate) :
 * en plus du creux vertical partagé avec l'aperçu homepage (`arcOffsetFor`),
 * la carte la plus proche du centre grossit et fait face à l'écran, tandis
 * que les cartes latérales rétrécissent, pivotent en 3D (rotateY — leur bord
 * extérieur recule, comme si elles se tournaient vers la carte active) et
 * s'enfoncent légèrement dans l'écran (translateZ) — un effet de "carte
 * active" que l'aperçu homepage (`RealisationsCarouselAuto`) ne reprend
 * volontairement pas : celui-ci reste un ruban plat en continu, sans rotation
 * (cf. la note dans `realisationsArc.ts`, toujours valable pour lui). Ici, la
 * page dédiée aux réalisations porte un traitement plus marqué, sur demande
 * explicite ; les fonctions restent donc locales à ce fichier plutôt que
 * remontées dans le module d'arc partagé.
 */
const SCALE_MAX = 1.15;
const SCALE_MIN = 0.72;
/** Grandes sur les bords, elles rapetissent en approchant du centre — comme
 *  au creux d'une courbe qui s'enfonce dans l'écran (voir aussi `zFor`). */
function scaleFor(dx: number): number {
  const clamped = Math.max(-1, Math.min(1, Math.abs(dx)));
  return SCALE_MIN + (SCALE_MAX - SCALE_MIN) * clamped;
}

/** Perspective (px) appliquée à chaque carte (GSAP `transformPerspective`) —
 *  plus la valeur est petite, plus l'effet de bascule en profondeur est marqué. */
const CARD_PERSPECTIVE_PX = 900;

const ROTATION_Y_MAX_DEG = 45;
/** Bascule en 3D autour de l'axe vertical : le bord extérieur de la carte
 *  recule (signe opposé à `dx`), comme si elle pivotait pour faire face à la
 *  carte active au centre. */
function rotationYFor(dx: number): number {
  return -Math.max(-1, Math.min(1, dx)) * ROTATION_Y_MAX_DEG;
}

const Z_PUSH_MAX_PX = 160;
/** Recul en profondeur (translateZ) : le centre s'enfonce dans l'écran, les
 *  bords restent au plus près — doit suivre la même direction que `scaleFor`
 *  (sinon la perspective réduit déjà visuellement les cartes reculées et
 *  annule l'agrandissement demandé sur les bords). */
function zFor(dx: number): number {
  const clamped = Math.min(1, Math.abs(dx));
  return -(1 - clamped) * Z_PUSH_MAX_PX;
}

/** Les cartes les plus proches (bords, voir `zFor`) passent devant celles
 *  reculées vers le centre ; reste toujours sous les voiles de dégradé des
 *  bords (z-10, voir le JSX). */
function zIndexFor(dx: number): number {
  return Math.round(1 + Math.min(1, Math.abs(dx)) * 8);
}

/**
 * Page `/realisations` : le ruban de cartes en arc (creux vertical partagé
 * avec l'aperçu homepage via `realisationsArc`, voir `arcOffsetFor`) défile
 * horizontalement au fil du scroll de la page plutôt qu'en continu — la
 * section reste épinglée (pin) le temps que l'utilisateur parcoure tous les
 * projets, comme les autres scènes pilotées par le scroll du site.
 *
 * Contrairement à l'aperçu homepage, la carte la plus proche du centre du
 * cadre agit comme la "carte active" : elle grossit, tandis que les cartes
 * latérales rapetissent, pivotent légèrement et passent derrière elle
 * (z-index) en s'éloignant — voir `scaleFor`/`rotationFor`/`zIndexFor`
 * ci-dessus, un effet de carrousel courbé propre à cette page.
 *
 * Le jeu de cartes est dupliqué une fois (comme `RealisationsCarouselAuto`)
 * pour boucler sans couture : une fois la bibliothèque de projets parcourue,
 * le ruban revient exactement à son point de départ plutôt que de s'arrêter
 * sèchement sur la dernière carte.
 *
 * En dessous de lg : pas de pin (peu praticable au doigt), la piste reste un
 * simple défilement horizontal tactile natif — même principe de boucle, mais
 * réalisé en réinjectant `scrollLeft` d'une largeur de jeu dès que la piste a
 * défilé jusqu'au double, de façon imperceptible (le second jeu est identique
 * au premier à cet instant précis).
 */
export function RealisationsCarousel({ items }: RealisationsCarouselProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const loopedItems = items.length >= 2 ? [...items, ...items] : items;

  useIsomorphicLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track || items.length < 2) return;

    const cards = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (cards.length < 2) return;

    // Perspective fixe par carte (plutôt que `perspective` CSS sur un parent) :
    // approche recommandée par GSAP pour un rotateY/rotateX indépendant par
    // élément, sans dépendre de la boîte du parent flex.
    cards.forEach((card) => gsap.set(card, { transformPerspective: CARD_PERSPECTIVE_PX }));

    const setX = gsap.quickSetter(track, "x", "px") as (value: number) => void;
    const cardYSetters = cards.map((card) => gsap.quickSetter(card, "y", "px") as (value: number) => void);
    const cardScaleSetters = cards.map((card) => gsap.quickSetter(card, "scale") as (value: number) => void);
    const cardRotationYSetters = cards.map(
      (card) => gsap.quickSetter(card, "rotationY", "deg") as (value: number) => void
    );
    const cardZSetters = cards.map((card) => gsap.quickSetter(card, "z", "px") as (value: number) => void);
    const cardZIndexSetters = cards.map((card) => gsap.quickSetter(card, "zIndex") as (value: number) => void);

    const applyArc = () => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const center = wrapperRect.left + wrapperRect.width / 2;
      const halfWidth = wrapperRect.width / 2 || 1;
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const dx = (cardCenter - center) / halfWidth;
        cardYSetters[index](arcOffsetFor(dx));
        cardScaleSetters[index](scaleFor(dx));
        cardRotationYSetters[index](rotationYFor(dx));
        cardZSetters[index](zFor(dx));
        cardZIndexSetters[index](zIndexFor(dx));
      });
    };

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Largeur d'un seul jeu de cartes (la piste en contient deux) : la
      // boucle est complète quand le ruban a défilé exactement cette
      // distance, puisque le deuxième jeu est alors visuellement identique
      // au premier au repos.
      const halfTrackWidth = track.scrollWidth / 2;

      const applyProgress = (progress: number) => {
        setX(-progress * halfTrackWidth);
        applyArc();
      };

      applyProgress(0);

      const trigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight * 1.5, halfTrackWidth)}`,
        scrub: 0.4,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => applyProgress(self.progress),
        onRefresh: (self) => applyProgress(self.progress),
      });

      return () => trigger.kill();
    });

    // En dessous de lg : la piste défile nativement au doigt (pas de pin,
    // voir plus haut) ; on reboucle en réinjectant `scrollLeft` d'une
    // largeur de jeu dès qu'on atteint le second jeu.
    mm.add("(max-width: 1023.98px)", () => {
      const halfTrackWidth = track.scrollWidth / 2;
      applyArc();

      // `>=` seul suffit pour un scroll fluide, mais un fling rapide peut
      // livrer les événements `scroll` par paquets et sauter loin au-delà
      // d'un jeu complet avant qu'on les traite : on retire alors autant de
      // jeux que nécessaire d'un coup plutôt qu'un seul.
      const onScroll = () => {
        if (track.scrollLeft >= halfTrackWidth) {
          track.scrollLeft -= halfTrackWidth * Math.floor(track.scrollLeft / halfTrackWidth);
        }
        applyArc();
      };
      track.addEventListener("scroll", onScroll, { passive: true });
      return () => track.removeEventListener("scroll", onScroll);
    });

    return () => mm.revert();
  }, [items]);

  return (
    <div ref={wrapperRef} className="relative overflow-hidden lg:flex lg:h-[78vh] lg:min-h-[620px] lg:items-center">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-24 bg-gradient-to-r from-background to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-24 bg-gradient-to-l from-background to-transparent lg:block" />

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory items-center gap-8 overflow-x-auto px-6 py-6 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:gap-10 sm:px-10 lg:snap-none lg:gap-14 lg:overflow-visible lg:px-0 lg:will-change-transform [&::-webkit-scrollbar]:hidden"
      >
        {loopedItems.map((item, index) => (
          <div
            key={`${item.titre}-${index}`}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="relative w-[68vw] shrink-0 origin-center snap-center sm:w-[42vw] lg:w-[clamp(200px,20vw,300px)]"
          >
            <CardLink slug={item.slug} className="block">
              <SanityImage
                image={item.photo}
                ratio="3/4"
                label={item.lieu}
                className="rounded-sm shadow-[0_24px_48px_-24px_rgba(43,43,43,0.45)]"
                sizes="(min-width: 1024px) 20vw, 60vw"
              />
            </CardLink>
            <p className="mt-3 text-center font-serif text-sm text-anthracite">{item.titre}</p>
            {item.lieu ? (
              <p className="mt-0.5 text-center font-sans text-xs text-anthracite/60">{item.lieu}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
