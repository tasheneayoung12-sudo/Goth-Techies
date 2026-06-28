export interface SystemLog {
  id: string;
  timestamp: string;
  category: "SYSTEM" | "SECURITY" | "UPLINK" | "CORE" | "DEBUG";
  message: string;
  severity: "INFO" | "WARN" | "SUCCESS" | "CRITICAL";
}

export interface SkillCard {
  id: string;
  codeName: string;
  extension: "exe" | "dll" | "sys";
  title: string;
  description: string;
  details: string[];
  systemLoad: number;
  unlocked: boolean;
  color: "cyan" | "magenta" | "yellow" | "purple";
}

export interface ArchiveLog {
  id: string;
  hash: string;
  title: string;
  category: "CODING" | "AI_EXPERIMENT" | "STUDENT_WORK" | "VALUES";
  date: string;
  description: string;
  tags: string[];
  status: "COMPILED" | "EXECUTING" | "ARCHIVED";
  extendedLog: string;
}

export interface ContactSignal {
  name: string;
  email: string;
  category?: "Computer Science Support" | "Gaming Ideas" | "Book Club" | "Prayer Request";
  message: string;
  timestamp: string;
  status: "QUEUED" | "ENCRYPTING" | "TRANSMITTED";
  coffeeAmount?: number;
}
