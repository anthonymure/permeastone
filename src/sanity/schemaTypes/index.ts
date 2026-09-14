import type { SchemaTypeDefinition } from "sanity";

import application from "./application";
import demandeContact from "./demandeContact";
import enteteDePage from "./enteteDePage";
import homepageSection from "./homepageSection";
import microcopie from "./microcopie";
import realisation from "./realisation";
import siteSettings from "./siteSettings";
import solution from "./solution";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Contenu piloté par Sanity (§6) — solution/réalisation/application ne
  // doivent jamais contenir de texte en dur côté composants (§11).
  solution,
  realisation,
  application,
  homepageSection,
  enteteDePage,
  siteSettings,
  microcopie,
  // Demandes reçues via le formulaire « Votre projet » (§6/§9).
  demandeContact,
];
