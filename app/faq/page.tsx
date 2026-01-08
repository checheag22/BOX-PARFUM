const faqs = [
  {
    question: "Como elegir mi perfume ideal?",
    answer:
      "Puedes filtrar por temporada, notas y concentracion. Si necesitas ayuda, escribenos y te guiaremos.",
  },
  {
    question: "Los perfumes son originales?",
    answer:
      "Si. Trabajamos con distribuidores autorizados y marcas de confianza.",
  },
  {
    question: "Puedo pedir recomendaciones personalizadas?",
    answer:
      "Claro. En la pagina de contacto puedes contarnos tus preferencias.",
  },
];

export default function FaqPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Preguntas frecuentes
          </h1>
          <p className="mt-3 text-base text-neutral-600">
            Resolvemos las dudas mas comunes sobre Box Parfum.
          </p>
        </div>
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-line bg-white p-6">
              <h2 className="text-lg font-semibold text-neutral-900">
                {faq.question}
              </h2>
              <p className="mt-3 text-sm text-neutral-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
