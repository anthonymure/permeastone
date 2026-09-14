import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/home/Reveal";

const steps = [
  { label: "Lieu" },
  { label: "Architecture" },
  { label: "Usage" },
  { label: "Environnement" },
  { label: "Contraintes" },
  { label: "Solution" },
];

/**
 * Étape 7 — Le projet avant le produit (§5) : méthode d'accompagnement,
 * du lieu à la solution — jamais l'inverse.
 */
export function SceneMethod() {
  return (
    <Section>
      <Container>
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>Notre approche</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={2} className="mt-4">
              Le projet avant le produit.
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-sans text-base leading-relaxed text-anthracite/70">
              Nous partons toujours du lieu, jamais du catalogue.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, index) => (
            <li key={step.label}>
              <Reveal delay={0.06 * index} className="flex flex-col gap-3">
                <span className="font-serif text-2xl text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-sm text-anthracite/80">
                  {step.label}
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
