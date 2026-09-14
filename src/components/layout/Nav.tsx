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

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-anthracite/10 bg-offwhite/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-serif text-lg tracking-tight text-anthracite">
          PermeaStone
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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

      {open ? (
        <nav
          id="nav-mobile"
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
