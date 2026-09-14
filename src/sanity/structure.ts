import type { StructureResolver } from "sanity/structure";

/** Les 5 pages secondaires épinglées — voir `enteteDePage` (§6/§11). */
const PAGES_SECONDAIRES = [
  { page: "solutions", title: "Solutions" },
  { page: "applications", title: "Applications" },
  { page: "realisations", title: "Réalisations" },
  { page: "notre-approche", title: "Notre approche" },
  { page: "votre-projet", title: "Votre projet" },
];

/**
 * Structure du Studio : `siteSettings` et `microcopie` sont traités comme
 * des documents singletons (un seul existe, pas de liste ni de suppression)
 * pour ne pas dérouter un éditeur non-technique — voir CLAUDE.md §6. Même
 * principe pour les 5 `enteteDePage`, épinglés un par un pour éviter qu'un
 * éditeur en crée un en double sur une même page. « Demandes de contact »
 * est remonté en tête, trié par date de réception, car c'est le contenu le
 * plus actionnable au quotidien pour l'éditeur (§6/§9).
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
        .title("En-têtes de page")
        .id("enteteDePage")
        .child(
          S.list()
            .title("En-têtes de page")
            .items(
              PAGES_SECONDAIRES.map(({ page, title }) =>
                S.listItem()
                  .title(title)
                  .id(`entete-${page}`)
                  .child(
                    S.document()
                      .schemaType("enteteDePage")
                      .documentId(`entete-${page}`)
                      .initialValueTemplate(`enteteDePage-${page}`),
                  ),
              ),
            ),
        ),
      S.divider(),
      S.listItem()
        .title("Réglages du site")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Textes d'interface")
        .id("microcopie")
        .child(
          S.document().schemaType("microcopie").documentId("microcopie"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          !["siteSettings", "microcopie", "enteteDePage", "demandeContact"].includes(
            item.getId() ?? "",
          ),
      ),
    ]);
