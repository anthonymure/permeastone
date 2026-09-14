import type { Metadata } from "next";

import { Card, CardBody } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { sanityFetch } from "@/sanity/lib/fetch";
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
];

export async function generateMetadata(): Promise<Metadata> {
  const entete = await sanityFetch<EnteteDePageDoc | null>(enteteDePageQuery, { page: "notre-approche" });
  return {
    title: entete?.seoTitre || entete?.titre || ENTETE_REPLI.titre,
    description: entete?.seoDescription || entete?.intro || ENTETE_REPLI.intro,
  };
}

/**
 * Page Notre approche (§5/§6) : la méthode d'accompagnement, développée
 * au-delà de la scène homepage (`SceneMethod`). En-tête et bloc de
 * conviction pilotés par `enteteDePage` ; les étapes viennent de
 * `homepageSection` (cle "projet-avant-produit") — **même source que
 * `SceneMethod`**, pour ne plus dupliquer ce texte à deux endroits (§6/§11).
 *
 * Chaque étape est présentée en carte (numéro marqué + titre en gras) —
 * page rationnelle, garde le droit à plus de structure visuelle que la
 * homepage narrative (§5).
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
        intro={entete?.intro || ENTETE_REPLI.intro}
      />

      <Section className="pt-8">
        <Container>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {etapes.map((etape, index) => (
              <li key={etape.label} className="h-full">
                <Reveal delay={0.08 * index} variant="image" className="h-full">
                  <Card className="h-full">
                    <CardBody className="gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-serif text-base text-offwhite">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="font-serif text-lg font-semibold text-anthracite">
                        {etape.label}
                      </p>
                      <p className="font-sans text-sm leading-relaxed text-anthracite/70">
                        {etape.texte}
                      </p>
                    </CardBody>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-primary pt-16 text-offwhite">
        <Container className="max-w-2xl">
          <Eyebrow className="text-sand">{entete?.convictionEyebrow || ENTETE_REPLI.convictionEyebrow}</Eyebrow>
          <Heading level={2} className="mt-4 text-offwhite">
            {entete?.convictionTitre || ENTETE_REPLI.convictionTitre}
          </Heading>
          <p className="mt-6 font-sans text-base leading-relaxed text-offwhite/70">
            {entete?.convictionTexte || ENTETE_REPLI.convictionTexte}
          </p>
        </Container>
      </Section>
    </>
  );
}
