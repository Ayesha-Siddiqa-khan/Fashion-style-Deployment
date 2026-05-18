"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/#products" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Checkout", href: "/checkout" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const headerBg = useTransform(scrollY, [0, 80], ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.92)"]);
  const headerBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(16px)"]);
  const headerBorder = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.06)"]);

  useEffect(() => {
    const handleScroll = () => {
      // Handle scroll state if needed
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      style={{ 
        backgroundColor: headerBg, 
        backdropFilter: headerBlur, 
        borderColor: headerBorder 
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            href="/" 
            className="relative text-lg md:text-xl font-light tracking-[0.18em] text-white hover:text-amber-200 transition-colors"
          >
            <span className="relative z-10">FASHION</span>
            <span className="relative z-10 text-amber-400">STYLE</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium tracking-wider text-neutral-300 hover:text-white transition-colors group py-1"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-400/80 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 text-neutral-400 hover:text-amber-400 transition-colors rounded-full hover:bg-white/5"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 text-neutral-400 hover:text-amber-400 transition-colors rounded-full hover:bg-white/5 relative"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-400 text-neutral-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </motion.button>
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
            <div className="px-4 py-6 space-y-1">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}