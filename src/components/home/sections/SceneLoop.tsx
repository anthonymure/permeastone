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
 *
 * Le contenu se centre dans la zone sous la nav (`top-16`, hauteur de
 * `Nav`, §5/§11) plutôt que sur la hauteur totale de la section : sur les
 * écrans courts (~600-650px, fenêtre non maximisée), un centrage sur
 * `100svh` complet place l'eyebrow juste derrière la nav sticky, qui la
 * recouvre visuellement — seule cette scène est concernée, car c'est la
 * seule en plein cadre à centrer son contenu (`SceneExperience` ancre le
 * sien en bas, hors de portée de la nav).
 *
 * Scrim uniforme + texte clair : la scène est explicitement pensée pour
 * une photo de nuit (« le soir, la piscine, le silence ») — un texte
 * anthracite par défaut y serait illisible. Contenu centré (pas ancré à un
 * bord), donc un voile uniforme plutôt qu'un dégradé directionnel comme
 * SceneExperience (§5/§11).
 */
export function SceneLoop({ titre, image }: SceneLoopProps) {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full overflow-hidden">
      <ScrollZoom from={1} to={1.08} start="top top" end="bottom top" className="absolute inset-0 h-full w-full">
        <SanityImage
          image={image}
          label="Scène hôtelière — le soir, la piscine, le silence"
          className="h-full w-full"
        />
      </ScrollZoom>

      <div className="absolute inset-0 bg-anthracite/35" />

      <div className="absolute inset-0 top-16 z-10 flex items-center justify-center">
        <Container className="flex flex-col items-center gap-8 text-center">
          <Reveal>
            <Eyebrow className="text-sand">La boucle</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={2} className="max-w-xl text-offwhite">
              {titre || "Le sol a disparu. L’expérience demeure."}
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <Button href="/votre-projet">Votre projet</Button>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
