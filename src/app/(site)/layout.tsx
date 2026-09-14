import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { SmoothScroll } from "@/components/home/SmoothScroll";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery, type SiteSettingsDoc } from "@/sanity/lib/queries";

/**
 * Habillage des pages du site public (nav + footer). Volontairement
 * séparé du layout racine via un route group : `/studio` reste en dehors
 * et garde son propre défilement natif (voir CLAUDE.md §6).
 *
 * Le smooth scroll (Lenis + GSAP ScrollTrigger, §6) enveloppe tout le
 * groupe pour que la navigation et le footer restent cohérents avec le
 * récit de la homepage.
 *
 * `siteSettings` est chargé une seule fois ici (nav + footer en ont tous
 * les deux besoin) plutôt que dans chaque page — §11, pas de texte de
 * marque en dur au-delà d'un repli si le Studio n'a rien renseigné.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityFetch<SiteSettingsDoc | null>(siteSettingsQuery);

  return (
    <SmoothScroll>
      <Nav descripteur={settings?.descripteurCourt} />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer baseline={settings?.baselineTechnique} />
    </SmoothScroll>
  );
}
