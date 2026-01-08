"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { getAllProducts, getBrands, getFilters } from "@/services/catalog";

const products = getAllProducts();
const brands = getBrands();
const filters = getFilters();

const genderLabels: Record<string, string> = {
  feminine: "Femenino",
  masculine: "Masculino",
  unisex: "Unisex",
};

const concentrationLabels: Record<string, string> = {
  EDT: "EDT",
  EDP: "EDP",
  Parfum: "Parfum",
  Extrait: "Extrait",
  EDC: "EDC",
};

const priceRanges = [
  { label: "Todo", value: "all" },
  { label: "Menos de $2,000", value: "under-2000" },
  { label: "$2,000 - $2,600", value: "2000-2600" },
  { label: "$2,600 - $3,200", value: "2600-3200" },
  { label: "Mas de $3,200", value: "3200-plus" },
];

const sortOptions = [
  { label: "Popularidad", value: "popular" },
  { label: "Precio: menor a mayor", value: "price-asc" },
  { label: "Precio: mayor a menor", value: "price-desc" },
];

export function CatalogView() {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");
  const [gender, setGender] = useState("all");
  const [concentration, setConcentration] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const matchesPrice = (price: number) => {
      if (priceRange === "under-2000") return price < 2000;
      if (priceRange === "2000-2600") return price >= 2000 && price <= 2600;
      if (priceRange === "2600-3200") return price > 2600 && price <= 3200;
      if (priceRange === "3200-plus") return price > 3200;
      return true;
    };

    const base = products.filter((product) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.brand.toLowerCase().includes(normalizedQuery);

      const matchesBrand = brand === "all" || product.brand === brand;
      const matchesGender = gender === "all" || product.gender === gender;
      const matchesConcentration =
        concentration === "all" || product.concentration === concentration;

      return (
        matchesQuery &&
        matchesBrand &&
        matchesGender &&
        matchesConcentration &&
        matchesPrice(product.price)
      );
    });

    if (sort === "price-asc") {
      return [...base].sort((a, b) => a.price - b.price);
    }
    if (sort === "price-desc") {
      return [...base].sort((a, b) => b.price - a.price);
    }

    return base;
  }, [query, brand, gender, concentration, priceRange, sort]);

  return (
    <div className="px-6 pb-20 pt-12">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Catalogo
          </h1>
          <p className="max-w-2xl text-base text-neutral-600">
            Explora aromas seleccionados con filtros inteligentes para encontrar tu
            proximo favorito.
          </p>
        </div>

        <div className="grid gap-6 rounded-3xl border border-line bg-white/80 p-6 shadow-sm lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="flex flex-col gap-4">
            <label className="text-sm font-semibold text-neutral-700" htmlFor="search">
              Buscar
            </label>
            <input
              id="search"
              type="search"
              placeholder="Marca o nombre"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-neutral-700" htmlFor="brand">
                Marca
              </label>
              <select
                id="brand"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                className="rounded-2xl border border-neutral-200 bg-white px-3 py-3 text-sm text-neutral-800"
              >
                <option value="all">Todas</option>
                {brands.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-neutral-700" htmlFor="gender">
                Genero
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                className="rounded-2xl border border-neutral-200 bg-white px-3 py-3 text-sm text-neutral-800"
              >
                <option value="all">Todos</option>
                {filters.genders.map((item) => (
                  <option key={item} value={item}>
                    {genderLabels[item]}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-semibold text-neutral-700"
                htmlFor="concentration"
              >
                Concentracion
              </label>
              <select
                id="concentration"
                value={concentration}
                onChange={(event) => setConcentration(event.target.value)}
                className="rounded-2xl border border-neutral-200 bg-white px-3 py-3 text-sm text-neutral-800"
              >
                <option value="all">Todas</option>
                {filters.concentrations.map((item) => (
                  <option key={item} value={item}>
                    {concentrationLabels[item]}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-semibold text-neutral-700"
                htmlFor="priceRange"
              >
                Precio
              </label>
              <select
                id="priceRange"
                value={priceRange}
                onChange={(event) => setPriceRange(event.target.value)}
                className="rounded-2xl border border-neutral-200 bg-white px-3 py-3 text-sm text-neutral-800"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-neutral-700" htmlFor="sort">
                Ordenar
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-2xl border border-neutral-200 bg-white px-3 py-3 text-sm text-neutral-800"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white px-8 py-16 text-center text-sm text-neutral-500">
              No encontramos resultados. Ajusta los filtros o intenta otra busqueda.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
