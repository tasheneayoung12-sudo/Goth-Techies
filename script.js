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
    avatarImg.src = source === "stock" 
      ? "./assets/images/stock_goth_avatar_1783792279555.jpg" 
      : "./assets/images/Profile_pic.jpg";
    avatarImg.alt = source === "stock" ? "Cyber-Goth Stock Avatar" : "Tashenea's Uploaded Avatar";
  }

  if (portraitImg) {
    portraitImg.src = source === "stock" 
      ? "./assets/images/stock_goth_portrait_1783792292032.jpg" 
      : "./assets/images/Profile_pic.jpg";
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

function initializePageComponents() {
  setupActiveNavObserver();
  setupHovers();
  lucide.createIcons();
  startClock();
  loadPersistentData();
  
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
  fetch("/api/dreams/all")
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
  fetch("/api/website-survey", {
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

    fetch("/api/newsletter/subscribe", {
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

