import type { StructureResolver } from "sanity/structure";

/**
 * Structure du Studio : `siteSettings` est traité comme un document
 * singleton (un seul existe, pas de liste ni de suppression) pour ne pas
 * dérouter un éditeur non-technique — voir CLAUDE.md §6.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Réglages du site")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "siteSettings",
      ),
    ]);
