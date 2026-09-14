import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SolutionCard } from "@/components/content/SolutionCard";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  enteteDePageQuery,
  solutionsQuery,
  type EnteteDePageDoc,
  type SolutionCardDoc,
} from "@/sanity/lib/queries";

const ENTETE_REPLI = {
  eyebrow: "Solutions",
  titre: "Une matière pour chaque lieu.",
  intro:
    "Il n'existe pas de sol idéal — seulement le sol adapté à chaque projet. Chaque solution est choisie pour son usage, son environnement et l'expérience qu'elle doit servir.",
  messageVide: "Les solutions PermeaStone seront publiées ici prochainement.",
};

export async function generateMetadata(): Promise<Metadata> {
  const entete = await sanityFetch<EnteteDePageDoc | null>(enteteDePageQuery, { page: "solutions" });
  return {
    title: entete?.seoTitre || entete?.titre || ENTETE_REPLI.titre,
    description: entete?.seoDescription || entete?.intro || ENTETE_REPLI.intro,
  };
}

/**
 * Page Solutions (§5/§6) : liste éditoriale pilotée par Sanity. Plus
 * rationnelle que la homepage narrative, mais garde la même retenue —
 * grille sobre, pas de logique catalogue fournisseur (§5). En-tête pilotée
 * par `enteteDePage` (§6/§11). Entrée en fondu + léger zoom (`Reveal`) pour
 * ne pas paraître statique face au reste du site.
 */
export default async function SolutionsPage() {
  const [solutions, entete] = await Promise.all([
    sanityFetch<SolutionCardDoc[]>(solutionsQuery),
    sanityFetch<EnteteDePageDoc | null>(enteteDePageQuery, { page: "solutions" }),
  ]);

  return (
    <>
      <PageHero
        eyebrow={entete?.eyebrow || ENTETE_REPLI.eyebrow}
        titre={entete?.titre || ENTETE_REPLI.titre}
        intro={entete?.intro || ENTETE_REPLI.intro}
      />

      <Section className="pt-8 md:pt-8">
        <Container>
          {solutions.length ? (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {solutions.map((solution, index) => (
                <Reveal key={solution.slug} delay={0.08 * index} variant="image">
                  <SolutionCard {...solution} />
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
