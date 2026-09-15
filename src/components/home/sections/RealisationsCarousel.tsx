"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";

import { SanityImage } from "@/components/ui/SanityImage";
import type { RealisationCardDoc } from "@/sanity/lib/queries";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Même raison que `MethodProgress` : nettoyage synchrone avant que React ne
 *  détache un nœud que le pin de ScrollTrigger a déplacé dans un pin-spacer. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Doit correspondre au `gap-6` (1.5rem = 24px) posé sur la piste en lg+. */
const GAP_PX = 24;
/**
 * Rayon (en px) du cercle imaginaire sur lequel les cartes sont posées.
 * Combiné à `ARC_ANGLE`, il place la carte centrale au point le plus
 * éloigné du cercle (loin de l'écran) et les cartes en bord d'écran au
 * point le plus proche (§ demande client : « comme si elle décrivait un
 * cercle » — le centre recule, les bords avancent, plutôt que l'inverse).
 */
const CIRCLE_RADIUS = 340;
/**
 * Demi-angle (en degrés) parcouru sur ce cercle entre le centre et le bord
 * de l'écran — pilote à la fois la rotation des cartes (qui restent
 * tangentes au cercle, donc « regardent » toujours vers le centre du
 * cercle) et, via un cosinus, leur profondeur (voir `applyCurve`).
 */
const ARC_ANGLE = 58;

type RealisationsCarouselProps = {
  items: RealisationCardDoc[];
};

/**
 * Étape 8 — Les réalisations (§5) : les photos défilent au scroll le long
 * d'une piste vue en perspective, chaque carte posée sur un cercle
 * imaginaire (voir `CIRCLE_RADIUS`/`ARC_ANGLE`) — la carte au centre de
 * l'écran est au point le plus loin du cercle, celles en bord d'écran au
 * point le plus proche, ce qui donne l'impression que le carrousel
 * s'enroule vers le spectateur sur les côtés plutôt qu'un simple
 * défilement plat. Entièrement asservi au scroll (scrub) : la courbe
 * avance et recule exactement avec le défilement, jamais en roue libre
 * (§5/§11).
 *
 * Un seul jeu de cartes pour les deux mises en page (pas de duplication de
 * DOM/images) : en dessous de lg, la piste est un simple défilement
 * horizontal tactile natif (`overflow-x-auto` + scroll-snap), sans
 * courbure ni épinglage — même logique que `MethodProgress` pour son
 * propre défilement horizontal, un pin 3D n'ayant pas d'équivalent tactile
 * praticable.
 */
export function RealisationsCarousel({ items }: RealisationsCarouselProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
      const captions = captionRefs.current;
      if (cards.length < 2) return;

      const cardWidth = cards[0].offsetWidth;
      const spanPerCard = cardWidth + GAP_PX;
      const contentSpan = spanPerCard * (cards.length - 1);
      // Marge gauche/droite égale à un demi-écran : la première carte est
      // centrée au repos, la dernière l'est en fin de course.
      const paddingX = wrapper.offsetWidth / 2 - cardWidth / 2;

      gsap.set(track, { x: 0, paddingLeft: paddingX, paddingRight: paddingX });

      const applyCurve = (progress: number) => {
        const trackX = -progress * contentSpan;
        gsap.set(track, { x: trackX });

        const viewportCenter = wrapper.offsetWidth / 2;
        cards.forEach((card, index) => {
          const cardCenter = paddingX + index * spanPerCard + cardWidth / 2 + trackX;
          const offset = cardCenter - viewportCenter;
          // -1 (bord gauche) → 0 (centre) → 1 (bord droit).
          const n = gsap.utils.clamp(-1, 1, offset / viewportCenter);

          // Position sur le cercle : au centre (n=0), la carte est au point
          // le plus loin (theta=0 → cos=1 → profondeur maximale) ; vers les
          // bords, l'angle augmente et la carte se rapproche (cos décroît).
          // La taille apparente vient uniquement de la perspective CSS sur
          // ce `z` — pas de `scale` séparé, qui effacerait l'effet.
          const theta = (n * ARC_ANGLE * Math.PI) / 180;
          gsap.set(card, {
            rotateY: n * -ARC_ANGLE,
            z: -CIRCLE_RADIUS * Math.cos(theta),
          });

          // La légende ne reste lisible que pour la carte proche du centre —
          // à forte rotation, un texte à plat deviendrait illisible ;
          // elle s'efface plutôt que de tourner avec la photo.
          const caption = captions[index];
          if (caption) {
            gsap.set(caption, { opacity: gsap.utils.clamp(0, 1, 1 - Math.abs(n) * 1.8) });
          }
        });
      };

      applyCurve(0);

      const trigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight * 1.3, contentSpan * 0.85)}`,
        scrub: 0.4,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => applyCurve(self.progress),
        onRefresh: (self) => applyCurve(self.progress),
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
        style={{ perspective: "750px" }}
      >
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 px-6 pb-2 [-webkit-overflow-scrolling:touch] md:px-10 lg:snap-none lg:gap-6 lg:px-0 lg:pb-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, index) => (
            <div
              key={item.titre}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="w-[68vw] shrink-0 snap-center sm:w-[42vw] lg:w-[clamp(180px,20vw,300px)]"
            >
              <SanityImage
                image={item.photo}
                ratio="3/4"
                label={item.lieu}
                className="rounded-sm shadow-[0_24px_48px_-24px_rgba(43,43,43,0.45)]"
                sizes="(min-width: 1024px) 20vw, 60vw"
              />
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
          ))}
        </div>
      </div>
    </div>
  );
}
