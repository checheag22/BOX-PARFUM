"use client";

import { CartFloatingButton } from "@/components/cart-floating-button";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";
import { useCart } from "@/components/cart-context";

export function FloatingControls() {
  const { isOpen } = useCart();

  if (isOpen) {
    return null;
  }

  return (
    <>
      <CartFloatingButton />
      <WhatsAppFloatingButton />
    </>
  );
}
