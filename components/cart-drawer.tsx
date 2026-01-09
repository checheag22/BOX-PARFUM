"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/lib/helpers";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  if (!isOpen) {
    return null;
  }

  const currency = items[0]?.currency ?? "MXN";

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Cerrar carrito"
        onClick={closeCart}
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-line/70 px-5 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-700">
            Carrito
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-sm font-semibold text-neutral-600 transition hover:text-neutral-900"
          >
            Cerrar
          </button>
        </div>

        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-auto px-5 py-4">
            {items.length === 0 ? (
              <div className="py-20 text-center text-sm text-neutral-500">
                Tu carrito está vacío.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-16 bg-neutral-100">
                      <Image
                        src={item.image}
                        alt={`${item.brand} ${item.name}`}
                        fill
                        className="object-contain p-2"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                          {item.brand}
                        </p>
                        <p className="text-sm font-semibold text-neutral-900">
                          {item.name}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-neutral-900">
                          {formatPrice(item.price, item.currency)}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="h-7 w-7 bg-neutral-100 text-sm font-semibold text-neutral-700"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            aria-label="Reducir cantidad"
                          >
                            −
                          </button>
                          <span className="min-w-[2ch] text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="h-7 w-7 bg-neutral-100 text-sm font-semibold text-neutral-700"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-xs uppercase tracking-[0.3em] text-neutral-400 transition hover:text-neutral-700"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-line/70 px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="uppercase tracking-[0.3em] text-neutral-500">
                Subtotal
              </span>
              <span className="font-semibold text-neutral-900">
                {formatPrice(subtotal, currency)}
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                className="w-full bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Continuar compra
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="flex min-h-[52px] w-full items-center justify-center bg-neutral-100 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600"
              >
                Vaciar carrito
              </button>
              <Link
                href="/catalog"
                onClick={closeCart}
                className="text-center text-xs uppercase tracking-[0.3em] text-neutral-500 transition hover:text-neutral-800"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
