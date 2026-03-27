"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, Zap } from "lucide-react";

const DEMO_STEPS = [
  { input: "Analyze market data for Q3", output: "Processing 2.4TB of data... Identifying 3 key trends in SaaS sector. Confidence: 94%." },
  { input: "Generate optimization script", output: "Writing script... 45 lines generated. Estimated performance gain: +42%." },
  { input: "Deploy to edge network", output: "Pushing to 45 edge nodes globally... Deployment successful. Global latency < 12ms." }
];

export default function AIDemoWidget() {
  const [activeStep, setActiveStep] = useState(0);
  const [typingOutput, setTypingOutput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let index = 0;
    setIsTyping(true);
    setTypingOutput("");
    
    const outputText = DEMO_STEPS[activeStep].output;
    
    const interval = setInterval(() => {
      setTypingOutput(outputText.substring(0, index));
      index++;
      if (index > outputText.length) {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(() => {
          setActiveStep((prev) => (prev + 1) % DEMO_STEPS.length);
        }, 3000);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [activeStep]);

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "rgba(10, 10, 15, 0.9)",
          border: "1px solid rgba(0, 240, 255, 0.2)",
          boxShadow: "0 0 50px rgba(0, 240, 255, 0.1)"
        }}
      >
        <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-white/10">
          <Cpu className="w-4 h-4 text-[#00f0ff]" />
          <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest">Live AI Execution</span>
        </div>
        
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-white/50 text-xs font-mono uppercase">
              <Terminal className="w-3 h-3" /> User Input
            </div>
            <div className="space-y-3">
              {DEMO_STEPS.map((step, idx) => (
                <div 
                  key={idx}
                  className="px-4 py-3 rounded-lg text-sm font-mono border transition-all duration-300"
                  style={{
                    background: activeStep === idx ? "rgba(0, 240, 255, 0.1)" : "rgba(255,255,255,0.02)",
                    borderColor: activeStep === idx ? "rgba(0, 240, 255, 0.5)" : "rgba(255,255,255,0.05)",
                    color: activeStep === idx ? "#fff" : "rgba(255,255,255,0.4)",
                    opacity: activeStep === idx ? 1 : 0.5
                  }}
                >
                  &gt; {step.input}
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative border-l border-white/10 pl-8">
            <div className="flex items-center gap-2 mb-4 text-[#ff00aa] text-xs font-mono uppercase">
              <Zap className="w-3 h-3" /> System Output
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-sm font-mono leading-relaxed"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {typingOutput}
                {isTyping && (
                  <span className="inline-block w-2 h-4 ml-1 bg-[#00f0ff] animate-pulse" />
                )}
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-0 left-8 right-0 h-px" style={{ background: "linear-gradient(90deg, #00f0ff, transparent)" }} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
