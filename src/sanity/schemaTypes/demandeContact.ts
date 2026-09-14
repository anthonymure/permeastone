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
      name: "typeEtablissement",
      title: "Type d'établissement",
      description: "Pour qualifier la demande d'un coup d'œil dans la liste (§P2-1, roadmap positionnement hôtellerie).",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Hôtel", value: "hotel" },
          { title: "Resort", value: "resort" },
          { title: "Spa", value: "spa" },
          { title: "Restaurant", value: "restaurant" },
          { title: "Cabinet d'architecture / paysagiste", value: "architecte-paysagiste" },
          { title: "Autre", value: "autre" },
        ],
      },
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
    select: { title: "nom", subtitle: "email", statut: "statut", type: "typeEtablissement" },
    prepare({ title, subtitle, statut, type }) {
      const typeLabels: Record<string, string> = {
        hotel: "Hôtel",
        resort: "Resort",
        spa: "Spa",
        restaurant: "Restaurant",
        "architecte-paysagiste": "Architecte / paysagiste",
        autre: "Autre",
      };
      const details = [type ? typeLabels[type] : null, subtitle, statut === "traite" ? "Traité" : null]
        .filter(Boolean)
        .join(" · ");
      return {
        title: title || "(sans nom)",
        subtitle: details || undefined,
      };
    },
  },
});
