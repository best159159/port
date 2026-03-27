"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl"
        >
          <div
            className="flex items-center justify-between px-6 py-3 rounded-2xl"
            style={{
              background: scrolled
                ? "rgba(0, 0, 0, 0.7)"
                : "rgba(13, 0, 21, 0.6)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: scrolled
                ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 240, 255, 0.05)"
                : "0 4px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Logo */}
            <a
              href="#"
              className="group flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{
                  background: "linear-gradient(135deg, #00f0ff, #ff00aa)",
                  boxShadow: "0 0 12px rgba(0, 240, 255, 0.4)",
                }}
              >
                BM
              </div>
              <span className="text-white/90 font-semibold text-sm hidden sm:block group-hover:text-white transition-colors">
                Best
              </span>
            </a>

            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-lg group"
                >
                  {link.label}
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px group-hover:w-4 transition-all duration-300"
                    style={{ background: "#00f0ff" }}
                  />
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="ml-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(255,0,170,0.15))",
                  border: "1px solid rgba(0, 240, 255, 0.3)",
                  color: "#00f0ff",
                  boxShadow: "0 0 12px rgba(0, 240, 255, 0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 20px rgba(0, 240, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 12px rgba(0, 240, 255, 0.1)";
                }}
              >
                Hire Me
              </a>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
