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
