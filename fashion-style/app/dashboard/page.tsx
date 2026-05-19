"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { products } from "@/data/products";
import { SunnyBackground } from "@/components/ui/sunny-background";

interface CustomImage {
  id: string;
  url: string;
  name: string;
  date: string;
}

const statsCards = [
  { title: "TOTAL PRODUCTS", value: "156", change: "+12%", icon: "📦", color: "#D4B483" },
  { title: "TOTAL ORDERS", value: "89", change: "+8%", icon: "🛍️", color: "#9CA3AF" },
  { title: "TOTAL REVENUE", value: "$24,500", change: "+15%", icon: "💰", color: "#D4B483" },
  { title: "TOTAL CUSTOMERS", value: "342", change: "+5%", icon: "👥", color: "#9CA3AF" },
];

const recentOrders = [
  { id: "ORD-001", customer: "Sarah Johnson", total: "$299", status: "Completed", date: "2026-05-15" },
  { id: "ORD-002", customer: "Michael Chen", total: "$449", status: "Processing", date: "2026-05-16" },
  { id: "ORD-003", customer: "Emma Wilson", total: "$189", status: "Completed", date: "2026-05-17" },
  { id: "ORD-004", customer: "James Brown", total: "$599", status: "Pending", date: "2026-05-18" },
];

const statusColors: Record<string, string> = {
  Completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export default function DashboardPage() {
  const [customImages, setCustomImages] = useState<CustomImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("custom-images");
    if (saved) {
      try {
        setCustomImages(JSON.parse(saved));
      } catch {
        setCustomImages([]);
      }
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const newImage: CustomImage = {
        id: Date.now().toString(),
        url: event.target?.result as string,
        name: file.name,
        date: new Date().toLocaleDateString(),
      };
      const updated = [newImage, ...customImages];
      setCustomImages(updated);
      localStorage.setItem("custom-images", JSON.stringify(updated));
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (id: string) => {
    const updated = customImages.filter((img) => img.id !== id);
    setCustomImages(updated);
    localStorage.setItem("custom-images", JSON.stringify(updated));
  };

  return (
    <SunnyBackground>
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 relative"
        >
          <h1 className="text-4xl font-light text-white tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Dashboard</h1>
          <p className="text-neutral-400 mt-2 font-light tracking-wide">Welcome to your fashion store overview</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-neutral-900/80 rounded-xl border border-neutral-800 p-6 hover:border-neutral-700 transition-colors group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4B483] to-transparent opacity-50" />
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-2xl" style={{ color: card.color }}>{card.icon}</span>
                <span className="text-sm font-medium px-2 py-1 rounded bg-neutral-800 text-[#D4B483]">{card.change}</span>
              </div>
              <div className="text-4xl font-light text-white mb-1 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{card.value}</div>
              <div className="text-xs text-neutral-500 tracking-[0.15em] uppercase">{card.title}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-neutral-900/60 rounded-xl border border-neutral-800 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
              <span className="text-6xl font-bold text-white">ORDERS</span>
            </div>
            <div className="px-6 py-5 border-b border-neutral-800 flex items-center justify-between">
              <h2 className="text-lg text-white font-light tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>Recent Orders</h2>
              <span className="text-xs text-neutral-500 bg-neutral-800 px-3 py-1 rounded uppercase tracking-wider">Last 7 days</span>
            </div>
            <div className="divide-y divide-neutral-800/50">
              {recentOrders.map((order) => (
                <div key={order.id} className="px-6 py-4 flex items-center justify-between hover:bg-neutral-800/30 transition-colors">
                  <div>
                    <div className="font-medium text-white tracking-wide">{order.id}</div>
                    <div className="text-sm text-neutral-400">{order.customer}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-light text-white" style={{ fontFamily: 'Playfair Display, serif' }}>{order.total}</div>
                    <span className={`text-xs px-2 py-0.5 rounded border ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-neutral-900/60 rounded-xl border border-neutral-800 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
              <span className="text-6xl font-bold text-white">PRODUCTS</span>
            </div>
            <div className="px-6 py-5 border-b border-neutral-800 flex items-center justify-between">
              <h2 className="text-lg text-white font-light tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>Top Products</h2>
              <span className="text-xs text-neutral-500 bg-neutral-800 px-3 py-1 rounded uppercase tracking-wider">Best sellers</span>
            </div>
            <div className="divide-y divide-neutral-800/50">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="px-6 py-4 flex items-center gap-4 hover:bg-neutral-800/30 transition-colors">
                  <div className="relative w-14 h-16 bg-neutral-800 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white truncate font-light">{product.name}</div>
                    <div className="text-sm text-neutral-500">{product.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-light" style={{ fontFamily: 'Playfair Display, serif' }}>${product.price}</div>
                    <div className="text-xs text-[#D4B483]">★ {product.rating}</div>
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
          className="bg-neutral-900/60 rounded-xl border border-neutral-800 overflow-hidden mb-10 relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
            <span className="text-6xl font-bold text-white">GALLERY</span>
          </div>
          <div className="px-6 py-5 border-b border-neutral-800">
            <h2 className="text-lg text-white font-light tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>Your Design Gallery</h2>
            <p className="text-sm text-neutral-500 mt-1">Upload and preview your custom designs</p>
          </div>
          <div className="p-6">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-neutral-700 rounded-xl cursor-pointer hover:border-[#D4B483] hover:bg-[#D4B483]/5 transition-colors group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {isUploading ? (
                  <div className="w-8 h-8 border-2 border-[#D4B483] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-10 h-10 mb-3 text-neutral-500 group-hover:text-[#D4B483] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mb-2 text-sm text-neutral-400"><span className="font-medium text-neutral-300">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-neutral-600">PNG, JPG up to 5MB</p>
                  </>
                )}
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
            </label>

            {customImages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm text-neutral-400 uppercase tracking-wider mb-4">Your Uploads ({customImages.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {customImages.map((img) => (
                    <div key={img.id} className="relative group">
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700">
                        <Image src={img.url} alt={img.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => removeImage(img.id)}
                            className="p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-500 mt-2 truncate">{img.name}</p>
                      <p className="text-xs text-neutral-600">{img.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-neutral-900/60 rounded-xl border border-neutral-800 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-neutral-800">
            <h2 className="text-lg text-white font-light tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>Weekly Sales Overview</h2>
          </div>
          <div className="p-6">
            <div className="flex items-end justify-between gap-4 h-40">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                const height = Math.floor(Math.random() * 80) + 20;
                return (
                  <div key={day} className="flex flex-col items-center flex-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                      className="w-full rounded-t"
                      style={{ background: 'linear-gradient(180deg, #D4B483 0%, #8B7355 100%)' }}
                    />
                    <span className="mt-3 text-sm text-neutral-500 uppercase tracking-wider">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </SunnyBackground>
  );
}