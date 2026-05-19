"use client";

import { CartProvider } from "@/context/cart-context";
import { OrderProvider } from "@/context/order-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <OrderProvider>{children}</OrderProvider>
    </CartProvider>
  );
}