"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Code2, ArrowUpRight, Users, TrendingUp, Activity } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  isFeatured?: boolean;
  onClick: () => void;
}

const getMetrics = (id: number) => [
  { icon: TrendingUp, label: "Revenue", value: id === 1 ? "$12.4K MRR" : id === 2 ? "$5.2K MRR" : "Pre-Launch" },
  { icon: Users, label: "Users", value: id === 1 ? "10.2K+" : id === 2 ? "1.5K+" : "Beta V2" },
  { icon: Activity, label: "Uptime", value: "99.9%" }
];

const gradientAccents: Record<number, string> = {
  1: "#7c3aed",
  2: "#059669",
  3: "#d97706",
  4: "#e11d48",
};

export default function ProjectCard({ project, index, isFeatured = false, onClick }: ProjectCardProps) {
  const numberLabel = String(index + 1).padStart(2, "0");
  const accent = gradientAccents[project.id] ?? "#00f0ff";
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
  const lightingX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const lightingY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(px);
    mouseY.set(py);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      ref={cardRef}
      className="group relative cursor-pointer h-full perspective-[1000px] w-full"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      animate={{ y: [0, -5, 0] }}
      whileHover={{ y: -12, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      transition={{ type: "spring", stiffness: 300, damping: 30, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
    >
      <div
        className="relative overflow-hidden rounded-2xl h-full transition-all duration-500 will-change-transform flex flex-col"
        style={{
          background: "rgba(10,12,16,0.5)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.05)",
          transformStyle: "preserve-3d",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${accent}bb`;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 30px 60px rgba(0,0,0,0.6), 0 0 50px ${accent}30, inset 0 0 20px ${accent}20`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
        }}
      >
        {/* Animated Gradient Border Layer (Behind) */}
        <div className="absolute inset-[-1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 bg-gradient-to-br from-transparent via-[#00f0ff]/20 to-[#ff00aa]/20 blur-sm" />
        {/* Dynamic Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(600px circle at calc(${lightingX}% ) calc(${lightingY}% ), ${accent}15, transparent 40%)`,
          }}
        />
        {/* Gradient preview area */}
        <div
          className={`relative shrink-0 flex items-center justify-center p-6 overflow-hidden ${isFeatured ? "h-64 sm:h-72" : "h-52"}`}
          style={{ background: project.gradient }}
        >
          {/* Animated noise/grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glowing orb in center */}
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"
              style={{
                width: isFeatured ? "200px" : "140px",
                height: isFeatured ? "200px" : "140px",
                background: accent,
              }}
            />
          </div>

          {/* Project number + title watermark */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end overflow-hidden">
            <span
              className="font-black leading-none select-none opacity-10 group-hover:opacity-30 transition-opacity duration-500 translate-y-4"
              style={{ fontSize: isFeatured ? "140px" : "100px", color: "#fff" }}
            >
              {numberLabel}
            </span>
          </div>

          {/* ✨ PRO 3D FLOATING IMAGE ✨ */}
          <motion.div 
            className="relative z-20 w-full h-[120%] shadow-2xl rounded-xl overflow-hidden border border-white/20 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            style={{
               transformStyle: "preserve-3d",
               transform: "translateZ(40px) rotateX(5deg) rotateY(-5deg)",
               boxShadow: `0 30px 60px -10px rgba(0,0,0,0.8), 0 0 30px ${accent}40`
            }}
          >
            {/* Fake Device Header */}
            <div className="h-4 sm:h-5 bg-[#1a1b26] flex items-center px-2 gap-1 sm:gap-1.5 border-b border-white/10">
               <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-red-500" />
               <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-yellow-500" />
               <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500" />
            </div>
            
            <div 
               className="w-full h-full bg-black"
               style={{ 
                  backgroundImage: `url(${project.screenshot})`, 
                  backgroundSize: "cover", 
                  backgroundPosition: "top center" 
               }}
            />
            {/* Inner glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none" />
          </motion.div>

          {/* Hover overlay button */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center bg-black/20 backdrop-blur-[2px] z-30 pointer-events-none">
            <div
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold pointer-events-auto shadow-2xl transition-transform duration-300 hover:scale-105"
              style={{
                background: "rgba(0,0,0,0.6)",
                border: `1px solid ${accent}aa`,
                color: "#fff",
                boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 40px ${accent}60`,
                transform: "translateZ(50px)"
              }}
            >
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
              View Details
            </div>
          </div>

          {/* Bottom neon line on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 z-20 bg-black/40">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base font-bold text-white group-hover:text-[#00f0ff] transition-colors duration-300 leading-tight">
              {project.title}
            </h3>
            <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-[#00f0ff] transition-colors mt-0.5 flex-shrink-0 ml-2" />
          </div>

          <p className="text-white/35 text-xs leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5 translate-z-[10px]">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-[10px] rounded-md font-bold tracking-widest uppercase shadow-sm"
                style={{
                  background: `${accent}15`,
                  border: `1px solid ${accent}40`,
                  color: `${accent}ff`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Metrics (Universal) */}
          <div className="grid grid-cols-3 gap-2 mb-4 pt-4 mt-auto border-t border-white/5 translate-z-[15px]">
            {getMetrics(project.id).map((metric, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-white/40 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">
                  <metric.icon className="w-3 h-3" style={{ color: accent }} />
                  {metric.label}
                </div>
                <div className="text-white/90 font-mono text-xs font-semibold">{metric.value}</div>
              </div>
            ))}
          </div>

          {/* Links */}
          <div
            className="flex items-center gap-3 pt-3 translate-z-[20px]"
            style={{ borderTop: isFeatured ? "none" : "1px solid rgba(255,255,255,0.05)" }}
          >
            {project.liveUrl && (
              <>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-xs font-medium transition-all text-white/35 hover:text-[#00f0ff]"
                >
                  <ExternalLink className="w-3 h-3" />
                  Live Site
                </a>
                <span className="w-px h-3 bg-white/10" />
              </>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-medium transition-all text-white/35 hover:text-white"
            >
              <Code2 className="w-3 h-3" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
