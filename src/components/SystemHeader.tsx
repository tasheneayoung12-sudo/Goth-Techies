import { useState, useEffect } from "react";
import { Volume2, VolumeX, ShieldCheck, Wifi, Clock, Cpu, Disc } from "lucide-react";
import { playCyberSound, toggleAudioMute, getMuteState } from "../utils/audio";

interface SystemHeaderProps {
  onStyleToggle?: () => void;
}

export default function SystemHeader({ onStyleToggle }: SystemHeaderProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [muted, setMuted] = useState(getMuteState());
  const [pulseState, setPulseState] = useState(true);

  // Update real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const pulseInterval = setInterval(() => {
      setPulseState((prev) => !prev);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(pulseInterval);
    };
  }, []);

  const handleMuteToggle = () => {
    const nextMuted = toggleAudioMute();
    setMuted(nextMuted);
    if (!nextMuted) {
      playCyberSound("click");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-cyber-black/90 backdrop-blur-md border-b border-neon-cyan/20 px-4 py-2 flex items-center justify-between font-terminal text-xs text-neon-cyan select-none">
      {/* OS Branding / Identity */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => playCyberSound("click")}>
          <span className="w-2.5 h-2.5 bg-neon-yellow rounded-full shadow-[0_0_8px_#fefe00] animate-pulse"></span>
          <span className="font-bold tracking-widest text-neon-yellow">BEE_NET://TASHIBEET</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-neon-purple/20 border border-neon-purple/40 rounded text-[10px] text-neon-purple font-mono uppercase tracking-wider">
          <Disc className="w-3 h-3 animate-spin text-neon-magenta" />
          <span>master_node: running</span>
        </div>
      </div>

      {/* Center Grid stats */}
      <div className="hidden lg:flex items-center gap-6 font-mono text-[10px] text-zinc-500">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-neon-green" />
          <span>GOTH_TECH_SHIELD: <span className="text-neon-green font-bold">SECURE</span></span>
        </div>
        <div className="flex items-center gap-1">
          <Cpu className="w-3.5 h-3.5 text-neon-cyan" />
          <span>CYBERNET_INTEGRATION: <span className="text-neon-cyan font-bold">ACTIVE</span></span>
        </div>
        <div className="flex items-center gap-1">
          <Wifi className="w-3.5 h-3.5 text-neon-magenta" />
          <span>STREAM_GATE: <span className="text-neon-magenta">ONLINE</span></span>
        </div>
      </div>

      {/* Controls & Clock */}
      <div className="flex items-center gap-4">
        {/* Audio Speaker Mute Toggle */}
        <button
          onClick={handleMuteToggle}
          onMouseEnter={() => playCyberSound("hover")}
          className="p-1 px-2 border border-neon-cyan/20 hover:border-neon-cyan bg-cyber-dark/80 rounded flex items-center justify-center gap-1 cursor-pointer hover:bg-neon-cyan/10 text-neon-cyan transition-all"
          title={muted ? "Unmute sound synthesis" : "Mute audio synthesizer"}
        >
          {muted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-neon-magenta" />
              <span className="text-[10px] font-mono text-neon-magenta hidden xs:inline">MUTED</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-neon-green animate-pulse" />
              <span className="text-[10px] font-mono text-neon-green hidden xs:inline">SYNTHON</span>
            </>
          )}
        </button>

        {/* Dynamic Clock */}
        <div className="flex items-center gap-1.5 bg-cyber-dark px-2.5 py-1 border border-neon-cyan/15 rounded text-neon-cyan font-mono shadow-[0_0_5px_rgba(0,240,255,0.05)]">
          <Clock className="w-3.5 h-3.5 text-neon-cyan" />
          <span className="tabular-nums tracking-widest">{currentTime || "SYSTEM_BOOT"}</span>
        </div>
      </div>
    </header>
  );
}
