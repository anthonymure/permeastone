import { PortableText, type PortableTextComponents } from "@portabletext/react";

import type { PortableTextValue } from "@/sanity/lib/queries";

type RichTextTone = "light" | "dark";

/**
 * Rendu du texte riche Sanity avec la typographie de marque (§3) — un seul
 * endroit à faire évoluer si le Studio ajoute des styles de bloc (§11).
 *
 * `paragraphClassName` remplace entièrement les classes du paragraphe :
 * chaque appelant garde exactement la taille/couleur qu'il avait avant le
 * passage en texte enrichi (héros de page, conviction sur fond foncé,
 * étapes de la méthode…), seul le rendu du gras change avec lui.
 *
 * `tone` ne pilote que la couleur du gras : `light` (défaut, fond clair)
 * utilise le vert de marque ; `dark` (fond `bg-primary`, ex. bloc
 * conviction de Notre approche) bascule sur le sable, sinon le gras se
 * fondrait dans un fond déjà vert foncé.
 */
function buildComponents(tone: RichTextTone, paragraphClassName: string): PortableTextComponents {
  const strongClassName = tone === "dark" ? "font-semibold text-sand" : "font-semibold text-primary";

  return {
    block: {
      normal: ({ children }) => <p className={paragraphClassName}>{children}</p>,
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
      // Mise en avant des termes importants (retour client) : gras + teinte
      // de marque plutôt qu'un surlignage (fond coloré) — reste dans la
      // palette, sobre, sans rappeler un marqueur fluo (§2/§5).
      strong: ({ children }) => <strong className={strongClassName}>{children}</strong>,
    },
  };
}

export function RichText({
  value,
  className,
  tone = "light",
  paragraphClassName = "font-sans text-base leading-relaxed text-anthracite/80",
}: {
  value: PortableTextValue;
  className?: string;
  tone?: RichTextTone;
  paragraphClassName?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 ${className ?? ""}`.trim()}>
      <PortableText value={value} components={buildComponents(tone, paragraphClassName)} />
    </div>
  );
}
