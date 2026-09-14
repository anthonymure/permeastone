import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { SanityImage } from "@/components/ui/SanityImage";
import { Section } from "@/components/ui/Section";
import { RichText } from "@/components/content/RichText";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  enteteDePageQuery,
  microcopieQuery,
  solutionBySlugQuery,
  solutionSlugsQuery,
  type EnteteDePageDoc,
  type MicrocopieDoc,
  type SolutionDoc,
} from "@/sanity/lib/queries";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(solutionSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = await sanityFetch<SolutionDoc | null>(solutionBySlugQuery, { slug });
  if (!solution) return {};
  return {
    title: solution.nom,
    description: solution.accroche,
  };
}

/**
 * Page détail d'une solution (§5/§6). Caractéristiques en champs structurés
 * (pas de texte libre) pour rester compatible avec le futur configurateur (§9).
 * Eyebrows/lien retour/phrase-gabarit pilotés par `microcopie` et
 * `enteteDePage` (§6/§11).
 */
export default async function SolutionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [solution, microcopie, entete] = await Promise.all([
    sanityFetch<SolutionDoc | null>(solutionBySlugQuery, { slug }),
    sanityFetch<MicrocopieDoc | null>(microcopieQuery),
    sanityFetch<EnteteDePageDoc | null>(enteteDePageQuery, { page: "solutions" }),
  ]);

  if (!solution) notFound();

  const photoPrincipale = solution.photos?.[0];
  const autresPhotos = solution.photos?.slice(1) ?? [];

  return (
    <>
      <Container className="pt-16 md:pt-24">
        <Link
          href="/solutions"
          className="font-sans text-sm text-anthracite/60 transition-colors hover:text-primary"
        >
          ← {entete?.libelleNav || "Solutions"}
        </Link>
        <Eyebrow className="mt-8">{microcopie?.solutionEyebrowDetail || "Solution"}</Eyebrow>
        <Heading level={1} className="mt-4 max-w-2xl">
          {solution.nom}
        </Heading>
        {solution.accroche ? (
          <p className="mt-4 max-w-xl font-sans text-base text-anthracite/70">
            {solution.accroche}
          </p>
        ) : null}
      </Container>

      <Section className="pt-8 md:pt-8">
        <Container>
          <SanityImage
            image={photoPrincipale}
            ratio="16/9"
            label={solution.nom}
            className="rounded-sm"
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
        </Container>
      </Section>

      {solution.description?.length || solution.caracteristiques?.length ? (
        <Section className="pt-0 md:pt-0">
          <Container className="grid gap-16 md:grid-cols-[2fr_1fr]">
            {solution.description?.length ? (
              <RichText value={solution.description} />
            ) : (
              <div />
            )}

            {solution.caracteristiques?.length ? (
              <dl className="flex flex-col gap-4 self-start rounded-sm border border-anthracite/10 p-6">
                {solution.caracteristiques.map((c) => (
                  <div key={c.propriete} className="flex flex-col gap-1">
                    <dt className="font-sans text-xs uppercase tracking-[0.15em] text-anthracite/50">
                      {c.propriete}
                    </dt>
                    <dd className="font-serif text-lg text-anthracite">{c.valeur}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </Container>
        </Section>
      ) : null}

      {autresPhotos.length ? (
        <Section className="pt-0 md:pt-0">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {autresPhotos.map((photo, index) => (
                <SanityImage
                  key={index}
                  image={photo}
                  ratio="4/5"
                  label={solution.nom}
                  className="rounded-sm"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {solution.applications?.length ? (
        <Section className="bg-sand/20 pt-16 md:pt-16">
          <Container>
            <Eyebrow>{microcopie?.solutionEyebrowApplications || "Applications"}</Eyebrow>
            <p className="mt-4 max-w-xl font-sans text-base text-anthracite/70">
              {(microcopie?.solutionPhraseApplications || "Usages hôteliers pour lesquels {nom} est adaptée.").replace(
                "{nom}",
                solution.nom,
              )}
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {solution.applications.map((app) => (
                <li
                  key={app.nom}
                  className="rounded-full border border-anthracite/15 px-4 py-2 font-sans text-sm text-anthracite/80"
                >
                  {app.nom}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
