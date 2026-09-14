import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/home/Reveal";

/**
 * Étape 2 — Le sol que l'on oublie (§5) : le cadrage se rapproche
 * progressivement du sol — cadrage resserré par rapport à la scène 1.
 */
export function SceneForgottenFloor() {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-10 text-center">
        <Reveal>
          <Eyebrow>Ce qui reste discret</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading level={2} className="max-w-2xl">
            Le bon sol est celui que l&rsquo;on oublie.
          </Heading>
        </Reveal>
        <Reveal delay={0.2} className="w-full max-w-3xl">
          <PlaceholderImage
            ratio="21/9"
            label="Cadrage resserré — la surface, sans le reste"
            className="rounded-sm"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
