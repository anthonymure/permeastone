import { defineArrayMember, defineField, defineType } from "sanity";

import { imageField } from "./shared/imageField";
import { richTextField } from "./shared/richTextField";

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
      name: "eyebrow",
      title: "Étiquette (au-dessus du titre)",
      description: "Petit mot-repère affiché au-dessus du titre, sur les 10 étapes.",
      type: "string",
      group: "contenu",
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
    defineField({
      name: "legende",
      title: "Légende (ex. « Mot · Mot · Mot »)",
      description: "Utilisée surtout par « L'expérience » et « La boucle », en bas de scène.",
      type: "string",
      group: "contenu",
    }),
    defineField({
      name: "cta",
      title: "Texte du bouton",
      description: "Utilisé uniquement par « La boucle » (bouton vers Votre projet).",
      type: "string",
      group: "contenu",
    }),
    defineField({
      name: "etapes",
      title: "Étapes de la méthode",
      description:
        "Utilisées uniquement par « Le projet avant le produit » — les mêmes étapes alimentent aussi la page Notre approche.",
      type: "array",
      group: "contenu",
      of: [
        defineArrayMember({
          type: "object",
          name: "etape",
          fields: [
            defineField({ name: "label", title: "Titre de l'étape", type: "string", validation: (rule) => rule.required() }),
            richTextField({
              name: "texte",
              title: "Phrase",
              description: "Le gras met en avant un mot-clé — à utiliser avec parcimonie (§2/§5 : la retenue).",
              validation: (rule) => rule.required(),
            }),
          ],
          // `texte` est un texte enrichi (tableau de blocs) — plus utilisable
          // tel quel comme sous-titre de prévisualisation (voir `application`).
          preview: { select: { title: "label" } },
        }),
      ],
    }),
    defineField({
      name: "metriques",
      title: "Indicateurs techniques",
      description:
        "Utilisés uniquement par « La preuve technique ». Laisser la valeur vide tant qu'elle n'est pas confirmée (un tiret s'affiche, §10).",
      type: "array",
      group: "contenu",
      of: [
        defineArrayMember({
          type: "object",
          name: "metrique",
          fields: [
            defineField({ name: "label", title: "Libellé", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "valeur", title: "Valeur (optionnel)", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "valeur" } },
        }),
      ],
    }),
    imageField({
      title: "Image",
      description: "Scène ou détail illustrant cette étape du récit.",
      group: "medias",
    }),
    defineField({
      name: "textures",
      title: "Galerie de textures",
      description: "Utilisée uniquement par « La matière ».",
      type: "array",
      group: "medias",
      of: [
        defineArrayMember({
          type: "object",
          name: "texture",
          fields: [
            imageField({ altRequired: false }),
            defineField({ name: "label", title: "Nom de la texture", type: "string" }),
          ],
          preview: { select: { title: "label", media: "image" } },
        }),
      ],
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
