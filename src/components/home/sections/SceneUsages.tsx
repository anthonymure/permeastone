import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { SanityImage } from "@/components/ui/SanityImage";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { ApplicationDoc } from "@/sanity/lib/queries";

const fallbackUsages: ApplicationDoc[] = [
  { nom: "Piscine" },
  { nom: "Terrasse" },
  { nom: "Spa" },
  { nom: "Restauration extérieure" },
  { nom: "Cheminements" },
];

type SceneUsagesProps = {
  titre?: string;
  /** Usages hôteliers (`application`, §6) — indépendants des sections narratives. */
  applications?: ApplicationDoc[];
};

/**
 * Étape 6 — Un sol pour chaque lieu (§5) : scènes d'usages hôteliers,
 * pilotées par la collection `application` (§6) plutôt que par la section
 * narrative elle-même — retombe sur le texte de travail tant que le Studio
 * n'a pas encore d'usages renseignés.
 */
export function SceneUsages({ titre, applications }: SceneUsagesProps) {
  const usages = applications?.length ? applications : fallbackUsages;

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <Eyebrow>Un sol pour chaque lieu</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={2} className="mt-4">
              {titre || "Un usage, une réponse."}
            </Heading>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {usages.map((usage, index) => (
            <Reveal key={usage.nom} delay={0.08 * index} variant="image">
              <SanityImage
                image={usage.image}
                ratio="4/5"
                label={usage.nom}
                className="rounded-sm"
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
