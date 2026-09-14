import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/home/Reveal";

/**
 * Étape 3 — Le lien (§5) : le sol devient le point de connexion entre
 * architecture, paysage, eau et usage.
 */
export function SceneLink() {
  return (
    <Section className="bg-primary/5">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <Reveal>
            <Eyebrow>Le lien</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={2} className="mt-4 max-w-md">
              Un point de connexion.
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-anthracite/70">
              Entre l&rsquo;architecture et le paysage. Entre l&rsquo;eau et
              l&rsquo;usage. Le sol relie ce que le regard sépare.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <PlaceholderImage
            ratio="4/5"
            label="Terrasse — architecture, paysage, eau"
            className="rounded-sm"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
