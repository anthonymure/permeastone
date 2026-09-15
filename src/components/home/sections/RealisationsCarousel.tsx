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
 * Page `/realisations` : le ruban de cartes en arc (voir `realisationsArc`,
 * même grammaire que l'aperçu homepage `RealisationsCarouselAuto`) défile
 * horizontalement au fil du scroll de la page plutôt qu'en continu — la
 * section reste épinglée (pin) le temps que l'utilisateur parcoure tous les
 * projets, comme les autres scènes pilotées par le scroll du site.
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
    <div ref={wrapperRef} className="relative overflow-hidden lg:flex lg:h-[74vh] lg:min-h-[560px] lg:items-center">
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
            className="w-[68vw] shrink-0 snap-center sm:w-[42vw] lg:w-[clamp(200px,20vw,300px)]"
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
