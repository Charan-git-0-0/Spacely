"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  { icon: "💼", text: "Receives a job offer in Hyderabad", color: "#4F8CFF" },
  { icon: "📱", text: "Opens Spacely from her phone", color: "#7B61FF" },
  { icon: "🏠", text: "Explores apartments virtually in Gachibowli", color: "#6CE5FF" },
  { icon: "🚗", text: "Simulates daily office commute to HITEC City", color: "#4F8CFF" },
  { icon: "☕", text: "Checks nearby cafés, metro, and essentials", color: "#7B61FF" },
  { icon: "⚖️", text: "Compares two properties side by side", color: "#6CE5FF" },
  { icon: "✅", text: "Confidently shortlists — before a single visit", color: "#4F8CFF" },
];

export default function Story() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6">
      <div className="ambient-glow w-[500px] h-[500px] bg-[#7B61FF] top-[30%] left-[-200px]" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs text-[#9CA3AF]">✨ Imagine this</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            A renter moving to{" "}
            <span className="gradient-text-violet">Hyderabad.</span>
          </h2>
          <p className="text-lg text-[#9CA3AF]">
            Follow Priya&apos;s journey from offer letter to shortlist.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#4F8CFF] via-[#7B61FF] to-[#6CE5FF] opacity-20" />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex items-center gap-6 mb-8 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                  className="w-3 h-3 rounded-full"
                  style={{ background: item.color, boxShadow: `0 0 12px ${item.color}40` }}
                />
              </div>

              {/* Content */}
              <div className={`ml-14 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                <div className="glass rounded-xl p-4 inline-block hover:glow-blue transition-all duration-300">
                  <span className="text-xl mr-2">{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                </div>
              </div>

              <div className="hidden md:block md:w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
