"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { products } from "@/data/products";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Orders", href: "/orders" },
  { name: "Dashboard", href: "/dashboard" },
];

const categoryLinks = [
  { name: "All Products", href: "/shop" },
  { name: "Women", href: "/shop?gender=women" },
  { name: "Men", href: "/shop?gender=men" },
  { name: "Dresses", href: "/shop?gender=women" },
  { name: "Outerwear", href: "/shop" },
  { name: "Tops", href: "/shop" },
  { name: "Bottoms", href: "/shop" },
  { name: "Accessories", href: "/shop" },
  { name: "Shoes", href: "/shop" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const searchResults = searchQuery.length > 0
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <nav
      suppressHydrationWarning
      className="fixed top-0 left-0 right-0 z-50 border-b bg-neutral-950/95 backdrop-blur-xl border-white/08"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            href="/" 
            className="relative text-lg md:text-xl font-light tracking-[0.18em] hover:opacity-90 transition-opacity"
          >
            <span className="relative z-10 text-neutral-100">FASHION</span>
            <span className="relative z-10 text-amber-400">STYLE</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="relative text-sm font-medium tracking-wider text-neutral-300 hover:text-white transition-colors group py-1"
            >
              Home
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-400/80 transition-all duration-300 group-hover:w-full" />
            </Link>

            <div 
              className="relative"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button
                className="relative text-sm font-medium tracking-wider text-neutral-300 hover:text-white transition-colors group py-1 flex items-center gap-1"
              >
                Shop
                <svg className={`w-4 h-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-400/80 transition-all duration-300 group-hover:w-full" />
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl overflow-hidden"
                  >
                    <div className="py-2">
                      {categoryLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="block px-4 py-2.5 text-sm tracking-wide text-neutral-300 hover:bg-neutral-800 transition-colors"
                          onClick={() => setIsCategoryOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/dashboard"
              className="relative text-sm font-medium tracking-wider text-neutral-300 hover:text-white transition-colors group py-1"
            >
              Dashboard
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-400/80 transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/checkout"
              className="relative text-sm font-medium tracking-wider text-neutral-300 hover:text-white transition-colors group py-1"
            >
              Checkout
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-400/80 transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <div 
              className="relative"
              onMouseEnter={() => setIsSearchOpen(true)}
              onMouseLeave={() => setIsSearchOpen(false)}
            >
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-0 md:w-0 bg-transparent border-b border-neutral-700 text-white text-sm px-2 py-1 focus:outline-none focus:border-amber-400 transition-all duration-300 placeholder-neutral-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Search..."]') as HTMLInputElement;
                    if (input) {
                      input.style.width = input.style.width === '180px' ? '0px' : '180px';
                    }
                  }}
                  className="p-2.5 text-neutral-400 hover:text-amber-400 transition-colors rounded-full hover:bg-white/5"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.button>
              </div>

              <AnimatePresence>
                {isSearchOpen && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl overflow-hidden"
                  >
                    <div className="py-2">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href="/shop"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-800 transition-colors"
                          onClick={() => {
                            setSearchQuery("");
                            setIsSearchOpen(false);
                          }}
                        >
                          <div className="relative w-12 h-14 bg-neutral-800 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white truncate">{product.name}</div>
                            <div className="text-xs text-neutral-500">{product.category}</div>
                          </div>
                          <div className="text-sm text-amber-400" style={{ fontFamily: 'Playfair Display, serif' }}>${product.price}</div>
                        </Link>
                      ))}
                      <Link
                        href="/shop"
                        className="block px-4 py-2 text-center text-sm text-neutral-400 hover:text-amber-400 border-t border-neutral-800"
                        onClick={() => {
                          setSearchQuery("");
                          setIsSearchOpen(false);
                        }}
                      >
                        View all results →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/checkout">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 text-neutral-400 hover:text-amber-400 transition-colors rounded-full hover:bg-white/5 relative"
                aria-label="Cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {isMounted && totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-amber-400 text-neutral-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </motion.button>
            </Link>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 text-neutral-400 hover:text-amber-400 transition-colors rounded-lg hover:bg-white/5"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-neutral-950/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              <div className="px-4 py-2">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Shop Categories</span>
              </div>
              {categoryLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium tracking-wider text-neutral-300 hover:text-amber-400 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-white/5 my-2" />
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-base font-medium tracking-wider text-neutral-300 hover:text-amber-400 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium tracking-wider text-neutral-300 hover:text-amber-400 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
              >
                Checkout
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}