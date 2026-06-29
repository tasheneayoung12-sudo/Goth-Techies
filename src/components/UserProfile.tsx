import { motion } from "motion/react";
import { User, BookOpen, Heart, Radio, Shield, Award, Sparkles } from "lucide-react";
import { playCyberSound } from "../utils/audio";
import { CREATOR_PROFILE } from "../data/cyberData";
import avatarImage from "../assets/images/cybergoth_pixel_avatar_1782081365501.jpg";

export default function UserProfile() {
  const profile = CREATOR_PROFILE;

  return (
    <section id="about" className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-b border-neon-cyan/10">
      {/* Module Title */}
      <div className="flex items-center gap-2 mb-10 text-xs font-mono text-neon-magenta tracking-widest uppercase">
        <span className="w-1.5 h-1.5 bg-neon-magenta rounded-full"></span>
        <span>INDEX_LOG://USER_PROFILE://ABOUT_CORE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Cyber-Dossier and Live Graphic (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-neon-yellow/30 bg-cyber-goth/40 rounded-lg p-6 border-glow-yellow relative flex flex-col items-center"
          >
            {/* Visual scanline grid overlay */}
            <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-neon-yellow/5 to-transparent pointer-events-none"></div>

            {/* Avatar / Hologram Mock */}
            <div className="relative w-40 h-40 mb-6 flex items-center justify-center border-2 border-neon-magenta rounded-full bg-cyber-black p-1 shadow-[0_0_15px_rgba(255,0,255,0.25)] overflow-hidden">
              {/* Pixel Art CyberGoth Avatar */}
              <img
                src={avatarImage}
                alt="Cyber-Gothic Pixel Art Avatar of Tashenea"
                className="w-full h-full object-cover rounded-full z-10"
                referrerPolicy="no-referrer"
              />
              {/* Scanline overlay effect to add depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-20"></div>
              <div className="absolute bottom-2 left-0 right-0 text-center z-30">
                <span className="font-terminal text-[10px] tracking-widest text-neon-cyan font-bold bg-black/80 px-2 py-0.5 rounded border border-neon-cyan/30">TASHIE_XD</span>
              </div>
            </div>

            {/* Meta dossier lists */}
            <div className="w-full font-terminal text-xs flex flex-col gap-2.5 border-t border-neon-yellow/15 pt-5 text-zinc-300">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-neon-cyan uppercase">Subject:</span>
                <span className="text-white font-mono">{profile.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-neon-magenta uppercase">Hex ID:</span>
                <span className="text-white font-mono">Tashie_XD</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-neon-purple uppercase">Faction:</span>
                <span className="text-neon-purple font-mono">{profile.gaming.faction}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-neon-yellow uppercase">Twitch Handle:</span>
                <span className="text-neon-yellow font-mono font-bold">{profile.gaming.twitch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neon-green uppercase">Security:</span>
                <span className="text-neon-green font-mono">LEVEL_CORE</span>
              </div>
            </div>
          </motion.div>

          {/* Bumblebee gaming deck status */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => playCyberSound("hover")}
            className="border border-neon-cyan/20 bg-cyber-navy/40 p-5 rounded-lg flex flex-col gap-3 border-glow-cyan"
          >
            <div className="flex items-center gap-2 text-neon-cyan font-terminal text-xs font-bold uppercase">
              <Radio className="w-4 h-4 text-neon-cyan animate-pulse" />
              <span>CURRENT LINK STATUS</span>
            </div>
            <div className="text-xs font-mono text-zinc-400 leading-relaxed">
              Serving continuous payloads on stream, training networks, compiling Christian value frameworks, and constructing digital escape corridors.
            </div>
          </motion.div>
        </div>

        {/* Right Side: Deep Technical Profile Dossier (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Main Biography / Manifesto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border border-neon-purple/20 bg-cyber-dark/80 rounded-lg p-6 md:p-8 relative"
          >
            <div className="absolute top-4 right-4 text-[10px] font-mono text-neon-purple/50">MEM_LOG_CORE</div>
            
            <h2 className="text-2xl md:text-3xl font-terminal font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-3">
              <User className="w-6 h-6 text-neon-purple" />
              Manifesto://<span className="text-neon-purple">Tashenea</span>
            </h2>

            <div className="prose prose-invert text-zinc-300 font-sans text-sm md:text-base leading-relaxed mb-6">
              <p className="border-l-2 border-neon-purple/50 pl-4 py-1.5 italic bg-neon-purple/5 rounded-r">
                &ldquo;I don't conform to traditional corporate tech grids. As a goth techie, I believe digital tools, coding, and AI are mediums of creative rebellion and spiritual authenticity.&rdquo;
              </p>
              <p className="mt-4">
                {profile.bio}
              </p>
            </div>

            {/* Academic Credentials Module */}
            <div className="border border-neon-cyan/15 bg-black/40 rounded-lg p-5 mt-6">
              <h3 className="text-xs font-terminal font-bold uppercase tracking-wider text-neon-cyan mb-3.5 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                COGNITIVE_ACCELERATOR://ACADEMIC_DOSSIER
              </h3>

              <div className="flex flex-col gap-3 font-terminal text-xs md:text-sm">
                <div className="flex gap-2.5 items-start">
                  <Award className="w-4 h-4 text-neon-green shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold block">{profile.credentials.bachelors}</span>
                    <span className="text-zinc-500 text-xs">Architectural systems programming, standard algorithms, compilation theories</span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start border-t border-white/5 pt-3">
                  <Sparkles className="w-4 h-4 text-neon-magenta shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neon-magenta font-bold block">{profile.credentials.masters}</span>
                    <span className="text-zinc-500 text-xs">Focusing on Deep Learning architectures, Neural Network engineering, alignment of cognitive AI structures</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Christian Value-Driven Directives Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-neon-magenta/20 bg-cyber-dark/80 rounded-lg p-6 md:p-8"
          >
            <h3 className="text-xs font-terminal font-bold uppercase tracking-widest text-neon-magenta mb-5 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              FAITH_DIRECTIVES://CHRISTIAN_VALUES
            </h3>

            <p className="text-zinc-300 font-sans text-sm mb-5 leading-relaxed">
              True strength comes from alignment with foundational truth. As a Christian, my mission is to direct technology toward purposeful construction rather than system dependency, showing alternate techies that code can carry value and light.
            </p>

            <div className="flex flex-col gap-3">
              {profile.values.creed.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-center p-3 bg-cyber-goth/20 border border-neon-magenta/10 rounded-md hover:border-neon-magenta/25 transition-all group"
                  onMouseEnter={() => playCyberSound("hover")}
                >
                  <div className="w-2 h-2 rounded-full bg-neon-magenta shrink-0 group-hover:scale-125 transition-all"></div>
                  <span className="font-terminal text-xs md:text-sm text-zinc-300 group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
