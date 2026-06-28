import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playCyberSound } from "../utils/audio";
import { 
  Send, 
  Key, 
  ShieldCheck, 
  Mail, 
  User, 
  MessageCircle, 
  Database,
  Coffee,
  Heart,
  Sparkles,
  Coins
} from "lucide-react";
import { ContactSignal } from "../types";

export default function CommSignal() {
  const [activeMode, setActiveMode] = useState<"MESSAGE" | "COFFEE">("MESSAGE");
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    category: "Computer Science Support" as "Computer Science Support" | "Gaming Ideas" | "Book Club" | "Prayer Request",
    message: "" 
  });
  const [coffeeAmount, setCoffeeAmount] = useState<number>(5);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [transmissionHistory, setTransmissionHistory] = useState<ContactSignal[]>([]);
  const [status, setStatus] = useState<"IDLE" | "TRANSMITTING" | "SUCCESS">("IDLE");

  // Load sent signals from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bee_net_transmissions");
      if (stored) {
        setTransmissionHistory(JSON.parse(stored));
      }
    } catch (_) {
      // Fail-safe for iframe restrictions
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmountSelect = (amount: number) => {
    playCyberSound("click");
    setCoffeeAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      setCoffeeAmount(parsed);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      playCyberSound("glitch");
      return;
    }

    playCyberSound("click");
    setStatus("TRANSMITTING");

    // Simulate multi-step encryption & safe checkout pipeline
    setTimeout(() => {
      playCyberSound("success");
      
      const finalCoffeeAmount = activeMode === "COFFEE" ? coffeeAmount : undefined;

      const newSignal: ContactSignal = {
        name: formData.name,
        email: formData.email,
        category: formData.category,
        message: formData.message,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        status: "TRANSMITTED",
        coffeeAmount: finalCoffeeAmount
      };

      const updated = [newSignal, ...transmissionHistory].slice(0, 5); // Keep last 5
      setTransmissionHistory(updated);

      try {
        localStorage.setItem("bee_net_transmissions", JSON.stringify(updated));
      } catch (_) {
        // fail-safe
      }

      setFormData({ name: "", email: "", category: "Computer Science Support", message: "" });
      setCustomAmount("");
      setStatus("SUCCESS");

      // Reset success notice after a few seconds
      setTimeout(() => {
        setStatus("IDLE");
      }, 5000);
    }, 1800);
  };

  return (
    <section id="contact" className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-b border-neon-cyan/10">
      {/* Module Identifier */}
      <div className="flex items-center gap-2 mb-10 text-xs font-mono text-neon-yellow tracking-widest uppercase">
        <span className="w-1.5 h-1.5 bg-neon-yellow rounded-full"></span>
        <span>INDEX_LOG://COMM_SIGNAL://CONTACT_INTERFACE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Hacker Uplink Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="border border-neon-yellow/30 bg-cyber-goth/30 rounded-lg p-6 border-glow-yellow relative">
            <h2 className="text-2xl font-terminal font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-2">
              <Key className="w-5 h-5 text-neon-yellow" />
              SECURE_TUNNEL
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 font-sans leading-relaxed mb-4">
              Submit your coordinate files and message logs. Our security pipeline encrypts transmissions via multi-hop nodes to verify secure handshakes. You can also voluntarily fuel caffeine cells via Coffee Protocols.
            </p>

            {/* Matrix logs screen */}
            <div className="bg-cyber-black/80 border border-neon-yellow/20 rounded p-4 font-mono text-[10px] sm:text-xs text-neon-yellow flex flex-col gap-1.5 max-h-[180px] overflow-y-auto scrollbar-none select-none">
              <div className="flex items-center gap-1.5">
                <span className="text-neon-magenta">&gt;</span>
                <span>CIPHER_UPLINK Status : OK</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-neon-magenta">&gt;</span>
                <span>TUNNEL_ROUTE: Port 3000 Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-neon-magenta">&gt;</span>
                <span>HONEY_CAFFEINE_STOCK: Port Active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-neon-magenta">&gt;</span>
                <span>STRIKE_RATE: Stable</span>
              </div>
              {status === "TRANSMITTING" && (
                <div className="text-neon-magenta font-bold animate-pulse mt-1 flex items-center gap-1">
                  <span>⌛ PROTOCOL_INJECT: ENCRYPTING TUNNEL PAYLOAD...</span>
                </div>
              )}
              {status === "SUCCESS" && (
                <div className="text-neon-green font-bold mt-1 flex items-center gap-1">
                  <span>✔ TRANSACTION COMPLETE! PACKET BROADCASTED [0x92BC]</span>
                </div>
              )}
            </div>
          </div>

          {/* Historical Transmissions listing (if available) */}
          <AnimatePresence>
            {transmissionHistory.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-white/5 bg-cyber-dark/40 rounded-lg p-5 flex flex-col gap-3 font-terminal"
              >
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-2 select-none">
                  <Database className="w-4 h-4 text-neon-cyan" />
                  <span>TRANSMITTED SIGNALS HISTORY ({transmissionHistory.length})</span>
                </div>
                <div className="flex flex-col gap-2.5 max-h-[250px] overflow-y-auto">
                  {transmissionHistory.map((signal, idx) => (
                    <div key={idx} className="p-2.5 border border-white/5 bg-zinc-950/60 rounded text-[11px] font-mono flex flex-col gap-1">
                      <div className="flex justify-between text-zinc-500">
                        <span className="text-neon-cyan font-bold">{signal.name}</span>
                        <span>{signal.timestamp}</span>
                      </div>
                      
                      {signal.coffeeAmount && (
                        <div className="flex items-center gap-1 py-0.5 px-2 bg-neon-yellow/10 border border-neon-yellow/20 text-neon-yellow rounded w-fit text-[10px] font-bold mt-0.5 mb-1 animate-pulse">
                          <Coffee className="w-3 h-3 text-neon-yellow" strokeWidth={3} />
                          <span>FUELED CAFFEINE: ${signal.coffeeAmount}.00</span>
                        </div>
                      )}

                      {signal.category && (
                        <div className="text-[10px] text-neon-magenta font-mono font-bold uppercase tracking-wider mb-1 mt-0.5">
                          [PROTOCOL: {signal.category}]
                        </div>
                      )}

                      <p className="text-zinc-400 font-sans italic">{signal.message}</p>
                      
                      <div className="flex items-center gap-1 text-[9px] text-neon-green mt-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>VERIFIED_HASH_COMPACT</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Tabbed Interface Form Submission (7 cols) */}
        <div className="lg:col-span-7 border border-neon-cyan/20 bg-cyber-dark/80 rounded-lg p-6 md:p-8 flex flex-col gap-6 relative">
          <div className="absolute top-4 right-4 text-[9px] font-mono text-neon-cyan/40">SECURE_DOCK</div>

          {/* Protocol Tabs */}
          <div className="flex border-b border-white/5 pb-3 gap-2">
            <button
              type="button"
              onClick={() => { playCyberSound("click"); setActiveMode("MESSAGE"); }}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border transition-all ${
                activeMode === "MESSAGE"
                  ? "border-neon-cyan text-neon-cyan bg-neon-cyan/10"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              ✉ SECURE_MESSAGE
            </button>
            <button
              type="button"
              onClick={() => { playCyberSound("click"); setActiveMode("COFFEE"); }}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border transition-all flex items-center gap-2 ${
                activeMode === "COFFEE"
                  ? "border-neon-yellow text-neon-yellow bg-neon-yellow/10 border-glow-yellow"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              ☕ BUY_ME_A_COFFEE
            </button>
          </div>

          {/* Info Card depending on Active Tab */}
          <div className="border border-white/5 bg-black/40 rounded p-4 text-xs font-sans text-zinc-300">
            {activeMode === "MESSAGE" ? (
              <p>
                Draft generic transmissions, ask queries, or propose contract collaborations directly. This transaction registers instantly to the local buffer index.
              </p>
            ) : (
              <p className="flex flex-col gap-1.5">
                <span className="font-bold text-neon-yellow flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  COFFEE FUEL RECHARGE INITIATED
                </span>
                <span>
                  Fuel Tashenea's research and development schedule. Select a custom resource tier to inject dynamic caffeine cells. Includes secure local ledger persistence.
                </span>
              </p>
            )}
          </div>

          {/* Core Interactive Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Conditional Coffee Packets Selection Grid */}
            <AnimatePresence mode="popLayout">
              {activeMode === "COFFEE" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-3 font-terminal"
                >
                  <label className="text-neon-yellow text-xs uppercase tracking-wider font-bold">
                    SELECT CAFFEINE PROTOCOLS:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => handleAmountSelect(5)}
                      className={`p-3 border rounded text-center flex flex-col gap-1.5 items-center justify-center transition-all cursor-pointer ${
                        coffeeAmount === 5 && !customAmount
                          ? "border-neon-yellow bg-neon-yellow/10 text-white font-bold"
                          : "border-white/5 bg-cyber-black/40 text-zinc-400 hover:border-white/10"
                      }`}
                    >
                      <Coffee className="w-5 h-5 text-neon-yellow animate-pulse" />
                      <span className="text-[11px] uppercase tracking-wider">1 Cup</span>
                      <span className="text-xs text-neon-green font-mono font-bold">$5</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAmountSelect(15)}
                      className={`p-3 border rounded text-center flex flex-col gap-1.5 items-center justify-center transition-all cursor-pointer ${
                        coffeeAmount === 15 && !customAmount
                          ? "border-neon-yellow bg-neon-yellow/10 text-white font-bold"
                          : "border-white/5 bg-cyber-black/40 text-zinc-400 hover:border-white/10"
                      }`}
                    >
                      <div className="flex gap-0.5">
                        <Coffee className="w-4 h-4 text-neon-yellow" />
                        <Coffee className="w-4 h-4 text-neon-yellow" />
                      </div>
                      <span className="text-[11px] uppercase tracking-wider">3 Cups</span>
                      <span className="text-xs text-neon-green font-mono font-bold">$15</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAmountSelect(25)}
                      className={`p-3 border rounded text-center flex flex-col gap-1.5 items-center justify-center transition-all cursor-pointer ${
                        coffeeAmount === 25 && !customAmount
                          ? "border-neon-yellow bg-neon-yellow/10 text-white font-bold"
                          : "border-white/5 bg-cyber-black/40 text-zinc-400 hover:border-white/10"
                      }`}
                    >
                      <div className="flex gap-0.5">
                        <Coffee className="w-3.5 h-3.5 text-neon-yellow" />
                        <Coffee className="w-3.5 h-3.5 text-neon-yellow" />
                        <Coffee className="w-3.5 h-3.5 text-neon-yellow" />
                      </div>
                      <span className="text-[11px] uppercase tracking-wider">5 Cups</span>
                      <span className="text-xs text-neon-green font-mono font-bold">$25</span>
                    </button>
                  </div>

                  {/* Custom Fuel Unit Selector */}
                  <div className="flex flex-col gap-1.5 mt-1.5">
                    <label className="text-[11px] text-zinc-500 uppercase font-mono">
                      CUSTOM RECHARGE VALUE (USD $):
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 font-mono text-xs font-bold">
                        $
                      </div>
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        placeholder="Or enter any custom amount..."
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="w-full pl-8 pr-4 py-2 bg-cyber-black border border-white/10 focus:border-neon-yellow text-white text-xs rounded outline-none font-mono"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name Input */}
            <div className="flex flex-col gap-1.5 font-terminal text-xs">
              <label htmlFor="name" className="text-neon-cyan uppercase tracking-wider flex items-center gap-1.5 select-none">
                <User className="w-3.5 h-3.5" />
                SENDER_COORDINATES://NAME
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Cyber_Valkyrie_88"
                required
                disabled={status === "TRANSMITTING"}
                className="w-full px-4 py-2.5 bg-cyber-black border border-neon-cyan/25 focus:border-neon-cyan text-white text-sm rounded outline-none font-mono transition-all disabled:opacity-50 placeholder-zinc-700"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5 font-terminal text-xs">
              <label htmlFor="email" className="text-neon-cyan uppercase tracking-wider flex items-center gap-1.5 select-none">
                <Mail className="w-3.5 h-3.5" />
                TUNNEL_GATEWAY://EMAIL_UPLINK
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., identity@secmail.net"
                required
                disabled={status === "TRANSMITTING"}
                className="w-full px-4 py-2.5 bg-cyber-black border border-neon-cyan/25 focus:border-neon-cyan text-white text-sm rounded outline-none font-mono transition-all disabled:opacity-50 placeholder-zinc-700"
              />
            </div>

            {/* Protocol Categories Select Dropdown */}
            <div className="flex flex-col gap-1.5 font-terminal text-xs">
              <label htmlFor="category" className="text-neon-cyan uppercase tracking-wider flex items-center gap-1.5 select-none">
                <Database className="w-3.5 h-3.5 animate-pulse text-neon-cyan" />
                PROTOCOL_CATEGORY://TUNNEL_STREAM_FILTER
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={status === "TRANSMITTING"}
                className="w-full px-4 py-2.5 bg-cyber-black border border-neon-cyan/25 focus:border-neon-cyan text-white text-sm rounded outline-none font-mono transition-all disabled:opacity-50 cursor-pointer"
              >
                <option value="Computer Science Support" className="bg-cyber-dark text-white">Computer Science Support</option>
                <option value="Gaming Ideas" className="bg-cyber-dark text-white">Gaming Ideas</option>
                <option value="Book Club" className="bg-cyber-dark text-white">Book Club</option>
                <option value="Prayer Request" className="bg-cyber-dark text-white">Prayer Request</option>
              </select>
            </div>

            {/* Message/Encouragement Textarea */}
            <div className="flex flex-col gap-1.5 font-terminal text-xs">
              <label htmlFor="message" className="text-neon-cyan uppercase tracking-wider flex items-center gap-1.5 select-none">
                <MessageCircle className="w-3.5 h-3.5" />
                {activeMode === "COFFEE" ? "RECHARGE_PROTOCOL://SUPPORT_MESSAGE" : "TRANSMISSION://RAW_MESSAGE_PAYLOAD"}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder={activeMode === "COFFEE" ? "Write a coffee greeting or word of encouragement..." : "Draft your digital package protocols here..."}
                required
                disabled={status === "TRANSMITTING"}
                className="w-full px-4 py-2.5 bg-cyber-black border border-neon-cyan/25 focus:border-neon-cyan text-white text-sm rounded outline-none font-sans transition-all disabled:opacity-50 placeholder-zinc-700 resize-none"
              />
            </div>

            {/* Futuristic submit trigger button */}
            <div className="mt-2 text-center">
              <button
                type="submit"
                disabled={status === "TRANSMITTING"}
                onMouseEnter={() => playCyberSound("hover")}
                className={`w-full py-4 border font-terminal font-bold uppercase tracking-widest rounded transition-all cursor-pointer shadow-md flex items-center justify-center gap-3 select-none disabled:opacity-50 ${
                  activeMode === "COFFEE"
                    ? "border-neon-yellow hover:bg-neon-yellow/15 text-neon-yellow shadow-[0_0_8px_rgba(255,240,0,0.1)]"
                    : "border-neon-cyan hover:bg-neon-cyan/15 text-neon-cyan shadow-[0_0_8px_rgba(0,240,255,0.1)]"
                }`}
              >
                {status === "TRANSMITTING" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin border-current"></div>
                    <span>TRANSMITTING COFFEE CELL PAYLOAD STATUS...</span>
                  </>
                ) : activeMode === "COFFEE" ? (
                  <>
                    <Coffee className="w-4 h-4 text-neon-yellow animate-bounce" />
                    <span>FUEL COFFEE CELL (${coffeeAmount}.00) & SEND MESSAGE</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Signal / Transmit Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

