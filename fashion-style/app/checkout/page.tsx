"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

const cartItems = products.slice(0, 3);

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const [selectedShipping, setSelectedShipping] = useState("standard");

  const shippingOptions = [
    { id: "standard", name: "Standard Shipping", price: 0, time: "5-7 business days" },
    { id: "express", name: "Express Shipping", price: 15, time: "2-3 business days" },
    { id: "overnight", name: "Overnight Shipping", price: 30, time: "1 business day" },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = shippingOptions.find(o => o.id === selectedShipping)?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/" className="text-neutral-600 hover:text-amber-600 text-sm">
            ← Back to Shopping
          </Link>
          <h1 className="text-3xl font-light text-neutral-900 mt-2">Checkout</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6"
            >
              <h2 className="text-lg font-medium text-neutral-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6"
            >
              <h2 className="text-lg font-medium text-neutral-900 mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6"
            >
              <h2 className="text-lg font-medium text-neutral-900 mb-4">Shipping Method</h2>
              <div className="space-y-3">
                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-colors ${
                      selectedShipping === option.id
                        ? "border-amber-500 bg-amber-50"
                        : "border-neutral-300 hover:border-neutral-400"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={selectedShipping === option.id}
                        onChange={() => setSelectedShipping(option.id)}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium text-neutral-900">{option.name}</div>
                        <div className="text-sm text-neutral-600">{option.time}</div>
                      </div>
                    </div>
                    <div className="font-medium text-neutral-900">
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
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6"
            >
              <h2 className="text-lg font-medium text-neutral-900 mb-4">Payment Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="cardCvv"
                    placeholder="CVV"
                    value={formData.cardCvv}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 sticky top-24"
            >
              <h2 className="text-lg font-medium text-neutral-900 mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-16 h-20 bg-neutral-100 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-neutral-900 text-sm truncate">{item.name}</div>
                      <div className="text-sm text-neutral-600">Qty: 1</div>
                    </div>
                    <div className="font-medium text-neutral-900 text-sm">${item.price}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="text-neutral-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="text-neutral-900">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Tax</span>
                  <span className="text-neutral-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-2 border-t border-neutral-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full mt-6 py-4 bg-neutral-900 text-white uppercase tracking-wider hover:bg-amber-600 transition-colors">
                Place Order
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}