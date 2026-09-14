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

/**
 * Homepage narrative en défilement continu (CLAUDE.md §5) : dix étapes,
 * chacune avec une fonction narrative précise. Architecture globale :
 * PROMESSE → PHILOSOPHIE → RÉVÉLATION → SOLUTIONS → APPLICATIONS →
 * ACCOMPAGNEMENT → PREUVES → SÉRÉNITÉ → PROJET.
 *
 * Contenu encore en texte de travail (placeholders éditoriaux + textes
 * §2/§5) : la rédaction finale attend la réconciliation de la baseline et
 * les vraies photos (§4, §10) — voir CLAUDE.md.
 */
export function HomeNarrative() {
  return (
    <>
      <SceneExperience />
      <SceneForgottenFloor />
      <SceneLink />
      <SceneUnderSurface />
      <SceneMatter />
      <SceneUsages />
      <SceneMethod />
      <SceneRealisations />
      <SceneProof />
      <SceneLoop />
    </>
  );
}
