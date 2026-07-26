// API Base URL Resolver: automatically connects to Render backend when hosted on GitHub Pages
const RENDER_BACKEND_URL = "https://goth-techies.onrender.com";

const API_BASE_URL = (function() {
  if (typeof window !== "undefined" && window.BACKEND_URL) {
    return window.BACKEND_URL.replace(/\/$/, "");
  }
  // Automatically route to Render backend when hosted on production domains (e.g. GitHub Pages)
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1" || hostname.startsWith("192.168.") || hostname.startsWith("10.");
    if (!isLocal) {
      return RENDER_BACKEND_URL;
    }
  }
  return "";
})();

function getApiEndpoint(path) {
  const cleanPath = path.startsWith("/") ? path : "/" + path;
  return API_BASE_URL + cleanPath;
}

// Web Audio API Synthesizer (Cyber Sound System)
let audioCtx = null;
let isMuted = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

function toggleAudioMute() {
  isMuted = !isMuted;
  const muteBtn = document.getElementById("mute-toggle-btn");
  if (muteBtn) {
    if (isMuted) {
      muteBtn.innerHTML = `
        <i data-lucide="volume-x" class="w-3.5 h-3.5 text-neon-magenta"></i>
        <span class="text-[10px] font-mono text-neon-magenta hidden xs:inline">MUTED</span>
      `;
      muteBtn.classList.add("border-neon-magenta/40");
      muteBtn.classList.remove("border-neon-cyan/20");
    } else {
      muteBtn.innerHTML = `
        <i data-lucide="volume-2" class="w-3.5 h-3.5 text-neon-green animate-pulse"></i>
        <span class="text-[10px] font-mono text-neon-green hidden xs:inline">SYNTHON</span>
      `;
      muteBtn.classList.remove("border-neon-magenta/40");
      muteBtn.classList.add("border-neon-cyan/20");
      playCyberSound("click");
    }
    lucide.createIcons();
  }
  return isMuted;
}

function playCyberSound(type) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
    if (ctx.state === "suspended") return;
  }

  const now = ctx.currentTime;

  switch (type) {
    case "click": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
      break;
    }
    case "hover": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
      break;
    }
    case "beep": {
      [0, 0.08].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(987.77, now + delay);
        gain.gain.setValueAtTime(0.04, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.05);
      });
      break;
    }
    case "glitch": {
      const count = 4;
      for (let i = 0; i < count; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i % 2 === 0 ? "sawtooth" : "triangle";
        osc.frequency.setValueAtTime(Math.random() * 2000 + 300, now + i * 0.02);
        gain.gain.setValueAtTime(0.03, now + i * 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.02 + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.02);
        osc.stop(now + i * 0.02 + 0.03);
      }
      break;
    }
    case "boot": {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(110, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.4);
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(220, now);
      osc2.frequency.exponentialRampToValueAtTime(440, now + 0.4);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
      break;
    }
    case "success": {
      const notes = [261.63, 329.63, 392.00, 523.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.05, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.15);
      });
      break;
    }
  }
}

// Global UI State
const state = {
  activeHobby: "anime",
  activeImageSource: "stock",
  dreams: [
    {
      id: "dream_1",
      category: "TEACHING",
      title: "Launch a gothic coding curriculum for alternative youth",
      targetYear: "2026",
      status: "ACTIVE_ROUTE"
    },
    {
      id: "dream_2",
      category: "GAMING",
      title: "Design and build an indie mecha platformer live on stream",
      targetYear: "2027",
      status: "INITIALIZING"
    },
    {
      id: "dream_3",
      category: "SPOOKY",
      title: "Release a weekly gothic tech/horror analysis podcast series",
      targetYear: "2028",
      status: "COMPILED"
    }
  ],
  skills: [
    {
      id: "cs_learning",
      codeName: "CS_LEARNING_MODULE",
      extension: "exe",
      title: "Computer Science & AI Academy",
      description: "De-mystify complex computer science, neural networks, and algorithms through intuitive visual modules for absolute beginners.",
      details: [
        "Zero-to-One Programming (Python & JS)",
        "How Neural Networks think (LLMs, transformers)",
        "Git & Open Source collaboration",
        "Building your first web app with modern stack"
      ],
      systemLoad: 42,
      color: "cyan"
    },
    {
      id: "teaching_spooky",
      codeName: "TEACHING_SPOOKY_PROTOCOL",
      extension: "dll",
      title: "Teaching & Spooky Content",
      description: "Equip bold students with elite programming/AI knowledge while producing gothic cyberpunk analysis, spooky game lore, and dark tech speculation.",
      details: [
        "Interactive Computer Science & AI teaching curricula",
        "Cyber-goth tech talks & spooky culture analysis",
        "Stream-based code mentorship pipelines",
        "Creating value-driven Christian tech frameworks"
      ],
      systemLoad: 68,
      color: "magenta"
    },
    {
      id: "gaming_identity",
      codeName: "GAMING_IDENTITY://TASHIBEE",
      extension: "sys",
      title: "tashibee // Cyber-Hive",
      description: "Step into the Bumblebee gaming terminal. Live-streaming game development, computer science mentoring, and cyber-goth tech talk on Twitch.",
      details: [
        "Twitch channel: tashibee live stream",
        "Bumblebee-themed aesthetic and gaming stream setups",
        "Cooperative coding hangouts and game jam showcases",
        "Alternative tech community centered on gaming, faith, and tech"
      ],
      systemLoad: 91,
      color: "yellow"
    }
  ],
  archiveLogs: [
    {
      id: "arch_01",
      hash: "0x8F9C11",
      title: "Cyberpunk Interactive Operating System UI",
      category: "CODING",
      date: "2026-06-18",
      description: "An offline-first browser OS using Tailwind v4, custom Web Audio synthesis, and dynamic responsive layout blocks targeting alternative youth.",
      tags: ["React 19", "Tailwind 4", "Web Audio API", "Framer Motion"],
      status: "COMPILED",
      extendedLog: "Successfully optimized file sizes and bundle structure to comply with platform parameters. Loaded Share Tech Mono dynamically, implementing retro curved CRT matrix effects with pure canvas and CSS rendering.",
      embedHtml: `<div class="mt-4 border-t border-white/5 pt-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-neon-cyan uppercase block text-[10px] font-bold tracking-wider flex items-center gap-1.5">
            <span class="inline-block w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
            AI_VIDEO_UPLINK://STREAM_READY
          </span>
          <button onclick="window.replayCanvaVideo()" class="px-2.5 py-1 border border-neon-cyan/30 hover:border-neon-cyan bg-neon-cyan/15 hover:bg-neon-cyan/30 text-neon-cyan rounded text-[10px] font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:shadow-[0_0_8px_rgba(0,245,255,0.4)]">
            <i data-lucide="rotate-ccw" class="w-3 h-3"></i> REPLAY_STREAM
          </button>
        </div>
        <div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%; padding-bottom: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.5); overflow: hidden; border-radius: 8px; will-change: transform;" class="border border-neon-cyan/20">
          <iframe id="canva-video-iframe" loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0; margin: 0;"
            src="https://www.canva.com/design/DAHOqcFLJg8/3wvBD1Hxxf6HFVs7tbgJ-w/watch?embed&autoplay=1&loop=1" 
            allowfullscreen="allowfullscreen" 
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture; clipboard-write; web-share">
          </iframe>
        </div>
        <div class="mt-2 text-[10px] font-sans text-zinc-500 flex justify-between items-center">
          <span>Video: <a href="https://www.canva.com/design/DAHOqcFLJg8/3wvBD1Hxxf6HFVs7tbgJ-w/watch?utm_content=DAHOqcFLJg8&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener" class="text-neon-cyan hover:underline font-bold">Lego-Capybara</a></span>
          <span>By Tashenea Burns-young</span>
        </div>
      </div>`
    },
    {
      id: "arch_trex",
      hash: "0x7R3X99",
      title: "T-Rex Game - Google Dino Run (Cyber-Goth Edition)",
      category: "CODING",
      date: "2026-07-25",
      description: "Playable recreation of the famous Chrome Dino Runner. Jump over cacti & cyber spikes, duck under flying drones, and track high scores in real-time.",
      tags: ["HTML5 Canvas", "JavaScript", "Arcade Game", "Physics Engine", "Web Audio"],
      status: "PLAYABLE",
      extendedLog: "Full physics state engine compiled with 60 FPS requestAnimationFrame loop, collision detection hitboxes, Web Audio synthesizer jump SFX, mobile touch gesture controls, and persistent high scores stored in browser memory.",
      embedHtml: `<div class="mt-4 border-t border-white/5 pt-4">
        <div class="flex items-center justify-between mb-3">
          <span class="text-neon-yellow uppercase font-bold tracking-wider text-[11px] flex items-center gap-1.5">
            <span class="inline-block w-2 h-2 rounded-full bg-neon-yellow animate-ping"></span>
            INTERACTIVE_ARCADE_SIMULATION
          </span>
          <button onclick="window.switchCodingSubTab('trex')" class="px-3 py-1 bg-neon-magenta/20 hover:bg-neon-magenta/40 text-neon-magenta border border-neon-magenta/50 rounded text-xs font-terminal tracking-wider transition-all shadow-[0_0_10px_rgba(255,0,127,0.3)] cursor-pointer flex items-center gap-1.5">
            <i data-lucide="gamepad-2" class="w-3.5 h-3.5"></i> LAUNCH FULLSCREEN GAME
          </button>
        </div>
        <div class="bg-black/60 border border-neon-cyan/30 rounded-lg p-3 text-center">
          <p class="text-xs text-zinc-300 font-sans mb-3">Click below to launch the interactive T-Rex Runner game in the Coding workspace!</p>
          <button onclick="window.switchCodingSubTab('trex')" class="w-full py-2.5 bg-gradient-to-r from-neon-purple via-neon-magenta to-neon-cyan text-white font-terminal font-bold rounded tracking-widest uppercase hover:brightness-110 shadow-[0_0_15px_rgba(255,0,127,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer text-xs">
            🦖 PLAY T-REX DINO RUN NOW
          </button>
        </div>
      </div>`
    },
    {
      id: "arch_02",
      hash: "0x3A2B5E",
      title: "Sacred Code AI Wisdom Parser",
      category: "AI_EXPERIMENT",
      date: "2026-04-12",
      description: "An experimental natural language processing model that maps ethical principles and Biblical prompts into digital workspace tasks.",
      tags: ["Python", "HuggingFace", "BERT", "Text Classification"],
      status: "ARCHIVED",
      extendedLog: "Uncompromising semantic classifications loaded. Proven that Christian value alignments in code environments increase developer wellness and operational stability."
    },
    {
      id: "arch_03",
      hash: "0xF7C3D0",
      title: "Master's Thesis: Neural Network Weight Viz",
      category: "STUDENT_WORK",
      date: "2026-05-01",
      description: "Master's academic work in AI visualizing deep layers of neural networks during reinforcement training on simulated hex environments.",
      tags: ["AI", "PyTorch", "D3.js", "Neural Nets"],
      status: "EXECUTING",
      extendedLog: "Visualized feed-forward weight adjustments in real time during backpropagation. Visualizations rendered beautifully inside WebGL sandbox, proving cognitive structures can be styled with dark synthwave schemes."
    },
    {
      id: "arch_04",
      hash: "0x4D0E12",
      title: "Goth Techie Empowerment Framework",
      category: "VALUES",
      date: "2026-03-30",
      description: "A comprehensive guide, resource directory, and open-source starter folder enabling Goth Techies globally to study computer science and build spooky content.",
      tags: ["Mentorship", "Teaching", "Gaming", "Resource Kit"],
      status: "COMPILED",
      extendedLog: "Authored detailed workflows on educational curricula, live streaming schedules, building gothic narratives, and mentoring young women in AI."
    }
  ],
  transmissions: []
};

// CRT Effect Controls
let crtEffectEnabled = true;
function toggleCRT() {
  playCyberSound("click");
  crtEffectEnabled = !crtEffectEnabled;
  const body = document.getElementById("main-body");
  if (crtEffectEnabled) {
    body.classList.add("crt");
  } else {
    body.classList.remove("crt");
  }
}

function rebootOS() {
  playCyberSound("glitch");
  try {
    sessionStorage.removeItem("bee_net_booted");
  } catch (_) {}
  window.location.href = "index.html";
}

// Sound helpers for hovering
function setupHovers() {
  document.querySelectorAll("[data-cyber-hover]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      playCyberSound("hover");
    });
  });
}

// Clock updates
function startClock() {
  const clockEl = document.getElementById("system-clock");
  if (clockEl) {
    setInterval(() => {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    }, 1000);
  }
}

// Sequenced Boot System
function startBootSequence() {
  playCyberSound("boot");
  const bootLogs = [
    "🚀 SYSTEM_INIT://BOOT_SEQUENCE ACTIVATED",
    "🛡️ ACCESS_GRID://Checking firewall credentials...",
    "🔑 DECRYPTION://Token secure - TashiBee network linked",
    "💻 KERNEL://Loading core-goth styles & custom modules",
    "🐝 CYBER_HIVE://Harnessing bumblebee gaming protocols",
    "🤖 NEURAL_NET://Integrating AI & Machine Learning matrix",
    "🎓 EDUCATION_GATE://Alternative teaching frameworks active",
    "🖤 SPOOKY_CORE://Spooky gothic content segments loaded",
    "✝️ CREDENTIALS://Value-driven Christian directives online",
    "🔥 STATUS://All sub-systems executing with 100% agency"
  ];

  const consoleEl = document.getElementById("boot-console");
  const barProgressEl = document.getElementById("boot-bar-progress");
  const percentEl = document.getElementById("boot-percent");

  let logIdx = 0;
  const printInterval = setInterval(() => {
    if (logIdx < bootLogs.length) {
      const nextLog = bootLogs[logIdx];
      const div = document.createElement("div");
      div.className = "flex gap-2 text-neon-cyan";
      if (nextLog.includes("OK") || nextLog.includes("verified") || nextLog.includes("linked") || nextLog.includes("online")) {
        div.className = "flex gap-2 text-neon-green";
      }
      div.innerHTML = `<span class="text-neon-magenta select-none">&gt;</span><span>${nextLog}</span>`;
      consoleEl.appendChild(div);
      consoleEl.scrollTop = consoleEl.scrollHeight;
      playCyberSound("hover");
      logIdx++;
    } else {
      clearInterval(printInterval);
      // Change status label and enable button
      document.getElementById("boot-handshake-status").classList.add("hidden");
      document.getElementById("boot-access-btn").classList.remove("hidden");
      playCyberSound("beep");
    }
  }, 350);

  let currentPercent = 0;
  const progressInterval = setInterval(() => {
    if (currentPercent >= 100) {
      clearInterval(progressInterval);
    } else {
      currentPercent += Math.floor(Math.random() * 15) + 5;
      if (currentPercent > 100) currentPercent = 100;
      percentEl.textContent = `${currentPercent}%`;
      barProgressEl.style.width = `${currentPercent}%`;
    }
  }, 180);
}

