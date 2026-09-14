import { defineField, defineType } from "sanity";

/**
 * Demande envoyée depuis le formulaire « Votre projet » (§5/§6).
 *
 * Pour le lancement, sans service d'envoi d'email configuré, chaque
 * soumission est enregistrée ici plutôt que perdue — l'éditeur PermeaStone
 * (non technique, §6) peut consulter et traiter ses demandes directement
 * dans le Studio. Les champs de contact sont en lecture seule : ils
 * viennent du visiteur, seul le statut de traitement est modifiable.
 * Voir la route `src/app/api/contact/route.ts` et CLAUDE.md §6/§9 (webhook
 * CRM à brancher plus tard sans réécrire le formulaire).
 */
export default defineType({
  name: "demandeContact",
  title: "Demande de contact",
  type: "document",
  fields: [
    defineField({
      name: "nom",
      title: "Nom",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "etablissement",
      title: "Établissement",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 5,
      readOnly: true,
    }),
    defineField({
      name: "recuLe",
      title: "Reçu le",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "statut",
      title: "Statut",
      type: "string",
      description: "À mettre à jour une fois la demande prise en charge.",
      options: {
        list: [
          { title: "Nouveau", value: "nouveau" },
          { title: "Traité", value: "traite" },
        ],
        layout: "radio",
      },
      initialValue: "nouveau",
    }),
  ],
  orderings: [
    {
      title: "Plus récent d'abord",
      name: "recuLeDesc",
      by: [{ field: "recuLe", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "nom", subtitle: "email", statut: "statut" },
    prepare({ title, subtitle, statut }) {
      return {
        title: title || "(sans nom)",
        subtitle: statut === "traite" ? `${subtitle} · Traité` : subtitle,
      };
    },
  },
});
