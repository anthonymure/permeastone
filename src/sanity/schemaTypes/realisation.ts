import { defineArrayMember, defineField, defineType } from "sanity";

import { imageArrayMember } from "./shared/imageField";

/**
 * Un projet livré, présenté comme une histoire éditoriale
 * (voir CLAUDE.md §5, étape « Les réalisations »).
 */
export default defineType({
  name: "realisation",
  title: "Réalisation",
  type: "document",
  groups: [
    { name: "identite", title: "Identité", default: true },
    { name: "editorial", title: "Texte éditorial" },
    { name: "medias", title: "Photos" },
    { name: "relations", title: "Solutions & applications" },
  ],
  fields: [
    defineField({
      name: "titre",
      title: "Titre du projet",
      type: "string",
      group: "identite",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "identite",
      options: { source: "titre", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lieu",
      title: "Lieu",
      type: "string",
      group: "identite",
      description: "Ex. Hôtel XX, Saint-Tropez",
    }),
    defineField({
      name: "dateRealisation",
      title: "Date de réalisation",
      type: "date",
      group: "identite",
    }),
    defineField({
      name: "ordre",
      title: "Ordre d'affichage",
      description: "Optionnel — pour trier manuellement les réalisations dans les listes.",
      type: "number",
      group: "identite",
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      group: "medias",
      of: [defineArrayMember(imageArrayMember())],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "texteEditorial",
      title: "Texte éditorial",
      type: "array",
      group: "editorial",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "solutions",
      title: "Solutions utilisées",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "solution" }] })],
    }),
    defineField({
      name: "applications",
      title: "Applications concernées",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "application" }] })],
    }),
    defineField({
      name: "miseEnAvant",
      title: "Mettre en avant sur la page d'accueil",
      type: "boolean",
      group: "editorial",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Ordre manuel",
      name: "ordreAsc",
      by: [{ field: "ordre", direction: "asc" }],
    },
    {
      title: "Date (récent → ancien)",
      name: "dateDesc",
      by: [{ field: "dateRealisation", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "titre", lieu: "lieu", date: "dateRealisation", media: "photos.0" },
    prepare({ title, lieu, date, media }) {
      const sousTitre = [lieu, date].filter(Boolean).join(" · ");
      return { title, subtitle: sousTitre || undefined, media };
    },
  },
});
