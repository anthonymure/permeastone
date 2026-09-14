import { PortableText, type PortableTextComponents } from "@portabletext/react";

import type { PortableTextValue } from "@/sanity/lib/queries";

/**
 * Rendu du texte riche Sanity (`solution.description`, `realisation.texteEditorial`)
 * avec la typographie de marque (§3) — un seul endroit à faire évoluer si le
 * Studio ajoute des styles de bloc (§11).
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-sans text-base leading-relaxed text-anthracite/80">{children}</p>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-serif text-xl text-anthracite">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary/40 pl-4 font-serif text-lg italic text-anthracite/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-5 font-sans text-base text-anthracite/80">
        {children}
      </ul>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-anthracite">{children}</strong>,
  },
};

export function RichText({ value, className }: { value: PortableTextValue; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 ${className ?? ""}`.trim()}>
      <PortableText value={value} components={components} />
    </div>
  );
}
