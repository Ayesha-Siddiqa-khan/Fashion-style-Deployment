"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Product } from "@/data/products";
import ProductModal from "./product-modal";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.08,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        onClick={() => setIsModalOpen(true)}
        className="group cursor-pointer"
      >
      <div className="relative overflow-hidden bg-neutral-900 aspect-[3/4] rounded-lg border border-neutral-800 hover:border-[#D4B483]/50 transition-colors">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 p-3 md:p-5"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 md:py-3.5 bg-[#D4B483] text-neutral-900 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#C4A473] transition-colors duration-300"
          >
            Add to Cart
          </motion.button>
        </motion.div>

        <div className="absolute top-2 md:top-4 left-2 md:left-4">
          <span className="px-2 md:px-3 py-1 md:py-1.5 bg-neutral-950/80 backdrop-blur-sm text-white text-[8px] md:text-[10px] font-medium uppercase tracking-[0.12em] border border-neutral-800">
            {product.category}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute top-2 md:top-4 right-2 md:right-4"
        >
          <button className="p-2 md:p-2.5 bg-neutral-950/80 backdrop-blur-sm rounded-full border border-neutral-800 hover:border-[#D4B483] hover:text-[#D4B483] transition-all duration-300">
            <svg className="w-3 md:w-4 h-3 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </motion.div>
      </div>

      <div className="mt-3 md:mt-5 space-y-1 md:space-y-2">
        <div className="flex items-start justify-between gap-2 md:gap-4">
          <h3 className="text-sm md:text-base font-light text-white group-hover:text-[#D4B483] transition-colors duration-300 leading-tight line-clamp-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {product.name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <svg className="w-3 h-3.5 md:w-3.5 md:h-3.5 text-[#D4B483]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[10px] md:text-xs text-neutral-500">{product.rating}</span>
          </div>
        </div>
        <p className="text-xs md:text-sm text-neutral-600 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <p className="text-sm md:text-lg font-light text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
          <span className="text-neutral-500 text-xs md:text-sm mr-0.5 md:mr-1">$</span>
          {product.price}
        </p>
      </div>
    </motion.article>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}