import { defineArrayMember, defineField, defineType } from "sanity";

import { imageArrayMember } from "./shared/imageField";

/**
 * Une famille de solution de sol perméable PermeaStone.
 *
 * Les caractéristiques techniques sont modélisées en champs structurés
 * (pas en texte libre) pour rester compatible avec le futur configurateur
 * envisagé en v2 — voir CLAUDE.md §6 et §9.
 */
export default defineType({
  name: "solution",
  title: "Solution",
  type: "document",
  groups: [
    { name: "identite", title: "Identité", default: true },
    { name: "caracteristiques", title: "Caractéristiques" },
    { name: "medias", title: "Photos" },
    { name: "relations", title: "Applications liées" },
  ],
  fields: [
    defineField({
      name: "nom",
      title: "Nom",
      type: "string",
      group: "identite",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "identite",
      options: { source: "nom", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "accroche",
      title: "Accroche",
      type: "string",
      group: "identite",
      description: "Résumé en une phrase, utilisé dans les listes/aperçus.",
      validation: (rule) => rule.max(140).warning("Idéalement moins de 140 caractères."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      group: "identite",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "ordre",
      title: "Ordre d'affichage",
      description: "Optionnel — pour trier manuellement les solutions dans les listes.",
      type: "number",
      group: "identite",
    }),
    defineField({
      name: "caracteristiques",
      title: "Caractéristiques techniques",
      description:
        "Une ligne par caractéristique (ex. Perméabilité / 400 L/min/m²).",
      type: "array",
      group: "caracteristiques",
      of: [
        defineArrayMember({
          type: "object",
          name: "caracteristique",
          fields: [
            defineField({
              name: "propriete",
              title: "Propriété",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "valeur",
              title: "Valeur",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "propriete", subtitle: "valeur" },
          },
        }),
      ],
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      group: "medias",
      of: [defineArrayMember(imageArrayMember())],
    }),
    defineField({
      name: "applications",
      title: "Applications liées",
      description: "Usages hôteliers pour lesquels cette solution est adaptée.",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "application" }] })],
    }),
  ],
  orderings: [
    {
      title: "Ordre manuel",
      name: "ordreAsc",
      by: [{ field: "ordre", direction: "asc" }],
    },
    {
      title: "Nom (A → Z)",
      name: "nomAsc",
      by: [{ field: "nom", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "nom", subtitle: "accroche", media: "photos.0" },
  },
});
