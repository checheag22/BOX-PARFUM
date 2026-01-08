"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-line bg-white">
        {activeImage ? (
          <Image
            src={activeImage}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-500">
            Sin imagen
          </div>
        )}
      </div>
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative h-20 w-16 overflow-hidden rounded-2xl border transition ${
              index === activeIndex
                ? "border-neutral-900"
                : "border-neutral-200 hover:border-neutral-400"
            }`}
            aria-label={`Ver imagen ${index + 1}`}
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
