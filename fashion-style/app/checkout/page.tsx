"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useOrders, generateOrderNumber, ShippingInfo } from "@/context/order-context";
import { SunnyBackground } from "@/components/ui/sunny-background";

interface ShippingRate {
  city: string;
  rate: number;
  time: string;
}

const shippingRates: ShippingRate[] = [
  { city: "New York", rate: 15, time: "2-3 business days" },
  { city: "Los Angeles", rate: 20, time: "3-4 business days" },
  { city: "Chicago", rate: 18, time: "3-4 business days" },
  { city: "Houston", rate: 22, time: "4-5 business days" },
  { city: "Phoenix", rate: 25, time: "4-5 business days" },
  { city: "Philadelphia", rate: 16, time: "2-3 business days" },
  { city: "San Antonio", rate: 23, time: "4-5 business days" },
  { city: "San Diego", rate: 21, time: "3-4 business days" },
  { city: "Dallas", rate: 19, time: "3-4 business days" },
  { city: "San Jose", rate: 24, time: "4-5 business days" },
  { city: "Austin", rate: 20, time: "3-4 business days" },
  { city: "Seattle", rate: 26, time: "4-5 business days" },
  { city: "Denver", rate: 22, time: "3-4 business days" },
  { city: "Boston", rate: 17, time: "2-3 business days" },
  { city: "Miami", rate: 18, time: "3-4 business days" },
  { city: "Atlanta", rate: 16, time: "2-3 business days" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedShippingOption, setSelectedShippingOption] = useState("standard");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const shippingOptions = [
    { id: "standard", name: "Standard Shipping", price: 0, time: "5-7 business days" },
    { id: "express", name: "Express Shipping", price: 15, time: "2-3 business days" },
    { id: "overnight", name: "Overnight Shipping", price: 30, time: "1 business day" },
  ];

  const cityShipping = selectedCity 
    ? shippingRates.find(r => r.city.toLowerCase() === selectedCity.toLowerCase()) 
    : null;

  const baseShipping = shippingOptions.find(o => o.id === selectedShippingOption)?.price || 0;
  const cityExtra = cityShipping?.rate || 0;
  const shipping = baseShipping + cityExtra;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass = "w-full px-4 py-3 bg-neutral-900/60 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4B483] focus:ring-1 focus:ring-[#D4B483] transition-colors";
  const labelClass = "text-sm text-neutral-400 uppercase tracking-wider mb-2 block";

  const handlePlaceOrder = () => {
    const newOrderId = generateOrderNumber();
    const shippingInfo: ShippingInfo = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: selectedCity,
      zipCode: formData.zipCode,
      country: formData.country,
    };

    const order = {
      id: newOrderId,
      items: items,
      subtotal,
      shipping,
      tax,
      total,
      status: "processing" as const,
      createdAt: new Date().toISOString(),
      shippingInfo,
    };

    addOrder(order);
    setOrderId(newOrderId);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <SunnyBackground>
        <div className="pt-24 pb-12 min-h-screen">
          <div className="max-w-2xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900/40 rounded-xl border border-neutral-800 p-8 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-light text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Order Confirmed!</h2>
              <p className="text-neutral-400 mb-6">Thank you for your purchase</p>
              <div className="bg-neutral-800/50 rounded-lg p-4 mb-6">
                <p className="text-neutral-400 text-sm mb-1">Order ID</p>
                <p className="text-[#D4B483] text-2xl font-light tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>{orderId}</p>
              </div>
              <p className="text-neutral-500 text-sm mb-8">Save this order ID to track your order. A confirmation email has been sent to {formData.email}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href={`/orders?id=${orderId}`}
                  className="px-8 py-3 bg-[#D4B483] text-neutral-900 text-sm font-medium uppercase tracking-wider hover:bg-[#C4A473] transition-colors"
                >
                  Track Order
                </Link>
                <Link 
                  href="/"
                  className="px-8 py-3 border border-neutral-700 text-neutral-300 text-sm font-medium uppercase tracking-wider hover:border-[#D4B483] hover:text-[#D4B483] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </SunnyBackground>
    );
  }

  if (items.length === 0) {
    return (
      <SunnyBackground>
      <div className="pt-24 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-neutral-900/60 rounded-full flex items-center justify-center border border-neutral-800">
              <svg className="w-12 h-12 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-light text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Your cart is empty</h2>
            <p className="text-neutral-500 mb-6">Add some items to your cart to proceed to checkout</p>
            <Link 
              href="/" 
              className="inline-block px-8 py-3 bg-[#D4B483] text-neutral-900 text-sm font-medium uppercase tracking-wider hover:bg-[#C4A473] transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
      </SunnyBackground>
    );
  }

