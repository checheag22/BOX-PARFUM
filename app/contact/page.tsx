"use client";

import { useState } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "524779127884";
const defaultMessage =
  process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ?? "Hola, me interesa su catalogo.";

const contactEmail = "hola@boxparfum.com";
const instagramHandle = "@boxparfum";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const whatsappUrl = phone
    ? buildWhatsAppUrl(phone, defaultMessage)
    : "";

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Nombre requerido.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email requerido.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Email invalido.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Mensaje requerido.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");

    if (!validate()) {
      return;
    }

    setStatus("success");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="px-6 pb-20 pt-12">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Contacto
          </h1>
          <p className="max-w-2xl text-base text-neutral-600">
            Compartenos lo que buscas y te guiamos con recomendaciones personalizadas.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-3xl border border-line bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-neutral-700" htmlFor="name">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(event) => handleChange("name", event.target.value)}
                className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400"
              />
              {errors.name ? (
                <span className="text-xs text-rose-600">{errors.name}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-neutral-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => handleChange("email", event.target.value)}
                className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400"
              />
              {errors.email ? (
                <span className="text-xs text-rose-600">{errors.email}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-neutral-700" htmlFor="message">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(event) => handleChange("message", event.target.value)}
                className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400"
              />
              {errors.message ? (
                <span className="text-xs text-rose-600">{errors.message}</span>
              ) : null}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Enviar
            </button>

            {status === "success" ? (
              <div
                role="status"
                className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
              >
                Mensaje enviado. Te respondemos pronto.
              </div>
            ) : null}
          </form>

          <aside className="flex flex-col gap-5 rounded-3xl border border-line bg-white/80 p-6">
            <h2 className="text-lg font-semibold text-neutral-900">
              Datos de contacto
            </h2>
            <div className="text-sm text-neutral-600">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                WhatsApp
              </p>
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-sm font-semibold text-accent"
                >
                  Chatear por WhatsApp
                </a>
              ) : (
                <p className="mt-2">Configura el numero en el .env.</p>
              )}
            </div>
            <div className="text-sm text-neutral-600">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                Instagram
              </p>
              <p className="mt-2 text-sm font-semibold text-neutral-800">
                {instagramHandle}
              </p>
            </div>
            <div className="text-sm text-neutral-600">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                Email
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-2 inline-flex text-sm font-semibold text-neutral-800"
              >
                {contactEmail}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
