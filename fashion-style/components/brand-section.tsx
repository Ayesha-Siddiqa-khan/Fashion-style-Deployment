"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "50K+", label: "Happy Customers" },
  { value: "500+", label: "Premium Products" },
  { value: "24/7", label: "Customer Support" },
];

export default function BrandSection() {
  return (
    <section className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Why Choose Fashion Style
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            We bring you the best in fashion with unparalleled quality and service
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-light text-amber-400 mb-2">
                {stat.value}
              </div>
              <div className="text-neutral-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}