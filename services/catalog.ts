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

export function getProductBySlug(slug: string): Product | null {
  if (catalogSource === "shopify") {
    return fetchProductByHandle(slug);
  }

  return perfumes.find((product) => product.slug === slug) ?? null;
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
