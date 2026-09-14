"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "permeastone",
  title: "PermeaStone",

  // Le Studio est embarqué sur /studio (route catch-all Next.js, §6) —
  // sans ce basePath, le routeur interne du Studio prend le premier
  // segment de l'URL ("studio") pour un nom d'outil et échoue avec
  // "Tool not found: studio".
  basePath: "/studio",

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    // Vision permet de tester des requêtes GROQ directement dans le
    // Studio — pratique en dev, pas indispensable pour l'éditeur final.
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
    // Un gabarit par page secondaire épinglée (`enteteDePage`, §6/§11) : le
    // champ `page` (lecture seule dans le formulaire) est pré-rempli à la
    // création du document pointé par `structure.ts`, pour qu'un éditeur ne
    // puisse jamais se tromper de page en remplissant ce champ à la main.
    templates: (prev) => [
      ...prev,
      ...([
        ["solutions", "Solutions"],
        ["applications", "Applications"],
        ["realisations", "Réalisations"],
        ["notre-approche", "Notre approche"],
        ["votre-projet", "Votre projet"],
      ] as const).map(([page, title]) => ({
        id: `enteteDePage-${page}`,
        title: `En-tête — ${title}`,
        schemaType: "enteteDePage",
        value: { page },
      })),
    ],
  },
});
