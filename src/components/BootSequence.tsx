import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playCyberSound } from "../utils/audio";
import { Terminal, Shield, Cpu, RefreshCw, Radio } from "lucide-react";

interface BootSequenceProps {
  onBootComplete: () => void;
}

export default function BootSequence({ onBootComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<"INITIALISING" | "LOADING" | "STANDBY" | "LAUNCHING">("INITIALISING");

  const bootLogs = [
    "🚀 SYSTEM_INIT://BOOT_SEQUENCE ACTIVATED",
    "🛡️ ACCESS_GRID://Checking firewall credentials...",
    "🔑 DECRYPTION://Token secure - TashiBee network linked",
    "💻 KERNEL://Loading core-goth styles & custom modules",
    "🐝 CYBER_HIVE://Harnessing bumblebee gaming protocols",
    "🤖 NEURAL_NET://Integrating AI & Machine Learning matrix",
    "💼 FREELANCE_UPLINK://Active client pipelines verified",
    "✝️ CREDENTIALS://Value-driven Christian directives online",
    "🔥 STATUS://All sub-systems executing with 100% agency"
  ];

  useEffect(() => {
    // Sound effect on start
    playCyberSound("boot");

    // Print logs sequentially
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        const nextLog = bootLogs[logIndex];
        setLogs((prev) => [...prev, nextLog]);
        playCyberSound("hover");
        logIndex++;
      } else {
        clearInterval(logInterval);
        setStatus("STANDBY");
      }
    }, 400);

    // Increment progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 200);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const handleAccess = () => {
    playCyberSound("success");
    setStatus("LAUNCHING");
    setTimeout(() => {
      onBootComplete();
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-cyber-black text-neon-cyan font-terminal flex flex-col justify-center items-center z-50 p-6 crt overflow-hidden select-none">
      {/* Background Matrix/Grid simulation */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-40"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-neon-purple/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-neon-magenta/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-2xl border border-neon-cyan/30 rounded-lg p-6 bg-cyber-dark/95 border-glow-cyan flex flex-col relative">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-neon-cyan/20 pb-3 mb-4 text-xs font-mono tracking-widest text-neon-cyan/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-magenta animate-pulse"></span>
            <span>SYSTEM_BOOT://TASHIBEET_OS_V4.0</span>
          </div>
          <div>CORE: SECURE [0x7FFEF]</div>
        </div>

        {/* Console Box */}
        <div className="bg-cyber-black/80 border border-neon-cyan/15 rounded p-4 h-64 overflow-y-auto mb-6 text-xs md:text-sm font-mono flex flex-col gap-2 scrollbar-none">
          <AnimatePresence>
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-2 ${
                  log?.includes("OK") || log?.includes("verified") || log?.includes("linked") || log?.includes("online")
                    ? "text-neon-green"
                    : "text-neon-cyan"
                }`}
              >
                <span className="text-neon-magenta select-none">&gt;</span>
                <span>{log}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {status === "INITIALISING" && (
            <div className="flex items-center gap-2 text-neon-yellow">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Compiling modules...</span>
            </div>
          )}
          {status === "STANDBY" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-neon-green font-bold text-center mt-2 tracking-widest"
            >
              ⚡ ALL CHANNELS STABLE. DECRYPT COMPLETED. ⚡
            </motion.div>
          )}
        </div>

        {/* Progress Bar Container */}
        <div className="mb-6">
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="tracking-wider">DECRYPT_DATASTREAM :</span>
            <span className={progress === 100 ? "text-neon-green font-bold" : "text-neon-cyan"}>
              {progress}%
            </span>
          </div>
          <div className="w-full h-3 border border-neon-cyan/20 bg-cyber-black rounded-sm overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-purple via-neon-magenta to-neon-cyan"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Enter Trigger Button */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {status !== "STANDBY" ? (
              <motion.div
                key="loading-btn"
                exit={{ opacity: 0, scale: 0.9 }}
                className="px-6 py-3 border border-neon-cyan/20 text-neon-cyan/40 bg-cyber-black rounded flex items-center gap-2 text-sm font-mono cursor-wait select-none"
              >
                <Radio className="w-4 h-4 animate-pulse text-neon-magenta" />
                Datalink Handshake in Progress...
              </motion.div>
            ) : (
              <motion.button
                key="active-btn"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255, 0, 127, 0.4)",
                  borderColor: "rgba(255, 0, 127, 0.8)",
                  color: "#ff007f",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAccess}
                className="px-8 py-4 border border-neon-magenta/50 text-neon-magenta font-terminal tracking-widest uppercase rounded cursor-pointer transition-all flex items-center gap-3 bg-cyber-magenta/10 select-none shadow-[0_0_10px_rgba(255,0,127,0.15)]"
              >
                <span>🖤 ACCESS TERMINAL</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
