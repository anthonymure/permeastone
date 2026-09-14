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
  realisationBySlugQuery,
  realisationSlugsQuery,
  type EnteteDePageDoc,
  type MicrocopieDoc,
  type RealisationDoc,
} from "@/sanity/lib/queries";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(realisationSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const realisation = await sanityFetch<RealisationDoc | null>(realisationBySlugQuery, { slug });
  if (!realisation) return {};
  return {
    title: realisation.titre,
    description: realisation.lieu,
  };
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" });

/**
 * Page détail d'une réalisation (§5) : histoire éditoriale, pas fiche
 * chantier. Eyebrows/lien retour pilotés par `microcopie` et `enteteDePage`
 * (§6/§11).
 */
export default async function RealisationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [realisation, microcopie, entete] = await Promise.all([
    sanityFetch<RealisationDoc | null>(realisationBySlugQuery, { slug }),
    sanityFetch<MicrocopieDoc | null>(microcopieQuery),
    sanityFetch<EnteteDePageDoc | null>(enteteDePageQuery, { page: "realisations" }),
  ]);

  if (!realisation) notFound();

  const photoPrincipale = realisation.photos?.[0];
  const autresPhotos = realisation.photos?.slice(1) ?? [];
  const sousTitre = [realisation.lieu, realisation.dateRealisation ? dateFormatter.format(new Date(realisation.dateRealisation)) : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <Container className="pt-16 md:pt-24">
        <Link
          href="/realisations"
          className="font-sans text-sm text-anthracite/60 transition-colors hover:text-primary"
        >
          ← {entete?.libelleNav || "Réalisations"}
        </Link>
        <Eyebrow className="mt-8">{microcopie?.realisationEyebrowDetail || "Réalisation"}</Eyebrow>
        <Heading level={1} className="mt-4 max-w-2xl">
          {realisation.titre}
        </Heading>
        {sousTitre ? (
          <p className="mt-4 font-sans text-base text-anthracite/60">{sousTitre}</p>
        ) : null}
      </Container>

      <Section className="pt-8">
        <Container>
          <SanityImage
            image={photoPrincipale}
            ratio="16/9"
            label={realisation.lieu ?? realisation.titre}
            className="rounded-sm"
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
        </Container>
      </Section>

      {realisation.texteEditorial?.length ? (
        <Section className="pt-0">
          <Container className="max-w-2xl">
            <RichText value={realisation.texteEditorial} />
          </Container>
        </Section>
      ) : null}

      {autresPhotos.length ? (
        <Section className="pt-0">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {autresPhotos.map((photo, index) => (
                <SanityImage
                  key={index}
                  image={photo}
                  ratio="4/5"
                  label={realisation.titre}
                  className="rounded-sm"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {realisation.solutions?.length || realisation.applications?.length ? (
        <Section className="bg-sand/20 pt-16">
          <Container className="flex flex-col gap-10 sm:flex-row sm:justify-between">
            {realisation.solutions?.length ? (
              <div>
                <Eyebrow>{microcopie?.realisationEyebrowSolutions || "Solutions utilisées"}</Eyebrow>
                <ul className="mt-4 flex flex-col gap-2">
                  {realisation.solutions.map((s) =>
                    s.slug ? (
                      <li key={s.nom}>
                        <Link
                          href={`/solutions/${s.slug}`}
                          className="font-serif text-lg text-anthracite transition-colors hover:text-primary"
                        >
                          {s.nom}
                        </Link>
                      </li>
                    ) : (
                      <li key={s.nom} className="font-serif text-lg text-anthracite">
                        {s.nom}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ) : null}

            {realisation.applications?.length ? (
              <div>
                <Eyebrow>{microcopie?.realisationEyebrowApplications || "Applications concernées"}</Eyebrow>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {realisation.applications.map((a) => (
                    <li
                      key={a.nom}
                      className="rounded-full border border-anthracite/15 px-4 py-2 font-sans text-sm text-anthracite/80"
                    >
                      {a.nom}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Container>
        </Section>
      ) : null}
    </>
  );
}
