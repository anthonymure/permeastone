import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/home/Reveal";

/**
 * Étape 4 — Sous la surface (§5) : transition forte, seule scène en fond
 * sombre du récit — coupe du système, circulation de l'eau, structure.
 */
export function SceneUnderSurface() {
  return (
    <Section className="bg-anthracite text-offwhite">
      <Container className="flex flex-col items-center gap-10 text-center">
        <Reveal>
          <Eyebrow className="text-sage">Sous la surface</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading level={2} className="max-w-2xl text-offwhite">
            Ce que l&rsquo;on ne voit pas.
          </Heading>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="max-w-lg font-sans text-base leading-relaxed text-offwhite/70">
            Une structure pensée pour laisser l&rsquo;eau circuler, la
            matière respirer, le lieu durer.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="w-full max-w-3xl">
          <PlaceholderImage
            ratio="16/9"
            label="Coupe schématique — circulation de l'eau, structure drainante"
            className="rounded-sm border border-offwhite/10"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
