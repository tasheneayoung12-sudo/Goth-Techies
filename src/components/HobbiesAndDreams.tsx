import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playCyberSound } from "../utils/audio";
import { 
  Tv, 
  Skull, 
  Crown, 
  Sparkles, 
  Plus, 
  Trash2, 
  Compass, 
  Coins, 
  Terminal, 
  Cpu, 
  BookOpen, 
  MessageSquare,
  Network
} from "lucide-react";

interface DreamProtocol {
  id: string;
  category: "FREELANCING" | "TRAVEL" | "FINANCIAL_INDEP";
  title: string;
  targetYear: string;
  status: "ACTIVE_ROUTE" | "INITIALIZING" | "COMPILED";
}

export default function HobbiesAndDreams() {
  // Hardcoded default hobbies but allows clicking to query logs
  const [activeHobby, setActiveHobby] = useState<string | null>("anime");
  
  // Custom interactive Dream Protocols with persistent storage
  const [dreams, setDreams] = useState<DreamProtocol[]>([
    {
      id: "dream_1",
      category: "FREELANCING",
      title: "Launch an autonomous developer consultancy on contract basis",
      targetYear: "2026",
      status: "ACTIVE_ROUTE"
    },
    {
      id: "dream_2",
      category: "TRAVEL",
      title: "Set up a nomadic gaming hotspot station in Tokyo & Reykjavík",
      targetYear: "2027",
      status: "INITIALIZING"
    },
    {
      id: "dream_3",
      category: "FINANCIAL_INDEP",
      title: "Achieve passive subscription income stream via digital products",
      targetYear: "2028",
      status: "COMPILED"
    }
  ]);

  // Dream Injector Form state
  const [newDreamTitle, setNewDreamTitle] = useState("");
  const [newDreamCat, setNewDreamCat] = useState<"FREELANCING" | "TRAVEL" | "FINANCIAL_INDEP">("FREELANCING");
  const [newDreamYear, setNewDreamYear] = useState("2026");

  // Load user dreams if stored previously
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bee_net_dream_protocols");
      if (saved) {
        setDreams(JSON.parse(saved));
      }
    } catch (_) {
      // Safe fallback for sandbox iframe constraints
    }
  }, []);

  const saveDreams = (updated: DreamProtocol[]) => {
    setDreams(updated);
    try {
      localStorage.setItem("bee_net_dream_protocols", JSON.stringify(updated));
    } catch (_) {
      // Safe fallback
    }
  };

  const handleInjectDream = (e: FormEvent) => {
    e.preventDefault();
    if (!newDreamTitle.trim()) {
      playCyberSound("glitch");
      return;
    }

    playCyberSound("success");
    const injected: DreamProtocol = {
      id: `dream_${Date.now()}`,
      category: newDreamCat,
      title: newDreamTitle.trim(),
      targetYear: newDreamYear,
      status: "INITIALIZING"
    };

    const updated = [...dreams, injected];
    saveDreams(updated);
    setNewDreamTitle("");
  };

  const handleDeleteDream = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    playCyberSound("glitch");
    const updated = dreams.filter(d => d.id !== id);
    saveDreams(updated);
  };

  const hobbyLogs: Record<string, { title: string; desc: string; specs: string[]; tag: string }> = {
    anime: {
      title: "Cyber-Anime Subculture Integration",
      desc: "Deep obsession with psychological thrillers, futuristic mecha settings, neoclassic cyber-rebellion and dark fantasy storyboards.",
      specs: ["Serial Experiments Lain", "Ghost in the Shell", "Psycho-Pass", "Cyberpunk: Edgerunners"],
      tag: "ANIME_NODE"
    },
    horror: {
      title: "Gothic/Horror Narrative Aesthetic",
      desc: "Deep love for speculative dark lore, survival horror architectures, existential cyber-dystopias, and gothic mystery novels.",
      specs: ["Interactive gothic visual games", "Surreal analog horror formats", "Lovecraftian tech mysteries", "Deep survival horror coding design"],
      tag: "HORROR_VAULT"
    },
    fantasy: {
      title: "Alternate Reality & Sacred Fantasy Arcana",
      desc: "Appreciation of grand worldbuilding, high-magic engineering protocols, speculative visual novels, and classical Christian allegory integrations.",
      specs: ["Medieval-punk blueprints", "High-fantasy game designs", "Ethical narrative creation", "Inspirational allegories"],
      tag: "FANTASY_REALM"
    }
  };

  return (
    <section id="hobbies-dreams" className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-b border-neon-cyan/10">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-10 text-xs font-mono text-neon-yellow tracking-widest uppercase">
        <span className="w-1.5 h-1.5 bg-neon-yellow rounded-full"></span>
        <span>INDEX_LOG://SUB_CULTURE://INTERACTIVE_DREAM_DOCK</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Hobbies matrix (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-terminal font-bold text-white uppercase tracking-wider">
              HOBBIES_LOG://METADATA
            </h2>
            <p className="text-xs font-sans text-zinc-400">
              Interactive aesthetic indicators. Select any node below to decode my focus interests in anime, horror speculation, and deep allegorical fantasy.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {/* Anime Hobby Card */}
            <div
              onClick={() => { playCyberSound("click"); setActiveHobby("anime"); }}
              onMouseEnter={() => playCyberSound("hover")}
              className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center justify-between select-none ${
                activeHobby === "anime"
                  ? "border-neon-cyan bg-neon-cyan/5 border-glow-cyan"
                  : "border-white/5 bg-cyber-dark/40 hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded bg-black/40 border border-white/5 ${activeHobby === "anime" ? "text-neon-cyan" : "text-zinc-500"}`}>
                  <Tv className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-terminal font-bold text-sm tracking-wide text-white uppercase">ANIME & MECHA LORE</h4>
                  <p className="text-[11px] font-mono text-zinc-500">TAG: SECURE_ANIME_NODE</p>
                </div>
              </div>
              <span className="text-neon-cyan font-mono text-xs font-bold">[ONLINE]</span>
            </div>

            {/* Horror Hobby Card */}
            <div
              onClick={() => { playCyberSound("click"); setActiveHobby("horror"); }}
              onMouseEnter={() => playCyberSound("hover")}
              className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center justify-between select-none ${
                activeHobby === "horror"
                  ? "border-neon-magenta bg-neon-magenta/5 border-glow-magenta"
                  : "border-white/5 bg-cyber-dark/40 hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded bg-black/40 border border-white/5 ${activeHobby === "horror" ? "text-neon-magenta" : "text-zinc-500"}`}>
                  <Skull className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-terminal font-bold text-sm tracking-wide text-white uppercase">SURVIVAL HORROR & MYSTERY</h4>
                  <p className="text-[11px] font-mono text-zinc-500">TAG: HORROR_DECRYPTION</p>
                </div>
              </div>
              <span className="text-neon-magenta font-mono text-xs font-bold">[ON_LINE]</span>
            </div>

            {/* Fantasy Hobby Card */}
            <div
              onClick={() => { playCyberSound("click"); setActiveHobby("fantasy"); }}
              onMouseEnter={() => playCyberSound("hover")}
              className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center justify-between select-none ${
                activeHobby === "fantasy"
                  ? "border-neon-purple bg-neon-purple/5 border-glow-purple"
                  : "border-white/5 bg-cyber-dark/40 hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded bg-black/40 border border-white/5 ${activeHobby === "fantasy" ? "text-neon-purple" : "text-zinc-500"}`}>
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-terminal font-bold text-sm tracking-wide text-white uppercase">FANTASY & SACRED ALLEGORY</h4>
                  <p className="text-[11px] font-mono text-zinc-500">TAG: FANTASY_METRICS</p>
                </div>
              </div>
              <span className="text-neon-purple font-mono text-xs font-bold">[ON_LINE]</span>
            </div>
          </div>

          {/* Sub-hobby description display */}
          <AnimatePresence mode="wait">
            {activeHobby && hobbyLogs[activeHobby] && (
              <motion.div
                key={activeHobby}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="border border-white/5 bg-cyber-black/80 rounded-lg p-5 font-mono text-xs flex flex-col gap-3 relative"
              >
                <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-white/5 pb-2">
                  <span>DECRYPTED FOCUS: {hobbyLogs[activeHobby].tag}</span>
                  <span className="animate-pulse text-neon-green">ACTIVE_READ</span>
                </div>
                <h5 className="font-terminal font-bold text-sm text-neon-yellow uppercase">
                  {hobbyLogs[activeHobby].title}
                </h5>
                <p className="font-sans text-zinc-300 leading-relaxed text-xs">
                  {hobbyLogs[activeHobby].desc}
                </p>
                <div className="flex flex-col gap-1.5 mt-2.5">
                  <span className="text-zinc-500 uppercase text-[10px]">AESTHETIC REFERENCE SAMPLES:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {hobbyLogs[activeHobby].specs.map((item, idx) => (
                      <span key={idx} className="bg-white/5 px-2 py-1 text-zinc-300 border border-white/10 rounded font-sans text-[11px]">
                        🍿 {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right column: Interactive dream log injection panel (7 cols) */}
        <div className="lg:col-span-7 border border-neon-cyan/20 bg-cyber-dark/80 rounded-lg p-6 md:p-8 flex flex-col gap-6 relative">
          <div className="absolute top-4 right-4 text-[9px] font-mono text-neon-cyan/40">SYS_DREAM_DOCK</div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-terminal font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Network className="w-6 h-6 text-neon-cyan" />
              VISION://DREAM_INJECTOR
            </h3>
            <p className="text-xs font-sans text-zinc-300">
              Set up your custom dream checkpoints! Empower yourself by documenting freelancing directives, nomadic travel corridors, and financial sovereignty checkpoints with standard local persistence logs.
            </p>
          </div>

          {/* Core Injection Form */}
          <form onSubmit={handleInjectDream} className="border border-white/5 bg-cyber-black/80 rounded-lg p-4 font-mono text-xs flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-neon-cyan uppercase font-bold tracking-wider">Dream Checkpoint Detail:</label>
              <input
                type="text"
                value={newDreamTitle}
                onChange={(e) => setNewDreamTitle(e.target.value)}
                placeholder="e.g., Relocate coding setup to a digital caravan in the Alps"
                className="w-full bg-cyber-dark px-3.5 py-2 border border-white/10 rounded outline-none focus:border-neon-cyan text-xs font-mono text-zinc-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-neon-magenta uppercase font-bold tracking-wider">Protocol Category:</label>
                <select
                  value={newDreamCat}
                  onChange={(e) => setNewDreamCat(e.target.value as any)}
                  className="w-full bg-cyber-dark border border-white/10 rounded p-2 outline-none focus:border-neon-magenta text-zinc-300 text-xs font-mono"
                >
                  <option value="FREELANCING">💼 FREELANCING PLATFORM</option>
                  <option value="TRAVEL">✈ GLOBAL TRAVEL</option>
                  <option value="FINANCIAL_INDEP">💰 FINANCIAL INDEPENDENCE</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-neon-yellow uppercase font-bold tracking-wider">Target Realization Year:</label>
                <input
                  type="number"
                  min="2026"
                  max="2040"
                  value={newDreamYear}
                  onChange={(e) => setNewDreamYear(e.target.value)}
                  className="w-full bg-cyber-dark px-3.5 py-2 border border-white/10 rounded outline-none focus:border-neon-yellow text-xs font-mono text-zinc-300"
                />
              </div>
            </div>

            <button
              type="submit"
              onMouseEnter={() => playCyberSound("hover")}
              className="mt-2 py-3 bg-neon-cyan hover:bg-neon-cyan/25 hover:text-neon-cyan border border-neon-cyan text-cyber-black font-terminal font-bold uppercase tracking-widest rounded cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              INJECT DREAM PROTOCOL
            </button>
          </form>

          {/* Render Active Dreams Grid */}
          <div className="flex flex-col gap-3 mt-2">
            <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
              ACTIVE_DREAM_RECORDS:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {dreams.map((dream) => (
                  <motion.div
                    key={dream.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="border border-white/5 hover:border-white/15 bg-black/40 rounded-lg p-4 flex flex-col justify-between relative group"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[9px] font-mono">
                        <span className={`px-2 py-0.5 border rounded-sm font-bold ${
                          dream.category === "FREELANCING"
                            ? "bg-neon-purple/10 border-neon-purple/35 text-neon-purple"
                            : dream.category === "TRAVEL"
                            ? "bg-neon-cyan/10 border-neon-cyan/35 text-neon-cyan"
                            : "bg-neon-yellow/10 border-neon-yellow/35 text-neon-yellow"
                        }`}>
                          {dream.category}
                        </span>
                        <span className="text-zinc-600 font-bold">EST. {dream.targetYear}</span>
                      </div>
                      <p className="font-sans text-xs text-zinc-200 font-medium leading-relaxed">
                        {dream.title}
                      </p>
                    </div>

                    <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-3 text-[10px] font-mono">
                      <span className={`flex items-center gap-1 ${
                        dream.status === "ACTIVE_ROUTE" ? "text-neon-cyan animate-pulse" : "text-neon-green"
                      }`}>
                        ● {dream.status}
                      </span>
                      
                      <button
                        onClick={(e) => handleDeleteDream(dream.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-neon-magenta/20 hover:text-neon-magenta text-zinc-500 rounded transition-all cursor-pointer"
                        title="Abort mission dream protocol"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