function applyImageSource() {
  const avatarImg = document.getElementById("profile-avatar-img");
  const portraitImg = document.getElementById("profile-portrait-img");
  const btnStock = document.getElementById("btn-src-stock");
  const btnUploaded = document.getElementById("btn-src-uploaded");

  const source = state.activeImageSource || "stock";

  if (avatarImg) {
    avatarImg.onerror = function() {
      this.onerror = null;
      this.src = "/assets/images/goth_techies_logo.jpg";
    };
    avatarImg.src = source === "stock" 
      ? "/assets/images/stock_goth_avatar_1783792279555.jpg" 
      : "/assets/images/Profile_pic.jpg";
    avatarImg.alt = source === "stock" ? "Cyber-Goth Stock Avatar" : "Tashenea's Uploaded Avatar";
  }

  if (portraitImg) {
    portraitImg.onerror = function() {
      this.onerror = null;
      this.src = "/assets/images/goth_techies_logo.jpg";
    };
    portraitImg.src = source === "stock" 
      ? "/assets/images/stock_goth_portrait_1783792292032.jpg" 
      : "/assets/images/Profile_pic.jpg";
    portraitImg.alt = source === "stock" ? "Cyber-Goth Stock Portrait" : "Tashenea's Uploaded Portrait";
  }

  // Update button styles
  if (btnStock && btnUploaded) {
    if (source === "stock") {
      btnStock.className = "py-1.5 rounded border border-neon-cyan bg-neon-cyan/10 text-neon-cyan text-[10px] uppercase font-bold tracking-wider transition-all duration-300 hover:bg-neon-cyan/20 cursor-pointer text-center";
      btnUploaded.className = "py-1.5 rounded border border-white/10 bg-black/40 text-zinc-400 text-[10px] uppercase font-bold tracking-wider transition-all duration-300 hover:border-neon-magenta/50 hover:text-neon-magenta cursor-pointer text-center";
    } else {
      btnStock.className = "py-1.5 rounded border border-white/10 bg-black/40 text-zinc-400 text-[10px] uppercase font-bold tracking-wider transition-all duration-300 hover:border-neon-cyan/50 hover:text-neon-cyan cursor-pointer text-center";
      btnUploaded.className = "py-1.5 rounded border border-neon-magenta bg-neon-magenta/10 text-neon-magenta text-[10px] uppercase font-bold tracking-wider transition-all duration-300 hover:bg-neon-magenta/20 cursor-pointer text-center";
    }
  }
}

function switchProfileImageSource(source) {
  playCyberSound("click");
  state.activeImageSource = source;
  savePersistentData();
  applyImageSource();
}

// System Diagnostic Panel for MongoDB Atlas & Render Backend
function renderFooterDiagnosticPanel() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  if (document.getElementById("footer-diagnostic-panel")) return;

  const panelDiv = document.createElement("div");
  panelDiv.id = "footer-diagnostic-panel";
  panelDiv.className = "w-full max-w-7xl mx-auto mt-8 pt-6 border-t border-neon-cyan/20 flex flex-col md:flex-row items-center justify-between gap-4 bg-black/80 p-4 rounded-xl border border-neon-cyan/20 font-mono text-xs shadow-lg";

  panelDiv.innerHTML = `
    <div class="flex items-center gap-2">
      <div class="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse shrink-0"></div>
      <span class="font-bold text-neon-yellow tracking-wider uppercase text-[11px] font-terminal">UPLINK DIAGNOSTICS:</span>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-zinc-300 text-xs">
      <!-- MONGODB ATLAS STATUS -->
      <div class="flex items-center gap-2 bg-cyber-dark/90 px-3 py-1.5 rounded-lg border border-zinc-800/80">
        <span class="text-zinc-400 font-sans">MongoDB Atlas:</span>
        <span id="diag-mongo-status" class="flex items-center gap-1.5 font-bold text-yellow-400">
          <span class="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
          <span>CHECKING...</span>
        </span>
      </div>

      <!-- RENDER BACKEND STATUS -->
      <div class="flex items-center gap-2 bg-cyber-dark/90 px-3 py-1.5 rounded-lg border border-zinc-800/80">
        <span class="text-zinc-400 font-sans">Render Link:</span>
        <span id="diag-render-status" class="flex items-center gap-1.5 font-bold text-yellow-400">
          <span class="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
          <span>CHECKING...</span>
        </span>
      </div>

      <!-- RE-TEST BUTTON -->
      <button onclick="runFooterDiagnostics()" class="px-3 py-1.5 bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan hover:text-white rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-[11px] font-bold font-mono active:scale-95">
        <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
        <span>TEST LINK</span>
      </button>
    </div>
  `;

  const footerContainer = footer.querySelector(".max-w-7xl") || footer;
  footerContainer.appendChild(panelDiv);

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function runFooterDiagnostics() {
  const mongoEl = document.getElementById("diag-mongo-status");
  const renderEl = document.getElementById("diag-render-status");

  if (mongoEl) {
    mongoEl.className = "flex items-center gap-1.5 font-bold text-yellow-400";
    mongoEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span><span>PINGING...</span>`;
  }
  if (renderEl) {
    renderEl.className = "flex items-center gap-1.5 font-bold text-yellow-400";
    renderEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span><span>PINGING...</span>`;
  }

  fetch(getApiEndpoint("/api/health"), { cache: "no-store" })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (renderEl) {
        renderEl.className = "flex items-center gap-1.5 font-bold text-neon-green";
        renderEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-neon-green"></span><span>ONLINE (200 OK)</span>`;
      }

      if (mongoEl) {
        if (data.mongodb === "CONNECTED") {
          mongoEl.className = "flex items-center gap-1.5 font-bold text-neon-green";
          mongoEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-neon-green"></span><span>CONNECTED (Atlas)</span>`;
        } else {
          mongoEl.className = "flex items-center gap-1.5 font-bold text-amber-400";
          mongoEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-400"></span><span>OFFLINE (URI Pending)</span>`;
        }
      }
    })
    .catch(err => {
      console.warn("Diagnostics health check error:", err);
      if (renderEl) {
        renderEl.className = "flex items-center gap-1.5 font-bold text-neon-magenta";
        renderEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-neon-magenta"></span><span>UNREACHABLE</span>`;
      }
      if (mongoEl) {
        mongoEl.className = "flex items-center gap-1.5 font-bold text-neon-magenta";
        mongoEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-neon-magenta"></span><span>UNREACHABLE</span>`;
      }
    });
}

function initializePageComponents() {
  setupActiveNavObserver();
  setupHovers();
  lucide.createIcons();
  startClock();
  loadPersistentData();
  updateHackerStatusUI();
  
  // Render & Execute Footer Diagnostic Panel
  renderFooterDiagnosticPanel();
  runFooterDiagnostics();
  
  if (document.getElementById("profile-portrait-img") || document.getElementById("profile-avatar-img")) {
    applyImageSource();
  }
  if (document.getElementById("archive-logs-list")) {
    initArchive();
  }
  if (document.getElementById("dreams-grid-container")) {
    fetchDreams();
  }
  if (document.getElementById("transmissions-list-container")) {
    renderTransmissions();
  }
}

function handleAccess() {
  playCyberSound("success");
  try {
    sessionStorage.setItem("bee_net_booted", "true");
  } catch (_) {}
  const bootScreen = document.getElementById("boot-screen");
  const workspaceScreen = document.getElementById("workspace-screen");
  
  if (bootScreen) {
    bootScreen.classList.add("transition-all", "duration-700", "opacity-0", "scale-95");
    setTimeout(() => {
      bootScreen.remove();
      if (workspaceScreen) {
        workspaceScreen.classList.remove("hidden");
      }
      initializePageComponents();
    }, 700);
  } else {
    if (workspaceScreen) {
      workspaceScreen.classList.remove("hidden");
    }
    initializePageComponents();
  }
}

// Subculture/Hobby selection updates
const hobbyLogs = {
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

function selectHobby(key) {
  playCyberSound("click");
  state.activeHobby = key;
  
  // Highlight card borders
  document.querySelectorAll("[data-hobby-card]").forEach((card) => {
    const cardKey = card.getAttribute("data-hobby-card");
    if (cardKey === key) {
      card.className = card.className.replace(/border-white\/5|bg-cyber-dark\/40/g, "");
      if (key === "anime") card.className += " border-neon-cyan bg-neon-cyan/5 border-glow-cyan";
      if (key === "horror") card.className += " border-neon-magenta bg-neon-magenta/5 border-glow-magenta";
      if (key === "fantasy") card.className += " border-neon-purple bg-neon-purple/5 border-glow-purple";
    } else {
      // Remove specific highlights
      card.className = card.className.replace(/border-neon-cyan|bg-neon-cyan\/5|border-glow-cyan|border-neon-magenta|bg-neon-magenta\/5|border-glow-magenta|border-neon-purple|bg-neon-purple\/5|border-glow-purple/g, "");
      card.className += " border-white/5 bg-cyber-dark/40";
    }
  });

  // Render detail log
  const data = hobbyLogs[key];
  const container = document.getElementById("hobby-log-display");
  container.innerHTML = `
    <div class="flex justify-between items-center text-[10px] text-zinc-500 border-b border-white/5 pb-2">
      <span>DECRYPTED FOCUS: ${data.tag}</span>
      <span class="animate-pulse text-neon-green">ACTIVE_READ</span>
    </div>
    <h5 class="font-terminal font-bold text-sm text-neon-yellow uppercase">
      ${data.title}
    </h5>
    <p class="font-sans text-zinc-300 leading-relaxed text-xs">
      ${data.desc}
    </p>
    <div class="flex flex-col gap-1.5 mt-2.5">
      <span class="text-zinc-500 uppercase text-[10px]">AESTHETIC REFERENCE SAMPLES:</span>
      <div class="flex flex-wrap gap-1.5 mt-1">
        ${data.specs.map(item => `
          <span class="bg-white/5 px-2 py-1 text-zinc-300 border border-white/10 rounded font-sans text-[11px]">
            🍿 ${item}
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

// Dreams & Suggestions management
function obfuscateEmail(email) {
  if (!email) return "ANONYMOUS_NODE";
  if (email === "ANONYMOUS_NODE" || email.includes("ANONYMOUS")) {
    return "NODE://ANONYMOUS_GHOST";
  }
  const parts = email.split("@");
  if (parts.length < 2) return "NODE_ANONYMOUS";
  const name = parts[0];
  const domain = parts[1];
  const obfName = name.length > 2 ? name.substring(0, 2) + "***" : name + "***";
  return `NODE://${obfName}@${domain}`;
}

function fetchDreams() {
  fetch(getApiEndpoint("/api/dreams/all"))
    .then(res => res.json())
    .then(data => {
      if (data && data.success && Array.isArray(data.dreams)) {
        state.dreams = data.dreams;
        renderDreams();
      }
    })
    .catch(err => {
      console.error("Failed to fetch suggestions:", err);
      renderDreams();
    });
}

function setNewsletterSubscribe(val) {
  const subscribeInput = document.getElementById("dream-subscribe-input");
  if (subscribeInput) {
    subscribeInput.value = val ? "true" : "false";
  }
  
  const yesBtn = document.getElementById("toggle-subscribe-yes");
  const noBtn = document.getElementById("toggle-subscribe-no");
  
  if (yesBtn && noBtn) {
    if (val) {
      yesBtn.className = "flex-1 py-1.5 border border-neon-cyan bg-neon-cyan/20 text-neon-cyan font-bold rounded text-center transition-all cursor-pointer text-[10px] tracking-wider font-mono";
      noBtn.className = "flex-1 py-1.5 border border-white/10 text-zinc-500 font-bold rounded text-center transition-all cursor-pointer text-[10px] tracking-wider font-mono hover:text-zinc-300";
    } else {
      yesBtn.className = "flex-1 py-1.5 border border-white/10 text-zinc-500 font-bold rounded text-center transition-all cursor-pointer text-[10px] tracking-wider font-mono hover:text-zinc-300";
      noBtn.className = "flex-1 py-1.5 border border-neon-cyan bg-neon-cyan/20 text-neon-cyan font-bold rounded text-center transition-all cursor-pointer text-[10px] tracking-wider font-mono";
    }
  }
  playCyberSound("click");
}

function setAnonymousPost(val) {
  const anonInput = document.getElementById("dream-anon-input");
  if (anonInput) {
    anonInput.value = val ? "true" : "false";
  }
  
  const yesBtn = document.getElementById("toggle-anon-yes");
  const noBtn = document.getElementById("toggle-anon-no");
  
  if (yesBtn && noBtn) {
    if (val) {
      yesBtn.className = "flex-1 py-1.5 border border-neon-cyan bg-neon-cyan/20 text-neon-cyan font-bold rounded text-center transition-all cursor-pointer text-[10px] tracking-wider font-mono";
      noBtn.className = "flex-1 py-1.5 border border-white/10 text-zinc-500 font-bold rounded text-center transition-all cursor-pointer text-[10px] tracking-wider font-mono hover:text-zinc-300";
    } else {
      yesBtn.className = "flex-1 py-1.5 border border-white/10 text-zinc-500 font-bold rounded text-center transition-all cursor-pointer text-[10px] tracking-wider font-mono hover:text-zinc-300";
      noBtn.className = "flex-1 py-1.5 border border-neon-cyan bg-neon-cyan/20 text-neon-cyan font-bold rounded text-center transition-all cursor-pointer text-[10px] tracking-wider font-mono";
    }
  }
  playCyberSound("click");
}

async function fetchLocationString() {
  let locationStr = "";
  
  // Try IP-based geolocation for fast, silent, highly reliable matching
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(2000) });
    const ipGeo = await res.json();
    if (ipGeo && ipGeo.city && ipGeo.country_name) {
      locationStr = `${ipGeo.city}, ${ipGeo.country_code}`;
    }
  } catch (err) {
    // Fail silently to next method
  }

  // Fallback to browser HTML5 geolocation if permission is already given
  if (!locationStr && navigator.geolocation) {
    try {
      const coords = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (err) => reject(err),
          { timeout: 1200 }
        );
      });
      locationStr = `GPS [${coords.latitude.toFixed(2)}, ${coords.longitude.toFixed(2)}]`;
    } catch (_) {}
  }

  // Solid, infallible fallback to device timezone + browser locale
  if (!locationStr) {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      locationStr = `${tz.split("/").pop().replace("_", " ")}`;
    } catch (_) {
      locationStr = "CYBER_GRID_COORDS";
    }
  }

  return locationStr;
}

