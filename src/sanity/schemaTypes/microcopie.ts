import { defineField, defineType } from "sanity";

/**
 * Textes d'interface génériques (labels, boutons, messages d'état) —
 * document singleton comme `siteSettings`. Séparé de `siteSettings`
 * (identité de marque/coordonnées) pour garder chaque document lisible à un
 * éditeur non-technique (§6).
 */
export default defineType({
  name: "microcopie",
  title: "Textes d'interface",
  type: "document",
  groups: [
    { name: "navigation", title: "Navigation", default: true },
    { name: "formulaire", title: "Formulaire de contact" },
    { name: "fiches", title: "Fiches détail" },
    { name: "divers", title: "Divers" },
  ],
  fields: [
    defineField({ name: "menuOuvrir", title: "Bouton « ouvrir le menu » (mobile)", type: "string", group: "navigation" }),
    defineField({ name: "menuFermer", title: "Bouton « fermer le menu » (mobile)", type: "string", group: "navigation" }),

    defineField({ name: "labelNom", title: "Label du champ Nom", type: "string", group: "formulaire" }),
    defineField({ name: "labelEmail", title: "Label du champ Email", type: "string", group: "formulaire" }),
    defineField({ name: "labelEtablissement", title: "Label du champ Établissement", type: "string", group: "formulaire" }),
    defineField({ name: "labelTypeEtablissement", title: "Label du champ Type d'établissement", type: "string", group: "formulaire" }),
    defineField({ name: "labelMessage", title: "Label du champ Message", type: "string", group: "formulaire" }),
    defineField({
      name: "placeholderMessage",
      title: "Texte indicatif du champ Message",
      type: "string",
      group: "formulaire",
    }),
    defineField({ name: "boutonEnvoyer", title: "Bouton d'envoi", type: "string", group: "formulaire" }),
    defineField({ name: "boutonEnvoiEnCours", title: "Bouton pendant l'envoi", type: "string", group: "formulaire" }),
    defineField({ name: "messageSuccesTitre", title: "Titre après envoi réussi", type: "string", group: "formulaire" }),
    defineField({ name: "messageSuccesTexte", title: "Texte après envoi réussi", type: "string", group: "formulaire" }),
    defineField({
      name: "messageErreurDefaut",
      title: "Message d'erreur par défaut",
      type: "string",
      group: "formulaire",
    }),

    defineField({ name: "solutionEyebrowDetail", title: "Étiquette d'une fiche Solution", type: "string", group: "fiches" }),
    defineField({
      name: "solutionEyebrowApplications",
      title: "Étiquette « Applications » sur une fiche Solution",
      type: "string",
      group: "fiches",
    }),
    defineField({
      name: "solutionPhraseApplications",
      title: "Phrase au-dessus des applications liées",
      description: "Utiliser {nom} pour insérer le nom de la solution — ex. « Usages hôteliers pour lesquels {nom} est adaptée. »",
      type: "string",
      group: "fiches",
    }),
    defineField({ name: "realisationEyebrowDetail", title: "Étiquette d'une fiche Réalisation", type: "string", group: "fiches" }),
    defineField({
      name: "realisationEyebrowSolutions",
      title: "Étiquette « Solutions utilisées » sur une fiche Réalisation",
      type: "string",
      group: "fiches",
    }),
    defineField({
      name: "realisationEyebrowApplications",
      title: "Étiquette « Applications concernées » sur une fiche Réalisation",
      type: "string",
      group: "fiches",
    }),

    defineField({ name: "libelleContactFlottant", title: "Libellé du bouton de contact flottant", type: "string", group: "divers" }),
    defineField({
      name: "ariaRemonterHaut",
      title: "Texte d'accessibilité du bouton « remonter en haut »",
      type: "string",
      group: "divers",
    }),
    defineField({ name: "mentionsDroits", title: "Mention « tous droits réservés » (pied de page)", type: "string", group: "divers" }),
  ],
  preview: {
    prepare() {
      return { title: "Textes d'interface" };
    },
  },
});
