/**
 * État vide sobre pour les listes pilotées par Sanity, tant que le Studio
 * n'a pas encore de contenu (§4/§10) — pas de faux contenu, juste un repère
 * discret plutôt qu'une page qui semble cassée.
 */
export function EmptyState({ message }: { message: string }) {
  return (
    <p className="rounded-sm border border-dashed border-anthracite/15 px-6 py-16 text-center font-sans text-sm text-anthracite/50">
      {message}
    </p>
  );
}
