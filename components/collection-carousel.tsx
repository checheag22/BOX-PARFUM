"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type CollectionItem = {
  title: string;
  image: string;
  query: string;
};

const COLLECTIONS: CollectionItem[] = [
  {
    title: "Supremacy Afnan",
    image: "/images/collections/supremacy-afnan.png",
    query: "supremacy",
  },
  {
    title: "Odyssey Armaf",
    image: "/images/collections/odyssey-armaf.png",
    query: "odyssey",
  },
  {
    title: "Fakhar Lattafa",
    image: "/images/collections/fakhar-lattafa.png",
    query: "fakhar",
  },
  {
    title: "Club de Nuit Armaf",
    image: "/images/collections/club-de-nuit-armaf.png",
    query: "club de nuit",
  },
  {
    title: "Yara Lattafa",
    image: "/images/collections/yara-lattafa.png",
    query: "yara",
  },
  {
    title: "Assad Lattafa",
    image: "/images/collections/assad-lattafa.png",
    query: "asad",
  },
];

export function CollectionCarousel() {
  const [itemsPerView, setItemsPerView] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(itemsPerView);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<number | null>(null);
  const dragState = useRef({ startX: 0, deltaX: 0, isDragging: false });

  const extendedCollections = useMemo(() => {
    const head = COLLECTIONS.slice(0, itemsPerView);
    const tail = COLLECTIONS.slice(-itemsPerView);
    return [...tail, ...COLLECTIONS, ...head];
  }, [itemsPerView]);

  const minIndex = itemsPerView;
  const maxIndex = itemsPerView + COLLECTIONS.length - 1;

  useEffect(() => {
    const updateView = () => {
      setItemsPerView(window.innerWidth < 768 ? 1 : 3);
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  useEffect(() => {
    setIsTransitionEnabled(false);
    setCurrentIndex(itemsPerView);
    const timer = window.setTimeout(() => setIsTransitionEnabled(true), 0);
    return () => window.clearTimeout(timer);
  }, [itemsPerView]);

  useEffect(() => {
    if (isPaused) {
      return;
    }
    const interval = window.setInterval(() => {
      setCurrentIndex((current) => current + 1);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const goPrev = () => {
    setCurrentIndex((current) => current - 1);
  };

  const goNext = () => {
    setCurrentIndex((current) => current + 1);
  };

  const pauseAuto = (resume = true) => {
    setIsPaused(true);
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    if (resume) {
      resumeTimerRef.current = window.setTimeout(() => {
        setIsPaused(false);
      }, 1200);
    }
  };

  const beginDrag = (clientX: number) => {
    dragState.current = {
      startX: clientX,
      deltaX: 0,
      isDragging: true,
    };
    pauseAuto(false);
  };

  const updateDrag = (clientX: number) => {
    if (!dragState.current.isDragging) {
      return;
    }
    dragState.current.deltaX = clientX - dragState.current.startX;
  };

  const endDrag = () => {
    if (!dragState.current.isDragging) {
      return;
    }
    const { deltaX } = dragState.current;
    dragState.current.isDragging = false;
    if (Math.abs(deltaX) < 40) {
      return;
    }
    if (deltaX > 0) {
      goPrev();
    } else {
      goNext();
    }
    pauseAuto();
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className="overflow-hidden touch-pan-y select-none"
        onMouseDown={(event) => beginDrag(event.clientX)}
        onMouseMove={(event) => updateDrag(event.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onWheel={() => pauseAuto()}
        onTouchStart={(event) => beginDrag(event.touches[0]?.clientX ?? 0)}
        onTouchMove={(event) => updateDrag(event.touches[0]?.clientX ?? 0)}
        onTouchEnd={endDrag}
        onTouchCancel={endDrag}
      >
        <div
          className={`flex duration-500 [--slide-size:100%] md:[--slide-size:33.333%] ${
            isTransitionEnabled ? "transition-transform" : ""
          }`}
          style={{
            transform: `translateX(calc(${currentIndex} * var(--slide-size) * -1))`,
          }}
          onTransitionEnd={() => {
            if (currentIndex < minIndex) {
              setIsTransitionEnabled(false);
              setCurrentIndex(maxIndex);
              window.requestAnimationFrame(() =>
                setIsTransitionEnabled(true),
              );
            }
            if (currentIndex > maxIndex) {
              setIsTransitionEnabled(false);
              setCurrentIndex(minIndex);
              window.requestAnimationFrame(() =>
                setIsTransitionEnabled(true),
              );
            }
          }}
        >
          {extendedCollections.map((collection, index) => (
            <div
              key={`${collection.title}-${index}`}
              className="w-full flex-shrink-0 px-3 md:w-1/3"
            >
              <a
                href={`/catalog?q=${encodeURIComponent(collection.query)}`}
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
