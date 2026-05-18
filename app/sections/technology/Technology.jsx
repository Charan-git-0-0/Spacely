"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techs = [
  { name: "Gaussian Splatting", desc: "Photorealistic 3D reconstruction" },
  { name: "Spatial AI", desc: "Intelligent scene understanding" },
  { name: "Mapping APIs", desc: "Real-time geospatial intelligence" },
  { name: "Commute Engine", desc: "Multi-modal travel analysis" },
];

export default function Technology() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6">
      <div className="ambient-glow w-[500px] h-[500px] bg-[#7B61FF] bottom-0 left-[-200px]" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Built on modern{" "}
            <span className="gradient-text">spatial technology.</span>
          </h2>
        </motion.div>

        {/* Tech visual */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass rounded-3xl p-8 sm:p-12 glow-violet mb-12"
        >
          {/* Abstract network background */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 600 300">
            <circle cx="150" cy="100" r="3" fill="#4F8CFF"/>
            <circle cx="300" cy="60" r="3" fill="#7B61FF"/>
            <circle cx="450" cy="120" r="3" fill="#6CE5FF"/>
            <circle cx="200" cy="200" r="3" fill="#4F8CFF"/>
            <circle cx="400" cy="220" r="3" fill="#7B61FF"/>
            <line x1="150" y1="100" x2="300" y2="60" stroke="#4F8CFF" strokeWidth="0.5"/>
            <line x1="300" y1="60" x2="450" y2="120" stroke="#7B61FF" strokeWidth="0.5"/>
            <line x1="150" y1="100" x2="200" y2="200" stroke="#4F8CFF" strokeWidth="0.5"/>
            <line x1="450" y1="120" x2="400" y2="220" stroke="#6CE5FF" strokeWidth="0.5"/>
            <line x1="200" y1="200" x2="400" y2="220" stroke="#7B61FF" strokeWidth="0.5"/>
            <line x1="300" y1="60" x2="200" y2="200" stroke="#4F8CFF" strokeWidth="0.3"/>
            <line x1="300" y1="60" x2="400" y2="220" stroke="#7B61FF" strokeWidth="0.3"/>
          </svg>

          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techs.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4F8CFF]/10 to-[#7B61FF]/10 border border-white/5 mx-auto mb-4 flex items-center justify-center"
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#7B61FF]" />
                </motion.div>
                <h4 className="text-sm font-semibold mb-1">{tech.name}</h4>
                <p className="text-xs text-[#9CA3AF]">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-block glass rounded-2xl px-8 py-6 sm:px-12 sm:py-8">
            <p className="text-lg sm:text-xl text-[#9CA3AF] leading-relaxed max-w-xl">
              &ldquo;We don&apos;t replace real-world visits.{" "}
              <span className="text-white font-medium">
                We reduce uncertainty before them.
              </span>
              &rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
