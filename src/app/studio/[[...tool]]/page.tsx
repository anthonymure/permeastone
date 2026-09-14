/**
 * Studio Sanity embarqué sur /studio (voir CLAUDE.md §6).
 * Route "catch-all" requise par next-sanity pour le routing interne du Studio.
 */
import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
