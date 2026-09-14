import { defineField, defineType } from "sanity";

/**
 * En-tête éditorial d'une page secondaire (Solutions, Applications,
 * Réalisations, Notre approche, Votre projet — §5/§6). Un seul document par
 * page : les 5 sont épinglés dans la structure du Studio (voir
 * sanity/structure.ts), pas de création libre par l'éditeur, pour éviter
 * les doublons sur une même page.
 */
export default defineType({
  name: "enteteDePage",
  title: "En-tête de page",
  type: "document",
  groups: [
    { name: "contenu", title: "Contenu", default: true },
    { name: "conviction", title: "Bloc de conviction (Notre approche)" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      group: "contenu",
      readOnly: true,
      options: {
        list: [
          { title: "Solutions", value: "solutions" },
          { title: "Applications", value: "applications" },
          { title: "Réalisations", value: "realisations" },
          { title: "Notre approche", value: "notre-approche" },
          { title: "Votre projet", value: "votre-projet" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "libelleNav",
      title: "Libellé (nav, pied de page, lien retour)",
      description: "Le mot court utilisé dans le menu, le footer et le « ← retour » des fiches détail.",
      type: "string",
      group: "contenu",
    }),
    defineField({
      name: "eyebrow",
      title: "Étiquette (au-dessus du titre)",
      type: "string",
      group: "contenu",
    }),
    defineField({
      name: "titre",
      title: "Titre de la page",
      type: "string",
      group: "contenu",
    }),
    defineField({
      name: "intro",
      title: "Texte d'introduction",
      type: "text",
      rows: 3,
      group: "contenu",
    }),
    defineField({
      name: "messageVide",
      title: "Message si la liste est vide",
      description: "Affiché tant qu'aucun contenu n'est publié (Solutions, Applications, Réalisations).",
      type: "string",
      group: "contenu",
    }),
    defineField({
      name: "coordonneesEyebrow",
      title: "Étiquette du bloc coordonnées",
      description: "Utilisée uniquement par la page Votre projet, au-dessus des coordonnées de contact.",
      type: "string",
      group: "contenu",
    }),
    defineField({
      name: "convictionEyebrow",
      title: "Étiquette",
      type: "string",
      group: "conviction",
    }),
    defineField({
      name: "convictionTitre",
      title: "Titre",
      type: "string",
      group: "conviction",
    }),
    defineField({
      name: "convictionTexte",
      title: "Texte",
      type: "text",
      rows: 3,
      group: "conviction",
    }),
    defineField({
      name: "seoTitre",
      title: "Titre SEO (optionnel)",
      description: "Remplace le titre de page dans l'onglet du navigateur et les moteurs de recherche.",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "Description SEO (optionnel)",
      type: "text",
      rows: 2,
      group: "seo",
      validation: (rule) => rule.max(160).warning("Idéalement moins de 160 caractères."),
    }),
  ],
  preview: {
    select: { title: "titre", subtitle: "page" },
  },
});
