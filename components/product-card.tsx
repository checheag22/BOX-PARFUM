"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/helpers";
import { useCart } from "@/components/cart-context";

const tagStyles = [
  "bg-amber-100 text-amber-900",
  "bg-rose-100 text-rose-900",
  "bg-emerald-100 text-emerald-900",
  "bg-sky-100 text-sky-900",
];

type ProductCardProps = {
  product: Product;
  showDiscount?: boolean;
};

export function ProductCard({ product, showDiscount = false }: ProductCardProps) {
  const { addItem } = useCart();
  const discountPercent = 0.2;
  const originalPrice = Math.round(product.price / (1 - discountPercent));
  const availability = {
    in_stock: { label: "Disponible", className: "bg-emerald-100 text-emerald-900" },
    low_stock: {
      label: "Pocas unidades",
      className: "bg-amber-100 text-amber-900",
    },
    out_of_stock: {
      label: "Agotado",
      className: "bg-rose-100 text-rose-900",
    },
  }[product.stock_status] ?? {
    label: "Disponible",
    className: "bg-emerald-100 text-emerald-900",
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden bg-white transition">
      <Link
        href={`/product/${encodeURIComponent(product.slug)}#info`}
        className="flex h-full flex-col"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
          <Image
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            fill
            className="object-contain px-10 py-10 transition duration-300 group-hover:opacity-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt={`${product.brand} ${product.name} alternate`}
              fill
              className="absolute inset-0 object-contain px-10 py-10 opacity-0 transition duration-300 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 px-6 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              {product.brand}
            </p>
            <h3 className="mt-2 text-lg font-medium text-neutral-900">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-neutral-900">
                {formatPrice(product.price, product.currency)} MXN
              </span>
              {showDiscount ? (
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(originalPrice, product.currency)} MXN
                </span>
              ) : null}
            </div>
            <span
              className={`px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] ${availability.className}`}
            >
              {availability.label}
            </span>
          </div>
          <div className="mt-auto flex flex-wrap gap-2">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={tag}
                className={`px-2.5 py-1 text-xs font-normal uppercase tracking-[0.2em] text-neutral-600 ${
                  tagStyles[index % tagStyles.length]
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => addItem(product)}
        className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-neutral-900 shadow-[0_0_0_1px_rgba(23,22,20,0.2)] opacity-0 transition hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(23,22,20,0.45)] group-hover:opacity-100"
        aria-label={`Agregar ${product.name} al carrito`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.6 12.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.5L23 6H6" />
        </svg>
      </button>
    </div>
  );
}
