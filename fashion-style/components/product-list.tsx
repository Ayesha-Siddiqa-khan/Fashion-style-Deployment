"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./product-card";
import { products, categories, Product } from "@/data/products";

interface ProductListProps {
  title?: string;
  showFilters?: boolean;
}

export default function ProductList({ title = "Our Collection", showFilters = true }: ProductListProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-medium tracking-[0.25em] text-amber-600 uppercase mb-4">
            Curated Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-neutral-900 mb-6 tracking-tight">
            {title}
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover our curated collection of premium fashion pieces, each selected for exceptional quality and timeless style
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-8" />
        </motion.div>

        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryChange(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-8 py-3 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 overflow-hidden ${
                  activeCategory === category
                    ? "text-white"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <span className={`relative z-10 ${activeCategory === category ? "text-white" : ""}`}>
                  {category}
                </span>
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-neutral-900"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {activeCategory !== category && (
                  <div className="absolute inset-0 bg-neutral-100 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}

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
            <p className="text-neutral-400">No products found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}