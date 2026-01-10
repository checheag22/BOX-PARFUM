"use client";

import { useState } from "react";
import { buildWhatsAppUrlFromPhones, resolveWhatsAppPhones } from "@/lib/whatsapp";

const phones = resolveWhatsAppPhones({
  phones: process.env.NEXT_PUBLIC_WHATSAPP_PHONES,
  phone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE,
});
const defaultMessage =
  process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ?? "Hola, me interesa su catálogo.";

const contactEmail = "boxparfum@outlook.com";
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

  const whatsappUrl = buildWhatsAppUrlFromPhones(phones, defaultMessage);

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
      nextErrors.email = "Email inválido.";
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
    <div className="relative px-6 pb-20 pt-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-4 h-48 w-48 rounded-full bg-amber-300/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-52 -left-8 h-56 w-56 rounded-full bg-rose-300/30 blur-3xl"
      />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.5em] text-neutral-500">
            Contacto directo
          </p>
          <h1 className="text-4xl font-semibold text-neutral-900 sm:text-5xl">
            Cuéntanos qué aroma buscas
          </h1>
          <p className="max-w-2xl text-base text-neutral-600 sm:text-lg">
            Compártenos lo que buscas y te guiamos con recomendaciones personalizadas.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-[0_18px_50px_rgba(26,22,18,0.12)]"
          >
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500" htmlFor="name">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(event) => handleChange("name", event.target.value)}
                className="w-full rounded-2xl bg-[#f7f4ef] px-4 py-3 text-sm text-neutral-900 outline-none transition focus:bg-white focus:shadow-[0_0_0_2px_rgba(23,22,20,0.2)]"
              />
              {errors.name ? (
                <span className="text-xs text-rose-600">{errors.name}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => handleChange("email", event.target.value)}
                className="w-full rounded-2xl bg-[#f7f4ef] px-4 py-3 text-sm text-neutral-900 outline-none transition focus:bg-white focus:shadow-[0_0_0_2px_rgba(23,22,20,0.2)]"
              />
              {errors.email ? (
                <span className="text-xs text-rose-600">{errors.email}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500" htmlFor="message">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(event) => handleChange("message", event.target.value)}
                className="w-full rounded-2xl bg-[#f7f4ef] px-4 py-3 text-sm text-neutral-900 outline-none transition focus:bg-white focus:shadow-[0_0_0_2px_rgba(23,22,20,0.2)]"
              />
              {errors.message ? (
                <span className="text-xs text-rose-600">{errors.message}</span>
              ) : null}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-neutral-800"
            >
              Enviar mensaje →
            </button>

            {status === "success" ? (
              <div
                role="status"
                className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
              >
                Mensaje enviado. Te respondemos pronto.
              </div>
            ) : null}
          </form>

          <aside className="flex flex-col gap-6 rounded-3xl bg-white p-8 text-neutral-900 shadow-[0_18px_50px_rgba(26,22,18,0.12)]">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                Datos de contacto
              </p>
              <h2 className="mt-3 text-2xl font-semibold">Hablemos</h2>
            </div>
            <div className="flex flex-col gap-6 text-sm text-neutral-600">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  WhatsApp
                </p>
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:-translate-y-0.5 hover:bg-neutral-800"
                  >
                    Chatear ahora
                  </a>
                ) : (
                  <p className="mt-3">Configura el número en el .env.</p>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  Instagram
                </p>
                <p className="mt-2 text-base font-semibold text-neutral-900">
                  {instagramHandle}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  Email
                </p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-2 inline-flex text-base font-semibold text-neutral-900"
                >
                  {contactEmail}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
