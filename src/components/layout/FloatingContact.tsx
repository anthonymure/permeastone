"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Encart de contact volant, discret et permanent : le visiteur (souvent un
 * professionnel pressé — architecte, hôtelier) doit pouvoir rejoindre
 * « Votre projet » à tout moment du récit homepage sans attendre la fin du
 * scroll infini, sans pour autant concurrencer la nav ni le ton éditorial
 * (§2, §5 — premium par la retenue). Masqué sur la page de contact
 * elle-même, où il ferait doublon avec le formulaire déjà affiché.
 */
type FloatingContactProps = {
  /** `microcopie.libelleContactFlottant`. */
  label?: string;
};

export function FloatingContact({ label }: FloatingContactProps) {
  const pathname = usePathname();

  if (pathname === "/votre-projet") {
    return null;
  }

  return (
    <Link
      href="/votre-projet"
      className="group fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full border border-anthracite/15 bg-offwhite/90 py-3 pl-3 pr-4 font-sans text-sm text-anthracite/70 shadow-sm backdrop-blur transition-colors duration-500 hover:border-primary hover:text-primary"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 shrink-0"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      <span className="tracking-wide">{label || "Votre projet"}</span>
    </Link>
  );
}
