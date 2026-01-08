export default function ShippingPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
          Envios
        </h1>
        <p className="text-base text-neutral-600">
          Realizamos envios nacionales con empaques seguros y seguimiento. Los
          tiempos estimados varian entre 2 y 5 dias habiles dependiendo de la
          ciudad.
        </p>
        <p className="text-base text-neutral-600">
          Una vez confirmada tu compra, recibiras un correo con el numero de guia
          y detalles de entrega.
        </p>
      </section>
    </div>
  );
}
