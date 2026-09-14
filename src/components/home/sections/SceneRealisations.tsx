import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/home/Reveal";

const projects = [
  { name: "Hôtel — Provence", location: "Terrasse & piscine" },
  { name: "Domaine — Var", location: "Spa extérieur" },
  { name: "Resort — Corse", location: "Cheminements paysagers" },
];

/**
 * Étape 8 — Les réalisations (§5) : projets présentés comme des histoires
 * éditoriales, pas comme un catalogue de chantiers.
 */
export function SceneRealisations() {
  return (
    <Section id="realisations">
      <Container>
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>Réalisations</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={2} className="mt-4">
              Des lieux, des histoires.
            </Heading>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal
              key={project.name}
              delay={0.1 * index}
              className="flex flex-col gap-4"
            >
              <PlaceholderImage
                ratio="4/5"
                label={project.location}
                className="rounded-sm"
              />
              <div>
                <p className="font-serif text-lg text-anthracite">
                  {project.name}
                </p>
                <p className="mt-1 font-sans text-sm text-anthracite/60">
                  {project.location}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