return (
      <SunnyBackground>
      <div className="pt-24 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/" className="text-neutral-500 hover:text-[#D4B483] text-sm uppercase tracking-wider">
            ← Back to Shopping
          </Link>
          <h1 className="text-3xl font-light text-white mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>Checkout</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-neutral-900/40 rounded-xl border border-neutral-800 p-6"
            >
              <h2 className="text-lg text-white font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-neutral-900/40 rounded-xl border border-neutral-800 p-6"
            >
              <h2 className="text-lg text-white font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Street Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Select City</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className={inputClass}
                    >
                      <option value="" className="bg-neutral-900">Select City</option>
                      {shippingRates.map((rate) => (
                        <option key={rate.city} value={rate.city} className="bg-neutral-900">{rate.city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={inputClass}
                    >
                      <option value="United States" className="bg-neutral-900">United States</option>
                      <option value="Canada" className="bg-neutral-900">Canada</option>
                      <option value="United Kingdom" className="bg-neutral-900">United Kingdom</option>
                      <option value="Australia" className="bg-neutral-900">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
              {cityShipping && (
                <div className="mt-4 p-3 bg-[#D4B483]/10 border border-[#D4B483]/30 rounded">
                  <div className="flex items-center gap-2 text-[#D4B483]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">
                      Shipping to {cityShipping.city}: ${cityShipping.rate} ({cityShipping.time})
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-neutral-900/40 rounded-xl border border-neutral-800 p-6"
            >
              <h2 className="text-lg text-white font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Shipping Method</h2>
              <div className="space-y-3">
                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-colors ${
                      selectedShippingOption === option.id
                        ? "border-[#D4B483] bg-[#D4B483]/10"
                        : "border-neutral-700 hover:border-neutral-600"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={selectedShippingOption === option.id}
                        onChange={() => setSelectedShippingOption(option.id)}
                        className="mr-3 accent-[#D4B483]"
                      />
                      <div>
                        <div className="text-white font-light">{option.name}</div>
                        <div className="text-sm text-neutral-500">{option.time}</div>
                      </div>
                    </div>
                    <div className="text-white font-light">
                      {option.price === 0 ? "Free" : `$${option.price}`}
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-neutral-900/40 rounded-xl border border-neutral-800 p-6"
            >
              <h2 className="text-lg text-white font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Payment Information</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Expiry</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>CVV</label>
                    <input
                      type="text"
                      name="cardCvv"
                      placeholder="CVV"
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-neutral-900/40 rounded-xl border border-neutral-800 p-6 sticky top-24"
            >
              <h2 className="text-lg text-white font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-16 h-20 bg-neutral-800 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm truncate font-light">{item.name}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-neutral-800 rounded hover:bg-neutral-700 transition-colors text-white"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="text-sm min-w-[24px] text-center text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-neutral-800 rounded hover:bg-neutral-700 transition-colors text-white"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm font-light" style={{ fontFamily: 'Playfair Display, serif' }}>${(item.price * item.quantity).toFixed(2)}</div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-400 hover:text-red-300 mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-800 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Shipping {selectedCity && `(${selectedCity})`}</span>
                  <span className="text-white">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Tax (8%)</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-light pt-2 border-t border-neutral-800">
                  <span className="text-white">Total</span>
                  <span className="text-[#D4B483]" style={{ fontFamily: 'Playfair Display, serif' }}>${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.address || !selectedCity}
                className="w-full mt-6 py-4 bg-[#D4B483] text-neutral-900 uppercase tracking-wider font-medium hover:bg-[#C4A473] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Place Order
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </SunnyBackground>
  );
}