"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { Project } from "@/data/projects";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(91, 33, 182, 0.08) 0%, transparent 70%)",
      }}
    >
      {/* Section heading */}
      <motion.div
        className="text-center mb-16 sm:mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div
          className="inline-block text-xs uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
          style={{
            color: "rgba(0, 240, 255, 0.7)",
            background: "rgba(0, 240, 255, 0.05)",
            border: "1px solid rgba(0, 240, 255, 0.1)",
          }}
        >
          Selected Work
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          Projects that{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #00f0ff, #ff00aa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ship
          </span>
        </h2>
        <p className="text-white/30 max-w-xl mx-auto text-base">
          From AI platforms to polished web experiences — each project is built
          with purpose, precision, and a relentless eye for detail.
        </p>

        {/* Animated underline */}
        <motion.div
          className="mx-auto mt-6 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #00f0ff, #ff00aa, transparent)" }}
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: 200, opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Featured project - full width */}
          <motion.div variants={cardVariants} className="mb-6">
            <ProjectCard
              project={featuredProject}
              index={0}
              isFeatured={true}
              onClick={() => setSelectedProject(featuredProject)}
            />
          </motion.div>

          {/* Grid for remaining 3 projects */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, idx) => (
              <motion.div key={project.id} variants={cardVariants} className="flex">
                <ProjectCard
                  project={project}
                  index={idx + 1}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
