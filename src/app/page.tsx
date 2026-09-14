export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary">
        PermeaStone
      </p>
      <h1 className="max-w-2xl font-serif text-4xl leading-tight text-anthracite sm:text-5xl">
        Le bon sol est celui que l&rsquo;on oublie.
      </h1>
      <p className="max-w-md font-sans text-base leading-relaxed text-anthracite/70">
        Le projet démarre. Cette page sera remplacée par le récit en
        défilement continu (voir CLAUDE.md §5).
      </p>
    </main>
  );
}
