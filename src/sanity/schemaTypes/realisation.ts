import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Un projet livré, présenté comme une histoire éditoriale
 * (voir CLAUDE.md §5, étape « Les réalisations »).
 */
export default defineType({
  name: "realisation",
  title: "Réalisation",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre du projet",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "titre", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lieu",
      title: "Lieu",
      type: "string",
      description: "Ex. Hôtel XX, Saint-Tropez",
    }),
    defineField({
      name: "dateRealisation",
      title: "Date de réalisation",
      type: "date",
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "texteEditorial",
      title: "Texte éditorial",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "solutions",
      title: "Solutions utilisées",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "solution" }] })],
    }),
    defineField({
      name: "applications",
      title: "Applications concernées",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "application" }] })],
    }),
    defineField({
      name: "miseEnAvant",
      title: "Mettre en avant sur la page d'accueil",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "titre", subtitle: "lieu", media: "photos.0" },
  },
});
