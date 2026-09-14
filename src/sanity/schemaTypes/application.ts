import { defineField, defineType } from "sanity";

/**
 * Un usage hôtelier (piscine, terrasse, spa, restauration, cheminements...)
 * auquel une ou plusieurs solutions PermeaStone peuvent être associées.
 * Voir CLAUDE.md §6.
 */
export default defineType({
  name: "application",
  title: "Application",
  type: "document",
  fields: [
    defineField({
      name: "nom",
      title: "Nom",
      type: "string",
      description: "Ex. Piscine, Terrasse, Spa, Restauration, Cheminements…",
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
      name: "description",
      title: "Description courte",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "nom", media: "image" },
  },
});
