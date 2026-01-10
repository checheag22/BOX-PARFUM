"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type CollectionItem = {
  title: string;
  image: string;
  brand: string;
};

const COLLECTIONS: CollectionItem[] = [
  {
    title: "Supremacy Afnan",
    image: "/images/collections/supremacy-afnan.png",
    brand: "Afnan",
  },
  {
    title: "Odyssey Armaf",
    image: "/images/collections/odyssey-armaf.png",
    brand: "Armaf",
  },
  {
    title: "Fakhar Lattafa",
    image: "/images/collections/fakhar-lattafa.png",
    brand: "Lattafa",
  },
  {
    title: "Club de Nuit Armaf",
    image: "/images/collections/club-de-nuit-armaf.png",
    brand: "Armaf",
  },
  {
    title: "Yara Lattafa",
    image: "/images/collections/yara-lattafa.png",
    brand: "Lattafa",
  },
  {
    title: "Assad Lattafa",
    image: "/images/collections/assad-lattafa.png",
    brand: "Lattafa",
  },
];

export function CollectionCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  const maxIndex = useMemo(
    () => Math.max(0, COLLECTIONS.length - itemsPerView),
    [itemsPerView],
  );

  useEffect(() => {
    const updateView = () => {
      setItemsPerView(window.innerWidth < 768 ? 1 : 3);
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  useEffect(() => {
    setStartIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const goPrev = () => {
    setStartIndex((current) => (current === 0 ? maxIndex : current - 1));
  };

  const goNext = () => {
    setStartIndex((current) => (current === maxIndex ? 0 : current + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 [--slide-size:100%] md:[--slide-size:33.333%]"
          style={{
            transform: `translateX(calc(${startIndex} * var(--slide-size) * -1))`,
          }}
        >
          {COLLECTIONS.map((collection) => (
            <div
              key={collection.title}
              className="w-full flex-shrink-0 px-3 md:w-1/3"
            >
              <a
                href={`/catalog?brand=${encodeURIComponent(collection.brand)}`}
                className="block bg-white px-6 py-8 shadow-[0_14px_36px_rgba(29,26,22,0.08)]"
              >
                <div className="relative mb-6 aspect-[4/5] w-full bg-white">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  {collection.title}
                </h2>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
          aria-label="Ver colección anterior"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={goNext}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
          aria-label="Ver colección siguiente"
        >
          ›
        </button>
      </div>
    </div>
  );
}
