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
  dreams: [
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
      id: "freelance_unlock",
      codeName: "FREELANCE_UNLOCK_PROTOCOL",
      extension: "dll",
      title: "Alternative Freelance Protocol",
      description: "Gain financial sovereignty, master remote work pipelines, and unlock digital income strategies to escape traditional corporate lifestyles.",
      details: [
        "Alternative career path strategies",
        "Drafting premium proposals & building client funnels",
        "Leveraging AI to optimize your development flow",
        "Global nomad logistics & safe side-hustles"
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
      extendedLog: "Successfully optimized file sizes and bundle structure to comply with platform parameters. Loaded Share Tech Mono dynamically, implementing retro curved CRT matrix effects with pure canvas and CSS rendering."
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
      description: "A comprehensive guide, resource directory, and open-source starter folder enabling Goth Techies globally to start remote freelancing.",
      tags: ["Mentorship", "Freelancing", "Open Source", "Resource Kit"],
      status: "COMPILED",
      extendedLog: "Authored detailed workflows on managing client expectations, design pairing, secure contract platforms, and scaling single-dev freelancers into cooperative networks."
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
    "💼 FREELANCE_UPLINK://Active client pipelines verified",
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

function handleAccess() {
  playCyberSound("success");
  const bootScreen = document.getElementById("boot-screen");
  const workspaceScreen = document.getElementById("workspace-screen");
  
  bootScreen.classList.add("transition-all", "duration-700", "opacity-0", "scale-95");
  setTimeout(() => {
    bootScreen.remove();
    workspaceScreen.classList.remove("hidden");
    setupHovers();
    lucide.createIcons();
    startClock();
    loadPersistentData();
    renderDreams();
    renderTransmissions();
  }, 700);
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

// Dreams management
function renderDreams() {
  const container = document.getElementById("dreams-grid-container");
  if (!container) return;
  container.innerHTML = "";

  state.dreams.forEach((dream) => {
    let catClass = "bg-neon-yellow/10 border-neon-yellow/35 text-neon-yellow";
    if (dream.category === "FREELANCING") catClass = "bg-neon-purple/10 border-neon-purple/35 text-neon-purple";
    if (dream.category === "TRAVEL") catClass = "bg-neon-cyan/10 border-neon-cyan/35 text-neon-cyan";

    const div = document.createElement("div");
    div.className = "border border-white/5 hover:border-white/15 bg-black/40 rounded-lg p-4 flex flex-col justify-between relative group transition-all";
    div.innerHTML = `
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center text-[9px] font-mono">
          <span class="px-2 py-0.5 border rounded-sm font-bold ${catClass}">
            ${dream.category}
          </span>
          <span class="text-zinc-600 font-bold">EST. ${dream.targetYear}</span>
        </div>
        <p class="font-sans text-xs text-zinc-200 font-medium leading-relaxed">
          ${dream.title}
        </p>
      </div>

      <div class="flex justify-between items-center border-t border-white/5 pt-3 mt-3 text-[10px] font-mono">
        <span class="flex items-center gap-1 ${dream.status === 'ACTIVE_ROUTE' ? 'text-neon-cyan animate-pulse' : 'text-neon-green'}">
          ● ${dream.status}
        </span>
        
        <button
          onclick="deleteDream('${dream.id}', event)"
          class="opacity-0 group-hover:opacity-100 p-1 hover:bg-neon-magenta/20 hover:text-neon-magenta text-zinc-500 rounded transition-all cursor-pointer"
          title="Abort mission dream protocol"
        >
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;
    container.appendChild(div);
  });
  lucide.createIcons();
}

function injectDream(e) {
  e.preventDefault();
  const titleInput = document.getElementById("dream-title-input");
  const catSelect = document.getElementById("dream-cat-select");
  const yearInput = document.getElementById("dream-year-input");

  const title = titleInput.value.trim();
  if (!title) {
    playCyberSound("glitch");
    return;
  }

  playCyberSound("success");
  const newDream = {
    id: `dream_${Date.now()}`,
    category: catSelect.value,
    title: title,
    targetYear: yearInput.value,
    status: "INITIALIZING"
  };

  state.dreams.push(newDream);
  savePersistentData();
  renderDreams();
  titleInput.value = "";
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
let activeLogId = null;
const filters = ["ALL", "CODING", "AI_EXPERIMENT", "STUDENT_WORK", "VALUES"];
let selectedFilter = "ALL";

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

  // Re-render logs list
  renderArchiveLogsList();
}

function renderArchiveLogsList() {
  const container = document.getElementById("archive-logs-list");
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
          <h3 class="text-sm md:text-base font-terminal font-bold uppercase text-white tracking-wide hover:text-neon-purple transition-colors">
            ${log.title}
          </h3>
          <p class="text-xs font-sans text-zinc-400 mt-1 lines-clamp-2 leading-relaxed">
            ${log.description}
          </p>
        </div>
        <div class="p-2 border border-white/5 bg-black/40 rounded shrink-0">
          <i data-lucide="eye" class="w-4 h-4 ${isActive ? 'text-neon-purple' : 'text-zinc-600'}"></i>
        </div>
      </div>
    `;

    div.onclick = () => selectLogDiagnostics(log.id);
    container.appendChild(div);
  });
  lucide.createIcons();
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
          <p class="text-zinc-300 font-sans leading-relaxed text-xs p-2.5 bg-cyber-dark rounded border border-white/5">
            ${log.extendedLog}
          </p>
        </div>
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
  const infoEl = document.getElementById("contact-info-text");
  const configGrid = document.getElementById("coffee-fuel-grid");

  if (mode === "MESSAGE") {
    msgTab.className = "px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border border-neon-cyan text-neon-cyan bg-neon-cyan/10 transition-all";
    coffeeTab.className = "px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border border-transparent text-zinc-500 hover:text-zinc-300 transition-all";
    infoEl.textContent = "Draft generic transmissions, ask queries, or propose contract collaborations directly. This transaction registers instantly to the local buffer index.";
    configGrid.classList.add("hidden");
    document.getElementById("message-label").textContent = "TRANSMISSION://RAW_MESSAGE_PAYLOAD";
    document.getElementById("message-input").placeholder = "Draft your digital package protocols here...";
    document.getElementById("submit-btn").innerHTML = `
      <i data-lucide="send" class="w-4 h-4"></i>
      <span>Send Signal / Transmit Message</span>
    `;
  } else {
    msgTab.className = "px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border border-transparent text-zinc-500 hover:text-zinc-300 transition-all";
    coffeeTab.className = "px-4 py-2 text-xs font-mono font-bold uppercase rounded tracking-wider cursor-pointer border border-neon-yellow text-neon-yellow bg-neon-yellow/10 border-glow-yellow transition-all";
    infoEl.innerHTML = `
      <span class="font-bold text-neon-yellow flex items-center gap-1">
        <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
        COFFEE FUEL RECHARGE INITIATED
      </span>
      <span>
        Fuel Tashenea's research and development schedule. Select a custom resource tier to inject dynamic caffeine cells. Includes secure local ledger persistence.
      </span>
    `;
    configGrid.classList.remove("hidden");
    document.getElementById("message-label").textContent = "RECHARGE_PROTOCOL://SUPPORT_MESSAGE";
    document.getElementById("message-input").placeholder = "Write a coffee greeting or word of encouragement...";
    updateSubmitBtnCoffee();
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

  if (!name || !email || !message) {
    playCyberSound("glitch");
    return;
  }

  playCyberSound("click");
  
  // Show sending log
  const tunnelLogs = document.getElementById("tunnel-logs-window");
  const transmissionLog = document.createElement("div");
  transmissionLog.className = "text-neon-magenta font-bold animate-pulse mt-1 flex items-center gap-1";
  transmissionLog.innerHTML = `<span>⌛ PROTOCOL_INJECT: ENCRYPTING TUNNEL PAYLOAD...</span>`;
  tunnelLogs.appendChild(transmissionLog);
  tunnelLogs.scrollTop = tunnelLogs.scrollHeight;

  // Submit button loader
  const submitBtn = document.getElementById("submit-btn");
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <div class="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin border-current"></div>
    <span>TRANSMITTING COFFEE CELL PAYLOAD STATUS...</span>
  `;

  setTimeout(() => {
    playCyberSound("success");
    submitBtn.disabled = false;

    // Reset status log
    transmissionLog.remove();
    const successLog = document.createElement("div");
    successLog.className = "text-neon-green font-bold mt-1 flex items-center gap-1";
    successLog.innerHTML = `<span>✔ TRANSACTION COMPLETE! PACKET BROADCASTED [0x92BC]</span>`;
    tunnelLogs.appendChild(successLog);
    tunnelLogs.scrollTop = tunnelLogs.scrollHeight;

    // Save payload
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
    }, 5000);

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

  }, 1800);
}

function renderTransmissions() {
  const container = document.getElementById("transmissions-list-container");
  const listingSection = document.getElementById("transmissions-listing-section");
  
  if (state.transmissions.length === 0) {
    listingSection.classList.add("hidden");
    return;
  }
  
  listingSection.classList.remove("hidden");
  container.innerHTML = "";

  state.transmissions.forEach((sig) => {
    const div = document.createElement("div");
    div.className = "p-2.5 border border-white/5 bg-zinc-950/60 rounded text-[11px] font-mono flex flex-col gap-1";
    
    let coffeeSection = "";
    if (sig.coffeeAmount) {
      coffeeSection = `
        <div class="flex items-center gap-1 py-0.5 px-2 bg-neon-yellow/10 border border-neon-yellow/20 text-neon-yellow rounded w-fit text-[10px] font-bold mt-0.5 mb-1 animate-pulse">
          <i data-lucide="coffee" class="w-3 h-3 text-neon-yellow" style="stroke-width: 3"></i>
          <span>FUELED CAFFEINE: $${sig.coffeeAmount}.00</span>
        </div>
      `;
    }

    div.innerHTML = `
      <div class="flex justify-between text-zinc-500">
        <span class="text-neon-cyan font-bold">${sig.name}</span>
        <span>${sig.timestamp}</span>
      </div>
      ${coffeeSection}
      <div class="text-[10px] text-neon-magenta font-mono font-bold uppercase tracking-wider mb-1 mt-0.5">
        [PROTOCOL: ${sig.category}]
      </div>
      <p class="text-zinc-400 font-sans italic">${sig.message}</p>
      <div class="flex items-center gap-1 text-[9px] text-neon-green mt-1">
        <i data-lucide="shield-check" class="w-3 h-3"></i>
        <span>VERIFIED_HASH_COMPACT</span>
      </div>
    `;

    container.appendChild(div);
  });
  lucide.createIcons();
}

// Local Storage Handlers
function savePersistentData() {
  try {
    localStorage.setItem("bee_net_dream_protocols", JSON.stringify(state.dreams));
    localStorage.setItem("bee_net_transmissions", JSON.stringify(state.transmissions));
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
  } catch (_) {}
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  startBootSequence();
});

// Expose functions to global scope (window) for inline HTML event attributes compatibility
window.toggleAudioMute = toggleAudioMute;
window.playCyberSound = playCyberSound;
window.toggleCRT = toggleCRT;
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

