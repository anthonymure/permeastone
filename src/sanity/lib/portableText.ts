import type { PortableTextValue } from "./queries";

/**
 * Transforme un texte de repli codé en dur (utilisé tant qu'aucun contenu
 * Sanity n'est publié) en Portable Text minimal — pour que les composants
 * de rendu (`RichText`) n'aient qu'un seul chemin à gérer, que le texte
 * vienne de Sanity ou du repli (§11). Le repli reste une simple chaîne à
 * écrire dans le code ; seul le contenu Sanity permet la mise en gras.
 */
export function toPortableText(text: string): PortableTextValue {
  return [
    {
      _type: "block",
      _key: "repli",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "repli-texte", text, marks: [] }],
    },
  ];
}

/**
 * Extrait le texte brut d'un contenu Portable Text — pour les usages qui
 * n'acceptent pas de mise en forme (balises `<meta description>`).
 */
export function toPlainText(value?: PortableTextValue | null): string {
  if (!value?.length) return "";
  return value
    .map((block) => {
      const children = (block as { children?: Array<{ text?: string }> }).children;
      return Array.isArray(children) ? children.map((child) => child.text ?? "").join("") : "";
    })
    .join(" ")
    .trim();
}
