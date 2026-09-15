import { BackToTop } from "@/components/layout/BackToTop";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { SmoothScroll } from "@/components/home/SmoothScroll";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  microcopieQuery,
  navLabelsQuery,
  siteSettingsQuery,
  type MicrocopieDoc,
  type NavLabelDoc,
  type SiteSettingsDoc,
} from "@/sanity/lib/queries";

/**
 * Habillage des pages du site public (nav + footer). Volontairement
 * séparé du layout racine via un route group : `/studio` reste en dehors
 * et garde son propre défilement natif (voir CLAUDE.md §6).
 *
 * Le smooth scroll (Lenis + GSAP ScrollTrigger, §6) enveloppe tout le
 * groupe pour que la navigation et le footer restent cohérents avec le
 * récit de la homepage.
 *
 * `siteSettings`, `microcopie` et les libellés de nav sont chargés une
 * seule fois ici (nav, footer et les encarts de contact en ont tous
 * besoin) plutôt que dans chaque page — §11, pas de texte de marque ou
 * d'interface en dur au-delà d'un repli si le Studio n'a rien renseigné.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, microcopie, navLabels] = await Promise.all([
    sanityFetch<SiteSettingsDoc | null>(siteSettingsQuery),
    sanityFetch<MicrocopieDoc | null>(microcopieQuery),
    sanityFetch<NavLabelDoc[]>(navLabelsQuery),
  ]);

  return (
    <SmoothScroll>
      <Nav
        nomSite={settings?.nomSite}
        logo={settings?.logo}
        logoHauteur={settings?.logoHauteur}
        descripteur={settings?.descripteurCourt}
        navLabels={navLabels}
        menuOuvrir={microcopie?.menuOuvrir}
        menuFermer={microcopie?.menuFermer}
      />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer
        nomSite={settings?.nomSite}
        logo={settings?.logo}
        logoHauteur={settings?.logoHauteurFooter}
        baseline={settings?.baselineTechnique}
        email={settings?.email}
        telephone={settings?.telephone}
        adresse={settings?.adresse}
        reseauxSociaux={settings?.reseauxSociaux}
        liensPiedDePage={settings?.liensPiedDePage}
        mentionsDroits={microcopie?.mentionsDroits}
      />
      <BackToTop ariaLabel={microcopie?.ariaRemonterHaut} />
      <FloatingContact label={microcopie?.libelleContactFlottant} />
    </SmoothScroll>
  );
}
