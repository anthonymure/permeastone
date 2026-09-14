import Link from "next/link";

import { Card, CardBody } from "@/components/ui/Card";
import { SanityImage } from "@/components/ui/SanityImage";
import type { RealisationListItemDoc } from "@/sanity/lib/queries";

/** Carte réalisation — grille `/realisations` (§11 : composant piloté par Sanity). */
export function RealisationCard({ titre, slug, lieu, photo }: RealisationListItemDoc) {
  return (
    <Link href={`/realisations/${slug}`} className="group block h-full">
      <Card className="group-hover:bg-sand/20">
        <SanityImage
          image={photo}
          ratio="4/5"
          label={lieu ?? titre}
          className="transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <CardBody>
          <p className="font-serif text-lg font-semibold text-anthracite">{titre}</p>
          {lieu ? <p className="font-sans text-sm text-anthracite/60">{lieu}</p> : null}
        </CardBody>
      </Card>
    </Link>
  );
}
