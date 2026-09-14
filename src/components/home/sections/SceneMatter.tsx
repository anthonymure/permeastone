import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/home/Reveal";

const textures = [
  { label: "Minéral clair" },
  { label: "Minéral foncé" },
  { label: "Finition drainante" },
];

type SceneMatterProps = {
  titre?: string;
  texte?: string;
};

/**
 * Étape 5 — La matière (§5) : retour à la surface, découverte sensorielle
 * des textures et finitions.
 *
 * La grille de textures reste du texte de travail : le schéma
 * `homepageSection` ne modélise qu'une image par étape, pas une galerie —
 * à revoir si le client veut piloter ces trois textures depuis le Studio.
 */
export function SceneMatter({ titre, texte }: SceneMatterProps) {
  return (
    <Section>
      <Container>
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>La matière</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={2} className="mt-4">
              {titre || "Texture, teinte, finition."}
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-sans text-base leading-relaxed text-anthracite/70">
              {texte ||
                "Chaque surface se choisit comme une matière sensible — au regard, au pied nu, à la lumière du soir."}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {textures.map((texture, index) => (
            <Reveal key={texture.label} delay={0.1 * index}>
              <PlaceholderImage
                ratio="1/1"
                label={texture.label}
                className="rounded-sm"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
