import type { CurrencyCode } from "@/lib/types";

export function formatPrice(
  value: number,
  currency: CurrencyCode,
  locale = "es-MX",
) {
  const roundedValue = Math.round(value / 10) * 10;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundedValue);
}

export function buildProductUrl(slug: string) {
  return `/product/${slug}`;
}
