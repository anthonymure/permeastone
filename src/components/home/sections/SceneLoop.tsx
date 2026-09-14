import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Reveal } from "@/components/home/Reveal";

/**
 * Étape 10 — La boucle (§5) : retour à une scène hôtelière proche du
 * début — le sol a disparu, l'expérience demeure.
 */
export function SceneLoop() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden">
      <PlaceholderImage
        label="Scène hôtelière — le soir, la piscine, le silence"
        className="absolute inset-0 h-full w-full"
      />

      <Container className="relative z-10 flex flex-col items-center gap-8 text-center">
        <Reveal>
          <Eyebrow>La boucle</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading level={2} className="max-w-xl">
            Le sol a disparu. L&rsquo;expérience demeure.
          </Heading>
        </Reveal>
        <Reveal delay={0.2}>
          <Button href="/votre-projet">Votre projet</Button>
        </Reveal>
      </Container>
    </section>
  );
}
