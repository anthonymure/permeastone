import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery, type SiteSettingsDoc } from "@/sanity/lib/queries";

// Titres / logotype (voir CLAUDE.md §3)
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

// Corps de texte (voir CLAUDE.md §3)
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const NOM_REPLI = "PermeaStone";
const DESCRIPTION_REPLI =
  "PermeaStone — revêtements de sols extérieurs perméables pour l'hôtellerie et l'hospitalité.";

/**
 * SEO par défaut piloté par `siteSettings.seoParDefaut` (§6/§11) : les pages
 * qui posent leur propre `title` (via `generateMetadata`) l'insèrent dans
 * le gabarit `%s — {nomSite}` ci-dessous, ce qui évite de recoder le
 * suffixe de marque à chaque page.
 */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettingsDoc | null>(siteSettingsQuery);
  const nomSite = settings?.nomSite || NOM_REPLI;

  return {
    title: {
      default: settings?.seoParDefaut?.titre || nomSite,
      template: `%s — ${nomSite}`,
    },
    description: settings?.seoParDefaut?.description || DESCRIPTION_REPLI,
    openGraph: settings?.seoParDefaut?.imageOg
      ? { images: [urlFor(settings.seoParDefaut.imageOg).width(1200).height(630).fit("crop").url()] }
      : undefined,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${playfairDisplay.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
