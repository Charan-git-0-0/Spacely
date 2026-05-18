"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

function HeroVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 140, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(79, 140, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Main mockup card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-[90%] max-w-[480px]">
          {/* Property card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass rounded-2xl p-5 glow-blue"
          >
            {/* Mockup apartment header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-[#4F8CFF] font-medium tracking-wider uppercase">Live Walkthrough</div>
                <div className="text-lg font-semibold mt-1">Modern 2BHK — Gachibowli</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#7B61FF]/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
            </div>

            {/* Mockup room view */}
            <div className="relative rounded-xl overflow-hidden h-44 bg-gradient-to-br from-[#1a1a2e] to-[#16161D] mb-4">
              <div className="absolute inset-0 grid grid-cols-3 gap-[1px] opacity-20">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-[#4F8CFF]/10 rounded" />
                ))}
              </div>
              {/* Room labels */}
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-3 left-3 glass px-2.5 py-1 rounded-lg text-[10px] text-[#6CE5FF]">
                Living Room
              </motion.div>
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="absolute top-3 right-3 glass px-2.5 py-1 rounded-lg text-[10px] text-[#7B61FF]">
                ☀ Natural Light: Excellent
              </motion.div>
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }} className="absolute bottom-3 left-3 glass px-2.5 py-1 rounded-lg text-[10px] text-[#4F8CFF]">
                1,200 sq.ft
              </motion.div>
              {/* Navigation dots */}
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF]" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </div>
              {/* 3D Grid perspective */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.1"/>
                    <stop offset="50%" stopColor="#4F8CFF" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                {/* Perspective grid lines */}
                <line x1="200" y1="100" x2="0" y2="200" stroke="url(#lineGrad)" strokeWidth="0.5"/>
                <line x1="200" y1="100" x2="100" y2="200" stroke="url(#lineGrad)" strokeWidth="0.5"/>
                <line x1="200" y1="100" x2="200" y2="200" stroke="url(#lineGrad)" strokeWidth="0.5"/>
                <line x1="200" y1="100" x2="300" y2="200" stroke="url(#lineGrad)" strokeWidth="0.5"/>
                <line x1="200" y1="100" x2="400" y2="200" stroke="url(#lineGrad)" strokeWidth="0.5"/>
              </svg>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Rooms", value: "4", icon: "□" },
                { label: "Floor", value: "12th", icon: "▲" },
                { label: "Rent", value: "₹28K", icon: "◈" },
              ].map((s) => (
                <div key={s.label} className="bg-[#0B0B0F]/50 rounded-lg p-2.5 text-center">
                  <div className="text-[10px] text-[#9CA3AF]">{s.label}</div>
                  <div className="text-sm font-semibold mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating commute card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute -right-4 top-8 sm:-right-16"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="glass rounded-xl p-3 glow-cyan w-40"
            >
              <div className="text-[10px] text-[#6CE5FF] font-medium mb-1.5">🚗 Commute</div>
              <div className="text-sm font-semibold">18 min</div>
              <div className="text-[10px] text-[#9CA3AF]">to HITEC City</div>
              <div className="mt-2 h-1 rounded-full bg-[#0B0B0F] overflow-hidden">
                <motion.div
                  animate={{ width: ["0%", "75%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="h-full rounded-full bg-gradient-to-r from-[#6CE5FF] to-[#4F8CFF]"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Floating nearby card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="absolute -left-4 bottom-12 sm:-left-14"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="glass rounded-xl p-3 glow-violet w-36"
            >
              <div className="text-[10px] text-[#7B61FF] font-medium mb-1.5">📍 Nearby</div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-[#9CA3AF]">Metro</span>
                  <span className="text-white">0.8 km</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-[#9CA3AF]">Café</span>
                  <span className="text-white">0.3 km</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-[#9CA3AF]">Gym</span>
                  <span className="text-white">0.5 km</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background ambient glows */}
      <div className="ambient-glow w-[600px] h-[600px] bg-[#4F8CFF] top-[-200px] right-[-100px]" />
      <div className="ambient-glow w-[400px] h-[400px] bg-[#7B61FF] bottom-[-100px] left-[-100px]" />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left - Text */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#6CE5FF] animate-pulse-glow" />
            <span className="text-xs text-[#9CA3AF]">Launching first in Hyderabad</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            Experience spaces{" "}
            <span className="gradient-text">before you step</span>{" "}
            into them.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-[#9CA3AF] max-w-xl mb-10 leading-relaxed"
          >
            Spacely transforms property discovery with immersive 3D walkthroughs,
            intelligent commute simulation, and spatial experiences designed for
            modern renters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#waitlist" className="btn-primary px-8 py-3.5 rounded-full font-medium text-sm relative z-10">
              <span className="relative z-10">Join Waitlist</span>
            </a>
            <button className="btn-secondary px-8 py-3.5 rounded-full font-medium text-sm flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Watch Demo
            </button>
            <a href="/explore" className="btn-secondary px-8 py-3.5 rounded-full font-medium text-sm flex items-center gap-2 border-[#7B61FF]/30 hover:border-[#7B61FF]/60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B61FF" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
              <span className="text-[#7B61FF]">Try 3D Explorer</span>
            </a>
          </motion.div>
        </div>

        {/* Right - Visual */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <HeroVisual />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-[#9CA3AF] tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-[#9CA3AF]/30 flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-[#4F8CFF]"
          />
        </div>
      </motion.div>
    </section>
  );
}
