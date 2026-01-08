import Link from "next/link";

const collections = [
  {
    title: "Signature",
    description: "Aromas iconicos para el dia a dia.",
  },
  {
    title: "Noche",
    description: "Notas intensas y sensuales para ocasiones especiales.",
  },
  {
    title: "Frescos",
    description: "Citrico, limpio, perfecto para dias calidos.",
  },
];

export default function Home() {
  return (
    <div className="px-6 pb-16 pt-12">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="rounded-[32px] border border-line bg-white/70 px-8 py-12 shadow-sm sm:px-12 sm:py-16">
          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-500">
              Curated fragrances
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-neutral-900 sm:text-5xl">
              Encuentra tu firma olfativa con una seleccion boutique de perfumes.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              Box Parfum combina marcas de autor, esencias atemporales y lanzamientos
              exclusivos para cada estacion.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Explorar catalogo
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-500"
              >
                Ver colecciones
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {collections.map((collection) => (
            <div
              key={collection.title}
              className="rounded-2xl border border-line bg-white px-6 py-8 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-neutral-900">
                {collection.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {collection.description}
              </p>
              <Link
                href="/catalog"
                className="mt-6 inline-flex text-sm font-semibold text-accent"
              >
                Descubrir
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
