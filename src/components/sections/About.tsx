"use client";

import { useInView } from "react-intersection-observer";
import { User, Award, CheckCircle2, Sparkles, ShieldCheck, Code2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionBadge from "@/components/SectionBadge";
import { useT } from "@/contexts/LangContext";

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useT();

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-14 sm:py-20 bg-dark-2 relative overflow-hidden">
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`max-w-6xl w-full mx-auto relative z-10 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionBadge icon={User} label={t.about.badge} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Innovative Modern Photo Presentation (Left Column) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[420px] group">
              
              {/* Layer 1: Ambient Glowing Backdrop Aura */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-accent/30 via-emerald-500/15 to-transparent rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />

              {/* Layer 2: Offset Rotated Background Glass Panel */}
              <div className="absolute inset-0 rounded-[2.2rem] border border-accent/30 bg-accent/5 backdrop-blur-md transform -rotate-3 group-hover:rotate-0 transition-transform duration-500 ease-out" />

              {/* Layer 3: Main Foreground Photo Container */}
              <div className="relative rounded-[2rem] p-3.5 sm:p-4 bg-dark-2/90 backdrop-blur-xl border border-dark-4 group-hover:border-accent/50 transform rotate-2 group-hover:rotate-0 transition-all duration-500 ease-out shadow-2xl overflow-hidden">
                
                {/* Tech Corner Decorative Accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-accent/70 z-20 pointer-events-none" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-accent/70 z-20 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-accent/70 z-20 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-accent/70 z-20 pointer-events-none" />

                {/* Tech Watermark Icon Overlay */}
                <div className="absolute top-6 right-6 text-accent/15 z-10 pointer-events-none">
                  <Code2 size={42} />
                </div>

                {/* Profile Image */}
                <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/5] bg-dark-3">
                  <Image
                    src="/images/photo2.jpg"
                    alt="Loé Zegou"
                    width={600}
                    height={750}
                    className="w-full h-full object-cover object-top filter contrast-[1.03] saturate-[1.03] transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Dark gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-80" />
                </div>

                {/* Floating Tech Badge 1 (Top Left): Master I Validé status indicator */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 left-6 bg-dark-2/95 border border-accent/40 text-accent px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 backdrop-blur-md shadow-xl z-20"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  <span className="tracking-wide">Master I Validé • 2026</span>
                </motion.div>

                {/* Floating Profile Info Card (Bottom) */}
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-6 left-6 right-6 bg-dark-2/95 border border-dark-4 p-3.5 rounded-2xl backdrop-blur-md shadow-2xl flex items-center justify-between z-20 group-hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
                      <Award size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground font-bold text-xs sm:text-sm truncate">Loé Zegou Megnizon</p>
                      <p className="text-muted text-[11px] truncate">SI & Génie Logiciel</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[10px] text-accent/90 font-mono bg-accent/10 px-2.5 py-1 rounded-md border border-accent/30 font-semibold flex-shrink-0">
                    <span>DIPLÔMÉ</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Key Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            <h2 className="section-heading mb-6">
              {t.about.heading1}<br />
              {t.about.heading2}{" "}
              <span className="text-accent">
                {t.about.heading3}<br />{t.about.heading4}
              </span>
            </h2>

            <p className="text-muted text-sm sm:text-base lg:text-lg leading-relaxed mb-8">
              {t.about.bio}
            </p>

            {/* Innovative Highlights Pills */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {t.about.strengths.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-dark-4 rounded-full text-xs sm:text-sm text-muted hover:border-accent/40 hover:text-accent transition-all cursor-default bg-dark-3/40"
                >
                  <CheckCircle2 size={14} className="text-accent" />
                  {s}
                </span>
              ))}
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-dark-3/30 border border-dark-4 rounded-2xl">
              <div className="p-2">
                <span className="text-[10px] text-muted uppercase tracking-widest block font-mono">DIPLÔME</span>
                <span className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5 mt-1">
                  <Sparkles size={13} className="text-accent" />
                  Master I Validé
                </span>
              </div>
              <div className="p-2">
                <span className="text-[10px] text-muted uppercase tracking-widest block font-mono">SPÉCIALITÉ</span>
                <span className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5 mt-1">
                  <ShieldCheck size={13} className="text-accent" />
                  Cybersécurité
                </span>
              </div>
              <div className="p-2 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-muted uppercase tracking-widest block font-mono">LOCATION</span>
                <span className="text-xs sm:text-sm font-bold text-foreground block mt-1">
                  Yaoundé, Cameroun
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
