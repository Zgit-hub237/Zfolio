"use client";

import { useInView } from "react-intersection-observer";
import { User, Award, CheckCircle2, Sparkles, ShieldCheck, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionBadge from "@/components/SectionBadge";
import { useT } from "@/contexts/LangContext";
import RevealText from "@/components/ui/RevealText";
import PhotoFrame from "@/components/ui/PhotoFrame";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useT();

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-14 sm:py-20 bg-dark-2 relative overflow-hidden">
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-accent-2/5 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`max-w-6xl w-full mx-auto relative z-10 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionBadge icon={User} label={t.about.badge} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Photo (Left Column) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[420px]">
              <PhotoFrame
                src="/images/photo2.jpg"
                alt="Loé Zegou"
                rotate="left"
                width={600}
                height={750}
                watermark={
                  <div className="absolute top-6 right-6 text-accent/15 z-10 pointer-events-none">
                    <Code2 size={42} />
                  </div>
                }
                badges={[
                  <motion.div
                    key="badge-top"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-6 left-6 bg-dark-2/95 border border-accent/40 text-accent px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 backdrop-blur-md shadow-xl z-20"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    <span className="tracking-wide">MSc ECE Paris • 2026</span>
                  </motion.div>,
                  <motion.div
                    key="badge-bottom"
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
                  </motion.div>,
                ]}
              />
            </div>
          </div>

          {/* Right Column: Bio & Key Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            <RevealText as="h2" className="section-heading mb-6">
              {t.about.heading1}<br />
              {t.about.heading2}{" "}
              <span className="gradient-text">
                {t.about.heading3}<br />{t.about.heading4}
              </span>
            </RevealText>

            <p className="text-muted text-sm sm:text-base lg:text-lg leading-relaxed mb-8">
              {t.about.bio}
            </p>

            {/* Highlights Pills */}
            <motion.div
              className="flex flex-wrap gap-2.5 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {t.about.strengths.map((s) => (
                <motion.span
                  key={s}
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-dark-4 rounded-full text-xs sm:text-sm text-muted hover:border-accent/40 hover:text-accent transition-all cursor-default bg-dark-3/40"
                >
                  <CheckCircle2 size={14} className="text-accent" />
                  {s}
                </motion.span>
              ))}
            </motion.div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-dark-3/30 border border-dark-4 rounded-2xl">
              <SpotlightCard className="p-2 rounded-xl">
                <span className="text-[10px] text-muted uppercase tracking-widest block font-mono">FORMATION</span>
                <span className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5 mt-1">
                  <Sparkles size={13} className="text-accent" />
                  MSc ECE Paris
                </span>
              </SpotlightCard>
              <SpotlightCard className="p-2 rounded-xl">
                <span className="text-[10px] text-muted uppercase tracking-widest block font-mono">SPÉCIALITÉ</span>
                <span className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5 mt-1">
                  <ShieldCheck size={13} className="text-accent" />
                  Cybersécurité
                </span>
              </SpotlightCard>
              <SpotlightCard className="p-2 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-[10px] text-muted uppercase tracking-widest block font-mono">LOCATION</span>
                <span className="text-xs sm:text-sm font-bold text-foreground block mt-1">
                  Île-de-France
                </span>
              </SpotlightCard>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
