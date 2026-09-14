import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { SmoothScroll } from "@/components/home/SmoothScroll";

/**
 * Habillage des pages du site public (nav + footer). Volontairement
 * séparé du layout racine via un route group : `/studio` reste en dehors
 * et garde son propre défilement natif (voir CLAUDE.md §6).
 *
 * Le smooth scroll (Lenis + GSAP ScrollTrigger, §6) enveloppe tout le
 * groupe pour que la navigation et le footer restent cohérents avec le
 * récit de la homepage.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Nav />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
