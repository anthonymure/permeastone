import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RealisationsCarouselAuto } from "@/components/home/sections/RealisationsCarouselAuto";
import type { RealisationCardDoc } from "@/sanity/lib/queries";

const fallbackProjects: RealisationCardDoc[] = [
  { titre: "Hôtel — Provence", lieu: "Terrasse & piscine" },
  { titre: "Domaine — Var", lieu: "Spa extérieur" },
  { titre: "Resort — Corse", lieu: "Cheminements paysagers" },
  { titre: "Villa — Alpilles", lieu: "Solarium" },
  { titre: "Boutique-hôtel — Luberon", lieu: "Cour intérieure" },
  { titre: "Domaine — Corse", lieu: "Allée d'accueil" },
];

type SceneRealisationsProps = {
  eyebrow?: string;
  titre?: string;
  projects?: RealisationCardDoc[];
};

/**
 * Étape 8 — Les réalisations (§5) : projets présentés comme des histoires
 * éditoriales, pas comme un catalogue de chantiers. Les photos défilent
 * ensuite en carrousel courbé, en aperçu vivant et continu — voir
 * `RealisationsCarouselAuto` pour le détail de cette mise en scène ; la
 * revue complète, elle, se fait sur `/realisations` avec la variante
 * pilotée par le scroll (`RealisationsCarousel`).
 *
 * `projects` vient en priorité des réalisations reliées manuellement à la
 * section dans le Studio, sinon des réalisations marquées « à la une »
 * (`realisation.miseEnAvant`), sinon du texte de travail (§4/§10).
 */
export function SceneRealisations({ eyebrow, titre, projects }: SceneRealisationsProps) {
  const items = projects?.length ? projects : fallbackProjects;

  return (
    <Section id="realisations" className="overflow-x-hidden">
      <Container>
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>{eyebrow || "Réalisations"}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={2} className="mt-4">
              {titre || "Des lieux, des histoires."}
            </Heading>
          </Reveal>
        </div>
      </Container>

      <div className="mt-14 lg:mt-20">
        <RealisationsCarouselAuto items={items} />
      </div>
    </Section>
  );
}
