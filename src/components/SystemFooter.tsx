import { playCyberSound } from "../utils/audio";
import { Twitch, ShieldAlert, Cpu, Heart, AlertCircle } from "lucide-react";

export default function SystemFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyber-black text-xs font-terminal py-12 px-6 border-t border-neon-cyan/15 relative overflow-hidden select-none">
      {/* Footer grid scanning indicator line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-magenta/40 to-transparent"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        {/* Left Side: Brand and creed */}
        <div className="flex flex-col gap-2 max-w-md">
          <div className="flex items-center justify-center md:justify-start gap-2 text-neon-yellow">
            <span className="font-retro text-2xl select-none">🐝</span>
            <span className="font-bold tracking-widest text-[#fefe00]">TASHIBEE // CYBER_HIVE</span>
          </div>
          <p className="font-sans text-xs text-zinc-500 leading-relaxed">
            Uncompromising alternate tech paths. Computer Science, AI, values, and freelancing. Crafted for girls and young women ready to build a high-income digital kingdom of global freedom.
          </p>
        </div>

        {/* Center: Inspirational line */}
        <div className="flex flex-col items-center max-w-sm gap-2">
          <div className="flex gap-1 items-center text-neon-magenta text-[10px] font-mono leading-none tracking-widest">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>HEURISTIC://SYSTEM_CREED</span>
          </div>
          <p className="font-sans text-xs text-zinc-400 italic text-center leading-relaxed">
            &ldquo;Break out of traditional corporate grids. Your code is your currency, your faith is your foundation, and your freedom is non-conforming. Hack your reality.&rdquo;
          </p>
        </div>

        {/* Right Side: Quick twitch Link and meta stats */}
        <div className="flex flex-col items-center md:items-end gap-3.5">
          <div className="flex items-center gap-2">
            <a
              href="https://www.twitch.tv/tashibee"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playCyberSound("success")}
              onMouseEnter={() => playCyberSound("hover")}
              className="py-2 px-3 border border-[#9146FF]/30 hover:border-[#9146FF] hover:bg-[#9146FF]/10 text-white rounded flex items-center gap-2 transition-all font-mono tracking-wider text-[11px]"
            >
              <Twitch className="w-3.5 h-3.5 text-[#9146FF]" />
              <span>TWITCH: TASHIBEE</span>
            </a>
          </div>
          <p className="font-mono text-[9px] text-zinc-600 block">
            PROTOCOL_VERSION: v4.11-SECURE &bull; {currentYear} &bull; ALL ENCRYPTED LINKAGES SECURE
          </p>
        </div>
      </div>
    </footer>
  );
}
