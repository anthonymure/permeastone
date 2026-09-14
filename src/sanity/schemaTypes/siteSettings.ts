import { defineArrayMember, defineField, defineType } from "sanity";

import { imageField } from "./shared/imageField";

/**
 * Réglages globaux du site — document singleton (un seul existera,
 * voir la structure du Studio dans sanity/structure.ts).
 */
export default defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  groups: [
    { name: "general", title: "Général", default: true },
    { name: "logos", title: "Logos" },
    { name: "coordonnees", title: "Coordonnées" },
    { name: "reseaux", title: "Réseaux sociaux" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "nomSite",
      title: "Nom du site",
      type: "string",
      group: "general",
      initialValue: "PermeaStone",
    }),
    defineField({
      name: "descripteurCourt",
      title: "Descripteur (repère de clarté)",
      description:
        "Une ligne courte et factuelle affichée en permanence près du logo (nav) pour qu'un visiteur pressé comprenne immédiatement l'activité — ex. « Sols extérieurs perméables · Hôtellerie & hospitalité ». Registre volontairement différent de la signature ci-dessous : ici on nomme, on ne raconte pas.",
      type: "string",
      group: "general",
      validation: (rule) => rule.max(80).warning("Idéalement moins de 80 caractères — reste un repère, pas une phrase."),
    }),
    defineField({
      name: "baselinePrincipale",
      title: "Signature principale",
      description:
        "Ton éditorial hôtellerie premium — ex. « Le bon sol est celui que l'on oublie. » (voir CLAUDE.md §2).",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "baselineTechnique",
      title: "Baseline technique (usage secondaire)",
      description:
        "Ex. « Sol perméable · Naturel · Durable » — footer, cartes de visite, supports déjà imprimés (voir CLAUDE.md §2).",
      type: "string",
      group: "general",
    }),
    imageField({
      name: "logo",
      title: "Logo (fond clair)",
      altRequired: false,
      group: "logos",
    }),
    imageField({
      name: "logoBlanc",
      title: "Logo (fond foncé)",
      altRequired: false,
      group: "logos",
    }),
    defineField({
      name: "logoHauteur",
      title: "Taille du logo dans la navigation",
      description:
        "Hauteur du logo dans la barre de navigation, en pixels. La barre de navigation s'adapte automatiquement à cette taille (pas besoin d'ajuster autre chose).",
      type: "number",
      group: "logos",
      initialValue: 32,
      validation: (rule) => rule.min(16).max(64).integer(),
    }),
    defineField({
      name: "email",
      title: "Email de contact",
      type: "string",
      group: "coordonnees",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "telephone",
      title: "Téléphone",
      type: "string",
      group: "coordonnees",
    }),
    defineField({
      name: "adresse",
      title: "Adresse",
      type: "text",
      rows: 2,
      group: "coordonnees",
    }),
    defineField({
      name: "reseauxSociaux",
      title: "Réseaux sociaux",
      type: "array",
      group: "reseaux",
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
      group: "seo",
      fields: [
        defineField({ name: "titre", title: "Titre", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          validation: (rule) => rule.max(160).warning("Idéalement moins de 160 caractères."),
        }),
        defineField({
          name: "imageOg",
          title: "Image de partage",
          description: "Utilisée par les réseaux sociaux (Open Graph) — pas besoin de texte alternatif.",
          type: "image",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Réglages du site" };
    },
  },
});
