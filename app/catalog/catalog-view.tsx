"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getAllProducts, getBrands } from "@/services/catalog";

const products = getAllProducts();
const brands = ["Todas", ...getBrands()];
const discountedIds = new Set(
  [...products]
    .sort((a, b) => a.price - b.price)
    .slice(0, 3)
    .map((product) => product.id),
);

type CatalogViewProps = {
  showHeading?: boolean;
  showSearch?: boolean;
};

const categories = [
  { id: "para-el", label: "Para él", filter: { type: "gender", value: "masculine" } },
  { id: "para-ella", label: "Para ella", filter: { type: "gender", value: "feminine" } },
  { id: "unisex", label: "Unisex", filter: { type: "gender", value: "unisex" } },
  { id: "mas-vendidos", label: "Más vendidos" },
  { id: "entrega-inmediata", label: "Entrega inmediata" },
];

export function CatalogView({
  showHeading = true,
  showSearch = true,
}: CatalogViewProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeBrand, setActiveBrand] = useState<string>("Todas");
  const [gridColumns, setGridColumns] = useState<1 | 2 | 3 | 4>(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const catalogTopRef = useRef<HTMLDivElement | null>(null);
  const categoryScrollRef = useRef<HTMLDivElement | null>(null);
  const brandScrollRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const showOffersOnly = searchParams?.get("offer") === "1";
  const mobilePageSize = 8;

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (showSearch) {
      const normalizedQuery = query.trim().toLowerCase();
      if (normalizedQuery) {
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(normalizedQuery) ||
            product.brand.toLowerCase().includes(normalizedQuery),
        );
      }
    }

    if (activeBrand !== "Todas") {
      filtered = filtered.filter((product) => product.brand === activeBrand);
    }

    if (showOffersOnly) {
      filtered = filtered.filter((product) => discountedIds.has(product.id));
    }

    if (activeCategory) {
      const category = categories.find((item) => item.id === activeCategory);
      if (category?.filter?.type === "gender") {
        filtered = filtered.filter(
          (product) => product.gender === category.filter?.value,
        );
      }
      if (category?.filter?.type === "tag") {
        filtered = filtered.filter((product) =>
          product.tags.includes(category.filter?.value ?? ""),
        );
      }
    }

    return filtered;
  }, [activeBrand, activeCategory, query, showOffersOnly, showSearch]);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      return;
    }
    const offset = 24;
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollLeft = offset;
    }
    if (brandScrollRef.current) {
      brandScrollRef.current.scrollLeft = offset;
    }
  }, [isMobile]);

  useEffect(() => {
    setCurrentPage(0);
  }, [activeBrand, activeCategory, query, showOffersOnly, showSearch]);

  const pageCount = isMobile
    ? Math.max(1, Math.ceil(filteredProducts.length / mobilePageSize))
    : 1;
  const visibleProducts = isMobile
    ? filteredProducts.slice(
        currentPage * mobilePageSize,
        currentPage * mobilePageSize + mobilePageSize,
      )
    : filteredProducts;
  const scrollToCatalogTop = () => {
    catalogTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (isMobile) {
      scrollToCatalogTop();
    }
  }, [currentPage, isMobile]);

  useEffect(() => {
    if (!showSearch) {
      return;
    }

    if (searchParams?.get("focus") === "1") {
      const input = searchRef.current;
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    const incomingQuery = searchParams?.get("query");
    if (incomingQuery && incomingQuery !== query) {
      setQuery(incomingQuery);
    }
    const incomingBrand = searchParams?.get("brand");
    if (incomingBrand && brands.includes(incomingBrand)) {
      setActiveBrand(incomingBrand);
    }

  }, [searchParams, showSearch]);

  return (
    <div className="px-6 pb-20 pt-12" ref={catalogTopRef}>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        {showHeading ? (
          <div className="flex flex-col gap-4">
            <section className="relative overflow-hidden rounded-3xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
              <img
                src="/images/headers/catalogo.png"
                alt="Fragancias Box Parfum"
                className="absolute inset-0 h-full w-full object-cover -scale-x-100"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/10 to-black/45 md:hidden" />
              <div className="relative flex flex-col items-start gap-3 px-6 py-10 text-left sm:px-10 sm:py-12 md:px-12">
                <h1 className="text-4xl font-semibold text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.65)] sm:text-5xl">
                  Fragancias
                </h1>
                <div className="flex items-center gap-2 opacity-80">
                  {[1, 2, 3, 4].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setGridColumns(count as 1 | 2 | 3 | 4)}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold transition ${
                        gridColumns === count
                          ? "bg-white/90 text-neutral-900"
                          : "bg-white/15 text-white hover:bg-white/25"
                      } ${
                        count <= 2
                          ? "md:hidden"
                          : "max-md:hidden"
                      }`}
                      aria-label={`Mostrar ${count} columnas`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
              {showSearch ? (
                <div className="relative z-10 mt-6 flex flex-col gap-4 px-6 pb-8 sm:px-10 md:px-12">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-start">
                    <div className="flex w-full flex-col gap-2 sm:max-w-xs">
                      <div className="flex items-center gap-2 rounded-full bg-white/25 px-5 py-2.5 text-sm font-medium text-white shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition focus-within:bg-white/35">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="text-white/80"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                          id="catalog-search"
                          type="search"
                          placeholder="Marca o nombre"
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                          ref={searchRef}
                          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70 max-md:text-base"
                        />
                      </div>
                    </div>
                  </div>
                <div
                  ref={categoryScrollRef}
                  className="flex items-center gap-3 overflow-x-auto pb-2"
                >
                  {categories.map((category) => {
                    const isActive = activeCategory === category.id;
                    return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() =>
                            setActiveCategory(isActive ? null : category.id)
                          }
                          className={`ui-press inline-flex items-center whitespace-nowrap rounded-full border border-transparent px-5 py-2.5 text-sm font-medium shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition ${
                            isActive
                              ? "bg-white text-neutral-900"
                              : "bg-white/25 text-white hover:bg-white/40"
                          }`}
                        >
                          {category.label}
                        </button>
                    );
                  })}
                </div>
                <div
                  ref={brandScrollRef}
                  className="flex items-center gap-3 overflow-x-auto pb-2"
                >
                  {brands.map((brand) => {
                    const isActive = activeBrand === brand;
                    return (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setActiveBrand(brand)}
                        className={`ui-press inline-flex items-center whitespace-nowrap rounded-full border border-transparent px-5 py-2.5 text-sm font-medium shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition ${
                          isActive
                            ? "bg-white text-neutral-900"
                            : "bg-white/25 text-white hover:bg-white/40"
                        }`}
                      >
                        {brand}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
            </section>
          </div>
        ) : null}

        {showSearch ? null : null}

        <div>
          {filteredProducts.length === 0 ? (
            <div className="bg-white px-8 py-16 text-center text-sm text-neutral-500">
              No encontramos resultados. Vuelve a cargar la página más tarde.
            </div>
          ) : (
            <div
              className={`catalog-grid grid gap-6 max-md:gap-3 ${
                gridColumns === 1
                  ? "grid-cols-1 mobile-one"
                  : gridColumns === 2
                    ? "grid-cols-2"
                    : gridColumns === 3
                      ? "grid-cols-3"
                      : "grid-cols-4"
              }`}
            >
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showDiscount={discountedIds.has(product.id)}
                />
              ))}
            </div>
          )}
          {isMobile && filteredProducts.length > mobilePageSize ? (
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => (page === 0 ? pageCount - 1 : page - 1))
                }
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-neutral-700 shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition hover:bg-neutral-100"
                aria-label="Página anterior"
              >
                ‹
              </button>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                {currentPage + 1} / {pageCount}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => (page + 1) % pageCount)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-neutral-700 shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition hover:bg-neutral-100"
                aria-label="Página siguiente"
              >
                ›
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
