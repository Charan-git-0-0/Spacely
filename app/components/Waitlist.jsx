"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const roles = ["Renter", "Builder", "Investor", "Student", "Potential Collaborator"];

export default function Waitlist() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="relative py-32 px-6">
      <div className="ambient-glow w-[600px] h-[600px] bg-[#4F8CFF] top-[-100px] left-1/2 -translate-x-1/2" />
      <div className="ambient-glow w-[400px] h-[400px] bg-[#7B61FF] bottom-[-100px] right-[-100px]" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            The future of property discovery{" "}
            <span className="gradient-text">begins now.</span>
          </h2>
          <p className="text-lg text-[#9CA3AF]">
            Join early users, builders, mentors, and future collaborators shaping
            immersive spatial experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-strong rounded-3xl p-8 sm:p-10 glow-blue"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="waitlist-name" className="text-xs text-[#9CA3AF] mb-1.5 block">Name</label>
                <input
                  id="waitlist-name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full bg-[#0B0B0F]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#9CA3AF]/50 focus:outline-none focus:border-[#4F8CFF]/50 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="waitlist-email" className="text-xs text-[#9CA3AF] mb-1.5 block">Email</label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full bg-[#0B0B0F]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#9CA3AF]/50 focus:outline-none focus:border-[#4F8CFF]/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#9CA3AF] mb-1.5 block">I am a...</label>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                        selectedRole === role
                          ? "bg-[#4F8CFF] text-white"
                          : "bg-[#0B0B0F]/60 border border-white/10 text-[#9CA3AF] hover:border-[#4F8CFF]/30"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 px-6 py-3.5 rounded-full font-medium text-sm relative z-10">
                  <span className="relative z-10">Join Waitlist</span>
                </button>
                <button type="button" className="btn-secondary flex-1 px-6 py-3.5 rounded-full font-medium text-sm">
                  Request Early Access
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-[#4F8CFF]/20 mx-auto mb-6 flex items-center justify-center"
              >
                <span className="text-3xl">✨</span>
              </motion.div>
              <h3 className="text-xl font-bold mb-2">You&apos;re on the list!</h3>
              <p className="text-[#9CA3AF] text-sm">
                We&apos;ll reach out when early access begins. Welcome to the future of spatial discovery.
              </p>
            </motion.div>
          )}

          {/* Social proof */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-6">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#16161D] flex items-center justify-center text-[10px]"
                  style={{
                    background: `linear-gradient(135deg, ${
                      ["#4F8CFF", "#7B61FF", "#6CE5FF", "#4F8CFF"][i]
                    }30, ${["#4F8CFF", "#7B61FF", "#6CE5FF", "#4F8CFF"][i]}10)`,
                  }}
                >
                  {["S", "A", "R", "P"][i]}
                </div>
              ))}
            </div>
            <p className="text-xs text-[#9CA3AF]">
              <span className="text-white font-medium">120+</span> people already on the waitlist
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
