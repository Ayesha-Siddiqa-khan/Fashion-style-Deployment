"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useOrders, Order, OrderStatus } from "@/context/order-context";
import { SunnyBackground } from "@/components/ui/sunny-background";

const statusSteps: { status: OrderStatus; label: string; description: string }[] = [
  { status: "processing", label: "Order Placed", description: "Your order has been received" },
  { status: "shipped", label: "Shipped", description: "Your order is on its way" },
  { status: "out_for_delivery", label: "Out for Delivery", description: "Your order is out for delivery" },
  { status: "delivered", label: "Delivered", description: "Your order has been delivered" },
];

function getCurrentStep(status: OrderStatus): number {
  return statusSteps.findIndex((s) => s.status === status);
}

function OrderCard({ order }: { order: Order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentStep = getCurrentStep(order.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900/40 rounded-xl border border-neutral-800 overflow-hidden"
    >
      <div className="p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 mb-3 md:mb-4">
          <div>
            <p className="text-neutral-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">Order ID</p>
            <p className="text-[#D4B483] text-base md:text-xl font-light" style={{ fontFamily: 'Playfair Display, serif' }}>{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-neutral-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">Total</p>
            <p className="text-white text-base md:text-xl font-light" style={{ fontFamily: 'Playfair Display, serif' }}>${order.total.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4 text-xs md:text-sm">
          <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs uppercase tracking-wider ${
            order.status === "delivered" ? "bg-green-500/20 text-green-400" :
            order.status === "shipped" ? "bg-blue-500/20 text-blue-400" :
            order.status === "out_for_delivery" ? "bg-yellow-500/20 text-yellow-400" :
            "bg-[#D4B483]/20 text-[#D4B483]"
          }`}>
            {order.status.replace("_", " ")}
          </span>
          <span className="text-neutral-500 text-xs">
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {statusSteps.map((step, index) => (
            <div key={step.status} className="flex items-center flex-1">
              <div className={`w-3 h-3 rounded-full ${
                index <= currentStep ? "bg-[#D4B483]" : "bg-neutral-700"
              }`} />
              {index < statusSteps.length - 1 && (
                <div className={`flex-1 h-0.5 ${
                  index < currentStep ? "bg-[#D4B483]" : "bg-neutral-700"
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-neutral-500 mb-4">
          {statusSteps.map((step) => (
            <span key={step.status} className={order.status === step.status ? "text-[#D4B483]" : ""}>
              {step.label}
            </span>
          ))}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-neutral-400 hover:text-white text-sm flex items-center gap-2"
        >
          {isExpanded ? "Hide" : "View"} Details
          <svg className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 pt-4 border-t border-neutral-800"
          >
            <div className="space-y-4">
              <div>
                <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Shipping Address</p>
                <p className="text-neutral-300 text-sm">
                  {order.shippingInfo.firstName} {order.shippingInfo.lastName}<br />
                  {order.shippingInfo.address}<br />
                  {order.shippingInfo.city}, {order.shippingInfo.zipCode}<br />
                  {order.shippingInfo.country}
                </p>
              </div>
              <div>
                <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Items</p>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-16 bg-neutral-800 rounded overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{item.name}</p>
                        <p className="text-neutral-500 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-white text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-neutral-800">
                <span className="text-neutral-500">Subtotal</span>
                <span className="text-white">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Shipping</span>
                <span className="text-white">${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Tax</span>
                <span className="text-white">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg pt-2 border-t border-neutral-800">
                <span className="text-white">Total</span>
                <span className="text-[#D4B483]">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function OrdersContent() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get("id");
  const { orders, getOrder } = useOrders();
  const [email, setEmail] = useState("");
  const [searchedOrders, setSearchedOrders] = useState<Order[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const singleOrder = orderIdParam ? getOrder(orderIdParam) : null;

  const handleSearch = () => {
    if (email) {
      const found = orders.filter(
        (o) => o.shippingInfo.email.toLowerCase() === email.toLowerCase()
      );
      setSearchedOrders(found);
      setHasSearched(true);
    }
  };

  const displayOrders = hasSearched ? searchedOrders : orders;

  return (
    <div className="pt-20 md:pt-24 pb-8 md:pb-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-3 md:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-2xl md:text-4xl font-light text-white mb-2 md:mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Your Orders</h1>
          <p className="text-neutral-400 text-sm md:text-base">Track and manage your orders</p>
        </motion.div>

        {!orderIdParam && orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/40 rounded-xl border border-neutral-800 p-8"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-neutral-800 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-xl text-white mb-2">No Orders Yet</h2>
              <p className="text-neutral-500">You haven't placed any orders yet</p>
            </div>
            <div className="text-center">
              <Link 
                href="/"
                className="inline-block px-8 py-3 bg-[#D4B483] text-neutral-900 text-sm font-medium uppercase tracking-wider hover:bg-[#C4A473] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </motion.div>
        )}

        {singleOrder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/orders" className="text-neutral-500 hover:text-[#D4B483] text-sm uppercase tracking-wider mb-4 inline-flex items-center gap-1">
              ← Back to All Orders
            </Link>
            <OrderCard order={singleOrder} />
          </motion.div>
        )}

        {!singleOrder && orders.length > 0 && (
          <>
            <div className="bg-neutral-900/40 rounded-xl border border-neutral-800 p-4 mb-8">
              <p className="text-neutral-400 text-sm mb-3">Search orders by email</p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-neutral-900/60 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4B483]"
                />
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-[#D4B483] text-neutral-900 text-sm font-medium uppercase tracking-wider hover:bg-[#C4A473] transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {displayOrders.length === 0 && hasSearched ? (
                <div className="text-center py-12">
                  <p className="text-neutral-500">No orders found for this email</p>
                </div>
              ) : (
                displayOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <SunnyBackground>
      <Suspense fallback={
        <div className="pt-24 pb-12 min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#D4B483] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <OrdersContent />
      </Suspense>
    </SunnyBackground>
  );
}