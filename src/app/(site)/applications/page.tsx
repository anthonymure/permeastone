import type { Metadata } from "next";

import { Card, CardBody } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SanityImage } from "@/components/ui/SanityImage";
import { Section } from "@/components/ui/Section";
import { sanityFetch } from "@/sanity/lib/fetch";
import { applicationsListQuery, type ApplicationDoc } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Applications — PermeaStone",
  description:
    "Piscine, terrasse, spa, cheminements : les usages hôteliers pour lesquels PermeaStone conçoit ses sols.",
};

/**
 * Page Applications (§5/§6) : les usages hôteliers, indépendamment des
 * solutions — un lieu, un usage, une réponse adaptée.
 *
 * Chaque usage est présenté en carte (image + titre marqué + texte) plutôt
 * qu'en simple empilement image/texte à plat — page plus rationnelle que
 * la homepage narrative, qui garde le droit à un peu plus de structure
 * visuelle (§5 : « peuvent être plus rationnelles/techniques mais gardent
 * l'esthétique premium »). Entrée en fondu + léger zoom (`Reveal`, comme
 * sur la homepage) : ces pages n'avaient jusqu'ici aucune animation, ce
 * qui les faisait paraître statiques au regard du reste du site.
 */
export default async function ApplicationsPage() {
  const applications = await sanityFetch<ApplicationDoc[]>(applicationsListQuery);

  return (
    <>
      <PageHero
        eyebrow="Applications"
        titre="Un usage, une réponse."
        intro="Piscine, terrasse, spa, restauration extérieure, cheminements — chaque usage hôtelier appelle une réponse différente, jamais un revêtement générique."
      />

      <Section className="pt-8">
        <Container>
          {applications.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {applications.map((application, index) => (
                <Reveal key={application.nom} delay={0.08 * index} variant="image">
                  <Card>
                    <SanityImage
                      image={application.image}
                      ratio="4/5"
                      label={application.nom}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <CardBody>
                      <p className="font-serif text-lg font-semibold text-anthracite">
                        {application.nom}
                      </p>
                      {application.description ? (
                        <p className="font-sans text-sm leading-relaxed text-anthracite/70">
                          {application.description}
                        </p>
                      ) : null}
                    </CardBody>
                  </Card>
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState message="Les usages hôteliers PermeaStone seront publiés ici prochainement." />
          )}
        </Container>
      </Section>
    </>
  );
}
