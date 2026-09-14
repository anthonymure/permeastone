import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-sm tracking-wide transition-colors duration-300";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-offwhite hover:bg-primary/90",
  secondary:
    "border border-anthracite/20 text-anthracite hover:border-primary hover:text-primary",
};

type ButtonOwnProps = {
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsLink = ButtonOwnProps &
  Omit<ComponentProps<typeof Link>, keyof ButtonOwnProps>;

type ButtonAsButton = ButtonOwnProps &
  Omit<ComponentProps<"button">, keyof ButtonOwnProps> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * CTA de marque : sobre, jamais criard (§2 — « premium par la maîtrise et
 * la retenue »). Rend un `Link` si `href` est fourni, un `<button>` sinon.
 */
export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className ?? ""}`.trim();

  if (props.href !== undefined) {
    const { href, ...linkProps } = props as ButtonAsLink;
    return <Link href={href} className={classes} {...linkProps} />;
  }

  return <button className={classes} {...(props as ButtonAsButton)} />;
}
