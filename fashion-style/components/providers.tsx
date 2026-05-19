"use client";

import { CartProvider } from "@/context/cart-context";
import { OrderProvider } from "@/context/order-context";
import { VisitorProvider } from "@/context/visitor-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <VisitorProvider>
      <CartProvider>
        <OrderProvider>{children}</OrderProvider>
      </CartProvider>
    </VisitorProvider>
  );
}