function renderDreams() {
  const container = document.getElementById("dreams-grid-container");
  if (!container) return;
  container.innerHTML = "";

  state.dreams.forEach((dream) => {
    let catClass = "bg-neon-yellow/10 border-neon-yellow/35 text-neon-yellow";
    let catLabel = dream.category;

    if (dream.category === "ANIME") {
      catClass = "bg-neon-cyan/10 border-neon-cyan/35 text-neon-cyan";
      catLabel = "🍿 ANIME SUGGESTION";
    } else if (dream.category === "HORROR") {
      catClass = "bg-neon-magenta/10 border-neon-magenta/35 text-neon-magenta";
      catLabel = "💀 HORROR RECOMMENDATION";
    } else if (dream.category === "MUSIC") {
      catClass = "bg-neon-green/10 border-neon-green/35 text-neon-green";
      catLabel = "🎵 MUSIC SUGGESTION";
    } else if (dream.category === "ENCOURAGEMENT") {
      catClass = "bg-neon-purple/10 border-neon-purple/35 text-neon-purple";
      catLabel = "🤝 ENCOURAGEMENT";
    } else if (dream.category === "PRAYER") {
      catClass = "bg-neon-red/10 border-neon-red/35 text-neon-red";
      catLabel = "🙏 PRAYER REQUEST";
    }

    const div = document.createElement("div");
    div.className = "border border-white/5 hover:border-white/15 bg-black/40 rounded-lg p-4 flex flex-col justify-between relative group transition-all";
    
    const obfNode = obfuscateEmail(dream.email);
    const descHTML = dream.description 
      ? `<p class="text-[11px] font-sans text-zinc-400 mt-1.5 leading-relaxed italic border-l border-white/10 pl-2">${dream.description}</p>`
      : "";

    const locationHTML = dream.location 
      ? `<span class="flex items-center gap-1 text-[9px] text-zinc-500 font-mono"><i data-lucide="map-pin" class="w-2.5 h-2.5 text-neon-yellow"></i> ${dream.location}</span>`
      : `<span class="flex items-center gap-1 text-[9px] text-zinc-500 font-mono"><i data-lucide="map-pin" class="w-2.5 h-2.5 text-zinc-600"></i> CYBER_GRID</span>`;

    const dateStr = dream.timestamp ? new Date(dream.timestamp).toLocaleDateString() : "RECENT_SEC";
    const timestampHTML = `<span class="text-[9px] text-zinc-600 font-mono">${dateStr}</span>`;

    div.innerHTML = `
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center text-[9px] font-mono">
          <span class="px-2 py-0.5 border rounded-sm font-bold ${catClass}">
            ${catLabel}
          </span>
          <span class="text-zinc-600 font-bold">${dream.targetYear || '2026'}</span>
        </div>
        <div>
          <p class="font-sans text-xs text-zinc-200 font-medium leading-relaxed">
            ${dream.title}
          </p>
          ${descHTML}
        </div>
        <div class="flex flex-wrap items-center justify-between gap-1.5 border-t border-white/5 pt-1.5 mt-1">
          ${locationHTML}
          ${timestampHTML}
        </div>
      </div>

      <div class="flex justify-between items-center border-t border-white/5 pt-3 mt-3 text-[10px] font-mono">
        <span class="text-zinc-500 font-bold text-[9px] flex items-center gap-1">
          <i data-lucide="shield" class="w-3 h-3 text-neon-cyan"></i>
          ${obfNode}
        </span>
        
        <button
          onclick="deleteDream('${dream.id}', event)"
          class="opacity-0 group-hover:opacity-100 p-1 hover:bg-neon-magenta/20 hover:text-neon-magenta text-zinc-500 rounded transition-all cursor-pointer"
          title="Abort mission suggestion"
        >
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;
    container.appendChild(div);
  });
  lucide.createIcons();
}

async function injectDream(e) {
  e.preventDefault();
  const emailInput = document.getElementById("dream-email-input");
  const titleInput = document.getElementById("dream-title-input");
  const catSelect = document.getElementById("dream-cat-select");
  const descInput = document.getElementById("dream-desc-input");
  const subscribeInput = document.getElementById("dream-subscribe-input");

  const email = emailInput ? emailInput.value.trim() : "";
  const title = titleInput ? titleInput.value.trim() : "";
  const category = catSelect ? catSelect.value : "ANIME";
  const description = descInput ? descInput.value.trim() : "";
  const newsletterConsent = subscribeInput ? subscribeInput.value === "true" : true;

  // Initialize status message container in form
  let statusDiv = document.getElementById("dream-form-status");
  if (!statusDiv) {
    statusDiv = document.createElement("div");
    statusDiv.id = "dream-form-status";
    statusDiv.className = "text-center font-mono text-[11px] font-bold p-2.5 rounded transition-all";
    const form = e.target;
    form.insertBefore(statusDiv, form.querySelector("button[type='submit']"));
  }
  statusDiv.className = "hidden"; // Reset

  // 1. Client-side Validations
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !emailRegex.test(email)) {
    playCyberSound("glitch");
    statusDiv.className = "text-center font-mono text-[11px] font-bold p-2.5 rounded border border-neon-magenta/30 bg-neon-magenta/10 text-neon-magenta mt-1";
    statusDiv.innerHTML = `<span>❌ INVALID NODE EMAIL. PLEASE ENTER A VALID EMAIL ADDRESS.</span>`;
    statusDiv.classList.remove("hidden");
    return;
  }

  if (!title) {
    playCyberSound("glitch");
    statusDiv.className = "text-center font-mono text-[11px] font-bold p-2.5 rounded border border-neon-magenta/30 bg-neon-magenta/10 text-neon-magenta mt-1";
    statusDiv.innerHTML = `<span>❌ TRANSMISSION TITLE IS REQUIRED.</span>`;
    statusDiv.classList.remove("hidden");
    return;
  }

  if (!description) {
    playCyberSound("glitch");
    statusDiv.className = "text-center font-mono text-[11px] font-bold p-2.5 rounded border border-neon-magenta/30 bg-neon-magenta/10 text-neon-magenta mt-1";
    statusDiv.innerHTML = `<span>❌ DETAILED TRANSMISSION PAYLOAD IS REQUIRED.</span>`;
    statusDiv.classList.remove("hidden");
    return;
  }

  playCyberSound("click");

  const submitBtn = e.target.querySelector("button[type='submit']");
  const originalBtnHTML = submitBtn ? submitBtn.innerHTML : "";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <div class="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin border-current"></div>
      <span>UPLINK_BROADCAST_IN_PROGRESS...</span>
    `;
  }

  // 2. Fetch submit to Mongoose backend survey endpoint
  fetch(getApiEndpoint("/api/website-survey"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, category, title, description, newsletterConsent })
  })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Database server transmission error.");
      }
      return data;
    })
    .then(data => {
      playCyberSound("success");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }

      // Display success feedback
      statusDiv.className = "text-center font-mono text-[11px] font-bold p-2.5 rounded border border-neon-green/30 bg-neon-green/10 text-neon-green mt-1";
      statusDiv.innerHTML = `<span>✔ TRANSMISSION RECEIVED! SAVE FREQUENCY LOGGED TO ATLAS DATABASE (websiteSurvey).</span>`;
      statusDiv.classList.remove("hidden");

      // Optionally insert into live feedback logs so it appears on grid
      if (data && data.data) {
        const localDoc = {
          id: data.data._id || `survey_${Date.now()}`,
          category: data.data.category,
          title: data.data.title,
          targetYear: "2026",
          description: data.data.description,
          email: data.data.email,
          timestamp: data.data.createdAt || new Date().toISOString()
        };
        state.dreams.unshift(localDoc);
        renderDreams();
      }

      // 6. Clear form after successful submission
      if (titleInput) titleInput.value = "";
      if (descInput) descInput.value = "";

      // Hide success message after several seconds
      setTimeout(() => {
        statusDiv.className = "hidden";
        statusDiv.innerHTML = "";
      }, 7000);
    })
    .catch(err => {
      console.error(err);
      playCyberSound("glitch");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }
      statusDiv.className = "text-center font-mono text-[11px] font-bold p-2.5 rounded border border-neon-magenta/30 bg-neon-magenta/10 text-neon-magenta mt-1";
      statusDiv.innerHTML = `<span>❌ TRANSMISSION FAULT: ${err.message || "COULD NOT ESTABLISH SECURE TERMINAL UPLINK"}</span>`;
      statusDiv.classList.remove("hidden");
    });
}

function deleteDream(id, e) {
  e.stopPropagation();
  playCyberSound("glitch");
  state.dreams = state.dreams.filter(d => d.id !== id);
  savePersistentData();
  renderDreams();
}

// Skill Cards accordion toggle
function toggleSkillDetail(id) {
  playCyberSound("click");
  const container = document.getElementById(`skill-details-${id}`);
  const triggerText = document.getElementById(`skill-trigger-${id}`);
  
  if (container.classList.contains("hidden")) {
    container.classList.remove("hidden");
    triggerText.textContent = "COMPACT_NODE [-]";
  } else {
    container.classList.add("hidden");
    triggerText.textContent = "EXPAND_NODE [🗁]";
  }
}

// Project Archive diagnostics display
let activeLogId = "arch_01";
const filters = ["ALL", "CODING", "AI_EXPERIMENT", "STUDENT_WORK", "VALUES"];
let selectedFilter = "ALL";

function initArchive() {
  renderArchiveLogsList();
  
  const detailsContainer = document.getElementById("log-diagnostics-details");
  const log = state.archiveLogs.find(l => l.id === activeLogId);
  if (log && detailsContainer) {
    detailsContainer.innerHTML = `
      <div class="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse-glow"></div>

      <div class="flex items-center justify-between border-b border-white/5 pb-2">
        <span class="text-neon-cyan uppercase font-bold tracking-wider">LOG BUFFER DIAGNOSTICS</span>
        <span class="text-zinc-600 font-bold">${log.hash}</span>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-white text-sm font-terminal font-bold uppercase tracking-wider mb-1">
          ${log.title}
        </div>
        <div>
          <span class="text-zinc-500 uppercase block mb-1">Extended Log Metrics:</span>
          <div class="text-zinc-300 font-sans leading-relaxed text-xs p-2.5 bg-cyber-dark rounded border border-white/5">
            ${log.extendedLog}
          </div>
        </div>
        ${log.embedHtml ? log.embedHtml : ""}
      </div>

      <div>
        <span class="text-zinc-500 uppercase block mb-1.5">Active Tech Tokens:</span>
        <div class="flex flex-wrap gap-1.5">
          ${log.tags.map(tag => `
            <span class="px-2 py-1 border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan rounded text-[10px]">
              #${tag}
            </span>
          `).join("")}
        </div>
      </div>

      <div class="border-t border-white/5 pt-3 mt-1 flex justify-between items-center text-[10px] text-zinc-500">
        <span>COMPILER: v19.2.0-secure</span>
        <span>STATUS: SECURE_VAULT</span>
      </div>
    `;
    lucide.createIcons();
  }

  // Check URL params for T-Rex Game deep link
  if (window.location.hash === "#trex" || window.location.search.includes("trex") || window.location.search.includes("dino")) {
    filterArchive("CODING");
    switchCodingSubTab("trex");
  }
}

function filterArchive(filter) {
  playCyberSound("click");
  selectedFilter = filter;
  
  // Highlight tab
  document.querySelectorAll("[data-filter-btn]").forEach((btn) => {
    const f = btn.getAttribute("data-filter-btn");
    if (f === filter) {
      btn.className = "px-3 py-1.5 border rounded cursor-pointer transition-all bg-neon-purple/20 border-neon-purple text-neon-purple font-bold shadow-[0_0_8px_rgba(157,78,221,0.25)]";
    } else {
      btn.className = "px-3 py-1.5 border rounded cursor-pointer transition-all border-white/10 hover:border-white/25 text-zinc-400 bg-cyber-black/40";
    }
  });

  const subtabsBar = document.getElementById("coding-subtabs-bar");
  if (subtabsBar) {
    if (filter === "CODING" || filter === "ALL") {
      subtabsBar.classList.remove("hidden");
    } else {
      subtabsBar.classList.add("hidden");
    }
  }

  if (codingSubTab === "trex" && (filter === "CODING" || filter === "ALL")) {
    switchCodingSubTab("trex");
  } else {
    const gameWorkspace = document.getElementById("trex-game-workspace");
    const logsList = document.getElementById("archive-logs-list");
    if (gameWorkspace) gameWorkspace.classList.add("hidden");
    if (logsList) logsList.classList.remove("hidden");
    renderArchiveLogsList();
  }
}

