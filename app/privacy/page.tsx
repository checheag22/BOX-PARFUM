export default function PrivacyPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
          Aviso de privacidad
        </h1>
        <p className="text-base text-neutral-600">
          Protegemos tu informacion personal y solo la utilizamos para gestionar
          pedidos, soporte y comunicaciones relacionadas con Box Parfum.
        </p>
        <p className="text-base text-neutral-600">
          No compartimos tus datos con terceros sin consentimiento, salvo
          obligaciones legales o proveedores de envio.
        </p>
      </section>
    </div>
  );
}
