import Link from "next/link";

import { SanityImage } from "@/components/ui/SanityImage";
import type { RealisationListItemDoc } from "@/sanity/lib/queries";

/** Carte réalisation — grille `/realisations` (§11 : composant piloté par Sanity). */
export function RealisationCard({ titre, slug, lieu, photo }: RealisationListItemDoc) {
  return (
    <Link href={`/realisations/${slug}`} className="group flex flex-col gap-4">
      <SanityImage
        image={photo}
        ratio="4/5"
        label={lieu ?? titre}
        className="rounded-sm transition-transform duration-500 group-hover:scale-[1.02]"
        sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div>
        <p className="font-serif text-lg text-anthracite">{titre}</p>
        {lieu ? <p className="mt-1 font-sans text-sm text-anthracite/60">{lieu}</p> : null}
      </div>
    </Link>
  );
}
