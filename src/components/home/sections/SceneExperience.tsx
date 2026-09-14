import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Reveal } from "@/components/home/Reveal";
import { ScrollZoom } from "@/components/home/ScrollZoom";

/**
 * Étape 1 — L'expérience (CLAUDE.md §5) : grande scène hôtelière, très peu
 * de texte. Ouvre le récit sur ce que l'on voit — jamais sur le sol.
 *
 * Léger Ken Burns asservi au scroll (pas un minuteur autoplay) pendant
 * toute la traversée de la scène — fait écho au mouvement de la boucle
 * finale (SceneLoop) sans jamais devenir un effet gratuit.
 */
export function SceneExperience() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden">
      <ScrollZoom from={1} to={1.08} start="top top" end="bottom top" className="absolute inset-0 h-full w-full">
        <PlaceholderImage
          label="Scène hôtelière — architecture, piscine, lumière du soir"
          className="h-full w-full"
        />
      </ScrollZoom>

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
