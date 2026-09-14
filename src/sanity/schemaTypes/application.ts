import { defineField, defineType } from "sanity";

import { imageField } from "./shared/imageField";
import { richTextField } from "./shared/richTextField";

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
    richTextField({
      name: "description",
      title: "Description courte",
      description: "Le gras met en avant un mot-clé — à utiliser avec parcimonie (§2/§5 : la retenue).",
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
    // `description` est un texte enrichi (tableau de blocs) depuis le
    // passage au gras sélectif — plus utilisable tel quel comme sous-titre
    // de prévisualisation Studio (qui attend une chaîne), d'où l'aperçu
    // réduit au nom + photo.
    select: { title: "nom", media: "image" },
  },
});
