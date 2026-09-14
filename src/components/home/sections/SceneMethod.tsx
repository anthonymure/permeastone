import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MethodProgress } from "./MethodProgress";

const steps = [
  {
    label: "Lieu",
    texte: "Climat, lumière, sol existant.",
  },
  {
    label: "Architecture",
    texte: "Le sol la sert, jamais ne la concurrence.",
  },
  {
    label: "Usage",
    texte: "Piscine, terrasse, spa, cheminement.",
  },
  {
    label: "Environnement",
    texte: "Climat, végétation, gestion de l'eau.",
  },
  {
    label: "Contraintes",
    texte: "Budget, délais, accessibilité chantier.",
  },
  {
    label: "Solution",
    texte: "Elle vient en dernier, jamais en premier.",
  },
];

type SceneMethodProps = {
  titre?: string;
  texte?: string;
};

/**
 * Étape 7 — Le projet avant le produit (§5) : méthode d'accompagnement,
 * du lieu à la solution — jamais l'inverse.
 *
 * La liste des étapes reste fixe : c'est le cadre méthodologique lui-même
 * (§5), pas un contenu éditorial que le Studio a vocation à modifier.
 * Version condensée de /notre-approche (une phrase courte par étape,
 * plutôt que le paragraphe complet) : la homepage garde son parti pris
 * « peu de texte à l'écran » (§5) tout en cessant d'être une liste de mots
 * isolés — le lecteur curieux retrouve le développement complet sur la
 * page dédiée.
 *
 * Le rendu des six étapes (numéro, libellé, phrase) et la ligne de
 * progression qui les relie vivent dans `MethodProgress`, qui a besoin du
 * scroll pour animer le remplissage de la ligne et le zoom de l'étape en
 * cours de lecture.
 */
export function SceneMethod({ titre, texte }: SceneMethodProps) {
  return (
    <Section>
      <Container>
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>Notre approche</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={2} className="mt-4">
              {titre || "Le projet avant le produit."}
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-sans text-base leading-relaxed text-anthracite/70">
              {texte || "Nous partons toujours du lieu, jamais du catalogue."}
            </p>
          </Reveal>
        </div>

        <MethodProgress steps={steps} />
      </Container>
    </Section>
  );
}
