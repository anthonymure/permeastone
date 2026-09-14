import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { SanityImage } from "@/components/ui/SanityImage";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { RealisationCardDoc } from "@/sanity/lib/queries";

const fallbackProjects: RealisationCardDoc[] = [
  { titre: "Hôtel — Provence", lieu: "Terrasse & piscine" },
  { titre: "Domaine — Var", lieu: "Spa extérieur" },
  { titre: "Resort — Corse", lieu: "Cheminements paysagers" },
];

type SceneRealisationsProps = {
  titre?: string;
  projects?: RealisationCardDoc[];
};

/**
 * Étape 8 — Les réalisations (§5) : projets présentés comme des histoires
 * éditoriales, pas comme un catalogue de chantiers.
 *
 * `projects` vient en priorité des réalisations reliées manuellement à la
 * section dans le Studio, sinon des réalisations marquées « à la une »
 * (`realisation.miseEnAvant`), sinon du texte de travail (§4/§10).
 */
export function SceneRealisations({ titre, projects }: SceneRealisationsProps) {
  const items = projects?.length ? projects : fallbackProjects;

  return (
    <Section id="realisations">
      <Container>
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>Réalisations</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={2} className="mt-4">
              {titre || "Des lieux, des histoires."}
            </Heading>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {items.map((project, index) => (
            <Reveal
              key={project.titre}
              delay={0.1 * index}
              variant="image"
              className="flex flex-col gap-4"
            >
              <SanityImage
                image={project.photo}
                ratio="4/5"
                label={project.lieu}
                className="rounded-sm"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <div>
                <p className="font-serif text-lg text-anthracite">
                  {project.titre}
                </p>
                {project.lieu ? (
                  <p className="mt-1 font-sans text-sm text-anthracite/60">
                    {project.lieu}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
