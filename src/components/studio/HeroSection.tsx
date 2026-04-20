"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { GeneratorFlow } from "./GeneratorFlow";

export function HeroSection() {
  const mouse = useMouseParallax();

  // Smooth spring values for orb movement
  const springConfig = { stiffness: 60, damping: 20, mass: 1 };
  const rawX = { get: () => mouse.x };
  const rawY = { get: () => mouse.y };

  return (
    <section className="relative mb-14 overflow-visible">

      {/* ── Ambient Orbs reacting to mouse ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Primary gold orb — trails mouse */}
        <motion.div
          className="absolute h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
            top: "-100px",
            left: "-80px",
            x: mouse.rx * 0.04,
            y: mouse.ry * 0.04,
          }}
          transition={springConfig}
        />
        {/* Secondary purple orb — moves opposite */}
        <motion.div
          className="absolute h-[400px] w-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(120,50,200,0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
            bottom: "-80px",
            right: "-60px",
            x: -mouse.rx * 0.025,
            y: -mouse.ry * 0.025,
          }}
        />
        {/* Centre accent */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
            x: mouse.rx * 0.02,
            y: mouse.ry * 0.02,
          }}
        />
      </div>

      {/* ── Hero copy ── */}
      <div className="mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-gold bg-gold-400/8 px-4 py-1.5"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="block h-1.5 w-1.5 rounded-full bg-gold-400"
          />
          <span className="font-mono text-[10.5px] uppercase tracking-widest text-gold-400">
            AI-Powered · Link → Video in 60 Seconds
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 text-[clamp(32px,5vw,52px)] font-black leading-[1.04] tracking-[-0.04em] text-white"
        >
          Turn Any Link Into a{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #F0D080 0%, #C9A84C 50%, #8B6420 100%)" }}
          >
            Viral Video
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mx-auto max-w-[480px] text-[15px] leading-relaxed text-white/40"
        >
          Paste a product page, article, or social post. Vibeads writes the script,
          renders the video, and dispatches it across every platform — automatically.
        </motion.p>
      </div>

      {/* ── Generator (Input → Processing → Result) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.24 }}
      >
        <GeneratorFlow />
      </motion.div>
    </section>
  );
}
