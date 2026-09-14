import type { ComponentProps } from "react";

/**
 * Chrome de carte commun aux grilles de contenu (Solutions, Applications,
 * Réalisations) — retour client (« cartes cheap ») : l'ancienne version
 * encadrait la photo dans une boîte bordée + fond sable, à peine
 * distinguable du fond de page (contraste trop faible pour se voir, assez
 * fort pour faire "boîte générique"). Repris dans la continuité de la
 * refonte des cartes de `/notre-approche` : plus de boîte fermée, la photo
 * (nette, coins discrets) fait le travail visuel, un simple filet sépare
 * l'image du texte et s'éclaire au survol — le même geste que les étapes
 * de la méthode, pour une seule grammaire de carte sur tout le site
 * (§5/§11 : la retenue plutôt que la quantité d'effets).
 */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={`flex h-full flex-col ${className ?? ""}`.trim()} {...props} />;
}

/**
 * Zone de contenu texte d'une carte — le filet supérieur (au lieu d'un
 * encadré complet) marque la limite avec l'image tout en restant discret ;
 * `group-hover:border-primary/50` suppose un ancêtre `group` (le lien qui
 * enveloppe la carte) et s'éclaire en vert de marque au survol, sinon reste
 * simplement sable.
 */
export function CardBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`flex flex-1 flex-col gap-2 border-t border-sand/60 pt-4 transition-colors duration-300 group-hover:border-primary/50 ${className ?? ""}`.trim()}
      {...props}
    />
  );
}
