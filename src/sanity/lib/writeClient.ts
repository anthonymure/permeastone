import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Client Sanity capable d'écrire (mutations), utilisé uniquement côté
 * serveur (ex. `src/app/api/contact/route.ts`) — jamais importé depuis un
 * composant client. Nécessite `SANITY_API_WRITE_TOKEN` (Sanity → Manage →
 * API → Tokens, droits "Editor" ou "Write"), distinct du token de lecture
 * utilisé pour la revalidation à la demande (§6).
 *
 * `writeClient` est `null` tant que le token n'est pas configuré — les
 * appelants doivent gérer ce cas plutôt que planter (voir route contact).
 */
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

export const writeClient = writeToken
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token: writeToken,
      useCdn: false,
    })
  : null;
