"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function WalkthroughVisual() {
  return (
    <div className="relative glass rounded-2xl p-4 glow-blue overflow-hidden h-[340px]">
      {/* Room grid */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-4 bg-gradient-to-br from-[#1a1a2e] to-[#0d0d15] rounded-xl">
          {/* Perspective grid */}
          <svg className="w-full h-full opacity-30" viewBox="0 0 400 300">
            <defs>
              <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {/* Floor grid */}
            {[0,1,2,3,4,5,6].map(i => (
              <line key={`h${i}`} x1="0" y1={200 + i*15} x2="400" y2={200 + i*15} stroke="#4F8CFF" strokeOpacity="0.15" strokeWidth="0.5"/>
            ))}
            {[0,1,2,3,4,5,6,7,8].map(i => (
              <line key={`v${i}`} x1={200} y1={150} x2={i*50} y2={300} stroke="#4F8CFF" strokeOpacity="0.15" strokeWidth="0.5"/>
            ))}
            {/* Wall outlines */}
            <rect x="30" y="30" width="340" height="240" fill="none" stroke="url(#sg1)" strokeWidth="1" rx="4"/>
            <line x1="180" y1="30" x2="180" y2="170" stroke="#4F8CFF" strokeOpacity="0.2" strokeWidth="0.5"/>
            <line x1="30" y1="170" x2="370" y2="170" stroke="#4F8CFF" strokeOpacity="0.2" strokeWidth="0.5"/>
          </svg>

          {/* Room labels */}
          <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-8 left-8 glass px-3 py-1.5 rounded-lg">
            <span className="text-[10px] text-[#6CE5FF]">🛋️ Living Room</span>
          </motion.div>
          <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute top-8 right-8 glass px-3 py-1.5 rounded-lg">
            <span className="text-[10px] text-[#7B61FF]">🛏️ Master Bedroom</span>
          </motion.div>
          <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            className="absolute bottom-16 left-8 glass px-3 py-1.5 rounded-lg">
            <span className="text-[10px] text-[#4F8CFF]">🍳 Kitchen</span>
          </motion.div>

          {/* Sunlight indicator */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-yellow-400/10 blur-xl" />
          </div>

          {/* Camera icon */}
          <motion.div animate={{ x: [0, 30, 0], y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 right-8 glass px-3 py-2 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[10px] text-[#9CA3AF]">Spatial Camera</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CommuteVisual() {
  return (
    <div className="relative glass rounded-2xl p-4 glow-violet overflow-hidden h-[340px]">
      <div className="absolute inset-4 bg-gradient-to-br from-[#1a1a2e] to-[#0d0d15] rounded-xl overflow-hidden">
        {/* Map dots */}
        <svg className="w-full h-full" viewBox="0 0 400 300">
          <defs>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F8CFF"/>
              <stop offset="100%" stopColor="#6CE5FF"/>
            </linearGradient>
          </defs>
          
          {/* Grid streets */}
          {[50,100,150,200,250].map(y => (
            <line key={`sh${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#ffffff" strokeOpacity="0.03" strokeWidth="0.5"/>
          ))}
          {[50,100,150,200,250,300,350].map(x => (
            <line key={`sv${x}`} x1={x} y1="0" x2={x} y2="300" stroke="#ffffff" strokeOpacity="0.03" strokeWidth="0.5"/>
          ))}
          
          {/* Route path */}
          <motion.path
            d="M 80 230 C 120 230 140 180 180 160 S 250 120 300 90 S 340 70 350 60"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Home marker */}
          <circle cx="80" cy="230" r="8" fill="#4F8CFF" fillOpacity="0.2"/>
          <circle cx="80" cy="230" r="4" fill="#4F8CFF"/>
          
          {/* Office marker */}
          <circle cx="350" cy="60" r="8" fill="#6CE5FF" fillOpacity="0.2"/>
          <circle cx="350" cy="60" r="4" fill="#6CE5FF"/>

          {/* Landmarks */}
          <circle cx="200" cy="180" r="3" fill="#7B61FF" fillOpacity="0.5"/>
          <circle cx="260" cy="130" r="3" fill="#7B61FF" fillOpacity="0.5"/>
        </svg>

        {/* Home label */}
        <div className="absolute bottom-12 left-6 glass px-3 py-2 rounded-lg">
          <div className="text-[10px] text-[#4F8CFF] font-medium">🏠 Home</div>
          <div className="text-[10px] text-[#9CA3AF]">Gachibowli</div>
        </div>

        {/* Office label */}
        <div className="absolute top-6 right-6 glass px-3 py-2 rounded-lg">
          <div className="text-[10px] text-[#6CE5FF] font-medium">🏢 Office</div>
          <div className="text-[10px] text-[#9CA3AF]">HITEC City</div>
        </div>

        {/* Travel time cards */}
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
          {[
            { icon: "🚗", time: "18 min", color: "#4F8CFF" },
            { icon: "🚌", time: "32 min", color: "#7B61FF" },
            { icon: "🚇", time: "22 min", color: "#6CE5FF" },
          ].map((m) => (
            <div key={m.icon} className="glass px-2.5 py-1.5 rounded-lg text-center">
              <div className="text-xs">{m.icon}</div>
              <div className="text-[10px] font-semibold" style={{ color: m.color }}>{m.time}</div>
            </div>
          ))}
        </motion.div>

        {/* Landmark labels */}
        <div className="absolute left-[46%] top-[56%] glass px-2 py-1 rounded text-[8px] text-[#7B61FF]">☕ Café</div>
        <div className="absolute left-[60%] top-[38%] glass px-2 py-1 rounded text-[8px] text-[#7B61FF]">🚇 Metro</div>
      </div>
    </div>
  );
}

export default function Solution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solution" className="relative py-32 px-6">
      <div className="ambient-glow w-[500px] h-[500px] bg-[#4F8CFF] top-[20%] right-[-200px]" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            A new way to experience{" "}
            <span className="gradient-text">physical spaces</span> online.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Feature 1 - 3D Walkthroughs */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <WalkthroughVisual />
            <div className="mt-6 px-2">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#4F8CFF]/10 flex items-center justify-center text-sm">🏠</span>
                AI-Powered 3D Walkthroughs
              </h3>
              <p className="text-[#9CA3AF] leading-relaxed">
                Convert ordinary property photos into immersive walkable
                experiences using modern spatial AI. Navigate rooms, feel the
                space, and understand layouts like never before.
              </p>
            </div>
          </motion.div>

          {/* Feature 2 - Commute Simulation */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <CommuteVisual />
            <div className="mt-6 px-2">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#7B61FF]/10 flex items-center justify-center text-sm">🗺️</span>
                Commute Simulation
              </h3>
              <p className="text-[#9CA3AF] leading-relaxed">
                Understand how a property fits into your daily life before making
                a decision. Visualize routes, travel times, and nearby essentials
                in real-time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
