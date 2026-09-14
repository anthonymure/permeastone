import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { SanityImage } from "@/components/ui/SanityImage";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/home/Reveal";
import type { SanityImageValue } from "@/sanity/lib/queries";

type SceneUnderSurfaceProps = {
  titre?: string;
  texte?: string;
  image?: SanityImageValue;
};

/**
 * Étape 4 — Sous la surface (§5) : transition forte, seule scène en fond
 * sombre du récit — coupe du système, circulation de l'eau, structure.
 */
export function SceneUnderSurface({ titre, texte, image }: SceneUnderSurfaceProps) {
  return (
    <Section className="bg-anthracite text-offwhite">
      <Container className="flex flex-col items-center gap-10 text-center">
        <Reveal>
          <Eyebrow className="text-sage">Sous la surface</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading level={2} className="max-w-2xl text-offwhite">
            {titre || "Ce que l’on ne voit pas."}
          </Heading>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="max-w-lg font-sans text-base leading-relaxed text-offwhite/70">
            {texte ||
              "Une structure pensée pour laisser l’eau circuler, la matière respirer, le lieu durer."}
          </p>
        </Reveal>
        <Reveal delay={0.3} variant="mask" className="w-full max-w-3xl">
          <SanityImage
            image={image}
            ratio="16/9"
            label="Coupe schématique — circulation de l'eau, structure drainante"
            className="rounded-sm border border-offwhite/10"
            sizes="(min-width: 768px) 768px, 100vw"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
