"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/cart-context";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const materialInfo: Record<string, string> = {
  Dresses: "100% Premium Silk | Lining: 100% Acetate",
  Outerwear: "Genuine Italian Leather | Polyester lining",
  Tops: "100% Cashmere | Hand-wash recommended",
  Bottoms: "98% Cotton, 2% Elastane | Machine washable",
  Accessories: "Full-grain leather | Gold-plated hardware",
};

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleClose = () => {
    setQuantity(1);
    setIsAdded(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-6xl max-h-[95vh] overflow-hidden z-50"
          >
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full shadow-md hover:bg-neutral-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative w-full md:w-3/5 aspect-[4/5] md:min-h-[600px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="60vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <h2 className="text-3xl font-light text-neutral-900 mb-3">{product.name}</h2>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400" : "text-neutral-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-neutral-500">{product.rating}</span>
                  </div>

                  <p className="text-3xl font-light text-neutral-900 mb-6">
                    <span className="text-neutral-400 text-2xl mr-1">$</span>
                    {product.price}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-neutral-900 mb-2">Description</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">{product.description}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-neutral-900 mb-2">Material</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {materialInfo[product.category] || "Premium quality materials"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 mb-3">Quantity</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-neutral-300 rounded">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-4 py-2 hover:bg-neutral-100 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="px-4 py-2 min-w-[48px] text-center font-medium">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-4 py-2 hover:bg-neutral-100 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <span className="text-sm text-neutral-500">
                        Total: <span className="font-medium text-neutral-900">${(product.price * quantity).toFixed(2)}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 mt-6 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isAdded
                      ? "bg-green-600 text-white"
                      : "bg-neutral-900 text-white hover:bg-amber-600"
                  }`}
                >
                  {isAdded ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}