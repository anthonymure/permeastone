import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { SanityImage } from "@/components/ui/SanityImage";
import { Reveal } from "@/components/home/Reveal";
import { ScrollZoom } from "@/components/home/ScrollZoom";
import type { SanityImageValue } from "@/sanity/lib/queries";

type SceneLoopProps = {
  titre?: string;
  image?: SanityImageValue;
};

/**
 * Étape 10 — La boucle (§5) : retour à une scène hôtelière proche du
 * début — le sol a disparu, l'expérience demeure. Même Ken Burns discret
 * que SceneExperience : la boucle se referme visuellement, pas seulement
 * dans le texte.
 */
export function SceneLoop({ titre, image }: SceneLoopProps) {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden">
      <ScrollZoom from={1} to={1.08} start="top top" end="bottom top" className="absolute inset-0 h-full w-full">
        <SanityImage
          image={image}
          label="Scène hôtelière — le soir, la piscine, le silence"
          className="h-full w-full"
        />
      </ScrollZoom>

      <Container className="relative z-10 flex flex-col items-center gap-8 text-center">
        <Reveal>
          <Eyebrow>La boucle</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading level={2} className="max-w-xl">
            {titre || "Le sol a disparu. L’expérience demeure."}
          </Heading>
        </Reveal>
        <Reveal delay={0.2}>
          <Button href="/votre-projet">Votre projet</Button>
        </Reveal>
      </Container>
    </section>
  );
}
