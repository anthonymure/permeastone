import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/layout/BrandMark";
import type { NavLabelDoc, SanityImageValue } from "@/sanity/lib/queries";

const footerRoutes = [
  { href: "/solutions", page: "solutions", fallback: "Solutions" },
  { href: "/applications", page: "applications", fallback: "Applications" },
  { href: "/realisations", page: "realisations", fallback: "Réalisations" },
  { href: "/notre-approche", page: "notre-approche", fallback: "Notre approche" },
  { href: "/votre-projet", page: "votre-projet", fallback: "Votre projet" },
];

const RESEAU_LABELS: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  pinterest: "Pinterest",
};

type FooterProps = {
  nomSite?: string;
  logo?: SanityImageValue;
  /** `siteSettings.baselineTechnique` — usage secondaire (§2), avec repli si le Studio n'a rien renseigné. */
  baseline?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  reseauxSociaux?: { plateforme?: string; url?: string }[];
  navLabels?: NavLabelDoc[];
  /** `microcopie.mentionsDroits`. */
  mentionsDroits?: string;
};

export function Footer({
  nomSite,
  logo,
  baseline,
  email,
  telephone,
  adresse,
  reseauxSociaux,
  navLabels,
  mentionsDroits,
}: FooterProps) {
  const labelFor = (route: (typeof footerRoutes)[number]) =>
    navLabels?.find((item) => item.page === route.page)?.libelleNav || route.fallback;

  const coordonnees = [email, telephone, adresse].some(Boolean);
  const reseaux = reseauxSociaux?.filter((r) => r.plateforme && r.url) ?? [];

  return (
    <footer className="border-t border-anthracite/10 bg-offwhite">
      <Container className="flex flex-col gap-10 py-16 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <BrandMark nomSite={nomSite} logo={logo} heightPx={22} className="text-lg" />
          <p className="mt-3 font-sans text-sm leading-relaxed text-anthracite/60">
            {baseline || "Sol perméable · Naturel · Durable"}
          </p>

          {coordonnees ? (
            <div className="mt-6 flex flex-col gap-1 font-sans text-sm text-anthracite/60">
              {email ? (
                <a href={`mailto:${email}`} className="transition-colors hover:text-primary">
                  {email}
                </a>
              ) : null}
              {telephone ? (
                <a href={`tel:${telephone}`} className="transition-colors hover:text-primary">
                  {telephone}
                </a>
              ) : null}
              {adresse ? <p className="whitespace-pre-line">{adresse}</p> : null}
            </div>
          ) : null}

          {reseaux.length ? (
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {reseaux.map((reseau) => (
                <a
                  key={reseau.plateforme}
                  href={reseau.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-sans text-sm text-anthracite/60 transition-colors hover:text-primary"
                >
                  {RESEAU_LABELS[reseau.plateforme ?? ""] ?? reseau.plateforme}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <nav aria-label="Navigation du pied de page" className="flex flex-wrap gap-x-8 gap-y-2">
          {footerRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="font-sans text-sm text-anthracite/70 transition-colors hover:text-primary"
            >
              {labelFor(route)}
            </Link>
          ))}
        </nav>
      </Container>

      <Container className="border-t border-anthracite/10 py-6">
        <p className="font-sans text-xs text-anthracite/40">
          © {new Date().getFullYear()} {nomSite || "PermeaStone"}. {mentionsDroits || "Tous droits réservés."}
        </p>
      </Container>
    </footer>
  );
}
