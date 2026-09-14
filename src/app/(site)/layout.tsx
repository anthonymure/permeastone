import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

/**
 * Habillage des pages du site public (nav + footer). Volontairement
 * séparé du layout racine via un route group : `/studio` reste en dehors
 * et garde son propre plein écran (voir CLAUDE.md §6).
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
