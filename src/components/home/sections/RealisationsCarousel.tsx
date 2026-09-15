"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

import { SanityImage } from "@/components/ui/SanityImage";
import type { RealisationCardDoc } from "@/sanity/lib/queries";
import { angleStepFor, normalizeAngle, opacityForAngle, radiusFor } from "@/components/home/sections/realisationsCurve";

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
 * Page `/realisations` : un vrai carrousel 3D en cercle (voir
 * `realisationsCurve`) — chaque carte occupe une position fixe sur le
 * cercle, c'est l'anneau entier qui tourne d'une seule pièce au scroll
 * (scrub), jamais en roue libre (§5/§11). La carte face à l'écran est celle
 * qu'on lit ; les autres s'effacent progressivement selon leur angle et
 * disparaissent au-delà de 90° (`backface-visibility`), comme sur un vrai
 * manège. Aucun zoom : la taille des cartes ne bouge jamais, seule la
 * perspective CSS donne la profondeur.
 *
 * (Variante homepage : `RealisationsCarouselAuto`, même cercle mais
 * rotation continue et automatique plutôt que pilotée par le scroll.)
 *
 * Un seul jeu de cartes pour les deux mises en page (pas de duplication de
 * DOM/images) : en dessous de lg, la piste est un simple défilement
 * horizontal tactile natif (`overflow-x-auto` + scroll-snap), sans cercle
 * ni 3D — un pin/cercle n'ayant pas d'équivalent tactile praticable.
 */
export function RealisationsCarousel({ items }: RealisationsCarouselProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const ring = ringRef.current;
    const offset = offsetRef.current;
    if (!wrapper || !ring || !offset) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
      const captions = captionRefs.current;
      if (cards.length < 2) return;

      const angleStep = angleStepFor(cards.length);
      const cardWidth = cards[0].offsetWidth;
      const radius = radiusFor(cardWidth, angleStep);

      // Recule toute la scène d'un rayon : la carte face à l'écran (angle 0)
      // revient ainsi à une profondeur nulle — sa taille naturelle, sans
      // grossissement — et seules celles qui s'éloignent du centre reculent
      // réellement dans la perspective, jamais l'inverse.
      gsap.set(offset, { transform: `translateZ(${-radius}px)` });
      cards.forEach((card, index) => {
        gsap.set(card, { transform: `rotateY(${index * angleStep}deg) translateZ(${radius}px)` });
      });

      const applyRotation = (progress: number) => {
        const ringAngle = -progress * 360;
        gsap.set(ring, { rotateY: ringAngle });

        cards.forEach((card, index) => {
          const cardAngle = normalizeAngle(ringAngle + index * angleStep);
          const opacity = opacityForAngle(cardAngle);
          gsap.set(card, { opacity });
          const caption = captions[index];
          if (caption) gsap.set(caption, { opacity });
        });
      };

      applyRotation(0);

      const trigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight * 1.2, cards.length * 260)}`,
        scrub: 0.4,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => applyRotation(self.progress),
        onRefresh: (self) => applyRotation(self.progress),
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, [items]);

  return (
    <div ref={wrapperRef} className="relative lg:h-[74vh] lg:min-h-[560px]">
      <div
        ref={stageRef}
        className="flex h-full items-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        style={{ perspective: "1200px" }}
      >
        <div ref={offsetRef} className="w-full lg:h-full" style={{ transformStyle: "preserve-3d" }}>
          <div
            ref={ringRef}
            className="flex snap-x snap-mandatory gap-6 px-6 pb-2 [-webkit-overflow-scrolling:touch] md:px-10 lg:relative lg:h-full lg:w-full lg:snap-none lg:gap-0 lg:px-0 lg:pb-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {items.map((item, index) => (
              <div
                key={item.titre}
                className="w-[68vw] shrink-0 snap-center sm:w-[42vw] lg:absolute lg:inset-0 lg:flex lg:w-auto lg:shrink lg:flex-col lg:items-center lg:justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="lg:w-[clamp(180px,20vw,300px)]"
                  style={{ backfaceVisibility: "hidden" }}
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
                  <div
                    ref={(el) => {
                      captionRefs.current[index] = el;
                    }}
                  >
                    <p className="mt-3 text-center font-serif text-sm text-anthracite">{item.titre}</p>
                    {item.lieu ? (
                      <p className="mt-0.5 text-center font-sans text-xs text-anthracite/60">{item.lieu}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
