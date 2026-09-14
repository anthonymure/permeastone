import { defineField, defineType } from "sanity";

import { imageField } from "./shared/imageField";

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
      name: "ordre",
      title: "Ordre d'affichage",
      description: "Optionnel — pour trier manuellement les applications dans les listes.",
      type: "number",
    }),
    imageField({ title: "Photo" }),
  ],
  orderings: [
    {
      title: "Ordre manuel",
      name: "ordreAsc",
      by: [{ field: "ordre", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "nom", subtitle: "description", media: "image" },
  },
});
