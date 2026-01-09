"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { FlyerCarousel } from "@/components/flyer-carousel";
import { CollectionCarousel } from "@/components/collection-carousel";
import { CatalogView } from "@/app/catalog/catalog-view";

export default function Home() {
  return (
    <div className="px-6 pb-16 pt-2">
      <FlyerCarousel />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <CollectionCarousel />
        <section className="border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                Marcas destacadas
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { name: "Afnan", image: "/images/brands/afnan.webp" },
              { name: "Lattafa", image: "/images/brands/lattafa.png" },
              { name: "Armaf", image: "/images/brands/armaf.png" },
              { name: "Al Haramain", image: "/images/brands/al-haramain.webp" },
              { name: "Bharara", image: "/images/brands/bharara.webp" },
            ].map((brand) => (
              <a
                key={brand.name}
                href={`/catalog?brand=${encodeURIComponent(brand.name)}`}
                className="ui-press flex items-center justify-center gap-3 border border-black/0 bg-[#fbf7f1] px-4 py-5 text-sm font-semibold text-neutral-700 transition hover:-translate-y-0.5 hover:border-black/0 hover:bg-black/5"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="h-8 w-auto object-contain"
                />
                <span>{brand.name}</span>
              </a>
            ))}
          </div>
        </section>
        <Suspense fallback={null}>
          <CatalogView showHeading={false} showSearch={false} />
        </Suspense>
      </section>
    </div>
  );
}
