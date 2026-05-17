"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const rows = [
  { feature: "Property Viewing", old: "Static photo galleries", spacely: "Immersive 3D walkthroughs" },
  { feature: "Discovery", old: "Search-based browsing", spacely: "Spatial exploration" },
  { feature: "Commute", old: "Manual Google Maps checks", spacely: "Built-in simulation" },
  { feature: "Experience", old: "Listing data dumps", spacely: "Curated spatial experiences" },
  { feature: "Philosophy", old: "Transaction-first", spacely: "Renter-first" },
];

export default function Comparison() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Why Spacely is{" "}
            <span className="gradient-text-violet">different.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl overflow-hidden glow-blue"
        >
          {/* Header */}
          <div className="grid grid-cols-3 text-sm font-semibold border-b border-white/5">
            <div className="p-5 text-[#9CA3AF]">Feature</div>
            <div className="p-5 text-[#9CA3AF]/60 text-center">Traditional</div>
            <div className="p-5 text-center gradient-text">Spacely</div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`grid grid-cols-3 text-sm ${i < rows.length - 1 ? "border-b border-white/5" : ""} group hover:bg-white/[0.02] transition-colors`}
            >
              <div className="p-5 font-medium">{row.feature}</div>
              <div className="p-5 text-center text-[#9CA3AF]/50 flex items-center justify-center gap-2">
                <span className="text-red-400/60">✕</span>
                <span className="hidden sm:inline">{row.old}</span>
              </div>
              <div className="p-5 text-center text-[#6CE5FF] flex items-center justify-center gap-2">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                  className="text-[#6CE5FF]"
                >✓</motion.span>
                <span className="hidden sm:inline">{row.spacely}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
