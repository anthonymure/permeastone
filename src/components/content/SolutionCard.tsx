import Link from "next/link";

import { SanityImage } from "@/components/ui/SanityImage";
import type { SolutionCardDoc } from "@/sanity/lib/queries";

/**
 * Carte solution — grille `/solutions`. Composant de contenu piloté par
 * Sanity : pas de texte en dur au-delà des libellés d'interface (§11).
 */
export function SolutionCard({ nom, slug, accroche, photo }: SolutionCardDoc) {
  return (
    <Link href={`/solutions/${slug}`} className="group flex flex-col gap-4">
      <SanityImage
        image={photo}
        ratio="4/3"
        label={nom}
        className="rounded-sm transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div>
        <p className="font-serif text-lg text-anthracite">{nom}</p>
        {accroche ? (
          <p className="mt-1 font-sans text-sm text-anthracite/60">{accroche}</p>
        ) : null}
      </div>
    </Link>
  );
}
