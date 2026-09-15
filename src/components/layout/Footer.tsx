import type { ReactNode } from "react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/layout/BrandMark";
import type { SanityImageValue } from "@/sanity/lib/queries";

/** Repli si `siteSettings.liensPiedDePage` n'a rien renseigné dans le Studio. */
const liensPiedDePageParDefaut: { libelle: string; url: string }[] = [
  { libelle: "Solutions", url: "/solutions" },
  { libelle: "Applications", url: "/applications" },
  { libelle: "Réalisations", url: "/realisations" },
  { libelle: "Notre approche", url: "/notre-approche" },
  { libelle: "Votre projet", url: "/votre-projet" },
];

const RESEAU_LABELS: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  pinterest: "Pinterest",
};

/** Icônes SVG inline (trait fin, `currentColor`) — pas de dépendance externe. */
const RESEAU_ICONES: Record<string, ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10.5" x2="7.5" y2="17" />
      <circle cx="7.5" cy="7" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4.2c0-1.5 1-2.3 2.3-2.3s2.2.8 2.2 2.3V17" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M14 8.5h-1.5c-1 0-1.5.5-1.5 1.5v2h3l-.4 3h-2.6V21" />
    </svg>
  ),
  pinterest: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 18c.6-2.4 1.2-4.8 1.8-7.2m0 0a2.7 2.7 0 1 1 3.2 2.1c-1.7.4-3-.4-3.2-2.1Zm0 0C10.2 8.7 11.5 7 13.6 7c2 0 3.4 1.4 3.4 3.4 0 2.6-1.4 4.6-3.5 4.6-.9 0-1.6-.4-1.9-1" />
    </svg>
  ),
};

type FooterProps = {
  nomSite?: string;
  logo?: SanityImageValue;
  /** `siteSettings.logoHauteurFooter` — indépendante de la taille du logo dans la nav. */
  logoHauteur?: number;
  /** `siteSettings.baselineTechnique` — usage secondaire (§2), avec repli si le Studio n'a rien renseigné. */
  baseline?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  reseauxSociaux?: { plateforme?: string; url?: string }[];
  /** `siteSettings.liensPiedDePage` — tous les liens du pied de page, dans l'ordre défini dans le Studio. */
  liensPiedDePage?: { libelle?: string; url?: string }[];
  /** `microcopie.mentionsDroits`. */
  mentionsDroits?: string;
};

export function Footer({
  nomSite,
  logo,
  logoHauteur,
  baseline,
  email,
  telephone,
  adresse,
  reseauxSociaux,
  liensPiedDePage,
  mentionsDroits,
}: FooterProps) {
  const coordonnees = [email, telephone, adresse].some(Boolean);
  const reseaux = reseauxSociaux?.filter((r) => r.plateforme && r.url) ?? [];
  const liensFiltres = liensPiedDePage?.filter((l) => l.libelle && l.url) ?? [];
  const liens = liensFiltres.length ? liensFiltres : liensPiedDePageParDefaut;

  return (
    <footer className="border-t border-anthracite/10 bg-offwhite">
      <Container className="flex flex-col gap-10 py-16 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <BrandMark nomSite={nomSite} logo={logo} heightPx={logoHauteur || 40} className="text-xl" />
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
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {reseaux.map((reseau) => {
                const libelle = RESEAU_LABELS[reseau.plateforme ?? ""] ?? reseau.plateforme;
                const icone = RESEAU_ICONES[reseau.plateforme ?? ""];
                return (
                  <a
                    key={reseau.plateforme}
                    href={reseau.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-anthracite/60 transition-colors hover:text-primary"
                  >
                    {icone ? (
                      <>
                        <span className="block h-5 w-5">{icone}</span>
                        <span className="sr-only">{libelle}</span>
                      </>
                    ) : (
                      <span className="font-sans text-sm">{libelle}</span>
                    )}
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        <nav aria-label="Navigation du pied de page" className="flex flex-wrap gap-x-8 gap-y-2">
          {liens.map((lien) => {
            const externe = /^https?:\/\//.test(lien.url ?? "");
            return (
              <Link
                key={lien.url}
                href={lien.url ?? "#"}
                target={externe ? "_blank" : undefined}
                rel={externe ? "noreferrer noopener" : undefined}
                className="font-sans text-sm text-anthracite/70 transition-colors hover:text-primary"
              >
                {lien.libelle}
              </Link>
            );
          })}
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
