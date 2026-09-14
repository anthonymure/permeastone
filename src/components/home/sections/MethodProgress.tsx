"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Step = {
  label: string;
  texte: string;
};

type MethodProgressProps = {
  steps: Step[];
};

/**
 * Les six étapes de la méthode (§5, « Le projet avant le produit ») et le
 * fil qui les relie (§2 : « le sol relie ») — une ligne unique dont le
 * remplissage suit la progression du scroll dans la section, plutôt que
 * cinq segments qui se dessinent chacun d'un coup à l'entrée. L'étape en
 * cours de lecture reçoit en plus un très léger zoom : un repère de lecture
 * discret, pas un effet — la ligne avance, un pas se détache, rien de plus
 * (§5/§11 : sobriété, animation qui sert le sens).
 *
 * Réservé au lg+ : au-delà, les six étapes tiennent sur une seule rangée et
 * la ligne raconte un parcours ; en dessous, les étapes s'empilent sur
 * plusieurs lignes et une ligne de progression n'y aurait plus de sens
 * (cf. l'ancien MethodConnector, qu'il remplace).
 */
export function MethodProgress({ steps }: MethodProgressProps) {
  const rootRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    if (!root || !fill) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top 70%",
        end: "bottom 55%",
        scrub: 0.6,
        onUpdate: (self) => {
          const count = steps.length;
          const active = Math.min(count - 1, Math.floor(self.progress * count));
          stepRefs.current.forEach((el, i) => {
            if (!el) return;
            el.style.transform = i === active ? "scale(1.035)" : "scale(1)";
          });
        },
      });

      gsap.fromTo(
        fill,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: trigger },
      );

      return () => {
        trigger.kill();
        stepRefs.current.forEach((el) => {
          if (el) el.style.transform = "";
        });
      };
    });

    return () => mm.revert();
  }, [steps]);

  return (
    <ol
      ref={rootRef}
      className="relative mt-14 flex flex-col gap-8 sm:grid sm:grid-cols-3 lg:flex lg:flex-row lg:items-start lg:gap-0"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[17px] hidden h-px bg-primary/15 lg:block"
      >
        <div
          ref={fillRef}
          className="h-full origin-left bg-primary"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {steps.map((step, index) => (
        <li key={step.label} className="flex min-w-0 lg:flex-1 lg:items-start">
          <Reveal
            delay={0.06 * index}
            className="flex min-w-0 flex-col gap-2 lg:pr-6"
          >
            <div
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className="flex flex-col gap-2 transition-transform duration-500 ease-out will-change-transform"
            >
              <span className="font-serif text-2xl text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-sans text-sm font-semibold text-anthracite">
                {step.label}
              </span>
              <span className="font-sans text-xs leading-relaxed text-anthracite/60">
                {step.texte}
              </span>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
