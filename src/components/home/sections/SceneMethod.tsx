import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MethodProgress } from "./MethodProgress";
import type { EtapeMethodeDoc } from "@/sanity/lib/queries";

const etapesRepli: EtapeMethodeDoc[] = [
  {
    label: "Lieu",
    texte: "Nous commençons toujours par regarder le lieu — son climat, sa lumière, ce qui pousse déjà là.",
  },
  {
    label: "Architecture",
    texte: "Le sol doit servir l'architecture. Il ne la concurrence jamais, il la prolonge.",
  },
  {
    label: "Usage",
    texte: "Piscine, terrasse, spa, cheminement — chaque usage impose sa propre expérience du sol.",
  },
  {
    label: "Environnement",
    texte: "Climat, végétation, gestion de l'eau : le contexte dicte ses propres réponses.",
  },
  {
    label: "Contraintes",
    texte: "Budget, délais, accessibilité du chantier — des paramètres concrets, pas des détails.",
  },
  {
    label: "Solution",
    texte: "Elle vient en dernier, jamais en premier. C'est elle qui s'adapte au lieu, pas l'inverse.",
  },
];

type SceneMethodProps = {
  eyebrow?: string;
  titre?: string;
  texte?: string;
  etapes?: EtapeMethodeDoc[];
};

/**
 * Étape 7 — Le projet avant le produit (§5) : méthode d'accompagnement,
 * du lieu à la solution — jamais l'inverse.
 *
 * La liste des étapes reste fixe : c'est le cadre méthodologique lui-même
 * (§5), pas un contenu éditorial que le Studio a vocation à modifier.
 * Une phrase par étape plutôt que le paragraphe complet de /notre-approche
 * — le lecteur curieux y retrouve le développement — mais un peu plus
 * développée que la version « mots isolés » d'origine : le défilement
 * horizontal (`MethodProgress`) ne montre qu'une étape à la fois, ce qui
 * laisse la place de lire une vraie phrase plutôt qu'un fragment.
 *
 * Le rendu des six étapes (numéro, titre, phrase) et le fil qui les relie
 * vivent dans `MethodProgress`, qui a besoin du scroll pour faire glisser
 * les étapes les unes après les autres.
 *
 * `etapes` vient de `homepageSection` (cle "projet-avant-produit", §6/§11) —
 * la même source alimente aussi le détail des étapes sur `/notre-approche`,
 * pour ne plus dupliquer ce texte à deux endroits.
 */
export function SceneMethod({ eyebrow, titre, texte, etapes }: SceneMethodProps) {
  return (
    <Section>
      <Container>
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>{eyebrow || "Notre approche"}</Eyebrow>
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

        <MethodProgress steps={etapes?.length ? etapes : etapesRepli} />
      </Container>
    </Section>
  );
}
