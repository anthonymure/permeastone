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
  description?: string;
  image?: SanityImageValue;
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
