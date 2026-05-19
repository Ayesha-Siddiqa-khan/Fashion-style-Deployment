"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/product-card";
import { products, categories, genderCategories, Product } from "@/data/products";
import BackgroundGlow from "@/components/ui/background-glow";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialGender = searchParams.get("gender") as "men" | "women" | null;
  
  const [activeGender, setActiveGender] = useState<string>(initialGender || "all");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const genderFromUrl = searchParams.get("gender");
    if (genderFromUrl) {
      setActiveGender(genderFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    let result = products;
    
    if (activeGender !== "all") {
      result = result.filter(p => p.gender === activeGender || p.gender === "unisex");
    }
    
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }
    
    setFilteredProducts(result);
  }, [activeGender, activeCategory]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Shop</h1>
        <p className="text-neutral-400 font-light tracking-wide">Browse our curated collection</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-3 mb-8"
      >
        {genderCategories.map((gender) => (
          <button
            key={gender.id}
            onClick={() => setActiveGender(gender.id)}
            className={`px-8 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
              activeGender === gender.id
                ? "bg-[#D4B483] text-neutral-900"
                : "bg-neutral-900/60 text-neutral-400 border border-neutral-700 hover:border-[#D4B483] hover:text-white"
            }`}
          >
            {gender.name}
          </button>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
              activeCategory === category
                ? "text-[#D4B483]"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-neutral-500">No products found in this category.</p>
        </motion.div>
      )}
    </>
  );
}

export default function ShopPage() {
  return (
    <BackgroundGlow>
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Suspense fallback={
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-[#D4B483] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        }>
          <ShopContent />
        </Suspense>
      </div>
    </div>
    </BackgroundGlow>
  );
}