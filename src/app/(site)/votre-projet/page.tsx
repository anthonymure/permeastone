import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/content/ContactForm";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery, type SiteSettingsDoc } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Votre projet — PermeaStone",
  description: "Parlez-nous de votre lieu, votre usage, votre projet.",
};

/**
 * Page Votre projet (§5/§6) : formulaire simple pour le lancement, route
 * `/api/contact` dédiée pour accueillir CRM/email plus tard sans réécrire
 * le front (§6/§9). Coordonnées pilotées par `siteSettings` (§6).
 */
export default async function VotreProjetPage() {
  const settings = await sanityFetch<SiteSettingsDoc | null>(siteSettingsQuery);

  return (
    <>
      <PageHero
        eyebrow="Votre projet"
        titre="Parlons de votre lieu."
        intro="Racontez-nous votre projet — nous revenons vers vous pour comprendre le lieu, l'usage et les contraintes avant toute solution."
      />

      <Section className="pt-8">
        <Container className="grid gap-16 lg:grid-cols-[2fr_1fr]">
          <ContactForm />

          <div className="flex flex-col gap-8 self-start rounded-sm border border-anthracite/10 p-6">
            <Eyebrow>Coordonnées</Eyebrow>
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
              {!settings?.email && !settings?.telephone && !settings?.adresse ? (
                <p className="text-anthracite/50">
                  Coordonnées à renseigner dans les réglages du site (Studio).
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
