import { SceneDivider } from "@/components/home/SceneDivider";
import { SceneExperience } from "@/components/home/sections/SceneExperience";
import { SceneForgottenFloor } from "@/components/home/sections/SceneForgottenFloor";
import { SceneLink } from "@/components/home/sections/SceneLink";
import { SceneLoop } from "@/components/home/sections/SceneLoop";
import { SceneMatter } from "@/components/home/sections/SceneMatter";
import { SceneMethod } from "@/components/home/sections/SceneMethod";
import { SceneProof } from "@/components/home/sections/SceneProof";
import { SceneRealisations } from "@/components/home/sections/SceneRealisations";
import { SceneUnderSurface } from "@/components/home/sections/SceneUnderSurface";
import { SceneUsages } from "@/components/home/sections/SceneUsages";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  applicationsQuery,
  featuredRealisationsQuery,
  homepageSectionsQuery,
  type ApplicationDoc,
  type HomepageSectionDoc,
  type RealisationCardDoc,
} from "@/sanity/lib/queries";

/**
 * Homepage narrative en défilement continu (CLAUDE.md §5) : dix étapes,
 * chacune avec une fonction narrative précise. Architecture globale :
 * PROMESSE → PHILOSOPHIE → RÉVÉLATION → SOLUTIONS → APPLICATIONS →
 * ACCOMPAGNEMENT → PREUVES → SÉRÉNITÉ → PROJET.
 *
 * Contenu piloté par Sanity (`homepageSection`, `application`, `realisation`
 * — §6/§11) : chaque scène reçoit son texte/image quand le Studio les a
 * renseignés, et retombe sur le texte de travail sinon (§4/§10 — les
 * vraies photos et la rédaction finale ne sont pas encore disponibles).
 */
export async function HomeNarrative() {
  const [sections, applications, featuredRealisations] = await Promise.all([
    sanityFetch<HomepageSectionDoc[]>(homepageSectionsQuery),
    sanityFetch<ApplicationDoc[]>(applicationsQuery),
    sanityFetch<RealisationCardDoc[]>(featuredRealisationsQuery),
  ]);

  const bySection = new Map(sections.map((section) => [section.cle, section]));
  const section = (cle: string) => bySection.get(cle);

  const realisationsSection = section("realisations");
  const realisations = realisationsSection?.realisations?.length
    ? realisationsSection.realisations
    : featuredRealisations;

  return (
    <>
      <SceneExperience {...section("experience")} />
      <SceneForgottenFloor {...section("sol-oublie")} />
      <SceneLink {...section("lien")} />
      <SceneDivider />
      <SceneUnderSurface {...section("sous-la-surface")} />
      <SceneMatter {...section("matiere")} />
      <SceneUsages titre={section("usages")?.titre} applications={applications} />
      <SceneDivider />
      <SceneMethod {...section("projet-avant-produit")} />
      <SceneRealisations titre={realisationsSection?.titre} projects={realisations} />
      <SceneProof {...section("preuve-technique")} />
      <SceneLoop {...section("boucle")} />
    </>
  );
}
