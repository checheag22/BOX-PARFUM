"use client";

import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart-context";

type AddToCartButtonProps = {
  product: Product;
  size?: "normal" | "large";
  fullWidth?: boolean;
};

export function AddToCartButton({
  product,
  size = "normal",
  fullWidth = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className={`inline-flex items-center justify-center gap-2 rounded-[18px] border border-neutral-900 bg-neutral-900 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-md ${
        size === "large" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
      } ${fullWidth ? "w-full" : ""}`}
    >
      Agregar al carrito
    </button>
  );
}
