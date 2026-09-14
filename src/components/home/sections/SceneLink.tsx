import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { SanityImage } from "@/components/ui/SanityImage";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { SanityImageValue } from "@/sanity/lib/queries";

type SceneLinkProps = {
  eyebrow?: string;
  titre?: string;
  texte?: string;
  image?: SanityImageValue;
};

/**
 * Étape 3 — Le lien (§5) : le sol devient le point de connexion entre
 * architecture, paysage, eau et usage.
 */
export function SceneLink({ eyebrow, titre, texte, image }: SceneLinkProps) {
  return (
    <Section>
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <Reveal>
            <Eyebrow>{eyebrow || "Le lien"}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={2} className="mt-4 max-w-md">
              {titre || "Un point de connexion."}
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-anthracite/70">
              {texte ||
                "Entre l’architecture et le paysage. Entre l’eau et l’usage. Le sol relie ce que le regard sépare."}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} variant="image">
          {/*
            Aplat sauge décalé derrière la photo — le seul repère de couleur
            de marque visible sur cette scène, dans l'esprit d'un trait qui
            « relie » (§2) plutôt qu'un fond neutre. Discret et masqué sous
            768px pour ne pas grignoter l'espace sur mobile (§5 : retenue).
          */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 -z-10 hidden h-full w-full rounded-sm bg-sage/50 sm:block"
            />
            <SanityImage
              image={image}
              ratio="4/5"
              label="Terrasse — architecture, paysage, eau"
              className="relative rounded-sm"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
