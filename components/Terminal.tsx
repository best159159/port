"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Line {
  id: string;
  type: "input" | "output" | "error" | "system" | "success";
  content: string | string[];
}

const COMMANDS: Record<string, () => string | string[]> = {
  help: () => [
    "┌─────────────────────────────────────────┐",
    "│           Available Commands            │",
    "├─────────────────────────────────────────┤",
    "│  whoami      → who is Best?             │",
    "│  about       → full background          │",
    "│  skills      → tech stack & tools       │",
    "│  projects    → what I've shipped        │",
    "│  goals       → where I'm going          │",
    "│  contact     → get in touch             │",
    "│  clear       → clear terminal           │",
    "│  help        → show this menu           │",
    "└─────────────────────────────────────────┘",
    "",
    "  Tip: use Tab to autocomplete commands",
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
    "  Name    →  Best (Michael)",
    "  Role    →  Builder & Founder",
    "  Status  →  High School Student, Thailand",
    "  Mode    →  Building while others sleep",
    "",
  ],
  about: () => [
    "",
    "  > Decided early that the traditional path wasn't enough.",
    "  > Self-taught developer — HTML → JS → React → AI.",
    "  > Ships real products, not just side projects.",
    "  > Obsessed with AI, automation, and financial freedom.",
    "  > Goal: 1,000,000 THB before university is done.",
    "  > Every project is a bet on my own future.",
    "",
    "  While most people are writing essays,",
    "  I'm writing code.",
    "",
  ],
  skills: () => [
    "",
    "  ── Web Development ──────────────────────",
    "  HTML · CSS · JavaScript · Next.js · React",
    "  Tailwind CSS · Framer Motion",
    "",
    "  ── AI & Automation ──────────────────────",
    "  OpenAI API · Prompt Engineering",
    "  AI Workflows · Automation Tools",
    "",
    "  ── Finance & Investing ──────────────────",
    "  Stock Market · Crypto / Web3",
    "  Technical Analysis · DeFi",
    "",
    "  ── Tools ────────────────────────────────",
    "  Vercel · Git · GitHub · Figma · VS Code",
    "",
  ],
  projects: () => [
    "",
    "  01  Sentinel AI",
    "      → AI-powered community safety platform",
    "      → sentinel-ai-orcin.vercel.app",
    "",
    "  02  GreenLens AI",
    "      → Environmental analysis with AI for Thailand",
    "      → greenlens-pi.vercel.app",
    "",
    "  03  Amantha Hotel",
    "      → Luxury hotel website, pure vanilla JS",
    "      → hotel-seven-beta.vercel.app",
    "",
    "  04  Lumina Restaurant",
    "      → Michelin-star fine dining web experience",
    "      → restuarant-azure.vercel.app",
    "",
    "  → scroll up to see project cards",
    "",
  ],
  goals: () => [
    "",
    "  ┌── Short Term ───────────────────────┐",
    "  │  ✓ Ship 5+ real products            │",
    "  │  ○ Land first paying freelance client│",
    "  │  ○ 1M THB before university ends    │",
    "  └─────────────────────────────────────┘",
    "",
    "  ┌── Long Term ────────────────────────┐",
    "  │  ○ Build a funded startup           │",
    "  │  ○ Passive income > active income   │",
    "  │  ○ Full financial independence      │",
    "  └─────────────────────────────────────┘",
    "",
    "  The clock is running.",
    "",
  ],
  contact: () => [
    "",
    "  Email   →  best17794@gmail.com",
    "  GitHub  →  github.com/best159159",
    "  Vercel  →  vercel.com/best159159s-projects",
    "",
    "  Open to: Freelance · Collabs · Interesting ideas",
    "",
  ],
  stats: () => [
    "",
    "  System Status: ONLINE",
    "  Uptime: 99.99%",
    "  Revenue: $12,450 MRR",
    "  Active Users: 10,234",
    "  Bugs tracked: 12",
    "  Lines of code: > 250,000",
    "",
    "  [All systems fully operational]",
  ]
};

const BOOT_LINES = [
  "Initializing best.dev v3.0.0...",
  "Loading neural link protocols....... OK",
  "Mounting project database........... OK",
  "Establishing secure connection...... OK",
  "Verifying identity.................. OK",
  "Starting interactive session........ OK",
  "",
  'Type "help" or click a command below.',
  "",
];

