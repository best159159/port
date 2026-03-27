"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const springProgress = useSpring(progress, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-white/5">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: springProgress,
          background: "linear-gradient(90deg, #00f0ff, #ff00aa)",
          boxShadow: "0 0 8px rgba(0, 240, 255, 0.6)",
        }}
      />
    </div>
  );
}