function renderArchiveLogsList() {
  const container = document.getElementById("archive-logs-list");
  if (!container) return;
  container.innerHTML = "";

  const filtered = selectedFilter === "ALL" 
    ? state.archiveLogs 
    : state.archiveLogs.filter(l => l.category === selectedFilter);

  filtered.forEach((log) => {
    const div = document.createElement("div");
    const isActive = activeLogId === log.id;
    div.className = `border rounded-lg p-4 cursor-pointer transition-all flex flex-col gap-3 relative select-none ${
      isActive 
        ? 'border-neon-purple bg-neon-purple/5 shadow-[0_0_12px_rgba(157,78,221,0.15)]' 
        : 'border-white/5 bg-cyber-dark/40 hover:border-white/15'
    }`;
    
    let statusClass = "border-zinc-500 text-zinc-500 bg-zinc-500/5";
    if (log.status === "EXECUTING") statusClass = "border-neon-green/30 text-neon-green bg-neon-green/5 animate-pulse";
    if (log.status === "COMPILED") statusClass = "border-neon-cyan/25 text-neon-cyan bg-neon-cyan/5";
    if (log.status === "PLAYABLE") statusClass = "border-neon-yellow/40 text-neon-yellow bg-neon-yellow/10 font-bold animate-pulse";

    div.innerHTML = `
      <div class="flex justify-between items-center text-[10px] sm:text-xs font-mono">
        <div class="flex items-center gap-2">
          <span class="text-neon-cyan font-bold">${log.hash}</span>
          <span class="text-zinc-600">|</span>
          <span class="text-zinc-500 uppercase">${log.category}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-zinc-500">${log.date}</span>
          <span class="px-1.5 py-0.5 border rounded text-[8px] tracking-wide ${statusClass}">
            ${log.status}
          </span>
        </div>
      </div>

      <div class="flex justify-between items-start gap-4">
        <div>
          <h3 class="text-sm md:text-base font-terminal font-bold uppercase text-white tracking-wide hover:text-neon-purple transition-colors flex items-center gap-2">
            <span>${log.title}</span>
            ${log.id === "arch_trex" ? '<span class="px-1.5 py-0.2 bg-neon-magenta/20 text-neon-magenta text-[9px] rounded border border-neon-magenta/40">GAME</span>' : ''}
          </h3>
          <p class="text-xs font-sans text-zinc-400 mt-1 lines-clamp-2 leading-relaxed">
            ${log.description}
          </p>
        </div>
        <div class="p-2 border border-white/5 bg-black/40 rounded shrink-0">
          <i data-lucide="${log.id === "arch_trex" ? "gamepad-2" : "eye"}" class="w-4 h-4 ${isActive ? 'text-neon-purple' : 'text-zinc-600'}"></i>
        </div>
      </div>
    `;

    div.onclick = () => selectLogDiagnostics(log.id);
    container.appendChild(div);
  });
  lucide.createIcons();
}

// ==========================================
// T-REX GAME ENGINE (GOOGLE DINO RUN)
// ==========================================

let trexGame = {
  canvas: null,
  ctx: null,
  animationId: null,
  gameState: "READY", // "READY", "RUNNING", "GAMEOVER"
  score: 0,
  highScore: 0,
  speed: 6,
  distance: 0,
  theme: "cyber", // "cyber" or "classic"
  listenersAttached: false,
  
  dino: {
    x: 40,
    y: 126,
    width: 40,
    height: 44,
    vy: 0,
    gravity: 0.65,
    jumpForce: -11.5,
    isJumping: false,
    isDucking: false,
    legFrame: 0,
    legTimer: 0
  },
  
  obstacles: [],
  obstacleTimer: 0,
  particles: [],
  clouds: []
};

function getTRexHighScore() {
  try {
    return parseInt(localStorage.getItem("goth_trex_highscore") || "0", 10);
  } catch (_) {
    return 0;
  }
}

function setTRexHighScore(s) {
  try {
    localStorage.setItem("goth_trex_highscore", s.toString());
  } catch (_) {}
}

function initTRexCanvas(canvasId = "trex-game-canvas") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  trexGame.canvas = canvas;
  trexGame.ctx = canvas.getContext("2d");
  trexGame.highScore = getTRexHighScore();
  
  if (!trexGame.listenersAttached) {
    window.addEventListener("keydown", handleTRexKeyDown);
    window.addEventListener("keyup", handleTRexKeyUp);
    trexGame.listenersAttached = true;
  }
  
  canvas.onmousedown = (e) => {
    e.preventDefault();
    triggerTRexJump();
  };
  canvas.ontouchstart = (e) => {
    e.preventDefault();
    triggerTRexJump();
  };

  resetTRexGameState();
  drawTRexFrame();
}

function resetTRexGameState() {
  if (trexGame.animationId) {
    cancelAnimationFrame(trexGame.animationId);
    trexGame.animationId = null;
  }
  
  trexGame.gameState = "READY";
  trexGame.score = 0;
  trexGame.speed = 6;
  trexGame.distance = 0;
  trexGame.obstacles = [];
  trexGame.obstacleTimer = 0;
  trexGame.particles = [];
  
  trexGame.dino.x = 40;
  trexGame.dino.y = 126;
  trexGame.dino.width = 40;
  trexGame.dino.height = 44;
  trexGame.dino.vy = 0;
  trexGame.dino.isJumping = false;
  trexGame.dino.isDucking = false;
  
  trexGame.clouds = [
    { x: 150, y: 30, speed: 0.5, size: 20 },
    { x: 380, y: 50, speed: 0.3, size: 15 },
    { x: 520, y: 25, speed: 0.4, size: 25 }
  ];
  
  updateTRexScoreBoard();
}

function startTRexGame() {
  if (trexGame.gameState === "RUNNING") return;
  
  resetTRexGameState();
  trexGame.gameState = "RUNNING";
  playCyberSound("click");
  
  let lastTime = performance.now();
  
  function loop(now) {
    if (trexGame.gameState !== "RUNNING") return;
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    
    updateTRexGame(dt);
    drawTRexFrame();
    
    trexGame.animationId = requestAnimationFrame(loop);
  }
  
  trexGame.animationId = requestAnimationFrame(loop);
}

function triggerTRexJump() {
  if (trexGame.gameState === "READY" || trexGame.gameState === "GAMEOVER") {
    startTRexGame();
    return;
  }
  
  if (trexGame.gameState === "RUNNING" && !trexGame.dino.isJumping) {
    trexGame.dino.vy = trexGame.dino.jumpForce;
    trexGame.dino.isJumping = true;
    playCyberSound("click");
    
    for (let i = 0; i < 5; i++) {
      trexGame.particles.push({
        x: trexGame.dino.x + 10,
        y: 170,
        vx: (Math.random() - 0.5) * 3,
        vy: -Math.random() * 2,
        life: 1,
        color: trexGame.theme === "cyber" ? "#00f5ff" : "#888"
      });
    }
  }
}

function triggerTRexDuck(isDucking) {
  if (trexGame.gameState !== "RUNNING") return;
  trexGame.dino.isDucking = isDucking;
  
  if (isDucking) {
    if (trexGame.dino.isJumping) {
      trexGame.dino.vy += 6;
    }
    trexGame.dino.width = 52;
    trexGame.dino.height = 26;
  } else {
    trexGame.dino.width = 40;
    trexGame.dino.height = 44;
  }
}

function handleTRexKeyDown(e) {
  const activeEl = document.activeElement;
  if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) return;
  
  if (["Space", "ArrowUp", "ArrowDown", "KeyW", "KeyS"].includes(e.code)) {
    const canvas = trexGame.canvas;
    if (canvas && canvas.offsetParent !== null) {
      e.preventDefault();
    }
  }
  
  if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
    triggerTRexJump();
  } else if (e.code === "ArrowDown" || e.code === "KeyS") {
    triggerTRexDuck(true);
  }
}

function handleTRexKeyUp(e) {
  if (e.code === "ArrowDown" || e.code === "KeyS") {
    triggerTRexDuck(false);
  }
}

function updateTRexGame(dt) {
  trexGame.speed += 0.0012;
  trexGame.distance += trexGame.speed * 0.15;
  const newScore = Math.floor(trexGame.distance);
  
  if (newScore > 0 && newScore % 100 === 0 && newScore !== trexGame.score) {
    playCyberSound("hover");
  }
  
  trexGame.score = newScore;
  if (trexGame.score > trexGame.highScore) {
    trexGame.highScore = trexGame.score;
    setTRexHighScore(trexGame.highScore);
  }
  
  updateTRexScoreBoard();
  
  const groundY = trexGame.dino.isDucking ? 144 : 126;
  
  trexGame.dino.y += trexGame.dino.vy;
  trexGame.dino.vy += trexGame.dino.gravity;
  
  if (trexGame.dino.y >= groundY) {
    trexGame.dino.y = groundY;
    trexGame.dino.vy = 0;
    trexGame.dino.isJumping = false;
  }
  
  trexGame.dino.legTimer += 1;
  if (trexGame.dino.legTimer > Math.max(2, 8 - Math.floor(trexGame.speed / 2))) {
    trexGame.dino.legFrame = (trexGame.dino.legFrame + 1) % 2;
    trexGame.dino.legTimer = 0;
  }
  
  trexGame.obstacleTimer += 1;
  const spawnThreshold = Math.max(45, 110 - Math.floor(trexGame.speed * 4) + Math.random() * 30);
  
  if (trexGame.obstacleTimer > spawnThreshold) {
    trexGame.obstacleTimer = 0;
    
    const rand = Math.random();
    let obsType = "cactus_small";
    if (rand > 0.75 && trexGame.score > 150) {
      obsType = "drone_fly";
    } else if (rand > 0.45) {
      obsType = "cactus_large";
    } else if (rand > 0.3) {
      obsType = "cactus_double";
    }
    
    let obsWidth = 20;
    let obsHeight = 40;
    let obsY = 130;
    
    if (obsType === "cactus_small") {
      obsWidth = 18;
      obsHeight = 36;
      obsY = 134;
    } else if (obsType === "cactus_double") {
      obsWidth = 36;
      obsHeight = 38;
      obsY = 132;
    } else if (obsType === "cactus_large") {
      obsWidth = 26;
      obsHeight = 46;
      obsY = 124;
    } else if (obsType === "drone_fly") {
      obsWidth = 36;
      obsHeight = 24;
      const alt = Math.random();
      if (alt > 0.6) {
        obsY = 90;
      } else if (alt > 0.3) {
        obsY = 115;
      } else {
        obsY = 138;
      }
    }
    
    trexGame.obstacles.push({
      type: obsType,
      x: 620,
      y: obsY,
      width: obsWidth,
      height: obsHeight,
      wingFrame: 0
    });
  }
  
  for (let i = trexGame.obstacles.length - 1; i >= 0; i--) {
    const obs = trexGame.obstacles[i];
    obs.x -= trexGame.speed;
    
    if (obs.type === "drone_fly") {
      obs.wingFrame = (obs.wingFrame + 0.2) % 2;
    }
    
    const dinoHitbox = {
      x: trexGame.dino.x + 6,
      y: trexGame.dino.y + 4,
      w: trexGame.dino.width - 12,
      h: trexGame.dino.height - 8
    };
    
    const obsHitbox = {
      x: obs.x + 4,
      y: obs.y + 4,
      w: obs.width - 8,
      h: obs.height - 8
    };
    
    if (
      dinoHitbox.x < obsHitbox.x + obsHitbox.w &&
      dinoHitbox.x + dinoHitbox.w > obsHitbox.x &&
      dinoHitbox.y < obsHitbox.y + obsHitbox.h &&
      dinoHitbox.y + dinoHitbox.h > obsHitbox.y
    ) {
      handleTRexGameOver();
      return;
    }
    
    if (obs.x + obs.width < -20) {
      trexGame.obstacles.splice(i, 1);
    }
  }
  
  trexGame.clouds.forEach(cloud => {
    cloud.x -= cloud.speed;
    if (cloud.x < -60) cloud.x = 640;
  });
  
  for (let i = trexGame.particles.length - 1; i >= 0; i--) {
    const p = trexGame.particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.05;
    if (p.life <= 0) trexGame.particles.splice(i, 1);
  }
}

function handleTRexGameOver() {
  trexGame.gameState = "GAMEOVER";
  playCyberSound("glitch");
  
  for (let i = 0; i < 20; i++) {
    trexGame.particles.push({
      x: trexGame.dino.x + 20,
      y: trexGame.dino.y + 20,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      life: 1,
      color: Math.random() > 0.5 ? "#ff007f" : "#00f5ff"
    });
  }
  
  drawTRexFrame();
}

function drawTRexFrame() {
  const ctx = trexGame.ctx;
  if (!ctx) return;
  
  const w = 600;
  const h = 200;
  
  ctx.fillStyle = trexGame.theme === "cyber" ? "#07070c" : "#f7f7f7";
  ctx.fillRect(0, 0, w, h);
  
  if (trexGame.theme === "cyber") {
    ctx.strokeStyle = "rgba(0, 245, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let x = (trexGame.distance % 20) * -1; x < w; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 170);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    
    ctx.fillStyle = "rgba(255, 0, 127, 0.3)";
    ctx.beginPath();
    ctx.arc(520, 45, 18, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    [ [100, 30], [240, 20], [350, 50], [450, 25] ].forEach(([sx, sy]) => {
      ctx.fillRect(sx, sy, 2, 2);
    });
  }
  
  ctx.fillStyle = trexGame.theme === "cyber" ? "rgba(157, 78, 221, 0.2)" : "#ddd";
  trexGame.clouds.forEach(c => {
    ctx.fillRect(c.x, c.y, c.size * 1.8, 8);
    ctx.fillRect(c.x + 4, c.y - 5, c.size * 1.2, 6);
  });
  
  ctx.strokeStyle = trexGame.theme === "cyber" ? "#00f5ff" : "#535353";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 170);
  ctx.lineTo(w, 170);
  ctx.stroke();
  
  ctx.fillStyle = trexGame.theme === "cyber" ? "rgba(0, 245, 255, 0.4)" : "#888";
  for (let x = (trexGame.distance * 1.5) % 30 * -1; x < w; x += 30) {
    ctx.fillRect(x + 5, 175, 3, 2);
    ctx.fillRect(x + 18, 182, 4, 2);
    ctx.fillRect(x + 24, 173, 2, 2);
  }
  
  trexGame.obstacles.forEach(obs => {
    drawTRexObstacle(ctx, obs);
  });
  
  drawTRexDino(ctx, trexGame.dino);
  
  trexGame.particles.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillRect(p.x, p.y, 4, 4);
    ctx.globalAlpha = 1.0;
  });
  
  drawTRexUI(ctx, w, h);
}

