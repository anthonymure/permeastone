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
      <Card className="group-hover:bg-sand/20">
        <SanityImage
          image={photo}
          ratio="4/3"
          label={nom}
          className="transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <CardBody>
          <p className="font-serif text-lg font-semibold text-anthracite">{nom}</p>
          {accroche ? (
            <p className="font-sans text-sm text-anthracite/60">{accroche}</p>
          ) : null}
          {/*
            Repères techniques (§10 — preuve technique perçue dès la liste, pas
            seulement sur la fiche détail). Champs structurés existants côté
            Sanity (`solution.caracteristiques`, pensés pour le futur
            configurateur, §6/§9) — pas de texte en dur.
          */}
          {caracteristiques?.length ? (
            <ul className="mt-2 flex flex-wrap gap-2">
              {caracteristiques.map((c) => (
                <li
                  key={c.propriete}
                  className="rounded-full border border-primary/20 px-3 py-1 font-sans text-xs text-primary/80"
                >
                  {c.propriete} · {c.valeur}
                </li>
              ))}
            </ul>
          ) : null}
        </CardBody>
      </Card>
    </Link>
  );
}
