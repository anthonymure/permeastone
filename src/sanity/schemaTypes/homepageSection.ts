import { defineArrayMember, defineField, defineType } from "sanity";

import { imageField } from "./shared/imageField";

/**
 * Une étape de la séquence en infinite scroll de la page d'accueil
 * (voir CLAUDE.md §5 — 10 étapes, de « L'expérience » à « La boucle »).
 *
 * Le champ `cle` identifie l'étape narrative pour que le code sache quelle
 * animation/mise en page appliquer ; `ordre` pilote l'affichage dans le
 * Studio et peut servir de filet de sécurité si l'ordre doit être ajusté.
 */
export default defineType({
  name: "homepageSection",
  title: "Section de la page d'accueil",
  type: "document",
  groups: [
    { name: "identite", title: "Étape", default: true },
    { name: "contenu", title: "Contenu" },
    { name: "medias", title: "Image" },
    { name: "relations", title: "Contenu lié" },
  ],
  fields: [
    defineField({
      name: "ordre",
      title: "Ordre",
      type: "number",
      group: "identite",
      validation: (rule) => rule.required().integer().min(1).max(10),
    }),
    defineField({
      name: "cle",
      title: "Étape narrative",
      type: "string",
      group: "identite",
      description: "Identifie l'étape pour le code (animation/mise en page).",
      options: {
        list: [
          { title: "1. L'expérience", value: "experience" },
          { title: "2. Le sol que l'on oublie", value: "sol-oublie" },
          { title: "3. Le lien", value: "lien" },
          { title: "4. Sous la surface", value: "sous-la-surface" },
          { title: "5. La matière", value: "matiere" },
          { title: "6. Un sol pour chaque lieu", value: "usages" },
          { title: "7. Le projet avant le produit", value: "projet-avant-produit" },
          { title: "8. Les réalisations", value: "realisations" },
          { title: "9. La preuve technique", value: "preuve-technique" },
          { title: "10. La boucle", value: "boucle" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titre",
      title: "Titre affiché",
      type: "string",
      group: "contenu",
    }),
    defineField({
      name: "texte",
      title: "Texte",
      description: "Rester très bref — la homepage doit rester aérée (§5).",
      type: "text",
      rows: 3,
      group: "contenu",
      validation: (rule) => rule.max(280).warning("Rester bref : la homepage doit rester aérée."),
    }),
    imageField({
      title: "Image",
      description: "Scène ou détail illustrant cette étape du récit.",
      group: "medias",
    }),
    defineField({
      name: "realisationsLiees",
      title: "Réalisations liées",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "realisation" }] })],
    }),
    defineField({
      name: "solutionsLiees",
      title: "Solutions liées",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "solution" }] })],
    }),
  ],
  orderings: [
    {
      title: "Ordre dans la séquence",
      name: "ordreAsc",
      by: [{ field: "ordre", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "titre", subtitle: "cle", media: "image" },
  },
});
