import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { SanityImage } from "@/components/ui/SanityImage";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollZoom } from "@/components/home/ScrollZoom";
import type { SanityImageValue } from "@/sanity/lib/queries";

type SceneForgottenFloorProps = {
  eyebrow?: string;
  titre?: string;
  image?: SanityImageValue;
};

/**
 * Étape 2 — Le sol que l'on oublie (§5) : le cadrage se rapproche
 * progressivement du sol. Le resserrement est ici un vrai mouvement de
 * caméra asservi au scroll (ScrollZoom), pas seulement une image plus
 * cadrée que la scène précédente.
 *
 * `titre` vient de Sanity (`homepageSection`, cle "sol-oublie") ; on retombe
 * sur la signature stratégique du document de marque si non renseigné (§2).
 */
export function SceneForgottenFloor({ eyebrow, titre, image }: SceneForgottenFloorProps) {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-10 text-center">
        <Reveal>
          <Eyebrow>{eyebrow || "Ce qui reste discret"}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading level={2} className="max-w-2xl">
            {titre || "Le bon sol est celui que l’on oublie."}
          </Heading>
        </Reveal>
        <Reveal delay={0.2} className="w-full max-w-3xl overflow-hidden rounded-sm">
          <ScrollZoom>
            <SanityImage
              image={image}
              ratio="21/9"
              label="Cadrage resserré — la surface, sans le reste"
              sizes="(min-width: 768px) 768px, 100vw"
            />
          </ScrollZoom>
        </Reveal>
      </Container>
    </Section>
  );
}
