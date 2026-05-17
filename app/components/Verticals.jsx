"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const verticals = [
  {
    icon: "🏠",
    title: "Residential Rentals",
    desc: "Immersive apartment exploration for modern renters.",
    color: "#4F8CFF",
    active: true,
  },
  {
    icon: "🏛️",
    title: "Function Halls",
    desc: "Walk through event venues before booking.",
    color: "#7B61FF",
  },
  {
    icon: "🎪",
    title: "Event Spaces",
    desc: "Experience conference and celebration spaces virtually.",
    color: "#6CE5FF",
  },
  {
    icon: "🏢",
    title: "Commercial Spaces",
    desc: "Spatial intelligence for business real estate decisions.",
    color: "#9CA3AF",
    mystery: true,
  },
];

export default function Verticals() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="verticals" className="relative py-32 px-6">
      <div className="ambient-glow w-[400px] h-[400px] bg-[#4F8CFF] top-[20%] right-[-150px]" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Beyond <span className="gradient-text-violet">rentals.</span>
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Spatial intelligence for every physical space decision.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {verticals.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`glass rounded-2xl p-6 group transition-all duration-500 cursor-default relative overflow-hidden ${
                v.active ? "glow-blue" : v.mystery ? "hover:glow-violet" : "hover:glow-cyan"
              }`}
            >
              {v.active && (
                <div className="absolute top-3 right-3 glass px-2 py-0.5 rounded-full">
                  <span className="text-[9px] text-[#4F8CFF] font-medium">LIVE</span>
                </div>
              )}
              {v.mystery && (
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#7B61FF]/5 pointer-events-none" />
              )}
              <motion.div
                animate={v.mystery ? { opacity: [0.5, 1, 0.5] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                {v.icon}
              </motion.div>
              <h3 className="text-base font-semibold mb-2">{v.title}</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-10 text-sm text-[#9CA3AF] italic"
        >
          Future vision: spatial intelligence for business decisions.
        </motion.p>
      </div>
    </section>
  );
}
