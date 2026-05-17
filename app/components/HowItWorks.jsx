"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Upload Property Photos",
    desc: "Owners or agents upload standard property photos — no special equipment needed.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    ),
    color: "#4F8CFF",
  },
  {
    num: "02",
    title: "AI Reconstructs the Space",
    desc: "Spatial AI builds an immersive, walkable reconstruction of the property in seconds.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7B61FF" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    color: "#7B61FF",
  },
  {
    num: "03",
    title: "Explore, Compare & Decide",
    desc: "Renters explore spaces, simulate commutes, compare properties, and shortlist confidently.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6CE5FF" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    color: "#6CE5FF",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-32 px-6">
      <div className="ambient-glow w-[400px] h-[400px] bg-[#6CE5FF] bottom-0 right-[-150px]" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            How it <span className="gradient-text">works.</span>
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[16.6%] right-[16.6%] h-[2px]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-[#4F8CFF] via-[#7B61FF] to-[#6CE5FF] origin-left"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative glass rounded-2xl p-8 text-center group hover:glow-blue transition-all duration-500"
            >
              {/* Step number */}
              <div
                className="w-12 h-12 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                style={{ background: `${step.color}15` }}
              >
                {step.icon}
              </div>
              <div className="text-xs font-bold tracking-widest mb-3" style={{ color: step.color }}>
                STEP {step.num}
              </div>
              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
