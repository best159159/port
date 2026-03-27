"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

interface Line {
  id: string;
  type: "input" | "output" | "error" | "system" | "boot";
  content: string | string[];
}

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "",
    "  AVAILABLE COMMANDS",
    "",
    "  whoami        →  Who is Best?",
    "  about         →  Full background",
    "  skills        →  Tech stack & tools",
    "  projects      →  Things I've built",
    "  goals         →  Where I'm going",
    "  contact       →  Get in touch",
    "  stats         →  System status",
    "  clear         →  Clear terminal",
    "",
    "  Tab autocomplete  ·  ↑↓ history",
    "",
  ],
  whoami: () => [
    "",
    "  ██████╗ ███████╗███████╗████████╗",
    "  ██╔══██╗██╔════╝██╔════╝╚══██╔══╝",
    "  ██████╔╝█████╗  ███████╗   ██║",
    "  ██╔══██╗██╔══╝  ╚════██║   ██║",
    "  ██████╔╝███████╗███████║   ██║",
    "  ╚═════╝ ╚══════╝╚══════╝   ╚═╝",
    "",
    "  name      Best (Michael)",
    "  role      Builder & Founder",
    "  location  Thailand",
    "  mode      Building while others sleep",
    "",
  ],
  about: () => [
    "",
    "  Decided early that the traditional path wasn't enough.",
    "  Self-taught: HTML → JS → React → AI.",
    "  Ships real products, not side projects.",
    "  Obsessed with AI, automation, financial freedom.",
    "  Goal: 1,000,000 THB before university ends.",
    "  Every project is a bet on my own future.",
    "",
    "  While most people write essays,",
    "  I write code.",
    "",
  ],
  skills: () => [
    "",
    "  WEB DEVELOPMENT",
    "  HTML · CSS · JavaScript · TypeScript",
    "  Next.js · React · Tailwind · Framer Motion",
    "",
    "  AI & AUTOMATION",
    "  OpenAI API · Prompt Engineering · AI Workflows",
    "",
    "  FINANCE",
    "  Stock Market · Crypto · Technical Analysis · DeFi",
    "",
    "  TOOLS",
    "  Vercel · Git · GitHub · Figma · VS Code",
    "",
  ],
  projects: () => [
    "",
    "  01  Sentinel AI",
    "      AI-powered community safety platform",
    "      sentinel-ai-orcin.vercel.app",
    "",
    "  02  GreenLens AI",
    "      Environmental analysis with AI · Thailand",
    "      greenlens-pi.vercel.app",
    "",
    "  03  Amantha Hotel",
    "      Luxury hotel website · vanilla JS",
    "      hotel-seven-beta.vercel.app",
    "",
    "  04  Lumina Restaurant",
    "      Michelin-star fine dining experience",
    "      restuarant-azure.vercel.app",
    "",
  ],
  goals: () => [
    "",
    "  SHORT TERM",
    "  ✓  Ship 5+ real products",
    "  ○  Land first paying freelance client",
    "  ○  1,000,000 THB before university ends",
    "",
    "  LONG TERM",
    "  ○  Build a funded startup",
    "  ○  Passive income > active income",
    "  ○  Full financial independence",
    "",
    "  The clock is running.",
    "",
  ],
  contact: () => [
    "",
    "  email     best17794@gmail.com",
    "  github    github.com/best159159",
    "  vercel    vercel.com/best159159s-projects",
    "",
    "  Open to: Freelance · Collabs · Interesting ideas",
    "",
  ],
  stats: () => [
    "",
    "  STATUS: ONLINE",
    "",
    "  uptime      99.99%",
    "  projects    4 shipped",
    "  stack       Next.js 16 + AI",
    "  mode        always building",
    "",
    "  All systems operational.",
    "",
  ],
};

const BOOT_SEQUENCE: Array<{ text: string; type: Line["type"]; delay: number }> = [
  { text: "> initializing system...", type: "boot", delay: 200 },
  { text: "> loading modules...",     type: "boot", delay: 420 },
  { text: "> establishing connection...", type: "boot", delay: 420 },
  { text: "> ready.",                 type: "boot", delay: 600 },
  { text: "",                         type: "system", delay: 280 },
  { text: "  type \"help\" to list commands.", type: "system", delay: 80 },
  { text: "",                         type: "system", delay: 0 },
];

