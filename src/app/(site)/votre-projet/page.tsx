import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/content/ContactForm";
import { sanityFetch } from "@/sanity/lib/fetch";
import { toPlainText, toPortableText } from "@/sanity/lib/portableText";
import {
  enteteDePageQuery,
  microcopieQuery,
  siteSettingsQuery,
  type EnteteDePageDoc,
  type MicrocopieDoc,
  type SiteSettingsDoc,
} from "@/sanity/lib/queries";

const ENTETE_REPLI = {
  eyebrow: "Votre projet",
  titre: "Parlons de votre lieu.",
  intro:
    "Racontez-nous votre projet — nous revenons vers vous pour comprendre le lieu, l'usage et les contraintes avant toute solution.",
};

export async function generateMetadata(): Promise<Metadata> {
  const entete = await sanityFetch<EnteteDePageDoc | null>(enteteDePageQuery, { page: "votre-projet" });
  return {
    title: entete?.seoTitre || entete?.titre || ENTETE_REPLI.titre,
    description: entete?.seoDescription || (entete?.intro ? toPlainText(entete.intro) : ENTETE_REPLI.intro),
  };
}

/**
 * Page Votre projet (§5/§6) : formulaire simple pour le lancement, route
 * `/api/contact` dédiée pour accueillir CRM/email plus tard sans réécrire
 * le front (§6/§9). En-tête pilotée par `enteteDePage`, coordonnées par
 * `siteSettings`, microcopie du formulaire par `microcopie` (§6/§11).
 */
export default async function VotreProjetPage() {
  const [settings, entete, microcopie] = await Promise.all([
    sanityFetch<SiteSettingsDoc | null>(siteSettingsQuery),
    sanityFetch<EnteteDePageDoc | null>(enteteDePageQuery, { page: "votre-projet" }),
    sanityFetch<MicrocopieDoc | null>(microcopieQuery),
  ]);

  const coordonnees = [settings?.email, settings?.telephone, settings?.adresse].some(Boolean);

  return (
    <>
      <PageHero
        eyebrow={entete?.eyebrow || ENTETE_REPLI.eyebrow}
        titre={entete?.titre || ENTETE_REPLI.titre}
        intro={entete?.intro?.length ? entete.intro : toPortableText(ENTETE_REPLI.intro)}
      />

      <Section className="pt-8 md:pt-8">
        <Container className="grid gap-16 lg:grid-cols-[2fr_1fr]">
          <ContactForm copy={microcopie} />

          {/* Tant qu'aucune coordonnée n'est renseignée dans les réglages du
              site, on n'affiche rien plutôt qu'un texte de repli destiné à
              l'éditeur (§10 — ce texte ne doit jamais atteindre un visiteur). */}
          {coordonnees ? (
            <div className="flex flex-col gap-8 self-start rounded-sm border border-anthracite/10 p-6">
              <Eyebrow>{entete?.coordonneesEyebrow || "Coordonnées"}</Eyebrow>
              <div className="flex flex-col gap-4 font-sans text-sm text-anthracite/80">
                {settings?.email ? (
                  <a href={`mailto:${settings.email}`} className="transition-colors hover:text-primary">
                    {settings.email}
                  </a>
                ) : null}
                {settings?.telephone ? (
                  <a href={`tel:${settings.telephone}`} className="transition-colors hover:text-primary">
                    {settings.telephone}
                  </a>
                ) : null}
                {settings?.adresse ? (
                  <p className="whitespace-pre-line text-anthracite/60">{settings.adresse}</p>
                ) : null}
              </div>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
