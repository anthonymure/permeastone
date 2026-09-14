/**
 * Requêtes GROQ et types associés pour la homepage narrative (CLAUDE.md §5).
 * Centralisées ici plutôt que dispersées dans les composants, pour garder
 * un seul endroit à faire évoluer quand les schémas changent (§11).
 */

export type SanityImageValue = {
  asset?: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
} | null;

/** Une des dix étapes du récit (`homepageSection`), voir CLAUDE.md §5. */
export type HomepageSectionDoc = {
  cle: string;
  titre?: string;
  texte?: string;
  image?: SanityImageValue;
  realisations?: RealisationCardDoc[];
  solutions?: { nom: string; accroche?: string }[];
};

export type RealisationCardDoc = {
  titre: string;
  lieu?: string;
  photo?: SanityImageValue;
};

export type ApplicationDoc = {
  nom: string;
  slug?: string;
  description?: string;
  image?: SanityImageValue;
};

/** Bloc de texte riche (Portable Text) — `solution.description`, `realisation.texteEditorial`. */
export type PortableTextValue = Array<Record<string, unknown>>;

export type CaracteristiqueDoc = {
  propriete: string;
  valeur: string;
};

/** Carte solution — utilisée dans la liste `/solutions`. */
export type SolutionCardDoc = {
  nom: string;
  slug: string;
  accroche?: string;
  photo?: SanityImageValue;
};

/** Solution complète — page `/solutions/[slug]`. */
export type SolutionDoc = {
  nom: string;
  slug: string;
  accroche?: string;
  description?: PortableTextValue;
  caracteristiques?: CaracteristiqueDoc[];
  photos?: SanityImageValue[];
  applications?: { nom: string; slug?: string }[];
};

/** Carte réalisation — liste `/realisations` (distincte de `RealisationCardDoc`, propre à la homepage). */
export type RealisationListItemDoc = {
  titre: string;
  slug: string;
  lieu?: string;
  dateRealisation?: string;
  photo?: SanityImageValue;
};

/** Réalisation complète — page `/realisations/[slug]`. */
export type RealisationDoc = {
  titre: string;
  slug: string;
  lieu?: string;
  dateRealisation?: string;
  photos?: SanityImageValue[];
  texteEditorial?: PortableTextValue;
  solutions?: { nom: string; slug?: string }[];
  applications?: { nom: string }[];
};

export type SiteSettingsDoc = {
  nomSite?: string;
  baselinePrincipale?: string;
  baselineTechnique?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  reseauxSociaux?: { plateforme?: string; url?: string }[];
};

export const homepageSectionsQuery = /* groq */ `
*[_type == "homepageSection"] | order(ordre asc) {
  cle,
  titre,
  texte,
  image,
  "realisations": realisationsLiees[]->{
    "titre": titre,
    lieu,
    "photo": photos[0]
  },
  "solutions": solutionsLiees[]->{
    nom,
    accroche
  }
}`;

/** Usages hôteliers (étape 6, « Un sol pour chaque lieu ») — collection indépendante des sections. */
export const applicationsQuery = /* groq */ `
*[_type == "application"] | order(ordre asc) {
  nom,
  description,
  image
}`;

/** Repli pour l'étape 8 si aucune réalisation n'est reliée manuellement à la section. */
export const featuredRealisationsQuery = /* groq */ `
*[_type == "realisation" && miseEnAvant == true] | order(ordre asc) [0...3] {
  "titre": titre,
  lieu,
  "photo": photos[0]
}`;

/** Page `/applications` — mêmes usages que la homepage, avec leur slug pour un futur lien détail. */
export const applicationsListQuery = /* groq */ `
*[_type == "application"] | order(ordre asc) {
  nom,
  "slug": slug.current,
  description,
  image
}`;

/** Page `/solutions` — cartes triées manuellement (`ordre`) puis par nom. */
export const solutionsQuery = /* groq */ `
*[_type == "solution"] | order(ordre asc, nom asc) {
  nom,
  "slug": slug.current,
  accroche,
  "photo": photos[0]
}`;

/** Page `/solutions/[slug]`. */
export const solutionBySlugQuery = /* groq */ `
*[_type == "solution" && slug.current == $slug][0]{
  nom,
  "slug": slug.current,
  accroche,
  description,
  caracteristiques,
  photos,
  "applications": applications[]->{ nom, "slug": slug.current }
}`;

export const solutionSlugsQuery = /* groq */ `
*[_type == "solution" && defined(slug.current)].slug.current`;

/** Page `/realisations` — triées manuellement (`ordre`) puis par date récente. */
export const realisationsQuery = /* groq */ `
*[_type == "realisation"] | order(ordre asc, dateRealisation desc) {
  titre,
  "slug": slug.current,
  lieu,
  dateRealisation,
  "photo": photos[0]
}`;

/** Page `/realisations/[slug]`. */
export const realisationBySlugQuery = /* groq */ `
*[_type == "realisation" && slug.current == $slug][0]{
  titre,
  "slug": slug.current,
  lieu,
  dateRealisation,
  photos,
  texteEditorial,
  "solutions": solutions[]->{ nom, "slug": slug.current },
  "applications": applications[]->{ nom }
}`;

export const realisationSlugsQuery = /* groq */ `
*[_type == "realisation" && defined(slug.current)].slug.current`;

/** Coordonnées et réseaux — page `/votre-projet` et pied de page. */
export const siteSettingsQuery = /* groq */ `
*[_type == "siteSettings"][0]{
  nomSite,
  baselinePrincipale,
  baselineTechnique,
  email,
  telephone,
  adresse,
  reseauxSociaux
}`;
