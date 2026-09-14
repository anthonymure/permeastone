import { NextResponse } from "next/server";

import { writeClient } from "@/sanity/lib/writeClient";

/**
 * Route de soumission du formulaire « Votre projet » (§6, phase 6 §8).
 *
 * Pas d'envoi d'email pour cette étape : chaque demande valide est
 * enregistrée comme document `demandeContact` dans Sanity, consultable
 * directement dans le Studio par l'éditeur PermeaStone (non technique,
 * §6) — rien n'est perdu, et aucune boîte mail à surveiller. La route
 * reste isolée du composant front pour pouvoir brancher, plus tard et
 * sans réécrire `ContactForm`, un envoi d'email et/ou un webhook CRM
 * (§6/§9).
 */
type ContactPayload = {
  nom?: string;
  email?: string;
  etablissement?: string;
  typeEtablissement?: string;
  message?: string;
};

// Doit rester synchronisé avec les options du <select> (ContactForm.tsx)
// et la liste `demandeContact.typeEtablissement` (§P2-1).
const TYPES_ETABLISSEMENT_VALIDES = [
  "hotel",
  "resort",
  "spa",
  "restaurant",
  "architecte-paysagiste",
  "autre",
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { nom, email, etablissement, typeEtablissement, message } = payload;

  if (!nom?.trim() || !email?.trim() || !message?.trim() || !typeEtablissement?.trim()) {
    return NextResponse.json(
      { error: "Nom, email, type d'établissement et message sont requis." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  if (!TYPES_ETABLISSEMENT_VALIDES.includes(typeEtablissement)) {
    return NextResponse.json({ error: "Type d'établissement invalide." }, { status: 400 });
  }

  if (!writeClient) {
    // Pas encore de token d'écriture Sanity configuré (§6/§10) : on
    // journalise côté serveur pour ne pas perdre la demande, et on
    // prévient clairement l'éditeur plutôt que de prétendre qu'elle a
    // bien été enregistrée.
    console.warn(
      "[contact] SANITY_API_WRITE_TOKEN manquant — demande non enregistrée, journalisée uniquement:",
      { nom, email, etablissement, typeEtablissement, message },
    );
    return NextResponse.json(
      {
        error:
          "L'enregistrement des demandes n'est pas encore configuré. Contactez directement l'équipe en attendant.",
      },
      { status: 503 },
    );
  }

  try {
    await writeClient.create({
      _type: "demandeContact",
      nom: nom.trim(),
      email: email.trim(),
      etablissement: etablissement?.trim() || undefined,
      typeEtablissement,
      message: message.trim(),
      recuLe: new Date().toISOString(),
      statut: "nouveau",
    });
  } catch (error) {
    console.error("[contact] Échec de l'enregistrement dans Sanity:", error);
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez dans un instant." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
