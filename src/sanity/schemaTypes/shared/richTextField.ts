import { defineArrayMember, defineField } from "sanity";
import type { ArrayRule, FieldDefinition } from "sanity";

/**
 * Champ "texte enrichi minimal" — un paragraphe simple avec, comme seule
 * mise en forme possible, le gras (pour mettre en avant un terme important,
 * retour client). Volontairement restreint : pas de titres, listes, liens
 * ni citations — l'éditeur non technique n'a qu'un bouton "Gras" dans la
 * barre d'outils, pas une barre complète à apprendre (§11 : ne pas
 * complexifier). Réutilisé partout où un texte de secours codé en dur
 * existait jusqu'ici en simple `string`/`text` (`enteteDePage.intro`,
 * `enteteDePage.convictionTexte`, `homepageSection.etapes[].texte`,
 * `application.description`) — voir `RichText` côté rendu et
 * `toPortableText`/`toPlainText` côté repli/SEO.
 */
export function richTextField({
  name,
  title,
  description,
  group,
  validation,
}: {
  name: string;
  title: string;
  description?: string;
  group?: string;
  validation?: (rule: ArrayRule<unknown[]>) => ArrayRule<unknown[]>;
}): FieldDefinition {
  return defineField({
    name,
    title,
    description,
    type: "array",
    group,
    validation,
    of: [
      defineArrayMember({
        type: "block",
        styles: [{ title: "Normal", value: "normal" }],
        lists: [],
        marks: {
          decorators: [{ title: "Gras", value: "strong" }],
          annotations: [],
        },
      }),
    ],
  });
}
