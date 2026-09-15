import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { RealisationsCarousel } from "@/components/home/sections/RealisationsCarousel";
import { sanityFetch } from "@/sanity/lib/fetch";
import { toPlainText, toPortableText } from "@/sanity/lib/portableText";
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
    description: entete?.seoDescription || (entete?.intro ? toPlainText(entete.intro) : ENTETE_REPLI.intro),
  };
}

/**
 * Page Réalisations (§5/§6) : projets présentés comme des histoires
 * éditoriales, jamais comme un catalogue de chantiers. En-tête pilotée par
 * `enteteDePage` (§6/§11). Les projets défilent ensuite en carrousel courbé
 * piloté par le scroll (`RealisationsCarousel`, même mise en scène que
 * l'aperçu homepage — voir `RealisationsCarouselAuto` — mais asservie au
 * scroll plutôt qu'automatique, pour la revue complète des projets).
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
        intro={entete?.intro?.length ? entete.intro : toPortableText(ENTETE_REPLI.intro)}
      />

      <Section className="overflow-x-hidden pt-8 md:pt-8">
        {realisations.length ? (
          <RealisationsCarousel items={realisations} />
        ) : (
          <Container>
            <EmptyState message={entete?.messageVide || ENTETE_REPLI.messageVide} />
          </Container>
        )}
      </Section>
    </>
  );
}
