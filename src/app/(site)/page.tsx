import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Section } from "@/components/ui/Section";

export default function Home() {
  return (
    <Section className="flex flex-1 flex-col justify-center">
      <Container className="flex flex-col items-center gap-8 text-center">
        <Eyebrow>PermeaStone</Eyebrow>

        <Heading level={1} className="max-w-2xl">
          Le bon sol est celui que l&rsquo;on oublie.
        </Heading>

        <p className="max-w-md font-sans text-base leading-relaxed text-anthracite/70">
          Le design system démarre. Cette page sera remplacée par le récit en
          défilement continu (voir CLAUDE.md §5).
        </p>

        <Button href="/votre-projet">Votre projet</Button>

        <PlaceholderImage
          ratio="16/9"
          label="Scène hôtelière — architecture, piscine, paysage"
          className="mt-8 w-full max-w-3xl rounded-sm"
        />
      </Container>
    </Section>
  );
}
