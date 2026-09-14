import type { ComponentProps } from "react";

/** Petit label discret en majuscules, utilisé au-dessus des titres. */
export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={`font-sans text-xs uppercase tracking-[0.3em] text-primary ${className ?? ""}`.trim()}
      {...props}
    />
  );
}
