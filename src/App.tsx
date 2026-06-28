import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playCyberSound } from "./utils/audio";
import BootSequence from "./components/BootSequence";
import SystemHeader from "./components/SystemHeader";
import UserProfile from "./components/UserProfile";
import HobbiesAndDreams from "./components/HobbiesAndDreams";
import SkillMatrix from "./components/SkillMatrix";
import ProjectArchive from "./components/ProjectArchive";
import CommSignal from "./components/CommSignal";
import SystemFooter from "./components/SystemFooter";
import { Terminal, Shield, Sparkles, ChevronDown, Monitor, Cpu, Radio, Zap } from "lucide-react";

export default function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [crtEffect, setCrtEffect] = useState(true);
  const [stylePreset, setStylePreset] = useState<"standard" | "ultra">("standard");

  const handleBootComplete = () => {
    setIsBooted(true);
    playCyberSound("success");
  };

  const handleScrollToTerminal = () => {
    playCyberSound("click");
    const target = document.getElementById("services");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen bg-cyber-black text-slate-100 font-sans relative ${crtEffect ? "crt" : ""}`}>
      {/* 1. INITIAL BOOT SEQUENCE SCREEN */}
      <AnimatePresence>
        {!isBooted && (
          <BootSequence onBootComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      {/* Main OS desktop interface */}
      {isBooted && (
        <div className="flex flex-col min-h-screen relative overflow-hidden">
          {/* Static Scanline grids simulating hacker screen */}
          <div className="fixed inset-0 scanlines pointer-events-none opacity-20"></div>

          {/* Floating Neon Background Orbs */}
          <div className="absolute top-24 left-1/4 w-80 h-80 bg-neon-purple/5 rounded-full filter blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-neon-magenta/5 rounded-full filter blur-[150px] pointer-events-none font-sans"></div>
          <div className="absolute bottom-24 left-1/3 w-72 h-72 bg-neon-cyan/5 rounded-full filter blur-[100px] pointer-events-none"></div>

          {/* 2. OPERATING SYSTEM HEADER TASKBAR */}
          <SystemHeader />

          {/* Main Workspace Frame */}
          <main className="flex-1 w-full mx-auto relative z-10">

            {/* SECTION 1: BOOT_SEQUENCE://HERO_NODE */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 md:px-8 border-b border-neon-cyan/15 overflow-hidden">
              {/* Abstract digital terminal grid backline */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

              {/* Bumblebee Honeycomb Floating Grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(254,254,0,0.015)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none"></div>

              <div className="max-w-4xl relative z-10 flex flex-col items-center gap-6">
                
                {/* Visual Glitch Tag */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  onMouseEnter={() => playCyberSound("hover")}
                  className="px-3.5 py-1.5 border border-neon-magenta/35 bg-neon-magenta/5 text-neon-magenta rounded font-terminal text-[11px] tracking-widest uppercase flex items-center gap-2 select-none"
                >
                  <Zap className="w-3.5 h-3.5 text-neon-yellow animate-bounce" />
                  <span>SYSTEM_ONLINE_NODE // TASHIBEET_NET</span>
                </motion.div>

                {/* Hero Title with Glitch animation */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-terminal font-extrabold uppercase tracking-tighter text-white">
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="block leading-none"
                  >
                    Hack The
                  </motion.span>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-magenta to-neon-yellow leading-none animate-glitch py-1 font-retro neon-glow-magenta"
                  >
                    System.
                  </motion.span>
                </h1>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-base sm:text-lg md:text-xl text-zinc-300 font-sans max-w-2xl leading-relaxed mt-2"
                >
                  Computer Science, AI, gaming, freelancing, and global adventures for the next generation of Goth Techies.
                </motion.p>

                {/* Main Action Trigger */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="flex flex-col sm:flex-row gap-4 mt-6 items-center"
                >
                  <button
                    onClick={handleScrollToTerminal}
                    onMouseEnter={() => playCyberSound("hover")}
                    className="px-10 py-5 bg-gradient-to-r from-neon-purple to-neon-magenta hover:brightness-110 text-white font-terminal tracking-widest uppercase rounded cursor-pointer shadow-[0_0_15px_rgba(255,0,127,0.3)] transition-all font-bold text-sm sm:text-base flex items-center gap-3 select-none"
                  >
                    <span>🖤 ACCESS TERMINAL</span>
                  </button>

                  <button
                    onClick={() => {
                      playCyberSound("click");
                      setCrtEffect((prev) => !prev);
                    }}
                    onMouseEnter={() => playCyberSound("hover")}
                    className="px-6 py-4.5 border border-neon-cyan/25 hover:border-neon-cyan bg-cyber-dark/60 text-neon-cyan hover:bg-neon-cyan/10 font-terminal tracking-widest uppercase rounded cursor-pointer transition-all text-xs flex items-center gap-2 select-none"
                  >
                    <Monitor className="w-4 h-4 text-neon-cyan" />
                    <span>TOGGLE CRT FILTER</span>
                  </button>
                </motion.div>
              </div>

              {/* Scroll chevron helper indicators */}
              <div className="absolute bottom-6 flex flex-col items-center gap-1.5 text-zinc-500 font-terminal text-[10px] tracking-wider uppercase select-none cursor-pointer" onClick={handleScrollToTerminal}>
                <span>SCROLL_TO_GRID</span>
                <ChevronDown className="w-4 h-4 animate-bounce text-neon-cyan" />
              </div>
            </section>

            {/* SECTION 2: USER_PROFILE://ABOUT_CORE */}
            <UserProfile />

            {/* SECTION 2.5: INTERACTIVE_HOBBIES_AND_DREAMS_DOCK */}
            <HobbiesAndDreams />

            {/* SECTION 3: SKILL_MATRIX://SERVICES_NODE */}
            <SkillMatrix />

            {/* SECTION 4: PROJECT_ARCHIVE://PORTFOLIO_LOGS */}
            <ProjectArchive />

            {/* SECTION 5: COMM_SIGNAL://CONTACT_INTERFACE */}
            <CommSignal />

          </main>

          {/* 6. SYSTEM_FOOTER://END_PROTOCOL */}
          <SystemFooter />
        </div>
      )}
    </div>
  );
}
