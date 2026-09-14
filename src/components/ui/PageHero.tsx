import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

type PageHeroProps = {
  eyebrow: string;
  titre: string;
  intro?: ReactNode;
};

/**
 * En-tête des pages secondaires (Solutions, Applications, Réalisations,
 * Notre approche, Votre projet — §5/§6). Reprend la hiérarchie éditoriale
 * de la homepage (Eyebrow + Heading) mais sans mise en scène scroll-pilotée :
 * ces pages sont « plus rationnelles/techniques » tout en gardant
 * l'esthétique premium (§5).
 */
export function PageHero({ eyebrow, titre, intro }: PageHeroProps) {
  return (
    <Container className="pt-16 pb-4 md:pt-24">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading level={1} className="mt-4 max-w-2xl">
        {titre}
      </Heading>
      {intro ? (
        <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-anthracite/70">
          {intro}
        </p>
      ) : null}
    </Container>
  );
}
