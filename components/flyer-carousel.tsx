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
                  className="inline-flex w-[220px] items-center justify-center rounded-full bg-red-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-500"
                >
                  Ver ofertas
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
