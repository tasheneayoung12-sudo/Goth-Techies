import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playCyberSound } from "../utils/audio";
import { ARCHIVE_LOGS } from "../data/cyberData";
import { FolderGit, CheckSquare, Terminal, Eye, Award, Filter, ShieldAlert } from "lucide-react";

export default function ProjectArchive() {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [activeLogId, setActiveLogId] = useState<string | null>(null);

  const filters = ["ALL", "CODING", "AI_EXPERIMENT", "STUDENT_WORK", "VALUES"];

  const filteredLogs = selectedFilter === "ALL"
    ? ARCHIVE_LOGS
    : ARCHIVE_LOGS.filter((log) => log.category === selectedFilter);

  const activeLog = ARCHIVE_LOGS.find((log) => log.id === activeLogId);

  const handleFilterClick = (filter: string) => {
    playCyberSound("click");
    setSelectedFilter(filter);
    setActiveLogId(null); // Reset detail view
  };

  const handleLogClick = (id: string) => {
    playCyberSound("glitch");
    if (activeLogId === id) {
      setActiveLogId(null);
    } else {
      setActiveLogId(id);
    }
  };

  return (
    <section id="portfolio" className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-b border-neon-cyan/10">
      {/* Module Title */}
      <div className="flex items-center gap-2 mb-10 text-xs font-mono text-neon-purple tracking-widest uppercase">
        <span className="w-1.5 h-1.5 bg-neon-purple rounded-full"></span>
        <span>INDEX_LOG://PROJECT_ARCHIVE://PORTFOLIO_LOGS</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Top Side: Main Logs Index list (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-terminal font-bold text-white uppercase tracking-wider">
              DATA_VAULT://SYSTEM_LOGS
            </h2>
            <p className="text-zinc-400 font-sans text-xs md:text-sm">
              Archived systems files, neural network weights, open-source empowerment packages, and real computer science projects. Click to query individual log buffers.
            </p>
          </div>

          {/* Filtering system rail */}
          <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4 text-xs font-terminal select-none">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                onMouseEnter={() => playCyberSound("hover")}
                className={`px-3 py-1.5 border rounded cursor-pointer transition-all ${
                  selectedFilter === filter
                    ? "bg-neon-purple/20 border-neon-purple text-neon-purple font-bold shadow-[0_0_8px_rgba(157,78,221,0.25)]"
                    : "border-white/10 hover:border-white/25 text-zinc-400 bg-cyber-black/40"
                }`}
              >
                {filter === "VALUES" ? "✝️ PURPOSES // VALUES" : `📁 ${filter}`}
              </button>
            ))}
          </div>

          {/* Table index layout */}
          <div className="flex flex-col gap-3 min-h-[300px]">
            <AnimatePresence mode="popLayout">
              {filteredLogs.map((log) => {
                const isActive = activeLogId === log.id;
                return (
                  <motion.div
                    layout
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleLogClick(log.id)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all flex flex-col gap-3 relative select-none ${
                      isActive
                        ? "border-neon-purple bg-neon-purple/5 shadow-[0_0_12px_rgba(157,78,221,0.15)]"
                        : "border-white/5 bg-cyber-dark/40 hover:border-white/15"
                    }`}
                  >
                    {/* Top Row: System details */}
                    <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-neon-cyan font-bold">{log.hash}</span>
                        <span className="text-zinc-600">|</span>
                        <span className="text-zinc-500 uppercase">{log.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">{log.date}</span>
                        <span className={`px-1.5 py-0.5 border rounded text-[8px] tracking-wide ${
                          log.status === "EXECUTING"
                            ? "border-neon-green/30 text-neon-green bg-neon-green/5 animate-pulse"
                            : log.status === "COMPILED"
                            ? "border-neon-cyan/25 text-neon-cyan bg-neon-cyan/5"
                            : "border-zinc-500 text-zinc-500 bg-zinc-500/5"
                        }`}>
                          {log.status}
                        </span>
                      </div>
                    </div>

                    {/* Content Row: Title */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-sm md:text-base font-terminal font-bold uppercase text-white tracking-wide hover:text-neon-purple transition-colors">
                          {log.title}
                        </h3>
                        <p className="text-xs font-sans text-zinc-400 mt-1 lines-clamp-2 leading-relaxed">
                          {log.description}
                        </p>
                      </div>
                      <div className="p-2 border border-white/5 bg-black/40 rounded shrink-0">
                        <Eye className={`w-4 h-4 ${isActive ? "text-neon-purple" : "text-zinc-600"}`} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Active Log Buffer Diagnostics Display (4 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <AnimatePresence mode="wait">
            {activeLog ? (
              <motion.div
                key={activeLog.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="border border-neon-cyan/35 bg-cyber-black rounded-lg p-5 border-glow-cyan flex flex-col gap-4 text-xs font-mono relative overflow-hidden"
              >
                {/* Visual Scanner Light */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse-glow"></div>

                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-neon-cyan uppercase">LOG BUFFER DIAGNOSTICS</span>
                  <span className="text-zinc-600 font-bold">{activeLog.hash}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-white text-sm font-terminal font-bold uppercase tracking-wider mb-1">
                    {activeLog.title}
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase block mb-1">Extended Log Metrics:</span>
                    <p className="text-zinc-300 font-sans leading-relaxed text-xs p-2.5 bg-cyber-dark rounded border border-white/5">
                      {activeLog.extendedLog}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase block mb-1.5">Active Tech Tokens:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLog.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan rounded text-[10px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3 mt-1 flex justify-between items-center text-[10px] text-zinc-500">
                  <span>COMPILER: v19.2.0-secure</span>
                  <span>STATUS: SECURE_VAULT</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-white/5 bg-cyber-dark/40 rounded-lg p-8 flex flex-col justify-center items-center text-center text-zinc-500 font-terminal gap-4.5 min-h-[340px]"
              >
                <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center bg-black/20 text-zinc-600 animate-pulse">
                  <FolderGit className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-zinc-400 font-bold uppercase mb-1">DIAGNOSTICS BUFFER IDLE</div>
                  <p className="text-xs font-sans text-zinc-500 max-w-xs leading-relaxed">
                    Select any project, AI experiment, or student logging protocol from the Data Vault directory file listing to boot diagnostics.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
