import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/home/Reveal";
import { MethodConnector } from "./MethodConnector";

const steps = [
  { label: "Lieu" },
  { label: "Architecture" },
  { label: "Usage" },
  { label: "Environnement" },
  { label: "Contraintes" },
  { label: "Solution" },
];

type SceneMethodProps = {
  titre?: string;
  texte?: string;
};

/**
 * Étape 7 — Le projet avant le produit (§5) : méthode d'accompagnement,
 * du lieu à la solution — jamais l'inverse.
 *
 * La liste des étapes reste fixe : c'est le cadre méthodologique lui-même
 * (§5), pas un contenu éditorial que le Studio a vocation à modifier.
 */
export function SceneMethod({ titre, texte }: SceneMethodProps) {
  return (
    <Section>
      <Container>
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>Notre approche</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={2} className="mt-4">
              {titre || "Le projet avant le produit."}
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-sans text-base leading-relaxed text-anthracite/70">
              {texte || "Nous partons toujours du lieu, jamais du catalogue."}
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 flex flex-col gap-8 sm:grid sm:grid-cols-3 lg:flex lg:flex-row lg:items-start lg:gap-0">
          {steps.map((step, index) => (
            <li key={step.label} className="flex lg:flex-1 lg:items-start">
              <Reveal delay={0.06 * index} className="flex shrink-0 flex-col gap-3 lg:pr-4">
                <span className="font-serif text-2xl text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-sm text-anthracite/80">
                  {step.label}
                </span>
              </Reveal>
              {index < steps.length - 1 ? (
                <MethodConnector delay={0.06 * index + 0.03} />
              ) : null}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
