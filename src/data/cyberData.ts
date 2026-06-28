import { SkillCard, ArchiveLog } from "../types";

export interface CreatorProfile {
  name: string;
  codename: string;
  role: string;
  credentials: {
    bachelors: string;
    masters: string;
    specialties: string[];
  };
  gaming: {
    twitch: string;
    persona: string;
    faction: string;
  };
  values: {
    faith: string;
    mission: string;
    creed: string[];
  };
  bio: string;
}

export const CREATOR_PROFILE: CreatorProfile = {
  name: "Tashenea",
  codename: "TashiBee // Core-Prime",
  role: "AI/ML Systems Researcher & Alternate Tech Educator",
  credentials: {
    bachelors: "B.S. in Computer Science, Cal Poly Humboldt",
    masters: "M.S. in Computer Science, Western Governors University (AI & ML, Current)",
    specialties: ["Neural Network Architecture", "Natural Language Processing", "Interactive User Interfaces", "Full-Stack Development"],
  },
  gaming: {
    twitch: "tashibee",
    persona: "Cyber-Bumblebee Goth Heroic Scout",
    faction: "Alternative Tech Vanguard",
  },
  values: {
    faith: "Christian Value-Driven (Uncompromising Purpose, Creator Alignment)",
    mission: "To liberate Goth Techies from standard corporate loops through coding mastery, AI, and spiritual authenticity.",
    creed: [
      "Faith and Future-Craft: Technology is a divine medium for creation.",
      "Aesthetic Freedom: Alternative style does not compromise intellectual elite status.",
      "Global Liberation: Freelancing and automation build the pathways of freedom."
    ]
  },
  bio: "Hey, I'm Tashenea! A Computer Science graduate and current Master's student specializing in AI and Machine Learning. I do not fit into traditional corporate boxes, and neither should you. I fuse gothic cyberpunk aesthetics with deep engineering, gaming culture, and value-driven Christian principles. Through my Twitch channel (tashibee) and my digital teachings, I equip bold, non-conforming girls and young women with the absolute elite programming, AI, and freelancing skillsets needed to build a custom kingdom of global freedom."
};

export const SKILL_CARDS: SkillCard[] = [
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
    unlocked: true,
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
    unlocked: true,
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
    unlocked: true,
    color: "yellow"
  }
];

export const ARCHIVE_LOGS: ArchiveLog[] = [
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
    extendedLog: "Leveraged pre-trained semantic vector embeddings to detect value-oriented metrics inside coding repositories. Proved that alignment of code commits with values increases engineer agency and team alignment."
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
    extendedLog: "Successfully visualized feed-forward weight adjustments in real time during backpropagation. Visualizations rendered beautifully inside WebGL sandbox, proving cognitive structures can be styled with dark synthwave schemes."
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
];
