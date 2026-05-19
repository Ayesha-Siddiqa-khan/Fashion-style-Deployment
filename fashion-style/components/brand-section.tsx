"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";

const stats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "50K+", label: "Happy Customers" },
  { value: "500+", label: "Premium Products" },
  { value: "24/7", label: "Customer Support" },
];

const socialLinks = [
  { 
    name: "Instagram", 
    href: "https://www.instagram.com/zeenkaar/",
    icon: Instagram 
  },
  { 
    name: "Facebook", 
    href: "https://www.facebook.com/profile.php?id=61576919996155",
    icon: Facebook 
  },
];

export default function BrandSection() {
  return (
    <section className="py-16 md:py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-light text-white mb-3 md:mb-4">
            Why Choose Fashion Style
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base">
            We bring you the best in fashion with unparalleled quality and service
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-5xl font-light text-amber-400 mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-neutral-400 text-xs md:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-neutral-500 text-xs md:text-sm uppercase tracking-wider mb-4">
            Follow Us
          </p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-300 hover:text-amber-400 hover:border-amber-400/50 transition-all duration-300"
              >
                <social.icon className="w-4 md:w-5 h-4 md:h-5" />
                <span className="text-xs md:text-sm">{social.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}