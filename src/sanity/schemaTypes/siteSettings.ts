import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Réglages globaux du site — document singleton (un seul existera,
 * voir la structure du Studio dans sanity/structure.ts).
 */
export default defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  fields: [
    defineField({
      name: "nomSite",
      title: "Nom du site",
      type: "string",
      initialValue: "PermeaStone",
    }),
    defineField({
      name: "baselinePrincipale",
      title: "Signature principale",
      description:
        "Ton éditorial hôtellerie premium — ex. « Le bon sol est celui que l'on oublie. » (voir CLAUDE.md §2).",
      type: "string",
    }),
    defineField({
      name: "baselineTechnique",
      title: "Baseline technique (usage secondaire)",
      description:
        "Ex. « Sol perméable · Naturel · Durable » — footer, cartes de visite, supports déjà imprimés (voir CLAUDE.md §2).",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo (fond clair)",
      type: "image",
    }),
    defineField({
      name: "logoBlanc",
      title: "Logo (fond foncé)",
      type: "image",
    }),
    defineField({
      name: "email",
      title: "Email de contact",
      type: "string",
    }),
    defineField({
      name: "telephone",
      title: "Téléphone",
      type: "string",
    }),
    defineField({
      name: "adresse",
      title: "Adresse",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "reseauxSociaux",
      title: "Réseaux sociaux",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "reseauSocial",
          fields: [
            defineField({
              name: "plateforme",
              title: "Plateforme",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Pinterest", value: "pinterest" },
                ],
              },
            }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: {
            select: { title: "plateforme", subtitle: "url" },
          },
        }),
      ],
    }),
    defineField({
      name: "seoParDefaut",
      title: "SEO par défaut",
      type: "object",
      fields: [
        defineField({ name: "titre", title: "Titre", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({ name: "imageOg", title: "Image de partage", type: "image" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Réglages du site" };
    },
  },
});
