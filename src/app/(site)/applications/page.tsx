import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
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
              {applications.map((application) => (
                <div key={application.nom} className="flex flex-col gap-4">
                  <SanityImage
                    image={application.image}
                    ratio="4/5"
                    label={application.nom}
                    className="rounded-sm"
                  />
                  <div>
                    <p className="font-serif text-lg text-anthracite">{application.nom}</p>
                    {application.description ? (
                      <p className="mt-1 font-sans text-sm text-anthracite/60">
                        {application.description}
                      </p>
                    ) : null}
                  </div>
                </div>
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
