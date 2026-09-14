import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { SanityImage } from "@/components/ui/SanityImage";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/home/Parallax";
import type { TextureDoc } from "@/sanity/lib/queries";

const texturesRepli: TextureDoc[] = [
  { label: "Minéral clair" },
  { label: "Minéral foncé" },
  { label: "Finition drainante" },
];

type SceneMatterProps = {
  eyebrow?: string;
  titre?: string;
  texte?: string;
  textures?: TextureDoc[];
};

/**
 * Étape 5 — La matière (§5) : retour à la surface, découverte sensorielle
 * des textures et finitions. Galerie pilotée par `homepageSection.textures`
 * (§6/§11) ; repli sur le texte de travail tant que le Studio n'a rien.
 */
export function SceneMatter({ eyebrow, titre, texte, textures }: SceneMatterProps) {
  const galerie = textures?.length ? textures : texturesRepli;

  return (
    <Section>
      <Container>
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>{eyebrow || "La matière"}</Eyebrow>
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
          {galerie.map((texture, index) => (
            <Reveal key={texture.label ?? index} delay={0.1 * index} variant="image">
              <Parallax offset={index % 2 === 0 ? 20 : -20}>
                <SanityImage
                  image={texture.image}
                  ratio="1/1"
                  label={texture.label}
                  className="rounded-sm"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              </Parallax>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
