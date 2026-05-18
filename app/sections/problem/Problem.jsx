"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
  { icon: "📸", title: "Blurry Photos", desc: "Outdated, misleading images that hide more than they reveal." },
  { icon: "🏃", title: "Endless Site Visits", desc: "Wasted weekends traveling across cities for disappointing viewings." },
  { icon: "🗺️", title: "No Commute Clarity", desc: "Zero insight into daily travel times before committing to a lease." },
  { icon: "⚖️", title: "Information Asymmetry", desc: "Brokers control the narrative. Renters decide in the dark." },
  { icon: "😵", title: "Decision Fatigue", desc: "Too many tabs, too little clarity. Exhaustion replaces excitement." },
];

function ProblemCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="glass rounded-2xl p-6 group hover:glow-blue transition-all duration-500 cursor-default"
    >
      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
      <p className="text-sm text-[#9CA3AF] leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}

export default function Problem() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });
  const quoteRef = useRef(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-50px" });

  return (
    <section id="problem" className="relative py-32 px-6">
      <div className="ambient-glow w-[500px] h-[500px] bg-[#7B61FF] top-0 left-[-200px]" />

      <div className="max-w-6xl mx-auto">
        <div ref={headRef} className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          >
            Rental search hasn&apos;t evolved in{" "}
            <span className="gradient-text-violet">15 years.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-lg text-[#9CA3AF]"
          >
            People still make life-changing housing decisions using blurry photos
            and rushed site visits.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {problems.slice(0, 3).map((item, i) => (
            <ProblemCard key={item.title} item={item} index={i} />
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-20">
          {problems.slice(3).map((item, i) => (
            <ProblemCard key={item.title} item={item} index={i + 3} />
          ))}
        </div>

        {/* Memorable quote */}
        <motion.div
          ref={quoteRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={quoteInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-block glass rounded-2xl px-8 py-6 sm:px-12 sm:py-8 glow-violet">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold gradient-text-violet leading-snug">
              &ldquo;People don&apos;t just rent homes.<br />
              They rent a lifestyle radius.&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
