import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { RealisationCard } from "@/components/content/RealisationCard";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  enteteDePageQuery,
  realisationsQuery,
  type EnteteDePageDoc,
  type RealisationListItemDoc,
} from "@/sanity/lib/queries";

const ENTETE_REPLI = {
  eyebrow: "Réalisations",
  titre: "Des lieux, des histoires.",
  intro: "Chaque projet part d'un lieu, d'une architecture, d'un usage — la solution vient toujours après l'écoute.",
  messageVide: "Les réalisations PermeaStone seront publiées ici dès réception des premiers projets.",
};

export async function generateMetadata(): Promise<Metadata> {
  const entete = await sanityFetch<EnteteDePageDoc | null>(enteteDePageQuery, { page: "realisations" });
  return {
    title: entete?.seoTitre || entete?.titre || ENTETE_REPLI.titre,
    description: entete?.seoDescription || entete?.intro || ENTETE_REPLI.intro,
  };
}

/**
 * Page Réalisations (§5/§6) : projets présentés comme des histoires
 * éditoriales, jamais comme un catalogue de chantiers. En-tête pilotée par
 * `enteteDePage` (§6/§11). Entrée en fondu + léger zoom (`Reveal`) pour
 * donner un peu de vie aux photos, dans le même esprit que la homepage.
 */
export default async function RealisationsPage() {
  const [realisations, entete] = await Promise.all([
    sanityFetch<RealisationListItemDoc[]>(realisationsQuery),
    sanityFetch<EnteteDePageDoc | null>(enteteDePageQuery, { page: "realisations" }),
  ]);

  return (
    <>
      <PageHero
        eyebrow={entete?.eyebrow || ENTETE_REPLI.eyebrow}
        titre={entete?.titre || ENTETE_REPLI.titre}
        intro={entete?.intro || ENTETE_REPLI.intro}
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
            <EmptyState message={entete?.messageVide || ENTETE_REPLI.messageVide} />
          )}
        </Container>
      </Section>
    </>
  );
}
