"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { X, ExternalLink, Code2, Zap, CheckCircle2, Users, TrendingUp, Activity } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

// Micro-component for Animated Counters
function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
  const [count, setCount] = useState("0");
  const parsed = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");

  useEffect(() => {
    let start = 0;
    const end = parsed || 0;
    if (end === 0) {
      setCount(value);
      return;
    }
    const totalFrames = Math.round(duration * 60);
    const increment = end / totalFrames;
    let currentFrame = 0;

    const timer = setInterval(() => {
      start += increment;
      currentFrame++;
      if (currentFrame >= totalFrames) {
        clearInterval(timer);
        setCount(end + suffix);
      } else {
        const displayVal = start > 1000 ? (start / 1000).toFixed(1) + "K" : Math.round(start);
        setCount(displayVal + suffix);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [parsed, suffix, duration, value]);

  return <span className="font-mono">{count}</span>;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dynamic light follow
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const backgroundLight = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(1000px circle at ${x}px ${y}px, rgba(255,255,255,0.04), transparent 40%)`
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Global Backdrop Dim */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Fullscreen Expansion */}
          <motion.div
            layoutId={`project-${project.id}`}
            ref={modalRef}
            onMouseMove={handleMouseMove}
            className="fixed inset-0 sm:inset-4 md:inset-8 xl:inset-12 z-[201] rounded-none sm:rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl"
            style={{
              background: "#050508",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
          >
            {/* Ambient Mouse Lighting */}
            <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ background: backgroundLight }} />

            {/* Left Pane: Cinematic Preview */}
            <div className="relative w-full lg:w-[55%] h-[400px] lg:h-full overflow-hidden bg-black flex items-center justify-center shrink-0 z-10 perspective-[2000px]">
              {/* Diffuse glow from image */}
              <div 
                className="absolute inset-0 opacity-40 blur-3xl scale-125"
                style={{ backgroundImage: `url(${project.screenshot})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80" />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateY: -10, rotateX: 5 }}
                animate={{ opacity: 1, scale: 1, rotateY: -15, rotateX: 5 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 20 }}
                className="relative z-10 w-full h-full flex items-center justify-center transform-gpu"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* PRO 3D Desktop Mockup */}
                <div 
                  className="absolute right-[-10%] sm:right-[5%] md:right-[10%] w-[80%] sm:w-[70%] rounded-xl overflow-hidden shadow-2xl transition-transform duration-700 hover:rotate-y-0"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 50px 100px -20px rgba(0,0,0,1), 0 0 40px rgba(0,240,255,0.15)",
                    transform: "translateZ(20px) rotateY(-5deg)"
                  }}
                >
                  <div className="h-6 sm:h-8 bg-[#1a1b26] flex items-center px-4 gap-2 border-b border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <img src={project.screenshot} alt={project.title} className="w-full h-auto object-cover opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>

                {/* PRO 3D Mobile/Tablet Mockup (Overlapping) */}
                <div 
                  className="absolute left-[-5%] sm:left-[10%] top-[40%] w-[35%] sm:w-[25%] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl transition-transform duration-700 hover:translate-z-100"
                  style={{
                    border: "6px solid #1a1b26",
                    boxShadow: "0 40px 80px -10px rgba(0,0,0,1), 0 0 30px rgba(255,0,170,0.2)",
                    transform: "translateZ(80px) rotateY(15deg) rotateX(-5deg)"
                  }}
                >
                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-0 inset-x-0 mx-auto w-[40%] h-3 sm:h-4 bg-[#1a1b26] rounded-b-xl z-20" />
                  <img 
                    src={project.screenshotMobile || project.screenshot} 
                    alt={project.title} 
                    className="w-full aspect-[9/19] object-cover object-top opacity-95 relative z-10" 
                  />
                  {/* Glass Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-transparent pointer-events-none z-30" />
                </div>
              </motion.div>
            </div>

            {/* Right Pane: Scrollable Details */}
            <div className="relative w-full lg:w-[45%] h-full overflow-y-auto p-6 sm:p-10 lg:p-14 z-10 scrollbar-hide bg-gradient-to-b from-[#0a0a0f] to-[#050508]" style={{ scrollbarWidth: "none" }}>
              {/* Close Button X */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:rotate-90 z-50"
                style={{ border: "1px solid rgba(255, 255, 255, 0.1)", color: "rgba(255,255,255,0.6)" }}
              >
                <X className="w-4 h-4" />
              </button>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
                <div className="text-white/30 text-xs font-mono uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                  Project {String(project.id).padStart(2, "0")}
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight leading-tight" style={{
                  background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  {project.title}
                </h2>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-md font-medium tracking-wide"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Animated Stat Counters */}
                <div className="grid grid-cols-3 gap-4 mb-10 pt-8 border-t border-white/5">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-[#00f0ff] text-[10px] uppercase font-bold tracking-widest">
                      <TrendingUp className="w-3 h-3" /> Revenue
                    </div>
                    <div className="text-white/90 font-mono text-xl sm:text-2xl font-medium tracking-tight">
                      {project.id === 1 ? <AnimatedCounter value="12.4K" /> : project.id === 2 ? <AnimatedCounter value="5.2K" /> : <AnimatedCounter value="0" />}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-[#ff00aa] text-[10px] uppercase font-bold tracking-widest">
                      <Users className="w-3 h-3" /> Users
                    </div>
                    <div className="text-white/90 font-mono text-xl sm:text-2xl font-medium tracking-tight">
                      {project.id === 1 ? <AnimatedCounter value="10.2K" /> : project.id === 2 ? <AnimatedCounter value="1.5K" /> : <AnimatedCounter value="0" />}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-[#7c3aed] text-[10px] uppercase font-bold tracking-widest">
                      <Activity className="w-3 h-3" /> Uptime
                    </div>
                    <div className="text-white/90 font-mono text-xl sm:text-2xl font-medium tracking-tight">
                      <AnimatedCounter value="99.9%" />
                    </div>
                  </div>
                </div>

                {/* Body Text */}
                <p className="text-white/50 text-base leading-relaxed mb-10">
                  {project.longDescription}
                </p>

                {/* Problem & Solution Blocks */}
                <div className="space-y-4 mb-10">
                  <div className="p-5 rounded-2xl bg-[#ff00aa]/[0.02] border border-[#ff00aa]/10 hover:border-[#ff00aa]/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-[#ff00aa]" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest">Problem</h3>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#00f0ff]/[0.02] border border-[#00f0ff]/10 hover:border-[#00f0ff]/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00f0ff]" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest">Solution</h3>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5 pb-10">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 group"
                      style={{ background: "linear-gradient(135deg, #00f0ff, #ff00aa)", color: "#000", boxShadow: "0 0 30px rgba(0, 240, 255, 0.2)" }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Access Live Product
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
                  >
                    <Code2 className="w-4 h-4" />
                    Source
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