function drawTRexDino(ctx, dino) {
  const isCyber = trexGame.theme === "cyber";
  const primaryColor = isCyber ? "#00f5ff" : "#535353";
  const eyeColor = isCyber ? "#ff007f" : "#ffffff";
  
  ctx.fillStyle = primaryColor;
  
  if (dino.isDucking) {
    ctx.fillRect(dino.x, dino.y + 8, 44, 18);
    ctx.fillRect(dino.x + 30, dino.y, 22, 14);
    ctx.fillStyle = eyeColor;
    ctx.fillRect(dino.x + 42, dino.y + 3, 3, 3);
    ctx.fillStyle = primaryColor;
    ctx.fillRect(dino.x - 8, dino.y + 10, 10, 6);
    if (trexGame.gameState === "RUNNING") {
      if (Math.floor(dino.legFrame) === 0) {
        ctx.fillRect(dino.x + 10, dino.y + 24, 6, 8);
        ctx.fillRect(dino.x + 26, dino.y + 24, 6, 4);
      } else {
        ctx.fillRect(dino.x + 10, dino.y + 24, 6, 4);
        ctx.fillRect(dino.x + 26, dino.y + 24, 6, 8);
      }
    } else {
      ctx.fillRect(dino.x + 12, dino.y + 24, 6, 8);
      ctx.fillRect(dino.x + 24, dino.y + 24, 6, 8);
    }
  } else {
    ctx.fillRect(dino.x + 18, dino.y, 22, 18);
    ctx.fillRect(dino.x + 22, dino.y + 12, 18, 6);
    ctx.fillStyle = eyeColor;
    if (trexGame.gameState === "GAMEOVER") {
      ctx.fillRect(dino.x + 28, dino.y + 4, 4, 4);
    } else {
      ctx.fillRect(dino.x + 30, dino.y + 4, 3, 3);
    }
    ctx.fillStyle = primaryColor;
    
    if (isCyber) {
      ctx.fillStyle = "#ff007f";
      ctx.fillRect(dino.x + 16, dino.y + 16, 8, 3);
      ctx.fillStyle = primaryColor;
    }
    
    ctx.fillRect(dino.x + 10, dino.y + 18, 22, 18);
    ctx.fillRect(dino.x, dino.y + 20, 12, 8);
    ctx.fillRect(dino.x - 4, dino.y + 18, 6, 6);
    ctx.fillRect(dino.x + 28, dino.y + 22, 6, 3);
    
    if (dino.isJumping) {
      ctx.fillRect(dino.x + 12, dino.y + 36, 5, 5);
      ctx.fillRect(dino.x + 22, dino.y + 36, 5, 5);
    } else if (trexGame.gameState === "RUNNING") {
      if (dino.legFrame === 0) {
        ctx.fillRect(dino.x + 12, dino.y + 36, 5, 8);
        ctx.fillRect(dino.x + 22, dino.y + 36, 5, 4);
      } else {
        ctx.fillRect(dino.x + 12, dino.y + 36, 5, 4);
        ctx.fillRect(dino.x + 22, dino.y + 36, 5, 8);
      }
    } else {
      ctx.fillRect(dino.x + 12, dino.y + 36, 5, 8);
      ctx.fillRect(dino.x + 22, dino.y + 36, 5, 8);
    }
  }
}

function drawTRexObstacle(ctx, obs) {
  const isCyber = trexGame.theme === "cyber";
  
  if (obs.type.startsWith("cactus")) {
    ctx.fillStyle = isCyber ? "#ff007f" : "#535353";
    
    ctx.fillRect(obs.x + obs.width * 0.3, obs.y, obs.width * 0.4, obs.height);
    ctx.fillRect(obs.x, obs.y + obs.height * 0.3, obs.width * 0.3, obs.height * 0.35);
    ctx.fillRect(obs.x + obs.width * 0.7, obs.y + obs.height * 0.2, obs.width * 0.3, obs.height * 0.4);
    
    if (isCyber) {
      ctx.fillStyle = "#00f5ff";
      ctx.fillRect(obs.x + obs.width * 0.3 - 2, obs.y + 6, 2, 2);
      ctx.fillRect(obs.x + obs.width * 0.7 + 2, obs.y + 12, 2, 2);
    }
  } else if (obs.type === "drone_fly") {
    ctx.fillStyle = isCyber ? "#ffe600" : "#535353";
    
    ctx.fillRect(obs.x + 8, obs.y + 8, 20, 8);
    ctx.fillRect(obs.x, obs.y + 10, 10, 4);
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(obs.x + 18, obs.y + 4, 3, 3);
    
    ctx.fillStyle = isCyber ? "#00f5ff" : "#777777";
    if (Math.floor(obs.wingFrame) === 0) {
      ctx.fillRect(obs.x + 12, obs.y - 6, 8, 14);
    } else {
      ctx.fillRect(obs.x + 12, obs.y + 12, 8, 12);
    }
  }
}

function drawTRexUI(ctx, w, h) {
  const isCyber = trexGame.theme === "cyber";
  const textColor = isCyber ? "#00f5ff" : "#535353";
  
  ctx.fillStyle = textColor;
  ctx.font = "12px monospace";
  ctx.textAlign = "right";
  
  const scoreStr = trexGame.score.toString().padStart(5, '0');
  const hiStr = trexGame.highScore.toString().padStart(5, '0');
  
  ctx.fillText(`HI ${hiStr}  ${scoreStr}`, w - 15, 25);
  
  if (trexGame.gameState === "READY") {
    ctx.textAlign = "center";
    ctx.font = "bold 14px monospace";
    ctx.fillStyle = isCyber ? "#ff007f" : "#333333";
    ctx.fillText("🦖 PRESS SPACE / UP ARROW OR TAP TO RUN", w / 2, h / 2 - 10);
    ctx.font = "11px monospace";
    ctx.fillStyle = isCyber ? "#00f5ff" : "#666666";
    ctx.fillText("[ SPACE = JUMP | DOWN = DUCK ]", w / 2, h / 2 + 15);
  } else if (trexGame.gameState === "GAMEOVER") {
    ctx.textAlign = "center";
    ctx.font = "bold 18px monospace";
    ctx.fillStyle = isCyber ? "#ff007f" : "#d32f2f";
    ctx.fillText("G A M E   O V E R", w / 2, h / 2 - 20);
    
    ctx.font = "bold 12px monospace";
    ctx.fillStyle = isCyber ? "#ffe600" : "#333333";
    ctx.fillText(`SYSTEM COLLISION // SCORE: ${scoreStr}`, w / 2, h / 2 + 5);
    
    ctx.font = "11px monospace";
    ctx.fillStyle = isCyber ? "#00f5ff" : "#666666";
    ctx.fillText("PRESS SPACE OR TAP TO REBOOT SIMULATION", w / 2, h / 2 + 30);
  }
}

function updateTRexScoreBoard() {
  const scoreEl = document.getElementById("trex-score-val");
  const hiEl = document.getElementById("trex-hi-val");
  if (scoreEl) scoreEl.textContent = trexGame.score.toString().padStart(5, '0');
  if (hiEl) hiEl.textContent = trexGame.highScore.toString().padStart(5, '0');

  const modalScore = document.getElementById("trex-score-val-modal");
  const modalHi = document.getElementById("trex-hi-val-modal");
  if (modalScore) modalScore.textContent = trexGame.score.toString().padStart(5, '0');
  if (modalHi) modalHi.textContent = trexGame.highScore.toString().padStart(5, '0');
}

function toggleTRexTheme() {
  trexGame.theme = trexGame.theme === "cyber" ? "classic" : "cyber";
  playCyberSound("click");
  drawTRexFrame();
}

let codingSubTab = "list"; // "list" or "trex"

function switchCodingSubTab(subTab) {
  playCyberSound("click");
  codingSubTab = subTab;
  
  const listBtn = document.getElementById("subtab-btn-list");
  const trexBtn = document.getElementById("subtab-btn-trex");
  const logsList = document.getElementById("archive-logs-list");
  const gameWorkspace = document.getElementById("trex-game-workspace");

  if (subTab === "trex") {
    if (listBtn) listBtn.className = "px-3 py-1.5 rounded font-terminal font-bold transition-all text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 bg-black/40 flex items-center gap-1.5 cursor-pointer";
    if (trexBtn) trexBtn.className = "px-3 py-1.5 rounded font-terminal font-bold transition-all bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/60 shadow-[0_0_12px_rgba(255,230,0,0.3)] flex items-center gap-2 cursor-pointer";
    
    if (logsList) logsList.classList.add("hidden");
    if (gameWorkspace) gameWorkspace.classList.remove("hidden");

    initTRexCanvas("trex-game-canvas");
    selectLogDiagnostics("arch_trex");
  } else {
    if (listBtn) listBtn.className = "px-3 py-1.5 rounded font-terminal font-bold transition-all bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 shadow-[0_0_8px_rgba(0,245,255,0.2)] flex items-center gap-1.5 cursor-pointer";
    if (trexBtn) trexBtn.className = "px-3 py-1.5 rounded font-terminal font-bold transition-all text-zinc-400 hover:text-neon-yellow border border-white/10 hover:border-neon-yellow/40 bg-black/40 flex items-center gap-2 cursor-pointer group";

    if (gameWorkspace) gameWorkspace.classList.add("hidden");
    if (logsList) logsList.classList.remove("hidden");

    renderArchiveLogsList();
  }
}

