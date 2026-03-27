"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const parallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);
  const parallaxOrbsX = useTransform(smoothMouseX, [-0.5, 0.5], [-40, 40]);
  const parallaxOrbsY = useTransform(smoothMouseY, [-0.5, 0.5], [-40, 40]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleScrollToProjects = () => {
    const el = document.querySelector("#projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(91, 33, 182, 0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0, 240, 255, 0.08) 0%, transparent 60%), #000000",
        }}
      />

      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: "perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)",
          animation: "gradient-shift 20s linear infinite",
        }}
      />

      {/* Floating UI Orbs */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ x: parallaxOrbsX, y: parallaxOrbsY }}
      >
        <div className="absolute top-[20%] left-[15%] w-24 h-24 rounded-full bg-[#00f0ff]/10 blur-xl animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-[60%] right-[10%] w-32 h-32 rounded-full bg-[#ff00aa]/10 blur-xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[20%] left-[30%] w-16 h-16 rounded-full bg-[#7c3aed]/10 blur-xl animate-float" style={{ animationDelay: "4s" }} />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest"
            style={{
              background: "rgba(0, 240, 255, 0.08)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              color: "#00f0ff",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
            Open to freelance &amp; collabs
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div style={{ x: parallaxX, y: parallaxY }}>
          <motion.h1
            variants={itemVariants}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6"
          >
            <span className="block text-white/20 text-xl sm:text-2xl font-medium tracking-[0.4em] uppercase mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              I&apos;m
            </span>
            <span
              className="block glitch-effect filter drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              data-text="Best"
              style={{
                background: "linear-gradient(135deg, #00f0ff 0%, #ff00aa 50%, #7c3aed 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-shift 4s ease infinite",
              }}
            >
              Best
            </span>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight">
            <span
              style={{
                background: "linear-gradient(90deg, #00f0ff, #ff00aa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Builder.
            </span>
            <span className="text-white/60 mx-3">Founder.</span>
            <span
              style={{
                background: "linear-gradient(90deg, #ff00aa, #00f0ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Still in HS.
            </span>
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-white/40 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          I don&apos;t wait to graduate to start building. AI platforms, SaaS tools,
          real products — shipped while most people are still writing essays.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleScrollToProjects}
            className="group relative px-8 py-4 rounded-2xl font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00f0ff, #ff00aa)",
              boxShadow: "0 0 30px rgba(0, 240, 255, 0.3)",
              color: "#000",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 50px rgba(0, 240, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 30px rgba(0, 240, 255, 0.3)";
            }}
          >
            See What I Build
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 240, 255, 0.3)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
            }}
          >
            Work With Me
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-10 mt-16 pt-12"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { value: "5+", label: "Products Shipped" },
            { value: "100%", label: "Self-Taught" },
            { value: "∞", label: "Ambition" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl sm:text-3xl font-bold mb-1"
                style={{
                  background: "linear-gradient(135deg, #00f0ff, #ff00aa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="text-white/30 text-xs uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={handleScrollToProjects}
      >
        <span className="text-white/20 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
