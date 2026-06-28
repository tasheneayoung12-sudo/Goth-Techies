import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playCyberSound } from "../utils/audio";
import { SKILL_CARDS } from "../data/cyberData";
import { Cpu, Terminal, Key, Radio, Check, Layers, Play } from "lucide-react";

export default function SkillMatrix() {
  const skills = SKILL_CARDS;
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const cardColorMap = {
    cyan: {
      border: "border-neon-cyan/20 hover:border-neon-cyan/80",
      text: "text-neon-cyan",
      bg: "bg-neon-cyan/5",
      glow: "border-glow-cyan",
      badge: "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/40",
      progress: "bg-neon-cyan",
    },
    magenta: {
      border: "border-neon-magenta/20 hover:border-neon-magenta/80",
      text: "text-neon-magenta",
      bg: "bg-neon-magenta/5",
      glow: "border-glow-magenta",
      badge: "bg-neon-magenta/20 text-neon-magenta border-neon-magenta/40",
      progress: "bg-neon-magenta",
    },
    yellow: {
      border: "border-neon-yellow/30 hover:border-neon-yellow/80",
      text: "text-neon-yellow",
      bg: "bg-neon-yellow/5",
      glow: "border-glow-yellow",
      badge: "bg-neon-yellow/20 text-neon-yellow border-neon-yellow/40",
      progress: "bg-neon-yellow",
    },
    purple: {
      border: "border-neon-purple/20 hover:border-neon-purple/80",
      text: "text-neon-purple",
      bg: "bg-neon-purple/5",
      glow: "border-glow-purple",
      badge: "bg-neon-purple/20 text-neon-purple border-neon-purple/40",
      progress: "bg-neon-purple",
    },
  };

  const handleCardClick = (id: string) => {
    playCyberSound("click");
    if (activeCard === id) {
      setActiveCard(null);
    } else {
      setActiveCard(id);
    }
  };

  return (
    <section id="services" className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-b border-neon-cyan/10">
      {/* Section Identifier */}
      <div className="flex items-center gap-2 mb-10 text-xs font-mono text-neon-cyan tracking-widest uppercase">
        <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full"></span>
        <span>INDEX_LOG://SKILL_MATRIX://SERVICES_NODE</span>
      </div>

      {/* Narrative Intro */}
      <div className="max-w-3xl mb-12">
        <h2 className="text-3xl md:text-4xl font-terminal font-bold text-white mb-4 uppercase tracking-wide">
          ACTUATING SYSTEM PROTOCOLS
        </h2>
        <p className="text-zinc-400 font-sans text-sm md:text-base leading-relaxed">
          Select and initialize an executable sub-system below to explore training tracks, freelancing remote frameworks, and gaming channels designed for the cyber-alternative underground.
        </p>
      </div>

      {/* Custom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((skill) => {
          const colors = cardColorMap[skill.color as keyof typeof cardColorMap] || cardColorMap.cyan;
          const isSelected = activeCard === skill.id;

          return (
            <motion.div
              layout
              key={skill.id}
              onClick={() => handleCardClick(skill.id)}
              onMouseEnter={() => playCyberSound("hover")}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className={`border ${colors.border} ${isSelected ? `${colors.glow} ${colors.bg}` : "bg-cyber-dark/60"} rounded-lg p-6 cursor-pointer flex flex-col justify-between transition-all duration-300 relative select-none group`}
            >
              <div className="flex flex-col gap-4">
                {/* Header info bar */}
                <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-zinc-500">
                  <span className="font-semibold">{skill.codeName}.{skill.extension}</span>
                  <span className="px-1.5 py-0.5 border rounded bg-black/40 border-white/5 uppercase">
                    SYS_LOAD: {skill.systemLoad}%
                  </span>
                </div>

                {/* Cyber title */}
                <div>
                  <h3 className={`text-lg font-terminal font-bold uppercase ${colors.text} tracking-wider mb-2.5 flex items-center gap-2`}>
                    {skill.id === "cs_learning" && <Cpu className="w-5 h-5" />}
                    {skill.id === "freelance_unlock" && <Terminal className="w-5 h-5" />}
                    {skill.id === "gaming_identity" && <Radio className="w-5 h-5" />}
                    {skill.title}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Progress bar of power */}
                <div className="w-full bg-cyber-black h-1.5 rounded-sm overflow-hidden mb-2">
                  <div className={`h-full ${colors.progress}`} style={{ width: `${skill.systemLoad}%` }}></div>
                </div>

                {/* Expanded checklist of specs */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden border-t border-white/5 pt-4 flex flex-col gap-3 font-terminal text-xs"
                    >
                      <span className={`${colors.text} text-[10px] tracking-widest font-mono uppercase block mb-1`}>
                        ⚙️ RUNNING PROTOCOL_METRICS:
                      </span>
                      {skill.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex gap-2 items-start text-zinc-300">
                          <Check className={`w-4 h-4 shrink-0 ${colors.text}`} />
                          <span>{detail}</span>
                        </div>
                      ))}

                      {/* Explicit Interactive stream actions for Twitch */}
                      {skill.id === "gaming_identity" && (
                        <a
                          href="https://twitch.tv/tashibee"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            playCyberSound("success");
                          }}
                          className="mt-2.5 py-2 px-3 bg-neon-yellow text-cyber-black text-center font-bold flex items-center justify-center gap-2 rounded hover:brightness-110 transition-all font-terminal tracking-wider animate-pulse select-none text-xs"
                        >
                          <Play className="w-3.5 h-3.5 fill-cyber-black text-cyber-black" />
                          LAUNCH STREAM://TASHIBEE
                        </a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action trigger footer */}
              <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono">
                <span className="text-zinc-500">INITIATION: ONLINE</span>
                <span className={`${colors.text} group-hover:underline uppercase tracking-wide font-semibold flex items-center gap-1`}>
                  {isSelected ? "COMPACT_NODE [-]" : "EXPAND_NODE [🗁]"}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
