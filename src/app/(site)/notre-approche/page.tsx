import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { RichText } from "@/components/content/RichText";
import { sanityFetch } from "@/sanity/lib/fetch";
import { toPlainText, toPortableText } from "@/sanity/lib/portableText";
import {
  enteteDePageQuery,
  homepageSectionEtapesQuery,
  type EnteteDePageDoc,
  type EtapeMethodeDoc,
  type HomepageSectionDoc,
} from "@/sanity/lib/queries";

const ENTETE_REPLI = {
  eyebrow: "Notre approche",
  titre: "Le projet avant le produit.",
  intro:
    "PermeaStone n'est pas un vendeur de revêtements — nous sommes un partenaire de projet. Notre rôle : faire en sorte que le sol s'efface au profit du lieu et de l'expérience.",
  convictionEyebrow: "Notre conviction",
  convictionTitre: "Il n'existe pas de sol idéal — seulement le sol adapté à chaque lieu.",
  convictionTexte:
    "Le bon sol est celui que l'on oublie : discret, intégré, silencieux — il relie l'architecture, le paysage, l'eau et l'usage sans jamais se faire remarquer.",
};

// Textes de repli en chaînes simples (plus lisibles à écrire ainsi),
// convertis en Portable Text minimal pour correspondre au type attendu par
// `RichText` — voir `toPortableText`.
const ETAPES_REPLI: EtapeMethodeDoc[] = [
  {
    label: "Lieu",
    texte: "Nous commençons toujours par regarder le lieu — son climat, sa lumière, son sol existant.",
  },
  {
    label: "Architecture",
    texte: "Le sol doit servir l'architecture, jamais la concurrencer.",
  },
  {
    label: "Usage",
    texte: "Piscine, terrasse, spa, cheminement : chaque usage a ses propres contraintes d'expérience.",
  },
  {
    label: "Environnement",
    texte: "Climat, végétation, gestion de l'eau — le contexte impose ses propres réponses.",
  },
  {
    label: "Contraintes",
    texte: "Budget, délais, accessibilité chantier : des paramètres concrets, pas des détails.",
  },
  {
    label: "Solution",
    texte: "La solution vient en dernier — jamais en premier. C'est elle qui s'adapte au projet.",
  },
].map(({ label, texte }) => ({ label, texte: toPortableText(texte) }));

export async function generateMetadata(): Promise<Metadata> {
  const entete = await sanityFetch<EnteteDePageDoc | null>(enteteDePageQuery, { page: "notre-approche" });
  return {
    title: entete?.seoTitre || entete?.titre || ENTETE_REPLI.titre,
    description: entete?.seoDescription || (entete?.intro ? toPlainText(entete.intro) : ENTETE_REPLI.intro),
  };
}

/**
 * Page Notre approche (§5/§6) : la méthode d'accompagnement, développée
 * au-delà de la scène homepage (`SceneMethod`). En-tête et bloc de
 * conviction pilotés par `enteteDePage` ; les étapes viennent de
 * `homepageSection` (cle "projet-avant-produit") — **même source que
 * `SceneMethod`**, pour ne plus dupliquer ce texte à deux endroits (§6/§11).
 *
 * Chaque étape est présentée à plat (numéro + titre + texte, séparés par
 * un simple filet horizontal) plutôt qu'en carte fermée avec fond/bordure :
 * les six étapes n'ont pas d'image, un encadré plein les tassait et
 * rappelait la logique "catalogue" à éviter (§5/§10). Le survol anime le
 * filet, le numéro et le titre — repris du fil conducteur de la scène
 * homepage (`MethodProgress`) — pour donner un peu d'interactivité sans
 * ajouter d'élément.
 */
export default async function NotreApprochePage() {
  const [entete, section] = await Promise.all([
    sanityFetch<EnteteDePageDoc | null>(enteteDePageQuery, { page: "notre-approche" }),
    sanityFetch<Pick<HomepageSectionDoc, "etapes"> | null>(homepageSectionEtapesQuery, {
      cle: "projet-avant-produit",
    }),
  ]);

  const etapes = section?.etapes?.length ? section.etapes : ETAPES_REPLI;

  return (
    <>
      <PageHero
        eyebrow={entete?.eyebrow || ENTETE_REPLI.eyebrow}
        titre={entete?.titre || ENTETE_REPLI.titre}
        intro={entete?.intro?.length ? entete.intro : toPortableText(ENTETE_REPLI.intro)}
      />

      <Section className="pt-8 md:pt-8">
        <Container>
          <ol className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {etapes.map((etape, index) => (
              <li key={etape.label} className="group h-full">
                <Reveal delay={0.08 * index} variant="image" className="h-full">
                  <div className="flex h-full flex-col gap-4 border-t border-sand/60 pt-6 transition-colors duration-300 group-hover:border-primary/50">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-serif text-base text-offwhite transition-transform duration-300 ease-out group-hover:scale-110">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="font-serif text-lg font-semibold text-anthracite transition-colors duration-300 group-hover:text-primary">
                      {etape.label}
                    </p>
                    <RichText
                      value={etape.texte}
                      paragraphClassName="font-sans text-sm leading-relaxed text-anthracite/70"
                    />
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-primary pt-16 text-offwhite md:pt-16">
        <Container className="max-w-2xl">
          <Eyebrow className="text-sand">{entete?.convictionEyebrow || ENTETE_REPLI.convictionEyebrow}</Eyebrow>
          <Heading level={2} className="mt-4 text-offwhite">
            {entete?.convictionTitre || ENTETE_REPLI.convictionTitre}
          </Heading>
          <RichText
            value={entete?.convictionTexte?.length ? entete.convictionTexte : toPortableText(ENTETE_REPLI.convictionTexte)}
            className="mt-6"
            tone="dark"
            paragraphClassName="font-sans text-base leading-relaxed text-offwhite/70"
          />
        </Container>
      </Section>
    </>
  );
}
