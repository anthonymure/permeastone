import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/home/Reveal";

const usages = [
  { label: "Piscine" },
  { label: "Terrasse" },
  { label: "Spa" },
  { label: "Restauration extérieure" },
  { label: "Cheminements" },
];

/**
 * Étape 6 — Un sol pour chaque lieu (§5) : scènes d'usages hôteliers.
 */
export function SceneUsages() {
  return (
    <Section className="bg-sand/20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <Eyebrow>Un sol pour chaque lieu</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={2} className="mt-4">
              Un usage, une réponse.
            </Heading>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {usages.map((usage, index) => (
            <Reveal key={usage.label} delay={0.08 * index}>
              <PlaceholderImage
                ratio="4/5"
                label={usage.label}
                className="rounded-sm"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
