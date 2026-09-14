import type { StructureResolver } from "sanity/structure";

/**
 * Structure du Studio : `siteSettings` est traité comme un document
 * singleton (un seul existe, pas de liste ni de suppression) pour ne pas
 * dérouter un éditeur non-technique — voir CLAUDE.md §6. « Demandes de
 * contact » est remonté en tête, trié par date de réception, car c'est le
 * contenu le plus actionnable au quotidien pour l'éditeur (§6/§9).
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Demandes de contact")
        .id("demandeContact")
        .child(
          S.documentTypeList("demandeContact")
            .title("Demandes de contact")
            .defaultOrdering([{ field: "recuLe", direction: "desc" }]),
        ),
      S.divider(),
      S.listItem()
        .title("Réglages du site")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !["siteSettings", "demandeContact"].includes(item.getId() ?? ""),
      ),
    ]);
