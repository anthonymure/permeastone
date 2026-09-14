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
  },
});
