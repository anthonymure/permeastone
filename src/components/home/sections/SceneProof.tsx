import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { MetriqueDoc } from "@/sanity/lib/queries";

// Libellés uniquement pour l'instant : les valeurs techniques revendicables
// restent à valider avec le client (voir CLAUDE.md §10) — on ne publie
// aucun chiffre tant qu'il n'est pas confirmé.
const metriquesRepli: MetriqueDoc[] = [
  { label: "Perméabilité" },
  { label: "Résistance au gel / dégel" },
  { label: "Durée de vie" },
  { label: "Antidérapance" },
];

type SceneProofProps = {
  eyebrow?: string;
  titre?: string;
  texte?: string;
  metriques?: MetriqueDoc[];
};

/**
 * Étape 9 — La preuve technique (§5) : données/performances présentées
 * clairement, après le contexte émotionnel.
 *
 * `metriques` vient de `homepageSection` (§6/§11) ; la valeur reste « — »
 * tant qu'elle n'est pas confirmée avec le client (§10).
 */
export function SceneProof({ eyebrow, titre, texte, metriques }: SceneProofProps) {
  const indicateurs = metriques?.length ? metriques : metriquesRepli;

  return (
    <Section className="bg-primary text-offwhite">
      <Container>
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow className="text-sand">{eyebrow || "La preuve technique"}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={2} className="mt-4 text-offwhite">
              {titre || "La rigueur derrière la sérénité."}
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-sans text-base leading-relaxed text-offwhite/70">
              {texte ||
                "Données techniques en cours de validation avec nos partenaires — publiées ici dès confirmation."}
            </p>
          </Reveal>
        </div>

        <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {indicateurs.map((metric, index) => (
            <Reveal key={metric.label} delay={0.08 * index}>
              <dt className="font-sans text-sm uppercase tracking-[0.15em] text-sand">
                {metric.label}
              </dt>
              <dd className="mt-2 font-serif text-3xl text-offwhite/40">{metric.valeur || "—"}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