const QUICK_CMDS = ["whoami", "projects", "skills", "goals", "contact"];

function getOutputColor(text: string): string {
  const t = text.trim();
  if (!t) return "transparent";
  if (t === t.toUpperCase() && /^[A-Z0-9\s&:\-\.]+$/.test(t) && t.length > 1)
    return "rgba(0, 240, 255, 0.65)";
  if (t.startsWith("✓")) return "#4ade80";
  if (/\.(app|com|dev|io|net)/.test(t) && !t.includes("→") && !t.includes("  "))
    return "rgba(255,255,255,0.28)";
  return "rgba(255,255,255,0.68)";
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [focused, setFocused] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);
  const [bootDone, setBootDone] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => { scrollToBottom(); }, [lines, scrollToBottom]);

  // Boot sequence
  useEffect(() => {
    let cancelled = false;
    async function run() {
      for (const { text, type, delay } of BOOT_SEQUENCE) {
        await new Promise<void>(r => setTimeout(r, delay));
        if (cancelled) return;
        setLines(prev => [
          ...prev,
          { id: `boot-${Date.now()}-${Math.random()}`, type, content: text },
        ]);
      }
      if (!cancelled) setBootDone(true);
    }
    run();
    return () => { cancelled = true; };
  }, []);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    setLines(prev => [
      ...prev,
      { id: `in-${Date.now()}`, type: "input", content: cmd },
    ]);

    if (!trimmed) return;

    setCmdHistory(prev => [cmd, ...prev.filter(c => c !== cmd)]);
    setHistoryIdx(-1);

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    const handler = COMMANDS[trimmed];
    if (handler) {
      setLines(prev => [
        ...prev,
        { id: `out-${Date.now()}`, type: "output", content: handler() },
      ]);
    } else {
      setLines(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          type: "error",
          content: `  command not found: "${trimmed}"  —  type "help" for commands`,
        },
      ]);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(i);
      setInput(cmdHistory[i] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = Math.max(historyIdx - 1, -1);
      setHistoryIdx(i);
      setInput(i === -1 ? "" : cmdHistory[i]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  const renderLine = (line: Line) => {
    const rows = Array.isArray(line.content) ? line.content : [line.content];

    if (line.type === "input") {
      const cmd = rows[0] ?? "";
      return (
        <motion.div
          key={line.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.12 }}
          className="flex gap-2 leading-relaxed"
        >
          <span className="term-prompt flex-shrink-0">best@portfolio:~$</span>
          <span className="term-cmd">{cmd}</span>
        </motion.div>
      );
    }

    if (line.type === "boot") {
      return (
        <motion.div
          key={line.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="leading-relaxed"
        >
          {rows.map((text, i) => (
            <div key={i} className="term-boot">{text}</div>
          ))}
        </motion.div>
      );
    }

    if (line.type === "system") {
      return (
        <motion.div
          key={line.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="leading-relaxed"
        >
          {rows.map((text, i) => (
            <div key={i} className="term-system">{text || "\u00A0"}</div>
          ))}
        </motion.div>
      );
    }

    if (line.type === "error") {
      return (
        <motion.div
          key={line.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.12 }}
          className="leading-relaxed"
        >
          {rows.map((text, i) => (
            <div key={i} className="term-error">{text || "\u00A0"}</div>
          ))}
        </motion.div>
      );
    }

    // output
    return (
      <motion.div
        key={line.id}
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="leading-relaxed"
      >
        {rows.map((text, i) => (
          <div key={i} style={{ color: getOutputColor(text) }}>
            {text || "\u00A0"}
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-block text-xs uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              color: "rgba(0, 240, 255, 0.6)",
              background: "rgba(0, 240, 255, 0.05)",
              border: "1px solid rgba(0, 240, 255, 0.1)",
            }}
          >
            Interactive
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            Open the{" "}
            <span style={{
              background: "linear-gradient(90deg, #00f0ff, #ff00aa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              terminal
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.8rem", letterSpacing: "0.04em" }}>
            type{" "}
            <span style={{ color: "#22d3ee", fontFamily: mono.style.fontFamily }}>help</span>
            {" "}to get started · Tab autocomplete · ↑↓ history
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`relative flex flex-col rounded-xl overflow-hidden ${mono.className}`}
          style={{
            height: "480px",
            background: "rgba(10, 11, 16, 0.98)",
            border: focused
              ? "1px solid rgba(0, 240, 255, 0.2)"
              : "1px solid rgba(255, 255, 255, 0.07)",
            boxShadow: focused
              ? "0 0 0 1px rgba(0,240,255,0.05), 0 32px 80px rgba(0,0,0,0.85), inset 0 0 80px rgba(0,240,255,0.015)"
              : "0 32px 80px rgba(0,0,0,0.75), inset 0 0 80px rgba(0,0,0,0.25)",
            transition: "border-color 0.35s ease, box-shadow 0.35s ease",
            cursor: "text",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
            }}
          />

          {/* Inner edge shadow */}
          <div
            className="absolute inset-0 pointer-events-none z-10 rounded-xl"
            style={{
              boxShadow: "inset 0 0 90px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.4)",
            }}
          />

          {/* Title bar */}
          <div
            className="flex items-center justify-between px-4 py-2.5 flex-shrink-0 relative z-20"
            style={{
              background: "rgba(255,255,255,0.018)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Left: traffic lights + quick commands */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5 flex-shrink-0">
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              </div>
              <div className="flex gap-1 ml-1">
                {QUICK_CMDS.map(cmd => (
                  <button
                    key={cmd}
                    onClick={e => { e.stopPropagation(); runCommand(cmd); inputRef.current?.focus(); }}
                    className="term-tab"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>

            {/* Center: title */}
            <span
              className="absolute left-1/2 -translate-x-1/2 text-xs select-none"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              best@portfolio — zsh
            </span>

            {/* Right: connection status */}
            <span className="flex items-center gap-1.5 text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: bootDone ? "#28c840" : "#febc2e",
                  boxShadow: bootDone ? "0 0 5px #28c840" : "0 0 5px #febc2e",
                }}
              />
              {bootDone ? "connected" : "loading"}
            </span>
          </div>

          {/* Output body */}
          <div
            ref={bodyRef}
            className="flex-1 overflow-y-auto px-5 py-4 space-y-0.5 relative z-20 text-sm"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0,240,255,0.08) transparent",
            }}
          >
            {lines.map(line => renderLine(line))}
          </div>

          {/* Input row */}
          <div
            className="flex items-center gap-3 px-5 py-3.5 flex-shrink-0 relative z-20"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(0,0,0,0.22)",
            }}
          >
            <span className="term-prompt flex-shrink-0 select-none text-sm">
              best@portfolio:~$
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "#f1f5f9", caretColor: "transparent" }}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
            {/* Block cursor */}
            <span
              style={{
                display: "inline-block",
                width: "7px",
                height: "15px",
                background: "#22d3ee",
                flexShrink: 0,
                opacity: cursorOn ? 0.9 : 0,
                transition: "opacity 0.06s",
                boxShadow: cursorOn ? "0 0 8px rgba(34,211,238,0.6)" : "none",
              }}
            />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .term-prompt { color: #22d3ee; }
        .term-cmd    { color: #f1f5f9; }
        .term-boot   { color: rgba(255,255,255,0.28); }
        .term-system { color: rgba(255,255,255,0.25); }
        .term-error  { color: #f87171; }

        .term-tab {
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 4px;
          color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          transition: color 0.15s, border-color 0.15s, background 0.15s;
          cursor: pointer;
        }
        .term-tab:hover {
          color: #22d3ee;
          border-color: rgba(34,211,238,0.25);
          background: rgba(34,211,238,0.05);
        }
      `}</style>
    </section>
  );
}