function TypewriterLine({ text, speed = 15, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <span>{displayed}</span>;
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [bootSequenceComplete, setBootSequenceComplete] = useState(false);
  const [focused, setFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("terminal");
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic: only scrolls the internal container
  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  // Initial Boot Sequence
  useEffect(() => {
    let isMounted = true;
    const runBoot = async () => {
      for (let i = 0; i < BOOT_LINES.length; i++) {
        if (!isMounted) return;
        setLines(prev => [...prev, { id: `boot-${i}`, type: "system", content: BOOT_LINES[i] }]);
        await new Promise(resolve => setTimeout(resolve, i < 3 ? 150 : 50));
      }
      if (isMounted) setBootSequenceComplete(true);
    };
    runBoot();
    return () => { isMounted = false; };
  }, []);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const cmdId = `cmd-${Date.now()}`;
    setLines((prev) => [...prev, { id: cmdId, type: "input", content: `best@portfolio:~$ ${cmd}` }]);

    if (!trimmed) return;

    setHistory((prev) => [cmd, ...prev.filter((c) => c !== cmd)]);
    setHistoryIndex(-1);

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    const outId = `out-${Date.now()}`;
    if (COMMANDS[trimmed]) {
      const output = COMMANDS[trimmed]();
      setLines((prev) => [...prev, { id: outId, type: "output", content: output }]);
    } else {
      setLines((prev) => [
        ...prev,
        {
          id: outId,
          type: "error",
          content: `  Command not found: "${trimmed}". Type "help" for available commands.`,
        },
      ]);
    }
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if(tabId !== "terminal") {
       runCommand("clear");
       runCommand(tabId);
    } else {
       runCommand("clear");
       runCommand("help");
    }
  };

  const handleQuickCommandClick = (cmd: string) => {
    runCommand(cmd);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? "" : history[newIndex]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  const renderLine = (line: Line) => {
    const content = Array.isArray(line.content) ? line.content : [line.content];
    const colorMap = {
      input: "#00f0ff",
      output: "rgba(255,255,255,0.85)",
      error: "#ef4444",
      success: "#10b981",
      system: "rgba(255,255,255,0.4)",
    };

    return (
      <motion.div 
        key={line.id}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group hover:bg-white/5 transition-colors duration-200 rounded px-2 -mx-2"
      >
        {content.map((text, j) => (
          <div
            key={j}
            className="font-mono text-xs sm:text-sm leading-loose whitespace-pre-wrap break-words"
            style={{ color: colorMap[line.type] }}
          >
             {line.type === "input" && j === 0 ? (
                <TypewriterLine text={text} speed={15} onComplete={scrollToBottom} />
             ) : (
                text
             )}
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
          <p className="text-white/30 text-sm">
            Type <kbd className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#00f0ff" }}>help</kbd> to get started · <kbd className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>Tab</kbd> to autocomplete · <kbd className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>↑↓</kbd> for history
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl overflow-hidden relative flex flex-col h-[500px]"
          style={{
            background: "linear-gradient(135deg, rgba(10,12,16,0.95) 0%, rgba(5,6,8,0.98) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: focused ? "1px solid rgba(0,240,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
            boxShadow: focused
              ? "inset 0 0 20px rgba(0,240,255,0.05), 0 0 60px rgba(0,240,255,0.08), 0 40px 80px rgba(0,0,0,0.6)"
              : "inset 0 0 20px rgba(255,255,255,0.02), 0 40px 80px rgba(0,0,0,0.5)",
            transition: "border-color 0.4s, box-shadow 0.4s",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Subtle noise/scanline overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.25) 50%)",
              backgroundSize: "100% 4px",
              zIndex: 0
            }}
          />

          {/* Title bar & Tabs */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 relative z-10 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex gap-2">
                {["terminal", "projects", "stats", "skills"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className="text-xs font-mono px-2 py-1 rounded transition-colors uppercase tracking-wider"
                    style={{
                      color: activeTab === tab ? "#00f0ff" : "rgba(255,255,255,0.3)",
                      background: activeTab === tab ? "rgba(0, 240, 255, 0.1)" : "transparent",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded hidden sm:inline-block"
              style={{
                color: focused ? "#00f0ff" : "rgba(255,255,255,0.2)",
                background: focused ? "rgba(0,240,255,0.08)" : "transparent",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {focused ? "SYS.ACTIVE" : "CLICK TO TYPE"}
            </span>
          </div>

          {/* Quick command bar */}
          <div className="flex gap-2 px-4 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide relative z-10 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
            <span className="text-[10px] text-white/30 uppercase tracking-widest flex items-center mr-2">Quick Execute:</span>
            {["whoami", "projects", "stats", "clear"].map(cmd => (
               <button 
                  key={cmd} 
                  onClick={() => handleQuickCommandClick(cmd)}
                  className="text-xs font-mono px-2 py-0.5 rounded border border-white/10 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/5 transition-colors text-white/50"
                  style={{ background: "rgba(255,255,255,0.02)" }}
               >
                 &gt; {cmd}
               </button>
            ))}
          </div>

          {/* Output area (Scrollable) */}
          <div
            ref={terminalBodyRef}
            className="px-5 py-4 flex-1 overflow-y-auto space-y-1 relative z-10"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,240,255,0.15) transparent", scrollBehavior: "smooth" }}
          >
            <AnimatePresence>
              {lines.map((line) => renderLine(line))}
            </AnimatePresence>
          </div>

          {/* Input line (Fixed Bottom) */}
          <div
            className="flex items-center gap-2 px-5 py-4 relative z-10 flex-shrink-0"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)" }}
          >
            <span className="font-mono text-xs sm:text-sm text-[#00f0ff] flex-shrink-0">
              best@portfolio:~$
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="flex-1 bg-transparent outline-none font-mono text-xs sm:text-sm text-white caret-[#00f0ff]"
              placeholder="type a command..."
              spellCheck={false}
              autoComplete="off"
              style={{ color: "rgba(255,255,255,0.85)" }}
            />
            <span
              className="w-2 h-4 flex-shrink-0"
              style={{
                background: "#00f0ff",
                opacity: focused ? 1 : 0,
                animation: focused ? "blink 1s step-end infinite" : "none",
              }}
            />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
