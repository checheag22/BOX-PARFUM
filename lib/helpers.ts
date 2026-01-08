import type { CurrencyCode } from "@/lib/types";

export function formatPrice(
  value: number,
  currency: CurrencyCode,
  locale = "es-MX",
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function buildProductUrl(slug: string) {
  return `/product/${slug}`;
}
