import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SolutionCard } from "@/components/content/SolutionCard";
import { sanityFetch } from "@/sanity/lib/fetch";
import { solutionsQuery, type SolutionCardDoc } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Solutions — PermeaStone",
  description:
    "Les familles de sols perméables PermeaStone : la matière adaptée à chaque lieu, chaque usage.",
};

/**
 * Page Solutions (§5/§6) : liste éditoriale pilotée par Sanity. Plus
 * rationnelle que la homepage narrative, mais garde la même retenue —
 * grille sobre, pas de logique catalogue fournisseur (§5). Entrée en
 * fondu + léger zoom (`Reveal`) pour ne pas paraître statique face au
 * reste du site.
 */
export default async function SolutionsPage() {
  const solutions = await sanityFetch<SolutionCardDoc[]>(solutionsQuery);

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        titre="Une matière pour chaque lieu."
        intro="Il n'existe pas de sol idéal — seulement le sol adapté à chaque projet. Chaque solution est choisie pour son usage, son environnement et l'expérience qu'elle doit servir."
      />

      <Section className="pt-8">
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
            <EmptyState message="Les solutions PermeaStone seront publiées ici prochainement." />
          )}
        </Container>
      </Section>
    </>
  );
}
