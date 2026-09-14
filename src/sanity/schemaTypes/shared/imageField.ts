import { defineField } from "sanity";
import type { FieldDefinition } from "sanity";

/**
 * Champ image standard (hotspot + texte alternatif) réutilisé par tous les
 * schémas de contenu, pour ne pas dupliquer cette logique (§11). Le texte
 * alternatif est requis dès qu'une image est renseignée — accessibilité et
 * SEO, particulièrement important une fois les vraies photos éditoriales en
 * place (§4).
 */
export function imageField({
  name = "image",
  title = "Image",
  description,
  altRequired = true,
  group,
}: {
  name?: string;
  title?: string;
  description?: string;
  altRequired?: boolean;
  group?: string;
} = {}): FieldDefinition {
  return defineField({
    name,
    title,
    description,
    type: "image",
    group,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Texte alternatif",
        description:
          "Décrit l'image pour l'accessibilité (lecteurs d'écran) et le SEO. Ex. « Terrasse en résine drainante bordant une piscine, hôtel XX ».",
        type: "string",
        validation: altRequired
          ? (rule) =>
              rule.custom((value, context) => {
                const parent = context.parent as { asset?: unknown } | undefined;
                if (parent?.asset && !value) {
                  return "Texte alternatif requis dès qu'une image est renseignée.";
                }
                return true;
              })
          : undefined,
      }),
    ],
  });
}

/**
 * Membre de tableau `image` avec le même champ alt — pour les galeries
 * photos (`solution.photos`, `realisation.photos`).
 */
export function imageArrayMember() {
  return {
    type: "image" as const,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Texte alternatif",
        description: "Décrit l'image pour l'accessibilité et le SEO.",
        type: "string",
        validation: (rule) =>
          rule.custom((value, context) => {
            const parent = context.parent as { asset?: unknown } | undefined;
            if (parent?.asset && !value) {
              return "Texte alternatif requis dès qu'une image est renseignée.";
            }
            return true;
          }),
      }),
    ],
  };
}
