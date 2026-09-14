import { NextResponse } from "next/server";

/**
 * Route de soumission du formulaire « Votre projet » (§6, phase 6 §8).
 *
 * Route API dédiée et découplée du composant front pour pouvoir, plus
 * tard, brancher l'envoi d'email (Resend ou équivalent) et/ou un webhook
 * CRM sans réécrire `ContactForm` (§6/§9). Tant qu'aucune clé d'envoi
 * n'est configurée (`RESEND_API_KEY`), on valide et on journalise
 * côté serveur plutôt que d'échouer silencieusement — l'éditeur voit
 * clairement qu'il manque une intégration, pas un bug.
 */
type ContactPayload = {
  nom?: string;
  email?: string;
  etablissement?: string;
  message?: string;
};

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

  const { nom, email, etablissement, message } = payload;

  if (!nom?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Nom, email et message sont requis." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    // Pas encore de service d'envoi configuré (§6/§10) : on journalise
    // côté serveur pour ne pas perdre la demande, et on prévient
    // clairement l'éditeur plutôt que de prétendre que l'email est parti.
    console.warn(
      "[contact] RESEND_API_KEY manquant — message non envoyé, journalisé uniquement:",
      { nom, email, etablissement, message },
    );
    return NextResponse.json(
      {
        error:
          "Le service d'envoi d'email n'est pas encore configuré. Contactez directement l'équipe en attendant.",
      },
      { status: 503 },
    );
  }

  // À brancher une fois RESEND_API_KEY renseigné (§6) :
  // const resend = new Resend(resendApiKey);
  // await resend.emails.send({ ... });

  return NextResponse.json({ ok: true });
}
