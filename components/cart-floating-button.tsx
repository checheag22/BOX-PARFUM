"use client";

import { useCart } from "@/components/cart-context";

export function CartFloatingButton() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="fixed right-6 top-6 z-50 inline-flex items-center gap-2 rounded-2xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-xl"
      aria-label="Abrir carrito"
    >
      <span aria-hidden="true" className="text-base">
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
      </span>
      <span>Carrito</span>
      <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-neutral-900">
        {totalItems}
      </span>
    </button>
  );
}
