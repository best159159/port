"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Globe, Code2, X, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const skills = [
  { category: "Web Dev", items: ["HTML / CSS / JS", "Next.js", "React", "Tailwind CSS"] },
  { category: "AI & Automation", items: ["OpenAI API", "Prompt Engineering", "AI Workflows", "Automation Tools"] },
  { category: "Finance", items: ["Stock Market", "Crypto / Web3", "Technical Analysis", "DeFi Basics"] },
  { category: "Tools", items: ["Vercel", "Git / GitHub", "Figma", "VS Code"] },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/best159159", icon: Code2 },
  { label: "Website", href: "#", icon: Globe },
  { label: "Twitter", href: "https://twitter.com", icon: X },
  { label: "Email", href: "mailto:best17794@gmail.com", icon: Mail },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
      setTimeout(() => setFormState("idle"), 3000);
    }, 1500);
  };

  return (
    <>
      {/* About Section */}
      <section
        id="about"
        ref={sectionRef}
        className="relative py-24 sm:py-32 px-4"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(0, 240, 255, 0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(255, 0, 170, 0.04) 0%, transparent 60%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Bio */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div
                className="inline-block text-xs uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
                style={{
                  color: "rgba(0, 240, 255, 0.7)",
                  background: "rgba(0, 240, 255, 0.05)",
                  border: "1px solid rgba(0, 240, 255, 0.1)",
                }}
              >
                About Me
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                I don&apos;t wait for{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #00f0ff, #ff00aa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  permission.
                </span>
                <br />
                I just{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #ff00aa, #00f0ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  build.
                </span>
              </h2>

              <div className="space-y-4 text-white/40 text-base leading-relaxed">
                <p>
                  I&apos;m Best — a high school student in Thailand who decided early that
                  the traditional path wasn&apos;t going to cut it. While most people my age
                  are thinking about grades, I&apos;m building real products, studying real markets,
                  and stacking skills that actually compound.
                </p>
                <p>
                  I taught myself web development, got obsessed with AI, and now I use both to
                  build things that look and feel premium. From cybersecurity platforms to SaaS
                  tools — every project is a bet on my own future.
                </p>
                <p>
                  My goal is simple: financial freedom before I&apos;m done with university.
                  Every line of code gets me closer.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.4)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 240, 255, 0.3)";
                      (e.currentTarget as HTMLElement).style.color = "#00f0ff";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px rgba(0, 240, 255, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right: Skills grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {skills.map((skillGroup, idx) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                  className="p-5 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <h4
                    className="text-xs uppercase tracking-widest mb-3 font-semibold"
                    style={{ color: "#00f0ff" }}
                  >
                    {skillGroup.category}
                  </h4>
                  <ul className="space-y-1.5">
                    {skillGroup.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-white/40 flex items-center gap-2"
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: "#00f0ff", opacity: 0.5 }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section
        id="contact"
        className="relative py-24 sm:py-32 px-4 overflow-hidden"
      >
        {/* Background glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(91, 33, 182, 0.2) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-block text-xs uppercase tracking-widest mb-6 px-4 py-1.5 rounded-full"
              style={{
                color: "rgba(255, 0, 170, 0.8)",
                background: "rgba(255, 0, 170, 0.05)",
                border: "1px solid rgba(255, 0, 170, 0.15)",
              }}
            >
              Let&apos;s Work Together
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Got a project?{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00f0ff, #ff00aa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Let&apos;s ship it.
              </span>
            </h2>

            <p className="text-white/30 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Need a website, a landing page, or an AI-powered tool built fast and built right?
              I&apos;m open to freelance work and interesting collabs.
            </p>

            <form onSubmit={handleFormSubmit} className="max-w-md mx-auto space-y-4 text-left">
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-[#050508] text-white px-5 py-4 rounded-xl outline-none transition-all duration-300 placeholder:text-white/20 font-mono text-sm"
                  style={{
                    border: focusedInput === "name" ? "1px solid #00f0ff" : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: focusedInput === "name" ? "0 0 20px rgba(0,240,255,0.2), inset 0 0 10px rgba(0,240,255,0.1)" : "none"
                  }}
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-[#050508] text-white px-5 py-4 rounded-xl outline-none transition-all duration-300 placeholder:text-white/20 font-mono text-sm"
                  style={{
                    border: focusedInput === "email" ? "1px solid #ff00aa" : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: focusedInput === "email" ? "0 0 20px rgba(255,0,170,0.2), inset 0 0 10px rgba(255,0,170,0.1)" : "none"
                  }}
                />
              </div>

              {/* Message Input */}
              <div className="relative">
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  onFocus={() => setFocusedInput("message")}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-[#050508] text-white px-5 py-4 rounded-xl outline-none transition-all duration-300 placeholder:text-white/20 font-mono text-sm resize-none"
                  style={{
                    border: focusedInput === "message" ? "1px solid #7c3aed" : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: focusedInput === "message" ? "0 0 20px rgba(124,58,237,0.2), inset 0 0 10px rgba(124,58,237,0.1)" : "none"
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formState !== "idle"}
                className="w-full group flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold tracking-wide transition-all duration-300 overflow-hidden relative"
                style={{
                  background: formState === "success" 
                    ? "rgba(16, 185, 129, 0.2)"
                    : "linear-gradient(135deg, #00f0ff, #ff00aa)",
                  color: formState === "success" ? "#10b981" : "#000",
                  boxShadow: formState === "success" 
                    ? "0 0 30px rgba(16, 185, 129, 0.3)"
                    : "0 0 30px rgba(0, 240, 255, 0.25)",
                  border: formState === "success" ? "1px solid #10b981" : "none"
                }}
              >
                {formState === "idle" && (
                  <>
                    <Mail className="w-5 h-5" />
                    INITIATE SEQUENCE
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
                {formState === "loading" && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    TRANSMITTING...
                  </>
                )}
                {formState === "success" && (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    TRANSMISSION SUCCESSFUL
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div
          className="mt-24 pt-8 text-center text-white/15 text-sm"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p>
            Built by{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #00f0ff, #ff00aa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Best (Michael)
            </span>{" "}
            · {new Date().getFullYear()} · No template. No excuses.
          </p>
        </div>
      </section>
    </>
  );
}