function openTRexGameModal() {
  playCyberSound("click");
  let modal = document.getElementById("trex-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "trex-modal";
    modal.className = "fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none";
    modal.innerHTML = `
      <div class="bg-cyber-black border-2 border-neon-cyan/50 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-[0_0_35px_rgba(0,245,255,0.3)] relative flex flex-col gap-4 font-mono">
        <div class="flex justify-between items-center border-b border-white/10 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="text-2xl">🦖</span>
            <div>
              <h3 class="font-terminal font-bold text-white uppercase text-base sm:text-lg tracking-wider">T-REX DINO RUN // GOOGLE DINO GAME</h3>
              <p class="text-[10px] text-neon-cyan">Cyber-Goth Arcade Engine</p>
            </div>
          </div>
          <button onclick="window.closeTRexGameModal()" class="w-8 h-8 rounded-full border border-white/20 hover:border-neon-magenta text-zinc-400 hover:text-neon-magenta flex items-center justify-center text-lg font-bold cursor-pointer transition-colors">
            ✕
          </button>
        </div>
        
        <div class="flex justify-between items-center bg-black/60 px-3 py-1.5 rounded border border-white/10 text-xs">
          <span class="text-zinc-400">SCORE: <strong id="trex-score-val-modal" class="text-neon-cyan font-bold">00000</strong></span>
          <span class="text-zinc-400">HIGH: <strong id="trex-hi-val-modal" class="text-neon-yellow font-bold">00000</strong></span>
        </div>

        <div class="relative w-full overflow-hidden rounded-lg border-2 border-neon-cyan/40 bg-cyber-black shadow-[0_0_20px_rgba(0,245,255,0.2)]">
          <canvas id="trex-modal-canvas" width="600" height="200" class="w-full h-auto block cursor-pointer"></canvas>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 font-terminal text-xs">
          <button onclick="window.triggerTRexJump()" class="py-2.5 bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 rounded font-bold hover:bg-neon-cyan/30 flex items-center justify-center gap-1">⬆ JUMP</button>
          <button onmousedown="window.triggerTRexDuck(true)" onmouseup="window.triggerTRexDuck(false)" ontouchstart="window.triggerTRexDuck(true)" ontouchend="window.triggerTRexDuck(false)" class="py-2.5 bg-neon-purple/20 text-neon-purple border border-neon-purple/40 rounded font-bold hover:bg-neon-purple/30 flex items-center justify-center gap-1">⬇ DUCK</button>
          <button onclick="window.startTRexGame()" class="py-2.5 bg-neon-magenta/20 text-neon-magenta border border-neon-magenta/40 rounded font-bold hover:bg-neon-magenta/30 flex items-center justify-center gap-1">🔄 REBOOT</button>
          <button onclick="window.toggleTRexTheme()" class="py-2.5 bg-black/60 text-neon-yellow border border-neon-yellow/30 rounded font-bold hover:border-neon-yellow/60 flex items-center justify-center gap-1">🎨 THEME</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    modal.classList.remove("hidden");
  }
  
  initTRexCanvas("trex-modal-canvas");
}

function closeTRexGameModal() {
  playCyberSound("click");
  const modal = document.getElementById("trex-modal");
  if (modal) modal.classList.add("hidden");
  if (trexGame.animationId) {
    cancelAnimationFrame(trexGame.animationId);
    trexGame.animationId = null;
  }
}

function selectLogDiagnostics(id) {
  playCyberSound("glitch");
  activeLogId = id;
  
  // Re-render list to highlight correct item
  renderArchiveLogsList();

  const detailsContainer = document.getElementById("log-diagnostics-details");
  const log = state.archiveLogs.find(l => l.id === id);

  if (log) {
    detailsContainer.innerHTML = `
      <div class="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse-glow"></div>

      <div class="flex items-center justify-between border-b border-white/5 pb-2">
        <span class="text-neon-cyan uppercase">LOG BUFFER DIAGNOSTICS</span>
        <span class="text-zinc-600 font-bold">${log.hash}</span>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-white text-sm font-terminal font-bold uppercase tracking-wider mb-1">
          ${log.title}
        </div>
        <div>
          <span class="text-zinc-500 uppercase block mb-1">Extended Log Metrics:</span>
          <div class="text-zinc-300 font-sans leading-relaxed text-xs p-2.5 bg-cyber-dark rounded border border-white/5">
            ${log.extendedLog}
          </div>
        </div>
        ${log.embedHtml ? log.embedHtml : ""}
      </div>

      <div>
        <span class="text-zinc-500 uppercase block mb-1.5">Active Tech Tokens:</span>
        <div class="flex flex-wrap gap-1.5">
          ${log.tags.map(tag => `
            <span class="px-2 py-1 border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan rounded text-[10px]">
              #${tag}
            </span>
          `).join("")}
        </div>
      </div>

      <div class="border-t border-white/5 pt-3 mt-1 flex justify-between items-center text-[10px] text-zinc-500">
        <span>COMPILER: v19.2.0-secure</span>
        <span>STATUS: SECURE_VAULT</span>
      </div>
    `;
  } else {
    detailsContainer.innerHTML = `
      <div class="border border-white/5 bg-cyber-dark/40 rounded-lg p-8 flex flex-col justify-center items-center text-center text-zinc-500 font-terminal gap-4.5 min-h-[340px]">
        <div class="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center bg-black/20 text-zinc-600 animate-pulse">
          <i data-lucide="folder-git" class="w-6 h-6"></i>
        </div>
        <div>
          <div class="text-zinc-400 font-bold uppercase mb-1">DIAGNOSTICS BUFFER IDLE</div>
          <p class="text-xs font-sans text-zinc-500 max-w-xs leading-relaxed">
            Select any project, AI experiment, or student logging protocol from the Data Vault directory file listing to boot diagnostics.
          </p>
        </div>
      </div>
    `;
  }
  lucide.createIcons();
}

// Tunnel Transmission Tab view
let contactMode = "MESSAGE";
let fuelAmount = 5;

function setContactMode(mode) {
  playCyberSound("click");
  contactMode = mode;

  const msgTab = document.getElementById("tab-msg");
  const coffeeTab = document.getElementById("tab-coffee");
  const newsletterTab = document.getElementById("tab-newsletter");
  const infoEl = document.getElementById("contact-info-text");
  const configGrid = document.getElementById("coffee-fuel-grid");
  const categoryGroup = document.getElementById("contact-category-group");
  const messageGroup = document.getElementById("contact-message-group");
  const msgInput = document.getElementById("message-input");
  const submitBtn = document.getElementById("submit-btn");

  if (msgInput) {
    msgInput.required = (mode !== "NEWSLETTER");
  }

  if (mode === "MESSAGE") {
    if (msgTab) msgTab.className = "px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border border-neon-cyan text-neon-cyan bg-neon-cyan/10 transition-all";
    if (coffeeTab) coffeeTab.className = "px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border border-transparent text-zinc-500 hover:text-zinc-300 transition-all flex items-center gap-2";
    if (newsletterTab) newsletterTab.className = "px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border border-transparent text-zinc-500 hover:text-zinc-300 transition-all flex items-center gap-2";
    if (infoEl) infoEl.textContent = "Draft generic transmissions, ask queries, or propose contract collaborations directly. This transaction registers instantly to the local buffer index.";
    if (configGrid) configGrid.classList.add("hidden");
    if (categoryGroup) categoryGroup.classList.remove("hidden");
    if (messageGroup) messageGroup.classList.remove("hidden");
    
    const msgLabel = document.getElementById("message-label");
    if (msgLabel) msgLabel.textContent = "TRANSMISSION://RAW_MESSAGE_PAYLOAD";
    if (msgInput) msgInput.placeholder = "Draft your digital package protocols here...";
    if (submitBtn) {
      submitBtn.innerHTML = `
        <i data-lucide="send" class="w-4 h-4"></i>
        <span>Send Signal / Transmit Message</span>
      `;
    }
  } else if (mode === "COFFEE") {
    if (msgTab) msgTab.className = "px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border border-transparent text-zinc-500 hover:text-zinc-300 transition-all";
    if (coffeeTab) coffeeTab.className = "px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border border-neon-yellow text-neon-yellow bg-neon-yellow/10 border-glow-yellow transition-all flex items-center gap-2";
    if (newsletterTab) newsletterTab.className = "px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border border-transparent text-zinc-500 hover:text-zinc-300 transition-all flex items-center gap-2";
    if (infoEl) {
      infoEl.innerHTML = `
        <span class="font-bold text-neon-yellow flex items-center gap-1">
          <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
          COFFEE FUEL RECHARGE INITIATED
        </span>
        <span>
          Fuel Tashenea's research and development schedule. Select a custom resource tier to inject dynamic caffeine cells. Includes secure local ledger persistence.
        </span>
      `;
    }
    if (configGrid) configGrid.classList.remove("hidden");
    if (categoryGroup) categoryGroup.classList.remove("hidden");
    if (messageGroup) messageGroup.classList.remove("hidden");
    
    const msgLabel = document.getElementById("message-label");
    if (msgLabel) msgLabel.textContent = "RECHARGE_PROTOCOL://SUPPORT_MESSAGE";
    if (msgInput) msgInput.placeholder = "Write a coffee greeting or word of encouragement...";
    updateSubmitBtnCoffee();
  } else if (mode === "NEWSLETTER") {
    if (msgTab) msgTab.className = "px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border border-transparent text-zinc-500 hover:text-zinc-300 transition-all";
    if (coffeeTab) coffeeTab.className = "px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border border-transparent text-zinc-500 hover:text-zinc-300 transition-all flex items-center gap-2";
    if (newsletterTab) newsletterTab.className = "px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border border-neon-cyan text-neon-cyan bg-neon-cyan/10 transition-all flex items-center gap-2";
    if (infoEl) {
      infoEl.innerHTML = `
        <span class="font-bold text-neon-cyan flex items-center gap-1">
          <i data-lucide="mail" class="w-3.5 h-3.5 animate-pulse"></i>
          NEWSLETTER_GATEWAY://SUBSCRIBE_UPLINK
        </span>
        <span>
          Join our exclusive Cyber-Hive frequency. Get career-acceleration tactics, Christian tech mentoring, freelance strategies, and building telemetry updates delivered directly to your node.
        </span>
      `;
    }
    if (configGrid) configGrid.classList.add("hidden");
    if (categoryGroup) categoryGroup.classList.add("hidden");
    if (messageGroup) messageGroup.classList.add("hidden");
    if (submitBtn) {
      submitBtn.innerHTML = `
        <i data-lucide="mail" class="w-4 h-4 text-neon-cyan"></i>
        <span>Subscribe to Newsletter / Establish Uplink</span>
      `;
    }
  }
  lucide.createIcons();
}

function selectCoffeeAmount(amt) {
  playCyberSound("click");
  fuelAmount = amt;
  document.getElementById("custom-coffee-input").value = "";

  document.querySelectorAll("[data-coffee-btn]").forEach((btn) => {
    const val = parseInt(btn.getAttribute("data-coffee-btn"));
    if (val === amt) {
      btn.className = "p-3 border rounded text-center flex flex-col gap-1.5 items-center justify-center border-neon-yellow bg-neon-yellow/10 text-white font-bold transition-all";
    } else {
      btn.className = "p-3 border border-white/5 bg-cyber-black/40 text-zinc-400 hover:border-white/10 text-center flex flex-col gap-1.5 items-center justify-center transition-all";
    }
  });

  updateSubmitBtnCoffee();
}

function handleCustomCoffee(e) {
  const val = parseFloat(e.target.value);
  if (!isNaN(val) && val > 0) {
    fuelAmount = val;
  }
  // Remove highlighted buttons since custom value is typed
  document.querySelectorAll("[data-coffee-btn]").forEach((btn) => {
    btn.className = "p-3 border border-white/5 bg-cyber-black/40 text-zinc-400 hover:border-white/10 text-center flex flex-col gap-1.5 items-center justify-center transition-all";
  });
  updateSubmitBtnCoffee();
}

function updateSubmitBtnCoffee() {
  document.getElementById("submit-btn").innerHTML = `
    <i data-lucide="coffee" class="w-4 h-4 text-neon-yellow animate-bounce"></i>
    <span>FUEL COFFEE CELL ($${fuelAmount}.00) & SEND MESSAGE</span>
  `;
  lucide.createIcons();
}

// Contact form transmitter
function handleTransmit(e) {
  e.preventDefault();
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const category = document.getElementById("contact-category").value;
  const message = document.getElementById("message-input").value.trim();

  if (contactMode === "NEWSLETTER") {
    if (!email) {
      playCyberSound("glitch");
      return;
    }

    playCyberSound("click");
    
    // Show sending log
    const tunnelLogs = document.getElementById("tunnel-logs-window");
    const transmissionLog = document.createElement("div");
    transmissionLog.className = "text-neon-cyan font-bold animate-pulse mt-1 flex items-center gap-1";
    transmissionLog.innerHTML = `<span>⌛ HANDSHAKE://INITIATING_SECURE_TUNNEL...</span>`;
    if (tunnelLogs) {
      tunnelLogs.appendChild(transmissionLog);
      tunnelLogs.scrollTop = tunnelLogs.scrollHeight;
    }

    // Submit button loader
    const submitBtn = document.getElementById("submit-btn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <div class="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin border-current"></div>
        <span>MONGO_DB://CONNECTING_SECURE_TUNNEL...</span>
      `;
    }

    fetch(getApiEndpoint("/api/newsletter/subscribe"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(data => {
        playCyberSound("success");
        if (submitBtn) submitBtn.disabled = false;
        transmissionLog.remove();

        const successLog = document.createElement("div");
        successLog.className = "text-neon-green font-bold mt-1 flex items-center gap-1";
        successLog.innerHTML = `<span>✔ ${data.message} [${data.database}]</span>`;
        if (tunnelLogs) {
          tunnelLogs.appendChild(successLog);
          tunnelLogs.scrollTop = tunnelLogs.scrollHeight;
        }

        // Save payload to local memory list to visualize in ledger
        const now = new Date();
        const payload = {
          name: name || "Anonymous Node",
          email: email,
          category: "Newsletter Signup",
          message: `Established uplink connection. Status: subscribed. [DB: ${data.database}]`,
          timestamp: now.toISOString().replace("T", " ").substring(0, 19),
          coffeeAmount: null
        };

        state.transmissions.unshift(payload);
        state.transmissions = state.transmissions.slice(0, 5); // Max 5 logs
        savePersistentData();
        renderTransmissions();

        // Reset fields
        document.getElementById("contact-name").value = "";
        document.getElementById("contact-email").value = "";

        setTimeout(() => {
          successLog.remove();
        }, 6000);

        if (submitBtn) {
          submitBtn.innerHTML = `
            <i data-lucide="mail" class="w-4 h-4 text-neon-cyan"></i>
            <span>Subscribe to Newsletter / Establish Uplink</span>
          `;
        }
        lucide.createIcons();
      })
      .catch(err => {
        console.error(err);
        playCyberSound("glitch");
        if (submitBtn) submitBtn.disabled = false;
        transmissionLog.remove();

        const errorLog = document.createElement("div");
        errorLog.className = "text-neon-red font-bold mt-1 flex items-center gap-1";
        errorLog.innerHTML = `<span>❌ UPLINK_FAILURE: CANNOT_WRITE_TO_MONGO_DB</span>`;
        if (tunnelLogs) {
          tunnelLogs.appendChild(errorLog);
          tunnelLogs.scrollTop = tunnelLogs.scrollHeight;
        }

        setTimeout(() => {
          errorLog.remove();
        }, 5000);

        if (submitBtn) {
          submitBtn.innerHTML = `
            <i data-lucide="mail" class="w-4 h-4 text-neon-cyan"></i>
            <span>Subscribe to Newsletter / Establish Uplink</span>
          `;
        }
        lucide.createIcons();
      });

    return;
  }

  if (!name || !email || !message) {
    playCyberSound("glitch");
    return;
  }

  playCyberSound("click");
  
  // Show sending log
  const tunnelLogs = document.getElementById("tunnel-logs-window");
  const transmissionLog = document.createElement("div");
  transmissionLog.className = "text-neon-magenta font-bold animate-pulse mt-1 flex items-center gap-1";
  transmissionLog.innerHTML = `<span>⌛ PROTOCOL_INJECT: TRANSMITTING TO Secure_Message DATABASE...</span>`;
  tunnelLogs.appendChild(transmissionLog);
  tunnelLogs.scrollTop = tunnelLogs.scrollHeight;

  // Submit button loader
  const submitBtn = document.getElementById("submit-btn");
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <div class="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin border-current"></div>
    <span>TRANSMITTING PAYLOAD TO Secure_Message COLLECTION...</span>
  `;

  fetch(getApiEndpoint("/api/secure-message"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      email: email,
      protocol_category: category,
      raw_message_payload: message,
      coffeeAmount: contactMode === "COFFEE" ? fuelAmount : null
    })
  })
    .then(res => res.json())
    .then(data => {
      playCyberSound("success");
      submitBtn.disabled = false;

      // Reset status log
      transmissionLog.remove();
      const successLog = document.createElement("div");
      successLog.className = "text-neon-green font-bold mt-1 flex items-center gap-1";
      successLog.innerHTML = `<span>✔ ${data.message || "TRANSMISSION STORED IN Secure_Message!"} [${data.database}]</span>`;
      tunnelLogs.appendChild(successLog);
      tunnelLogs.scrollTop = tunnelLogs.scrollHeight;

      // Save payload to local state ledger
      const now = new Date();
      const payload = {
        name: name,
        email: email,
        category: category,
        message: message,
        timestamp: now.toISOString().replace("T", " ").substring(0, 19),
        coffeeAmount: contactMode === "COFFEE" ? fuelAmount : null
      };

      state.transmissions.unshift(payload);
      state.transmissions = state.transmissions.slice(0, 5); // Max 5 logs
      savePersistentData();
      renderTransmissions();

      // Reset Form inputs
      document.getElementById("contact-name").value = "";
      document.getElementById("contact-email").value = "";
      document.getElementById("message-input").value = "";
      document.getElementById("custom-coffee-input").value = "";

      setTimeout(() => {
        successLog.remove();
      }, 6000);

      // Reset submit buttons style
      if (contactMode === "COFFEE") {
        updateSubmitBtnCoffee();
      } else {
        submitBtn.innerHTML = `
          <i data-lucide="send" class="w-4 h-4"></i>
          <span>Send Signal / Transmit Message</span>
        `;
      }
      lucide.createIcons();
    })
    .catch(err => {
      console.error("Transmission error:", err);
      playCyberSound("glitch");
      submitBtn.disabled = false;
      transmissionLog.remove();

      const errorLog = document.createElement("div");
      errorLog.className = "text-neon-red font-bold mt-1 flex items-center gap-1";
      errorLog.innerHTML = `<span>❌ UPLINK_FAILURE: CANNOT_WRITE_TO_SECURE_MESSAGE</span>`;
      tunnelLogs.appendChild(errorLog);
      tunnelLogs.scrollTop = tunnelLogs.scrollHeight;

      setTimeout(() => {
        errorLog.remove();
      }, 5000);

      if (contactMode === "COFFEE") {
        updateSubmitBtnCoffee();
      } else {
        submitBtn.innerHTML = `
          <i data-lucide="send" class="w-4 h-4"></i>
          <span>Send Signal / Transmit Message</span>
        `;
      }
      lucide.createIcons();
    });
}

