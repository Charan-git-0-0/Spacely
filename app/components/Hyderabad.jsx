"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const areas = [
  { name: "HITEC City", x: "55%", y: "35%", delay: 0 },
  { name: "Gachibowli", x: "38%", y: "52%", delay: 0.15 },
  { name: "Kondapur", x: "45%", y: "25%", delay: 0.3 },
  { name: "Madhapur", x: "62%", y: "48%", delay: 0.45 },
];

export default function Hyderabad() {
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
            Starting in{" "}
            <span className="gradient-text">Hyderabad.</span>
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Built for one of India&apos;s fastest-growing urban renter ecosystems —
            gated communities, modern IT corridors, and a surge of young professionals.
          </p>
        </motion.div>

        {/* Map visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass rounded-3xl overflow-hidden h-[400px] glow-blue"
        >
          {/* Abstract map background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d15] to-[#16161D]">
            <svg className="w-full h-full opacity-30" viewBox="0 0 600 400">
              {/* Road network */}
              <path d="M 100 200 Q 200 150 300 200 T 500 200" stroke="#4F8CFF" strokeWidth="1" fill="none" strokeOpacity="0.3"/>
              <path d="M 200 50 Q 250 200 200 350" stroke="#4F8CFF" strokeWidth="1" fill="none" strokeOpacity="0.2"/>
              <path d="M 350 80 Q 300 200 400 320" stroke="#7B61FF" strokeWidth="1" fill="none" strokeOpacity="0.2"/>
              <circle cx="300" cy="200" r="80" stroke="#4F8CFF" strokeWidth="0.5" fill="none" strokeOpacity="0.1"/>
              <circle cx="300" cy="200" r="140" stroke="#4F8CFF" strokeWidth="0.5" fill="none" strokeOpacity="0.05"/>
            </svg>
          </div>

          {/* City markers */}
          {areas.map((area) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + area.delay, type: "spring" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-default"
              style={{ left: area.x, top: area.y }}
            >
              {/* Pulse ring */}
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, delay: area.delay }}
                className="absolute inset-0 w-4 h-4 -m-2 rounded-full bg-[#4F8CFF]/30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <div className="w-3 h-3 rounded-full bg-[#4F8CFF] shadow-lg shadow-[#4F8CFF]/30 mx-auto" />
              <div className="glass px-3 py-1.5 rounded-lg mt-2 whitespace-nowrap">
                <span className="text-xs font-medium">{area.name}</span>
              </div>
            </motion.div>
          ))}

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3 justify-center"
          >
            {["IT Migration Hub", "Modern Gated Communities", "Young Professional Density"].map((tag) => (
              <span key={tag} className="glass px-4 py-2 rounded-full text-xs text-[#9CA3AF]">{tag}</span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
