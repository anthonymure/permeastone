"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-sm border border-anthracite/20 bg-offwhite px-4 py-3 font-sans text-sm text-anthracite placeholder:text-anthracite/40 focus:border-primary focus:outline-none";

/**
 * Formulaire « Votre projet » (§6, phase 6 de la roadmap §8). Poste vers
 * `/api/contact` — une route API dédiée pour pouvoir brancher un CRM plus
 * tard sans réécrire le formulaire front (§6/§9).
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "L'envoi a échoué. Réessayez dans un instant.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "L'envoi a échoué.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-primary/20 bg-primary/5 px-6 py-8">
        <p className="font-serif text-lg text-anthracite">Message envoyé.</p>
        <p className="mt-2 font-sans text-sm text-anthracite/70">
          Merci — nous revenons vers vous rapidement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="nom" className="font-sans text-sm text-anthracite/70">
            Nom
          </label>
          <input id="nom" name="nom" type="text" required className={inputClasses} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-sans text-sm text-anthracite/70">
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="etablissement" className="font-sans text-sm text-anthracite/70">
          Établissement <span className="text-anthracite/40">(optionnel)</span>
        </label>
        <input id="etablissement" name="etablissement" type="text" className={inputClasses} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-sans text-sm text-anthracite/70">
          Votre projet
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={inputClasses}
          placeholder="Lieu, usage, échéance — tout ce qui nous aide à comprendre votre projet."
        />
      </div>

      {status === "error" && errorMessage ? (
        <p className="font-sans text-sm text-red-700">{errorMessage}</p>
      ) : null}

      <Button type="submit" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Envoi…" : "Envoyer"}
      </Button>
    </form>
  );
}