function getEncouragingMessage(protocol, index = 0) {
  const categoryMessages = {
    "General Support": "✨ Uplink established! Stay determined—your curiosity and relentless effort drive real breakthroughs.",
    "Bounty Inquiries": "🚀 Transmission logged! Fortune favors the bold—keep pushing boundaries and reaching new heights.",
    "Subculture Collaborations": "⚡ Synergy acquired! Creative minds unite to build extraordinary things—keep inspiring the network.",
    "Fuel & Coffee Support": "☕ Caffeine & Signal Received! Fueling passion into perfection—your energy is truly unstoppable!",
    "Newsletter Signup": "📬 Network Uplink Active! Connected to the pulse of innovation—stay curious, bold, and inspired."
  };

  if (categoryMessages[protocol]) {
    return categoryMessages[protocol];
  }

  const pool = [
    "✨ Signal received! Keep pushing forward—your vision and determination shape tomorrow's grid.",
    "🚀 Uplink verified! Every line of effort moves you closer to greatness. Stay resilient!",
    "⚡ Connection confirmed! Radiate positivity into the system—amazing milestones are ahead.",
    "💡 Transmission secured! Bright ideas ignite real progress—keep innovating and believing.",
    "🛡️ Protocol locked! Your hard work and dedication build a stronger path every single day. Onward!"
  ];

  return pool[index % pool.length];
}

