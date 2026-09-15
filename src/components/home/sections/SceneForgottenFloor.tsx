import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { SanityImage } from "@/components/ui/SanityImage";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollFullBleed } from "@/components/home/ScrollFullBleed";
import type { SanityImageValue } from "@/sanity/lib/queries";

type SceneForgottenFloorProps = {
  eyebrow?: string;
  titre?: string;
  texte?: string;
  image?: SanityImageValue;
};

/**
 * Étape 2 — Le sol que l'on oublie (§5) : le cadrage se rapproche
 * progressivement du sol. La photo arrive bord à bord avec l'écran puis se
 * resserre à sa taille éditoriale au fil du scroll (ScrollFullBleed) — un
 * vrai mouvement de caméra, pas seulement une image plus cadrée que la
 * scène précédente.
 *
 * `titre` vient de Sanity (`homepageSection`, cle "sol-oublie") ; on retombe
 * sur la signature stratégique du document de marque si non renseigné (§2).
 *
 * `texte` porte le paragraphe d'ancrage identité + audience (retour client,
 * roadmap positionnement hôtellerie) : sans lui, rien sur la home ne
 * signale que Permeastone s'adresse aux professionnels de l'hospitalité
 * (hôtels, resorts, architectes, paysagistes) plutôt qu'à des particuliers.
 * Ajouté ici — sous le titre, avant l'image — plutôt que comme une étape
 * supplémentaire du scroll, pour ne pas alourdir la séquence des 10 étapes
 * ni toucher à la voix éditoriale déjà en place (§5/§10).
 */
export function SceneForgottenFloor({ eyebrow, titre, texte, image }: SceneForgottenFloorProps) {
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
        <Reveal delay={0.15}>
          <p className="max-w-2xl font-sans text-base leading-relaxed text-anthracite/70">
            {texte ||
              "Permeastone est un partenaire spécialisé dans les revêtements de sols extérieurs, au service des professionnels qui conçoivent, rénovent ou exploitent des lieux d'hospitalité : hôtels, resorts, établissements touristiques, et les architectes, paysagistes, maîtres d'œuvre qui les accompagnent. Notre expérience multi-marchés est aujourd'hui entièrement mise au service de ces projets — non pas comme un simple fournisseur de produits, mais comme un partenaire de projet."}
          </p>
        </Reveal>
        <Reveal delay={0.25} className="w-full">
          <ScrollFullBleed className="mx-auto max-w-3xl overflow-hidden rounded-sm">
            <SanityImage
              image={image}
              ratio="21/9"
              label="Cadrage resserré — la surface, sans le reste"
              sizes="100vw"
            />
          </ScrollFullBleed>
        </Reveal>
      </Container>
    </Section>
  );
}
