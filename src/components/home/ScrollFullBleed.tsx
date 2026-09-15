"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ScrollFullBleedProps = {
  children: ReactNode;
  /**
   * Classes de l'état "posé" — largeur (`max-w-*`), centrage (`mx-auto`) et
   * rayon (`rounded-*`) de la boîte éditoriale finale. Ne doit pas fixer de
   * largeur (`w-full`, `w-[...]`) : la largeur doit rester `auto`, seule
   * `marginLeft`/`marginRight` (animées) la font varier — une largeur fixe
   * l'empêcherait de s'étirer en plein écran. `mx-auto` reste nécessaire :
   * c'est la marge centrée qu'il calcule qui sert de valeur d'arrivée à
   * l'animation (voir plus bas).
   */
  className?: string;
  start?: string;
  end?: string;
};

/**
 * La photo arrive bord à bord avec l'écran, puis se resserre à sa taille
 * éditoriale (la boîte définie par `className`, ex. `max-w-3xl`) au fil du
 * scroll — un vrai mouvement de caméra qui referme le cadrage, plutôt qu'un
 * zoom interne à une boîte déjà fixe (voir `ScrollZoom`, réservé aux autres
 * scènes). Réservé à l'étape 2 du récit (§5), où le cadrage doit se
 * resserrer "progressivement" — pas à dupliquer ailleurs sans fonction.
 *
 * Les marges de départ (plein écran) et d'arrivée (boîte posée) sont
 * mesurées depuis le DOM (`getBoundingClientRect`) plutôt que codées en dur,
 * pour rester justes à tous les breakpoints sans dupliquer les valeurs de
 * `className`. On anime `marginLeft`/`marginRight` (jamais `width`) : la
 * largeur en découle naturellement (`width: auto`), ce qui garde le
 * resserrement centré sur la boîte posée — animer une largeur explicite à
 * côté d'une seule marge gauche referme le cadrage plus vite à droite qu'à
 * gauche, un resserrement visiblement asymétrique.
 */
export function ScrollFullBleed({
  children,
  className,
  start = "top bottom",
  end = "top top",
}: ScrollFullBleedProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      let tween: gsap.core.Tween | undefined;

      const build = () => {
        tween?.scrollTrigger?.kill();
        tween?.kill();
        gsap.set(el, { clearProps: "marginLeft,marginRight,borderRadius,maxWidth" });

        // Mesurées pendant que les classes `max-w-*`/`mx-auto` de
        // `className` s'appliquent encore : ce sont exactement les marges
        // centrées et la largeur "posées" qu'on veut retrouver à la fin du
        // resserrement. On lit les marges déjà calculées par `mx-auto`
        // (`getComputedStyle` résout "auto" en pixels) plutôt que de les
        // remettre à 0 : sinon la boîte finirait plaquée à gauche de son
        // parent (plein écran) au lieu d'être recentrée dans sa taille
        // éditoriale.
        //
        // Le bord à bord de départ se calcule depuis le PARENT (le
        // conteneur pleine largeur de `Reveal`), pas depuis la boîte
        // elle-même : `mx-auto` centre déjà la boîte à l'intérieur de ce
        // parent, donc son propre `left`/`right` ne touche plus les bords
        // du viewport — seul le parent (lui, plein écran) les touche.
        const rect = el.getBoundingClientRect();
        const parentRect = el.parentElement!.getBoundingClientRect();
        const viewportWidth = document.documentElement.clientWidth;
        const computed = getComputedStyle(el);
        const restingMarginLeft = parseFloat(computed.marginLeft) || 0;
        const restingMarginRight = parseFloat(computed.marginRight) || 0;
        const restingRadius = computed.borderRadius;
        const restingMaxWidth = rect.width;

        tween = gsap.fromTo(
          el,
          {
            marginLeft: -parentRect.left,
            marginRight: parentRect.right - viewportWidth,
            maxWidth: viewportWidth,
            borderRadius: 0,
          },
          {
            marginLeft: restingMarginLeft,
            marginRight: restingMarginRight,
            // Tweenée plutôt que juste neutralisée : sans elle, une fois les
            // marges revenues à leur valeur centrée, la boîte reprendrait
            // toute la largeur de son parent (`Container`) au lieu de se
            // stabiliser à sa taille éditoriale (`max-w-3xl`), que la classe
            // seule ne peut plus imposer pendant que `marginLeft`/
            // `marginRight` restent animées en inline style à côté d'elle.
            maxWidth: restingMaxWidth,
            borderRadius: restingRadius,
            ease: "none",
            scrollTrigger: { trigger: el, start, end, scrub: true },
          },
        );
      };

      build();
      window.addEventListener("resize", build);

      return () => window.removeEventListener("resize", build);
    }, ref);

    return () => ctx.revert();
  }, [start, end]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
