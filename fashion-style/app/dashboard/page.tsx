"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { products } from "@/data/products";

const statsCards = [
  { title: "Total Products", value: "156", change: "+12%", icon: "📦" },
  { title: "Total Orders", value: "89", change: "+8%", icon: "🛍️" },
  { title: "Total Revenue", value: "$24,500", change: "+15%", icon: "💰" },
  { title: "Total Customers", value: "342", change: "+5%", icon: "👥" },
];

const recentOrders = [
  { id: "ORD-001", customer: "Sarah Johnson", total: "$299", status: "Completed", date: "2026-05-15" },
  { id: "ORD-002", customer: "Michael Chen", total: "$449", status: "Processing", date: "2026-05-16" },
  { id: "ORD-003", customer: "Emma Wilson", total: "$189", status: "Completed", date: "2026-05-17" },
  { id: "ORD-004", customer: "James Brown", total: "$599", status: "Pending", date: "2026-05-18" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-light text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600 mt-2">Welcome to your fashion store overview</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{card.icon}</span>
                <span className="text-green-600 text-sm font-medium">{card.change}</span>
              </div>
              <div className="text-3xl font-light text-neutral-900 mb-1">{card.value}</div>
              <div className="text-sm text-neutral-600">{card.title}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-neutral-200">
              <h2 className="text-lg font-medium text-neutral-900">Recent Orders</h2>
            </div>
            <div className="divide-y divide-neutral-200">
              {recentOrders.map((order) => (
                <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-neutral-900">{order.id}</div>
                    <div className="text-sm text-neutral-600">{order.customer}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-neutral-900">{order.total}</div>
                    <div className={`text-sm ${
                      order.status === "Completed" ? "text-green-600" :
                      order.status === "Processing" ? "text-blue-600" :
                      "text-yellow-600"
                    }`}>{order.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-neutral-200">
              <h2 className="text-lg font-medium text-neutral-900">Top Products</h2>
            </div>
            <div className="divide-y divide-neutral-200">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="px-6 py-4 flex items-center gap-4">
                  <div className="relative w-12 h-12 bg-neutral-100 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-neutral-900 truncate">{product.name}</div>
                    <div className="text-sm text-neutral-600">{product.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-neutral-900">${product.price}</div>
                    <div className="text-sm text-amber-500">★ {product.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="text-lg font-medium text-neutral-900">Sales Overview</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                <div key={day} className="text-center">
                  <div 
                    className="mx-auto bg-neutral-900 rounded-t"
                    style={{ 
                      width: "40px", 
                      height: `${Math.floor(Math.random() * 80) + 20}px` 
                    }}
                  />
                  <div className="mt-2 text-sm text-neutral-600">{day}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}