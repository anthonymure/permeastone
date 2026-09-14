import type { ComponentProps, ElementType } from "react";

type HeadingLevel = 1 | 2 | 3;

/** Hiérarchie typographique éditoriale (Playfair Display), voir CLAUDE.md §3/§5. */
const sizesByLevel: Record<HeadingLevel, string> = {
  1: "text-4xl leading-tight sm:text-5xl lg:text-6xl",
  2: "text-3xl leading-tight sm:text-4xl",
  3: "text-xl leading-snug sm:text-2xl",
};

type HeadingProps = ComponentProps<"h1"> & {
  level?: HeadingLevel;
};

export function Heading({ level = 1, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as ElementType;

  return (
    <Tag
      className={`font-serif text-anthracite ${sizesByLevel[level]} ${className ?? ""}`.trim()}
      {...props}
    />
  );
}
