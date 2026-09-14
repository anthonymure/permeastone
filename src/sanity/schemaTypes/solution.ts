import { defineArrayMember, defineField, defineType } from "sanity";

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
  fields: [
    defineField({
      name: "nom",
      title: "Nom",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "nom", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "accroche",
      title: "Accroche",
      type: "string",
      description: "Résumé en une phrase, utilisé dans les listes/aperçus.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "caracteristiques",
      title: "Caractéristiques techniques",
      description:
        "Une ligne par caractéristique (ex. Perméabilité / 400 L/min/m²).",
      type: "array",
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
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "applications",
      title: "Applications liées",
      description: "Usages hôteliers pour lesquels cette solution est adaptée.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "application" }] })],
    }),
  ],
  preview: {
    select: { title: "nom", subtitle: "accroche", media: "photos.0" },
  },
});
