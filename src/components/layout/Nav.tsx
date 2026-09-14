"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/layout/BrandMark";
import type { NavLabelDoc, SanityImageValue } from "@/sanity/lib/queries";

/**
 * Nav persistante et légère (§5) : sert à sortir du récit de la homepage
 * pour accéder directement à l'info recherchée, jamais chargée. Les routes
 * restent fixes dans le code (structure du site) ; seuls les libellés
 * (`navLabels`, depuis `enteteDePage`) sont pilotés par Sanity (§11).
 */
const navRoutes = [
  { href: "/solutions", page: "solutions", fallback: "Solutions" },
  { href: "/applications", page: "applications", fallback: "Applications" },
  { href: "/realisations", page: "realisations", fallback: "Réalisations" },
  { href: "/notre-approche", page: "notre-approche", fallback: "Notre approche" },
  { href: "/votre-projet", page: "votre-projet", fallback: "Votre projet" },
];

type NavProps = {
  /** `siteSettings.nomSite` / `siteSettings.logo`. */
  nomSite?: string;
  logo?: SanityImageValue;
  /**
   * `siteSettings.logoHauteur` — hauteur du logo en pixels, réglable par
   * l'éditeur non technique dans le Studio. La hauteur de la barre de
   * navigation n'est pas fixe : elle découle de cette taille (padding
   * constant autour du logo) pour que les deux restent toujours cohérentes
   * sans intervention dev (§11).
   */
  logoHauteur?: number;
  /**
   * Repère de clarté (`siteSettings.descripteurCourt`) — une ligne factuelle
   * et permanente à côté du logo pour qu'un visiteur pressé, arrivé sur
   * n'importe quelle page sans le contexte du récit homepage, comprenne
   * immédiatement l'activité. Volontairement discret (petit, sauge) pour ne
   * jamais concurrencer le logo ni le ton éditorial du reste du site.
   */
  descripteur?: string;
  /** Libellés courts des 5 pages secondaires (`enteteDePage.libelleNav`). */
  navLabels?: NavLabelDoc[];
  /** `microcopie.menuOuvrir` / `menuFermer`. */
  menuOuvrir?: string;
  menuFermer?: string;
};

export function Nav({
  nomSite,
  logo,
  logoHauteur,
  descripteur,
  navLabels,
  menuOuvrir,
  menuFermer,
}: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Léger tassement de la nav une fois le récit entamé (§5 : discret, pas
  // un habillage qui concurrence le scroll) — un repère de vie sur une barre
  // par ailleurs statique, jamais un changement de contenu ou de structure.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const labelFor = (route: (typeof navRoutes)[number]) =>
    navLabels?.find((item) => item.page === route.page)?.libelleNav || route.fallback;

  // Hauteur du logo pilotée depuis le Studio (repli 32px). La barre de
  // navigation n'a pas de hauteur fixe : un padding vertical constant
  // autour du logo fait qu'elle s'agrandit ou se resserre en cascade.
  const hauteurLogo = logoHauteur || 32;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-anthracite/10 bg-offwhite/90 backdrop-blur transition-shadow duration-500 ${
        scrolled ? "shadow-sm" : "shadow-none"
      }`}
    >
      <Container
        className={`flex items-center justify-between gap-6 py-3 transition-[padding] duration-500 ${
          scrolled ? "md:py-2" : "md:py-3"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <BrandMark nomSite={nomSite} logo={logo} heightPx={hauteurLogo} className="shrink-0 text-lg" />
          {descripteur ? (
            <span className="hidden truncate font-sans text-xs tracking-wide text-primary/70 sm:inline">
              {descripteur}
            </span>
          ) : null}
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
          {navRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="font-sans text-sm text-anthracite/80 transition-colors hover:text-primary"
            >
              {labelFor(route)}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="font-sans text-sm text-anthracite md:hidden"
          aria-expanded={open}
          aria-controls="nav-mobile"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? menuFermer || "Fermer" : menuOuvrir || "Menu"}
        </button>
      </Container>

      {/* Repli mobile du repère : sous `sm` le logo redevient ambigu seul,
          et le menu (fermé par défaut) ne suffit pas pour un visiteur
          pressé — §10, comprendre l'activité sans interaction. En flux
          normal (pas en position absolue) pour que le header pousse le
          contenu au lieu de le recouvrir. */}
      {descripteur ? (
        <p className="truncate px-6 pb-2 font-sans text-[11px] tracking-wide text-primary/70 sm:hidden">
          {descripteur}
        </p>
      ) : null}

      {open ? (
        <nav
          id="nav-mobile"
          aria-label="Navigation principale"
          className="flex flex-col gap-1 border-t border-anthracite/10 px-6 py-4 md:hidden"
        >
          {navRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="py-2 font-sans text-sm text-anthracite/80"
              onClick={() => setOpen(false)}
            >
              {labelFor(route)}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
