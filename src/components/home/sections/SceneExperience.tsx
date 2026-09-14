import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { SanityImage } from "@/components/ui/SanityImage";
import { Reveal } from "@/components/home/Reveal";
import { ScrollZoom } from "@/components/home/ScrollZoom";
import type { SanityImageValue } from "@/sanity/lib/queries";

type SceneExperienceProps = {
  titre?: string;
  image?: SanityImageValue;
};

/**
 * Étape 1 — L'expérience (CLAUDE.md §5) : grande scène hôtelière, très peu
 * de texte. Ouvre le récit sur ce que l'on voit — jamais sur le sol.
 *
 * Léger Ken Burns asservi au scroll (pas un minuteur autoplay) pendant
 * toute la traversée de la scène — fait écho au mouvement de la boucle
 * finale (SceneLoop) sans jamais devenir un effet gratuit.
 *
 * `titre`/`image` viennent de Sanity (`homepageSection`, cle "experience")
 * quand ils sont renseignés ; sinon on retombe sur le texte de travail (§4/§10).
 *
 * Scrim sombre en bas de cadre + texte clair : la scène est explicitement
 * pensée pour une photo « lumière du soir » (voir le repère éditorial
 * ci-dessus) — un texte anthracite par défaut y serait illisible. Le
 * dégradé garantit la lisibilité quelle que soit la luminosité de la photo
 * finale, sans dépendre d'un cadrage particulier (fonction claire, §5/§11).
 */
export function SceneExperience({ titre, image }: SceneExperienceProps) {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden">
      <ScrollZoom from={1} to={1.08} start="top top" end="bottom top" className="absolute inset-0 h-full w-full">
        <SanityImage
          image={image}
          label="Scène hôtelière — architecture, piscine, lumière du soir"
          className="h-full w-full"
          priority
        />
      </ScrollZoom>

      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-anthracite/70 via-anthracite/10 to-transparent" />

      <Container className="relative z-10 pb-16 md:pb-24">
        <Reveal immediate>
          <Eyebrow className="text-sand">PermeaStone</Eyebrow>
        </Reveal>
        <Reveal delay={0.15} immediate>
          <Heading level={1} className="mt-4 max-w-2xl text-offwhite">
            {titre || "Ce que l’on voit. Ce qui le rend possible."}
          </Heading>
        </Reveal>
      </Container>
    </section>
  );
}
