"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    type: "image",
    src: "/images/flyers/flyer.png",
    alt: "Flyer principal",
  },
  {
    type: "video",
    src: "/videos/flyer.mp4",
    alt: "Flyer en video",
  },
];
export function FlyerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 16000);

    return () => clearInterval(interval);
  }, []);

  const active = slides[activeIndex];

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-4 pb-6">
      <div className="relative overflow-hidden px-3">
        <div className="relative aspect-[16/5.5] w-full rounded-3xl border border-black/5 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
          {active.type === "video" ? (
            <video
              key={active.src}
              src={active.src}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <Image
                src={active.src}
                alt={active.alt}
                key={active.src}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute left-[30%] top-[62%] -translate-x-1/2 -translate-y-1/2">
                <a
                  href="/catalog?offer=1"
                  className="inline-flex w-[160px] items-center justify-center rounded-full bg-red-600 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-500 md:w-[220px] md:px-4 md:py-2 md:text-[10px] md:tracking-[0.3em]"
                >
                  Ver ofertas
                </a>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 px-3">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex
                ? "w-10 bg-black/70"
                : "w-6 bg-black/20 hover:bg-black/40"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
        <span className="sr-only">
          {`Slide ${activeIndex + 1} de ${slides.length}`}
        </span>
      </div>
    </section>
  );
}
