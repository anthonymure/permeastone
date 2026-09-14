import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // `true` : réponses servies via le CDN Sanity (rapide, légèrement moins
  // frais). On désactivera pour les requêtes qui doivent voir le contenu
  // en brouillon (preview) une fois cette fonctionnalité mise en place.
  useCdn: true,
});