function renderTransmissions() {
  const container = document.getElementById("transmissions-list-container");
  const listingSection = document.getElementById("transmissions-listing-section");
  
  if (!container || !listingSection) return;

  if (state.transmissions.length === 0) {
    listingSection.classList.add("hidden");
    return;
  }
  
  listingSection.classList.remove("hidden");
  container.innerHTML = "";

  state.transmissions.forEach((sig, idx) => {
    const div = document.createElement("div");
    div.className = "p-3 border border-neon-cyan/20 bg-zinc-950/80 rounded text-[11px] font-mono flex flex-col gap-1.5 shadow-sm";
    
    const protocolVal = sig.category || sig.protocol_category || "General Support";
    const encouragingMsg = getEncouragingMessage(protocolVal, idx);

    div.innerHTML = `
      <div class="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider">
        <span class="text-neon-magenta">[PROTOCOL: ${protocolVal}]</span>
        <span class="text-zinc-500 text-[9px] flex items-center gap-1 font-mono">
          <i data-lucide="lock" class="w-3 h-3 text-neon-cyan/70"></i>
          PAYLOAD ENCRYPTED
        </span>
      </div>
      <p class="text-neon-green font-sans leading-relaxed text-xs font-medium mt-0.5">
        ${encouragingMsg}
      </p>
    `;

    container.appendChild(div);
  });
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Local Storage Handlers
function savePersistentData() {
  try {
    localStorage.setItem("bee_net_dream_protocols", JSON.stringify(state.dreams));
    localStorage.setItem("bee_net_transmissions", JSON.stringify(state.transmissions));
    localStorage.setItem("bee_net_image_source", state.activeImageSource);
  } catch (_) {}
}

function loadPersistentData() {
  try {
    const savedDreams = localStorage.getItem("bee_net_dream_protocols");
    if (savedDreams) {
      state.dreams = JSON.parse(savedDreams);
    }
    const savedTransmissions = localStorage.getItem("bee_net_transmissions");
    if (savedTransmissions) {
      state.transmissions = JSON.parse(savedTransmissions);
    }
    const savedImageSource = localStorage.getItem("bee_net_image_source");
    if (savedImageSource) {
      state.activeImageSource = savedImageSource;
    }
  } catch (_) {}
}

// Replay Canva Video Iframe helper
function replayCanvaVideo() {
  playCyberSound("success");
  const iframe = document.getElementById("canva-video-iframe");
  if (iframe) {
    const currentSrc = iframe.src;
    iframe.src = "";
    // Brief timeout ensures browser reloads the iframe fresh
    setTimeout(() => {
      iframe.src = currentSrc;
    }, 100);
  }
}

// ==========================================
// INTERACTIVE "HACK THE SYSTEM" ENGINE
// ==========================================

let matrixInterval = null;
let matrixCanvas = null;
let matrixCtx = null;
let isMatrixActive = false;

function toggleMatrixRain() {
  playCyberSound("beep");
  isMatrixActive = !isMatrixActive;
  const canvas = document.getElementById("matrix-canvas");
  const toggleBtnText = document.getElementById("matrix-toggle-status");
  
  if (!canvas) return;

  if (isMatrixActive) {
    canvas.classList.remove("hidden");
    if (toggleBtnText) toggleBtnText.textContent = "MATRIX: ACTIVE";
    startMatrixRain(canvas);
    appendTerminalLog("system", ">>> SCRIPTURE & AFFIRMATION MATRIX RAIN ACTIVATED [SCRIPTURES & AFFIRMATIONS]");
  } else {
    canvas.classList.add("hidden");
    if (toggleBtnText) toggleBtnText.textContent = "MATRIX: READY";
    stopMatrixRain();
    appendTerminalLog("system", ">>> SCRIPTURE MATRIX RAIN DEACTIVATED.");
  }
}

function startMatrixRain(canvas) {
  matrixCanvas = canvas;
  matrixCtx = canvas.getContext("2d");
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();

  const scripturesAndAffirmations = [
    "✝ PHILIPPIANS 4:13 // I CAN DO ALL THINGS THROUGH CHRIST WHO STRENGTHENS ME ",
    "✨ PSALM 139:14 // I AM FEARFULLY AND WONDERFULLY MADE ",
    "👑 PSALM 46:5 // GOD IS WITHIN HER SHE WILL NOT FALL ",
    "🛡️ PSALM 27:1 // THE LORD IS MY LIGHT AND MY SALVATION WHOM SHALL I FEAR ",
    "💡 MATTHEW 5:14 // YOU ARE THE LIGHT OF THE WORLD ",
    "🔥 PROVERBS 3:5 // TRUST IN THE LORD WITH ALL YOUR HEART ",
    "⚡ JOSHUA 1:9 // BE STRONG AND COURAGEOUS DO NOT BE AFRAID ",
    "🕊️ JEREMIAH 29:11 // PLANS TO PROSPER YOU AND GIVE YOU HOPE AND A FUTURE ",
    "🖤 2 CORINTHIANS 5:7 // WALK BY FAITH NOT BY SIGHT ",
    "🐝 FAITH & CODE // I BUILD MY DIGITAL KINGDOM WITH FAITH AND PURPOSE ",
    "💻 DIVINE INTELLECT // CREATED WITH PURPOSE POWER WISDOM AND INTELLECT ",
    "✨ SHINE YOUR LIGHT // GODS GRACE IS MY ULTIMATE POWER SOURCE ",
    "🚀 ROMANS 8:31 // IF GOD IS FOR US WHO CAN BE AGAINST US ",
    "🌟 ISAIAH 40:31 // THEY WHO WAIT FOR THE LORD SHALL RENEW THEIR STRENGTH ",
    "🖤 CYBER-HIVE // BLESSED DRIVEN AND UNSHAKABLE "
  ];

  const fontSize = 15;
  const columnsCount = Math.floor(canvas.width / fontSize);

  // Each column maintains state
  const columns = [];
  for (let i = 0; i < columnsCount; i++) {
    columns.push({
      phraseIdx: Math.floor(Math.random() * scripturesAndAffirmations.length),
      charIdx: Math.floor(Math.random() * 60),
      y: Math.random() * -100,
      speed: 1 + Math.random() * 0.8,
      colorType: Math.floor(Math.random() * 4)
    });
  }

  if (matrixInterval) clearInterval(matrixInterval);

  matrixInterval = setInterval(() => {
    // Fade overlay
    matrixCtx.fillStyle = "rgba(3, 3, 6, 0.08)";
    matrixCtx.fillRect(0, 0, canvas.width, canvas.height);

    matrixCtx.font = "bold " + fontSize + "px 'Share Tech Mono', monospace";

    columns.forEach((col, i) => {
      const phrase = scripturesAndAffirmations[col.phraseIdx];
      const char = phrase[col.charIdx % phrase.length];
      const x = i * fontSize;
      const y = col.y * fontSize;

      // Color selection
      if (col.charIdx % phrase.length === 0 || Math.random() > 0.96) {
        matrixCtx.fillStyle = "#ffffff"; // Bright leading flash
      } else if (col.colorType === 0) {
        matrixCtx.fillStyle = "#fefe00"; // Neon yellow
      } else if (col.colorType === 1) {
        matrixCtx.fillStyle = "#00f0ff"; // Neon cyan
      } else if (col.colorType === 2) {
        matrixCtx.fillStyle = "#ff007f"; // Neon magenta
      } else {
        matrixCtx.fillStyle = "#39ff14"; // Neon green
      }

      matrixCtx.fillText(char, x, y);

      col.y += col.speed;
      col.charIdx++;

      if (y > canvas.height && Math.random() > 0.95) {
        col.y = 0;
        col.phraseIdx = Math.floor(Math.random() * scripturesAndAffirmations.length);
        col.charIdx = 0;
        col.speed = 1 + Math.random() * 0.8;
        col.colorType = Math.floor(Math.random() * 4);
      }
    });
  }, 33);
}

function stopMatrixRain() {
  if (matrixInterval) {
    clearInterval(matrixInterval);
    matrixInterval = null;
  }
}

function triggerScreenGlitch() {
  playCyberSound("glitch");
  const body = document.getElementById("main-body") || document.body;
  body.classList.add("animate-glitch-heavy");
  setTimeout(() => {
    body.classList.remove("animate-glitch-heavy");
  }, 500);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function appendTerminalLog(type, text, isHtml = false) {
  const logContainer = document.getElementById("terminal-output-logs");
  if (!logContainer) return;

  const line = document.createElement("div");
  line.className = "font-mono text-xs my-1 transition-all animate-fadeIn";

  if (type === "cmd") {
    line.className += " text-neon-yellow flex items-start gap-1.5";
    line.innerHTML = `<span class="text-neon-cyan select-none">[operative@tashibee_net]:~$</span> <span>${escapeHtml(text)}</span>`;
  } else if (type === "system") {
    line.className += " text-neon-cyan";
    line.textContent = text;
  } else if (type === "success") {
    line.className += " text-neon-green font-bold";
    line.textContent = text;
  } else if (type === "error") {
    line.className += " text-neon-magenta font-semibold";
    line.textContent = text;
  } else if (type === "raw") {
    if (isHtml) {
      line.innerHTML = text;
    } else {
      line.textContent = text;
    }
  }

  logContainer.appendChild(line);
  logContainer.scrollTop = logContainer.scrollHeight;
}

function handleTerminalSubmit(e) {
  if (e) e.preventDefault();
  const inputEl = document.getElementById("terminal-cmd-input");
  if (!inputEl) return;
  const rawCmd = inputEl.value.trim();
  if (!rawCmd) return;

  appendTerminalLog("cmd", rawCmd);
  inputEl.value = "";
  
  processHackerCommand(rawCmd.toLowerCase());
}

function processHackerCommand(cmd) {
  playCyberSound("click");

  switch (cmd) {
    case "help":
      appendTerminalLog("system", "================ AVAILABLE CYBER COMMANDS ================");
      appendTerminalLog("raw", "<span class='text-neon-yellow font-bold'>hack / override</span> - Bypass firewall and trigger Level 99 Overlord breach", true);
      appendTerminalLog("raw", "<span class='text-neon-yellow font-bold'>matrix</span> - Toggle falling neon digital rain canvas", true);
      appendTerminalLog("raw", "<span class='text-neon-yellow font-bold'>glitch</span> - Trigger a screen neural distortion waveform", true);
      appendTerminalLog("raw", "<span class='text-neon-yellow font-bold'>whoami</span> - Display current operative status & session badges", true);
      appendTerminalLog("raw", "<span class='text-neon-yellow font-bold'>projects / vault</span> - Output featured top CS archive projects", true);
      appendTerminalLog("raw", "<span class='text-neon-yellow font-bold'>stack / skills</span> - Output tech stack and engineering pipelines", true);
      appendTerminalLog("raw", "<span class='text-neon-yellow font-bold'>dossier / bio</span> - Read Tashenea's profile data", true);
      appendTerminalLog("raw", "<span class='text-neon-yellow font-bold'>trex / dino</span> - Launch T-Rex Google Dino Run Arcade Game", true);
      appendTerminalLog("raw", "<span class='text-neon-yellow font-bold'>socials / links</span> - Display official YouTube, Instagram & TikTok channels", true);
      appendTerminalLog("raw", "<span class='text-neon-yellow font-bold'>secret</span> - Unlock hidden easter egg control panel & theme customizer", true);
      appendTerminalLog("raw", "<span class='text-neon-yellow font-bold'>clear</span> - Purge terminal buffer logs", true);
      appendTerminalLog("system", "==========================================================");
      break;

    case "trex":
    case "dino":
    case "dinorun":
    case "game":
    case "play":
      appendTerminalLog("success", "🦖 BOOTING CYBER-GOTH T-REX GAME ENGINE...");
      if (document.getElementById("trex-game-workspace")) {
        filterArchive("CODING");
        switchCodingSubTab("trex");
        const el = document.getElementById("coding-subtabs-bar");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        openTRexGameModal();
      }
      break;

    case "socials":
    case "social":
    case "links":
    case "socialmedia":
      appendTerminalLog("system", "🌐 OFFICIAL SOCIAL MEDIA UPLINKS:");
      appendTerminalLog("raw", "📺 <span class='text-red-400 font-bold'>YouTube:</span> <a href='https://www.youtube.com/channel/UCQuthtMlIsvwBHZZy8U6wMw' target='_blank' rel='noopener noreferrer' class='text-neon-cyan underline hover:text-neon-yellow font-bold'>channel/UCQuthtMlIsvwBHZZy8U6wMw</a>", true);
      appendTerminalLog("raw", "📸 <span class='text-neon-magenta font-bold'>Instagram:</span> <a href='https://www.instagram.com/blkbabe.exe' target='_blank' rel='noopener noreferrer' class='text-neon-cyan underline hover:text-neon-yellow font-bold'>blkbabe.exe</a>", true);
      appendTerminalLog("raw", "🎵 <span class='text-neon-cyan font-bold'>TikTok:</span> <a href='https://www.tiktok.com/@Blkbabe.exe' target='_blank' rel='noopener noreferrer' class='text-neon-cyan underline hover:text-neon-yellow font-bold'>@Blkbabe.exe</a>", true);
      appendTerminalLog("raw", "👾 <span class='text-neon-purple font-bold'>Twitch:</span> <a href='https://www.twitch.tv/tashibee' target='_blank' rel='noopener noreferrer' class='text-neon-cyan underline hover:text-neon-yellow font-bold'>tashibee</a>", true);
      break;

    case "hack":
    case "override":
    case "sudo hack":
    case "hack the system":
    case "hack_system":
      triggerSystemHack();
      break;

    case "matrix":
      toggleMatrixRain();
      break;

    case "glitch":
      triggerScreenGlitch();
      appendTerminalLog("system", "⚡ NEURAL WAVEFORM DISTORTION TRIGGERED.");
      break;

    case "whoami": {
      const isOverlord = sessionStorage.getItem("bee_net_hacked") === "true";
      if (isOverlord) {
        appendTerminalLog("success", "👤 OPERATIVE IDENT: [LEVEL 99 CYBER OVERLORD]");
        appendTerminalLog("system", "STATUS: SYSTEM OVERRIDDEN // UNRESTRICTED ACCESS GRANTED");
      } else {
        appendTerminalLog("system", "👤 OPERATIVE IDENT: [GUEST_VISITOR_NODE]");
        appendTerminalLog("system", "STATUS: FIREWALL ACTIVE // TYPE 'hack' OR CLICK [1-CLICK OVERRIDE] TO ELEVATE PERMISSIONS");
      }
      break;
    }

    case "projects":
    case "vault":
      appendTerminalLog("system", "📦 FETCHING VAULT ARCHIVES...");
      appendTerminalLog("raw", "<a href='vault.html' class='text-neon-cyan underline hover:text-neon-yellow font-bold'>1. Cyberpunk Portfolio Terminal (HTML5/CSS3/JS Web Audio Synthesizer)</a>", true);
      appendTerminalLog("raw", "<a href='vault.html' class='text-neon-cyan underline hover:text-neon-yellow font-bold'>2. AI Neural Network Classifier (Python / TensorFlow)</a>", true);
      appendTerminalLog("raw", "<a href='vault.html' class='text-neon-cyan underline hover:text-neon-yellow font-bold'>3. Spooky Goth Tech Game Engine (C++ / OpenGL)</a>", true);
      appendTerminalLog("raw", "<a href='vault.html' class='text-neon-cyan underline hover:text-neon-yellow font-bold'>4. MongoDB Dream Injector Pipeline (Node.js / Express)</a>", true);
      appendTerminalLog("success", ">>> Click any project link or navigate to [03_VAULT] to inspect source code!");
      break;

    case "skills":
    case "stack":
      appendTerminalLog("system", "⚡ ENGINEERING PIPELINES & SKILL MATRIX:");
      appendTerminalLog("raw", "<span class='text-neon-green font-bold'>[LANGUAGES]:</span> C++, Python, JavaScript (ES6+), TypeScript, HTML5, CSS3/Tailwind", true);
      appendTerminalLog("raw", "<span class='text-neon-magenta font-bold'>[BACKEND]:</span> Node.js, Express, MongoDB, Firebase, Web Audio API, REST APIs", true);
      appendTerminalLog("raw", "<span class='text-neon-yellow font-bold'>[DOMAINS]:</span> Cybernetics, Spooky Game Dev, Computer Science Teaching, Full-Stack Development", true);
      break;

    case "dossier":
    case "bio":
    case "about":
      appendTerminalLog("system", "📜 SUBJECT DOSSIER:");
      appendTerminalLog("raw", "<span class='text-white font-bold'>Tashenea Young</span> - Computer Science Student, Developer, Educator & Content Creator.", true);
      appendTerminalLog("raw", "Passionate about combining technical rigor with dark cyber goth aesthetics, game engines, and empowering future techies.", true);
      appendTerminalLog("raw", "<a href='dossier.html' class='text-neon-magenta underline font-bold'>[READ FULL ACADEMIC & PERSONAL DOSSIER]</a>", true);
      break;

    case "secret":
    case "easteregg":
      openHackModal();
      appendTerminalLog("success", "🔮 SECRET UNLOCKED! OPENING OVERLORD CONTROL PANEL...");
      break;

    case "clear":
      const container = document.getElementById("terminal-output-logs");
      if (container) container.innerHTML = "";
      appendTerminalLog("system", ">>> TERMINAL LOGS PURGED.");
      break;

    default:
      appendTerminalLog("error", `COMMAND NOT RECOGNIZED: '${cmd}'. Type 'help' for command directory.`);
      break;
  }
}

function triggerSystemHack() {
  playCyberSound("boot");
  triggerScreenGlitch();
  
  appendTerminalLog("system", "==========================================================");
  appendTerminalLog("system", "[+] INITIATING SYNAPSE OVERRIDE PROTOCOL...");
  
  let progress = 0;
  const progressLine = document.createElement("div");
  progressLine.className = "font-mono text-xs my-1 text-neon-yellow font-bold";
  const logContainer = document.getElementById("terminal-output-logs");
  if (logContainer) logContainer.appendChild(progressLine);

  const hackTimer = setInterval(() => {
    progress += 20;
    playCyberSound("beep");

    const filled = "█".repeat(progress / 5);
    const empty = "░".repeat(20 - progress / 5);
    progressLine.textContent = `[+] PENETRATING FIREWALL: [${filled}${empty}] ${progress}%`;

    if (logContainer) logContainer.scrollTop = logContainer.scrollHeight;

    if (progress >= 100) {
      clearInterval(hackTimer);
      setTimeout(() => {
        playCyberSound("success");
        sessionStorage.setItem("bee_net_hacked", "true");
        updateHackerStatusUI();
        
        appendTerminalLog("success", "==========================================================");
        appendTerminalLog("success", ">>> ACCESS GRANTED! FIREWALL OVERRIDDEN 100% <<<");
        appendTerminalLog("success", ">>> CONGRATULATIONS: STATUS ELEVATED TO LEVEL 99 CYBER OVERLORD <<<");
        appendTerminalLog("system", "==========================================================");
        
        openHackModal();
      }, 300);
    }
  }, 120);
}

function updateHackerStatusUI() {
  const isHacked = sessionStorage.getItem("bee_net_hacked") === "true";
  const badge1 = document.getElementById("console-overlord-badge");
  const badge2 = document.getElementById("header-overlord-badge");
  if (isHacked) {
    if (badge1) badge1.classList.remove("hidden");
    if (badge2) badge2.classList.remove("hidden");
  }
}

function openHackModal() {
  playCyberSound("success");
  const modal = document.getElementById("hack-reward-modal");
  if (modal) {
    modal.classList.remove("hidden");
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

function closeHackModal() {
  playCyberSound("click");
  const modal = document.getElementById("hack-reward-modal");
  if (modal) modal.classList.add("hidden");
}

function setCyberTheme(themeName) {
  playCyberSound("beep");
  const body = document.getElementById("main-body") || document.body;
  body.classList.remove("theme-green", "theme-pink", "theme-yellow");
  if (themeName === "green") body.classList.add("theme-green");
  else if (themeName === "pink") body.classList.add("theme-pink");
  else if (themeName === "yellow") body.classList.add("theme-yellow");
  
  appendTerminalLog("system", `>>> ACCENT LIGHTING PRESET UPDATED TO: [${themeName.toUpperCase()}]`);
}

// Mobile Navigation Drawer Toggle Handler
let mobileMenuOpen = false;

function toggleMobileMenu() {
  playCyberSound("click");
  mobileMenuOpen = !mobileMenuOpen;
  
  const nav = document.getElementById("navbar-links");
  const controls = document.getElementById("taskbar-controls");
  const iconClosed = document.getElementById("menu-icon-closed");
  const iconOpened = document.getElementById("menu-icon-opened");
  
  if (nav && controls) {
    if (mobileMenuOpen) {
      nav.classList.remove("hidden");
      nav.classList.add("flex");
      controls.classList.remove("hidden");
      controls.classList.add("flex");
      if (iconClosed) iconClosed.classList.add("hidden");
      if (iconOpened) iconOpened.classList.remove("hidden");
    } else {
      nav.classList.remove("flex");
      nav.classList.add("hidden");
      controls.classList.remove("flex");
      controls.classList.add("hidden");
      if (iconClosed) iconClosed.classList.remove("hidden");
      if (iconOpened) iconOpened.classList.add("hidden");
    }
  }
}

function closeMobileMenu() {
  mobileMenuOpen = false;
  const nav = document.getElementById("navbar-links");
  const controls = document.getElementById("taskbar-controls");
  const iconClosed = document.getElementById("menu-icon-closed");
  const iconOpened = document.getElementById("menu-icon-opened");
  
  if (window.innerWidth < 768) {
    if (nav && controls) {
      nav.classList.remove("flex");
      nav.classList.add("hidden");
      controls.classList.remove("flex");
      controls.classList.add("hidden");
      if (iconClosed) iconClosed.classList.remove("hidden");
      if (iconOpened) iconOpened.classList.add("hidden");
    }
  }
}

// Active Nav link highlight based on the current page path
function setupActiveNavObserver() {
  const currentPath = window.location.pathname;
  const navItems = [
    { file: 'index.html', selector: 'a[href="index.html"]' },
    { file: 'dossier.html', selector: 'a[href="dossier.html"]' },
    { file: 'vault.html', selector: 'a[href="vault.html"]' },
    { file: 'subculture.html', selector: 'a[href="subculture.html"]' },
    { file: 'pipelines.html', selector: 'a[href="pipelines.html"]' },
    { file: 'contact.html', selector: 'a[href="contact.html"]' }
  ];

  navItems.forEach(item => {
    const el = document.querySelectorAll(item.selector);
    el.forEach(link => link.classList.remove("active-nav"));
  });

  let activeItemSelector = 'a[href="index.html"]';
  const matched = navItems.find(item => currentPath.includes(item.file));
  if (matched) {
    activeItemSelector = matched.selector;
  } else {
    // Fallback detection for clean routing or custom server paths
    for (const item of navItems) {
      const nameWithoutExtension = item.file.replace('.html', '');
      if (currentPath.includes(nameWithoutExtension)) {
        activeItemSelector = item.selector;
        break;
      }
    }
  }

  const activeLinks = document.querySelectorAll(activeItemSelector);
  activeLinks.forEach(link => link.classList.add("active-nav"));
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  const bootScreen = document.getElementById("boot-screen");
  const workspaceScreen = document.getElementById("workspace-screen");

  if (bootScreen) {
    let booted = false;
    try {
      // If the page is reloaded, or we navigate directly without coming from a subpage,
      // reset the boot state so the loading screen is always shown first.
      let isReload = false;
      const navs = performance.getEntriesByType("navigation");
      if (navs && navs.length > 0) {
        isReload = navs[0].type === "reload";
      }

      const referrer = document.referrer || "";
      const isInternalNav = referrer.includes("dossier.html") || 
                            referrer.includes("vault.html") || 
                            referrer.includes("subculture.html") || 
                            referrer.includes("pipelines.html") || 
                            referrer.includes("contact.html") ||
                            referrer.includes("index.html");

      if (isReload || !isInternalNav) {
        sessionStorage.removeItem("bee_net_booted");
      }

      booted = sessionStorage.getItem("bee_net_booted") === "true";
    } catch (_) {}

    if (booted) {
      bootScreen.remove();
      if (workspaceScreen) {
        workspaceScreen.classList.remove("hidden");
      }
      initializePageComponents();
    } else {
      startBootSequence();
    }
  } else {
    if (workspaceScreen) {
      workspaceScreen.classList.remove("hidden");
    }
    initializePageComponents();
  }
});

// Expose functions to global scope (window) for inline HTML event attributes compatibility
window.toggleAudioMute = toggleAudioMute;
window.playCyberSound = playCyberSound;
window.toggleCRT = toggleCRT;
window.rebootOS = rebootOS;
window.handleAccess = handleAccess;
window.selectHobby = selectHobby;
window.deleteDream = deleteDream;
window.injectDream = injectDream;
window.toggleSkillDetail = toggleSkillDetail;
window.filterArchive = filterArchive;
window.selectLogDiagnostics = selectLogDiagnostics;
window.setContactMode = setContactMode;
window.selectCoffeeAmount = selectCoffeeAmount;
window.handleCustomCoffee = handleCustomCoffee;
window.handleTransmit = handleTransmit;
window.switchProfileImageSource = switchProfileImageSource;
window.replayCanvaVideo = replayCanvaVideo;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.setNewsletterSubscribe = setNewsletterSubscribe;
window.setAnonymousPost = setAnonymousPost;
window.toggleMatrixRain = toggleMatrixRain;
window.triggerScreenGlitch = triggerScreenGlitch;
window.handleTerminalSubmit = handleTerminalSubmit;
window.processHackerCommand = processHackerCommand;
window.triggerSystemHack = triggerSystemHack;
window.openHackModal = openHackModal;
window.closeHackModal = closeHackModal;
window.setCyberTheme = setCyberTheme;
window.runFooterDiagnostics = runFooterDiagnostics;
window.switchCodingSubTab = switchCodingSubTab;
window.startTRexGame = startTRexGame;
window.triggerTRexJump = triggerTRexJump;
window.triggerTRexDuck = triggerTRexDuck;
window.toggleTRexTheme = toggleTRexTheme;
window.openTRexGameModal = openTRexGameModal;
window.closeTRexGameModal = closeTRexGameModal;

