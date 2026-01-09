import { perfumes } from "@/data/perfumes";
import type {
  CatalogFilters,
  Concentration,
  Gender,
  Product,
  Season,
  StockStatus,
} from "@/lib/types";
import {
  fetchProductByHandle,
  fetchProducts,
} from "@/services/shopifyAdapter";

const catalogSource = process.env.NEXT_PUBLIC_CATALOG_SOURCE ?? "mock";

function getSourceProducts(): Product[] {
  if (catalogSource === "shopify") {
    return fetchProducts();
  }

  return perfumes;
}

export function getAllProducts(): Product[] {
  return getSourceProducts();
}

function normalizeSlug(value: string) {
  return decodeURIComponent(value).split(/[?#]/)[0]?.toLowerCase().trim();
}

export function getProductBySlug(slug: string): Product | null {
  const normalizedSlug = normalizeSlug(slug);
  if (catalogSource === "shopify") {
    return fetchProductByHandle(normalizedSlug);
  }

  return (
    perfumes.find((product) => {
      const productSlug = normalizeSlug(product.slug);
      return productSlug === normalizedSlug || product.id.toLowerCase() === normalizedSlug;
    }) ?? null
  );
}

export function getBrands(): string[] {
  const brands = new Set(getSourceProducts().map((product) => product.brand));
  return Array.from(brands).sort();
}

export function getFilters(): CatalogFilters {
  const concentrations = new Set<Concentration>();
  const genders = new Set<Gender>();
  const seasons = new Set<Season>();
  const stockStatuses = new Set<StockStatus>();
  const sizes = new Set<number>();

  getSourceProducts().forEach((product) => {
    concentrations.add(product.concentration);
    genders.add(product.gender);
    seasons.add(product.season);
    stockStatuses.add(product.stock_status);
    sizes.add(product.size_ml);
  });

  return {
    brands: getBrands(),
    concentrations: Array.from(concentrations),
    genders: Array.from(genders),
    seasons: Array.from(seasons),
    stockStatuses: Array.from(stockStatuses),
    sizes: Array.from(sizes).sort((a, b) => a - b),
  };
}
