"use client";

import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/ui/Container";

/**
 * Nav persistante et légère (§5) : sert à sortir du récit de la homepage
 * pour accéder directement à l'info recherchée, jamais chargée.
 */
const navItems = [
  { label: "Solutions", href: "/solutions" },
  { label: "Applications", href: "/applications" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Notre approche", href: "/notre-approche" },
  { label: "Votre projet", href: "/votre-projet" },
];

type NavProps = {
  /**
   * Repère de clarté (`siteSettings.descripteurCourt`) — une ligne factuelle
   * et permanente à côté du logo pour qu'un visiteur pressé, arrivé sur
   * n'importe quelle page sans le contexte du récit homepage, comprenne
   * immédiatement l'activité. Volontairement discret (petit, sauge) pour ne
   * jamais concurrencer le logo ni le ton éditorial du reste du site.
   */
  descripteur?: string;
};

export function Nav({ descripteur }: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-anthracite/10 bg-offwhite/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-3 overflow-hidden">
          <span className="shrink-0 font-serif text-lg tracking-tight text-anthracite">
            PermeaStone
          </span>
          {descripteur ? (
            <span className="hidden truncate font-sans text-xs tracking-wide text-primary/70 sm:inline">
              {descripteur}
            </span>
          ) : null}
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-sm text-anthracite/80 transition-colors hover:text-primary"
            >
              {item.label}
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
          {open ? "Fermer" : "Menu"}
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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 font-sans text-sm text-anthracite/80"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
