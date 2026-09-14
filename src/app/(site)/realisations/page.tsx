import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { RealisationCard } from "@/components/content/RealisationCard";
import { sanityFetch } from "@/sanity/lib/fetch";
import { realisationsQuery, type RealisationListItemDoc } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Réalisations — PermeaStone",
  description: "Des projets hôteliers où le sol s'efface déjà au profit du lieu et de l'expérience.",
};

/**
 * Page Réalisations (§5/§6) : projets présentés comme des histoires
 * éditoriales, jamais comme un catalogue de chantiers. Entrée en fondu +
 * léger zoom (`Reveal`) pour donner un peu de vie aux photos, dans le même
 * esprit que la homepage.
 */
export default async function RealisationsPage() {
  const realisations = await sanityFetch<RealisationListItemDoc[]>(realisationsQuery);

  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        titre="Des lieux, des histoires."
        intro="Chaque projet part d'un lieu, d'une architecture, d'un usage — la solution vient toujours après l'écoute."
      />

      <Section className="pt-8">
        <Container>
          {realisations.length ? (
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {realisations.map((realisation, index) => (
                <Reveal key={realisation.slug} delay={0.08 * index} variant="image">
                  <RealisationCard {...realisation} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState message="Les réalisations PermeaStone seront publiées ici dès réception des premiers projets." />
          )}
        </Container>
      </Section>
    </>
  );
}
