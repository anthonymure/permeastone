import Link from "next/link";

import { Card, CardBody } from "@/components/ui/Card";
import { SanityImage } from "@/components/ui/SanityImage";
import type { SolutionCardDoc } from "@/sanity/lib/queries";

/**
 * Carte solution — grille `/solutions`. Composant de contenu piloté par
 * Sanity : pas de texte en dur au-delà des libellés d'interface (§11).
 */
export function SolutionCard({ nom, slug, accroche, photo, caracteristiques }: SolutionCardDoc) {
  return (
    <Link href={`/solutions/${slug}`} className="group block h-full">
      <Card>
        <SanityImage
          image={photo}
          ratio="4/3"
          label={nom}
          className="overflow-hidden rounded-sm transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <CardBody>
          <p className="font-serif text-lg font-semibold text-anthracite transition-colors duration-300 group-hover:text-primary">
            {nom}
          </p>
          {accroche ? (
            <p className="font-sans text-sm text-anthracite/60">{accroche}</p>
          ) : null}
          {/*
            Repères techniques (§10 — preuve technique perçue dès la liste, pas
            seulement sur la fiche détail). Rendus en petite fiche technique
            (libellé/valeur) plutôt qu'en pastilles pleine largeur : les
            pastilles empilées faisaient "liste de tags" et cassaient le ton
            éditorial (retour client). Champs structurés existants côté
            Sanity (`solution.caracteristiques`, pensés pour le futur
            configurateur, §6/§9) — pas de texte en dur.
          */}
          {caracteristiques?.length ? (
            <dl className="mt-2 flex flex-col gap-1.5">
              {caracteristiques.map((c) => (
                <div key={c.propriete} className="flex items-baseline justify-between gap-4">
                  <dt className="font-sans text-[11px] uppercase tracking-[0.12em] text-anthracite/45">
                    {c.propriete}
                  </dt>
                  <dd className="font-sans text-xs text-anthracite/80 text-right">{c.valeur}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </CardBody>
      </Card>
    </Link>
  );
}
