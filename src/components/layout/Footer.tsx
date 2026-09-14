import Link from "next/link";

import { Container } from "@/components/ui/Container";

const footerLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Applications", href: "/applications" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Notre approche", href: "/notre-approche" },
  { label: "Votre projet", href: "/votre-projet" },
];

type FooterProps = {
  /** `siteSettings.baselineTechnique` — usage secondaire (§2), avec repli si le Studio n'a rien renseigné. */
  baseline?: string;
};

export function Footer({ baseline }: FooterProps) {
  return (
    <footer className="border-t border-anthracite/10 bg-offwhite">
      <Container className="flex flex-col gap-8 py-16 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <p className="font-serif text-lg text-anthracite">PermeaStone</p>
          <p className="mt-3 font-sans text-sm leading-relaxed text-anthracite/60">
            {baseline || "Sol perméable · Naturel · Durable"}
          </p>
        </div>

        <nav aria-label="Navigation du pied de page" className="flex flex-wrap gap-x-8 gap-y-2">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-sm text-anthracite/70 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>

      <Container className="border-t border-anthracite/10 py-6">
        <p className="font-sans text-xs text-anthracite/40">
          © {new Date().getFullYear()} PermeaStone. Tous droits réservés.
        </p>
      </Container>
    </footer>
  );
}
