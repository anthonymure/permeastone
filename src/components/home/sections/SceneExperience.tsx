import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Reveal } from "@/components/home/Reveal";

/**
 * Étape 1 — L'expérience (CLAUDE.md §5) : grande scène hôtelière, très peu
 * de texte. Ouvre le récit sur ce que l'on voit — jamais sur le sol.
 */
export function SceneExperience() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden">
      <PlaceholderImage
        label="Scène hôtelière — architecture, piscine, lumière du soir"
        className="absolute inset-0 h-full w-full"
      />

      <Container className="relative z-10 pb-16 md:pb-24">
        <Reveal>
          <Eyebrow>PermeaStone</Eyebrow>
        </Reveal>
        <Reveal delay={0.15}>
          <Heading level={1} className="mt-4 max-w-2xl">
            Ce que l&rsquo;on voit. Ce qui le rend possible.
          </Heading>
        </Reveal>
      </Container>
    </section>
  );
}
