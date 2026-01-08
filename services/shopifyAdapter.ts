import type { Product } from "@/lib/types";

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText?: string | null;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  priceRange: { minVariantPrice: ShopifyMoney };
  images: ShopifyImage[];
  tags: string[];
};

export type ShopifyCollection = {
  id: string;
  handle: string;
  title: string;
  description?: string | null;
};

export function fetchProducts(): Product[] {
  return [];
}

export function fetchProductByHandle(handle: string): Product | null {
  void handle;
  return null;
}

export function fetchCollections(): ShopifyCollection[] {
  return [];
}
