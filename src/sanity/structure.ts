import type { StructureResolver } from "sanity/structure";

/**
 * Les 5 pages secondaires épinglées sous « En-têtes de page » — voir
 * `enteteDePage` (§6/§11). Toutes les pages, y compris « Notre approche »,
 * ont leur en-tête au même endroit : ne pas déplacer « notre-approche » de
 * cette liste, sous peine de rendre son en-tête introuvable pour l'éditeur
 * (elle serait la seule à ne pas suivre ce chemin habituel).
 */
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
 * principe pour les `enteteDePage`, épinglés un par un pour éviter qu'un
 * éditeur en crée un en double sur une même page. « Demandes de contact »
 * est remonté en tête, trié par date de réception, car c'est le contenu le
 * plus actionnable au quotidien pour l'éditeur (§6/§9).
 */
export const structure: StructureResolver = (S) => {
  // « Notre approche » a, comme Solutions/Applications/Réalisations, un
  // dossier de premier niveau pour son contenu propre — ici les 6 étapes de
  // la méthode, stockées dans le document `homepageSection` (cle
  // "projet-avant-produit") partagé avec la scène homepage du même nom
  // (§5/§6) — sans ce raccourci, ces étapes restent noyées dans la liste
  // générique des 10 sections homepage, introuvables pour un éditeur non
  // technique. Son en-tête, lui, reste dans « En-têtes de page » avec les 4
  // autres (voir `PAGES_SECONDAIRES` ci-dessus) : ne pas le dupliquer ici.
  const notreApprocheItem = S.listItem()
    .title("Notre approche")
    .id("notre-approche")
    .child(
      S.documentList()
        .title("Notre approche — étapes de la méthode")
        .schemaType("homepageSection")
        .filter('_type == "homepageSection" && cle == "projet-avant-produit"'),
    );

  const dossiersDeContenu = S.documentTypeListItems().filter(
    (item) =>
      !["siteSettings", "microcopie", "enteteDePage", "demandeContact"].includes(
        item.getId() ?? "",
      ),
  );
  // Positionnée juste après Applications, pour rester proche de l'ordre de
  // la navigation du site (Solutions, Applications, Réalisations, Notre
  // approche, Votre projet).
  const indexApplications = dossiersDeContenu.findIndex((item) => item.getId() === "application");
  dossiersDeContenu.splice(
    indexApplications === -1 ? dossiersDeContenu.length : indexApplications + 1,
    0,
    notreApprocheItem,
  );

  return S.list()
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
      ...dossiersDeContenu,
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
    ]);
};
