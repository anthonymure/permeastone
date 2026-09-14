"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * `pin: true` fait sortir l'élément épinglé de sa place dans le DOM (GSAP
 * l'enveloppe dans un "pin-spacer") — un détail invisible tant qu'on ne
 * démonte pas le composant pendant qu'il est épinglé. Démonté avec
 * `useEffect`, React tente de retirer le nœud de son ancien parent une fois
 * la mutation DOM déjà faite (nettoyage différé) : le nœud n'y est plus,
 * `removeChild` échoue ("not a child of this node"). `useLayoutEffect`
 * nettoie de façon synchrone, avant que React ne retire quoi que ce soit —
 * ScrollTrigger a le temps de rétablir la structure d'origine. Ne s'exécute
 * pas côté serveur (`typeof window` : le rendu serveur n'a de toute façon
 * rien à faire d'un plugin de scroll), donc pas l'avertissement React
 * habituel sur `useLayoutEffect` en SSR.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Step = {
  label: string;
  texte: string;
};

type MethodProgressProps = {
  steps: Step[];
};

/**
 * Les six étapes de la méthode (§5, « Le projet avant le produit »),
 * présentées comme un défilement horizontal piloté par le scroll vertical —
 * chaque titre glisse pour laisser place au suivant, le texte qui
 * l'accompagne arrive avec lui (inspiration : la section « Road map » de
 * https://spaces-urbanistic.webflow.io). La section s'épingle le temps que
 * les six panneaux défilent, puis relâche normalement.
 *
 * Remplace la version précédente (ligne qui se remplit + léger zoom sur
 * l'étape active, les autres restant visibles en retrait) : le mouvement
 * latéral raconte mieux une progression pas à pas qu'un zoom sur place, et
 * laisse à chaque étape la place d'un texte plus développé (une étape à la
 * fois plutôt que six en permanence à l'écran).
 *
 * Réservé au lg+ : en dessous, les six étapes tiennent mal sur une seule
 * ligne glissante utilisable (pas de scroll horizontal tactile praticable
 * ici) — on garde le simple empilement avec apparition en fondu de
 * `Reveal`.
 */
export function MethodProgress({ steps }: MethodProgressProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const distance = () => track.scrollWidth - wrapper.offsetWidth;

      gsap.set(track, { x: 0 });

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 96",
          // Distance de scroll dédiée au défilement horizontal pendant
          // l'épinglage : un peu plus que la distance parcourue à l'écran,
          // pour que chaque étape ait le temps de se lire (§5 : lent,
          // précis) plutôt qu'un simple 1-pour-1 qui filerait trop vite.
          end: () => `+=${distance() * 1.4}`,
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            if (markerRef.current) {
              markerRef.current.style.left = `${self.progress * 100}%`;
            }
            if (counterRef.current) {
              const active = Math.min(
                steps.length - 1,
                Math.round(self.progress * (steps.length - 1)),
              );
              counterRef.current.textContent = `${String(active + 1).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [steps]);

  return (
    <div ref={wrapperRef} className="relative mt-14 lg:relative lg:h-[22rem] lg:overflow-hidden">
      <ol
        ref={trackRef}
        className="flex flex-col gap-10 sm:grid sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10 lg:flex lg:h-full lg:flex-row lg:flex-nowrap lg:gap-0"
      >
        {steps.map((step, index) => (
          <li
            key={step.label}
            className="lg:flex lg:h-full lg:w-full lg:shrink-0 lg:flex-col lg:justify-center lg:pr-20"
          >
            <Reveal delay={0.06 * index} className="flex flex-col gap-3 lg:gap-4">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-primary/60">
                {String(index + 1).padStart(2, "0")} — {String(steps.length).padStart(2, "0")}
              </span>
              <span className="font-serif text-2xl text-anthracite lg:text-4xl">
                {step.label}
              </span>
              <span className="max-w-md font-sans text-sm leading-relaxed text-anthracite/70 lg:text-base">
                {step.texte}
              </span>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* Repère de progression : le fil qui relie (§2) sous une autre forme
          — un trait fixe et un repère qui parcourt sa longueur au même
          rythme que le glissement horizontal, plus un compteur d'étape. */}
      <div className="absolute inset-x-0 bottom-0 hidden items-center gap-4 lg:flex">
        <div className="relative h-px flex-1 bg-primary/15">
          <div
            ref={markerRef}
            aria-hidden
            className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-primary"
            style={{ left: 0 }}
          />
        </div>
        <span
          ref={counterRef}
          className="font-sans text-xs tabular-nums tracking-wide text-anthracite/50"
        >
          {`01 / ${String(steps.length).padStart(2, "0")}`}
        </span>
      </div>
    </div>
  );
}
