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
