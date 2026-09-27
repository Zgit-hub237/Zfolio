"use client";

import { useState, useEffect, useRef } from "react";
import {
  Home, ArrowDown, Menu, X, Sun, Moon,
  User, FileText, Layers, Code2, LayoutGrid, Mail,
  Instagram, Github, Linkedin,
  Phone, ExternalLink, MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { useTheme } from "next-themes";
import { personalInfo } from "@/data/portfolio";
import { useT, type Lang } from "@/contexts/LangContext";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import PhotoFrame from "@/components/ui/PhotoFrame";
import ActiveIndicator from "@/components/ui/ActiveIndicator";
import { useReducedMotion } from "@/components/ui/useReducedMotion";

const ease = [0.22, 1, 0.36, 1] as const;

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(prefersReducedMotion ? to : 0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, prefersReducedMotion]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold gradient-text mb-2">
      {value}{suffix}
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { lang, setLang, t, menuOpen, setMenuOpen } = useT();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const menuLinks = [
    { href: "#hero", label: t.nav.home, icon: Home },
    { href: "#about", label: t.nav.about, icon: User },
    { href: "#resume", label: t.nav.resume, icon: FileText },
    { href: "#services", label: t.nav.services, icon: Layers },
    { href: "#skills", label: t.nav.skills, icon: Code2 },
    { href: "#projects", label: t.nav.projects, icon: LayoutGrid },
    { href: "#contact", label: t.nav.contact, icon: Mail },
  ];

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-5 sm:px-8 lg:px-16 pt-8 lg:pt-0 pb-10 relative overflow-hidden bg-dark"
    >
      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#2ecc71 1px, transparent 1px), linear-gradient(90deg, #2ecc71 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Aurora mesh */}
      <div className="absolute -top-20 -left-20 w-[28rem] h-[28rem] bg-accent/10 rounded-full blur-[110px] pointer-events-none motion-safe:animate-float" />
      <div className="absolute bottom-0 right-0 w-[26rem] h-[26rem] bg-accent-2/10 rounded-full blur-[110px] pointer-events-none motion-safe:animate-float-delayed" />

      {/* Header row: badge + mobile menu button */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="relative z-10 flex items-center justify-between mb-8 sm:mb-12 w-full"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-dark-4 rounded-full text-xs font-medium text-muted uppercase tracking-widest bg-dark-2/40 backdrop-blur-sm">
          <Home size={12} className="text-accent" />
          {t.hero.badge}
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-dark-4 bg-dark-2/80 backdrop-blur-md text-muted hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group shadow-md"
          aria-label="Menu"
        >
          <Menu size={18} className="group-hover:text-accent transition-colors" />
        </button>
      </motion.div>

      {/* Main Grid */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <RevealText as="h1" className="section-heading mb-4">
            {t.hero.greeting}<br />
            <span className="gradient-text">Loé Zegou</span>,<br />
            {t.hero.line3}<br />
            {t.hero.line4}
          </RevealText>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease }}
            className="text-muted text-sm sm:text-base lg:text-lg max-w-xl mb-8 sm:mb-10 leading-relaxed"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45, ease }}
            className="flex flex-wrap items-end gap-6 sm:gap-10 lg:gap-12"
          >
            <div>
              <CountUp to={4} suffix="+" />
              <div className="text-xs text-muted uppercase tracking-widest">{t.hero.yearsStudy}</div>
            </div>
            <div>
              <MagneticButton className="inline-block">
                <a href="#projects" className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center group flex-shrink-0">
                  <svg className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 motion-safe:animate-spin-slow" viewBox="0 0 100 100">
                    <defs>
                      <path id="hero-circle-path" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                    </defs>
                    <text fill="#888888" fontSize="8.5" letterSpacing="2.8">
                      <textPath href="#hero-circle-path" startOffset="0%">{t.hero.circularText}</textPath>
                    </text>
                  </svg>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-dark-4 flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-300">
                    <ArrowDown size={18} className="text-muted group-hover:text-accent transition-colors" />
                  </div>
                </a>
              </MagneticButton>
            </div>
            <div>
              <CountUp to={2} suffix="+" />
              <div className="text-xs text-muted uppercase tracking-widest">{t.hero.proExp}</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Photo Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease }}
          className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0"
        >
          <div className="w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[470px]">
            <PhotoFrame
              src="/images/photo1.JPG"
              alt="Loé Zegou"
              priority
              watermark={
                <div className="absolute top-6 right-6 text-accent/10 text-5xl font-mono font-bold select-none pointer-events-none z-10">
                  &lt;/&gt;
                </div>
              }
              badges={[
                <motion.div
                  key="badge-top"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 right-6 bg-dark-2/95 border border-accent/40 text-accent px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 backdrop-blur-md shadow-lg z-20"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  <span className="tracking-wide">Computer Science</span>
                </motion.div>,
                <motion.div
                  key="badge-bottom"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-6 left-6 right-6 bg-dark-2/90 border border-dark-4 p-3 rounded-xl backdrop-blur-md shadow-xl flex items-center justify-between z-20 group-hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                      <Code2 size={18} />
                    </div>
                    <div>
                      <p className="text-foreground font-semibold text-xs sm:text-sm">Loé Zegou</p>
                      <p className="text-muted text-[11px]">Développeur & Tech Passionate</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[10px] text-accent/90 font-mono bg-accent/10 px-2.5 py-1 rounded-md border border-accent/30 font-semibold">
                    <span>DEV</span>
                  </div>
                </motion.div>,
              ]}
            />
          </div>
        </motion.div>
      </div>

      {/* Menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[100]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 bottom-0 w-[min(18rem,100vw)] bg-dark-2 border-l border-dark-4 flex flex-col p-6 sm:p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-display font-semibold text-foreground">{t.nav.menu}</h3>
                <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center text-muted hover:text-foreground rounded-full hover:bg-dark-4 transition-all">
                  <X size={18} />
                </button>
              </div>

              <motion.nav
                className="flex flex-col gap-1 mb-6"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              >
                {menuLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    variants={{ hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.35, ease }}
                    className="flex items-center gap-4 px-3 py-3 rounded-xl text-muted hover:text-foreground hover:bg-dark-3 transition-all duration-200 group"
                  >
                    <link.icon size={17} className="text-muted/50 group-hover:text-accent transition-colors flex-shrink-0" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </motion.a>
                ))}
              </motion.nav>

              <div className="pt-5 border-t border-dark-4 mb-6">
                <p className="text-xs text-muted uppercase tracking-widest mb-3">{t.nav.contact}</p>
                <div className="flex flex-col gap-1">
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 px-3 py-2.5 rounded-xl text-muted hover:text-foreground hover:bg-dark-3 transition-all duration-200 group">
                    <Mail size={15} className="text-muted/50 group-hover:text-accent transition-colors flex-shrink-0" />
                    <span className="text-xs truncate">{personalInfo.email}</span>
                  </a>
                  <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 px-3 py-2.5 rounded-xl text-muted hover:text-foreground hover:bg-dark-3 transition-all duration-200 group">
                    <Phone size={15} className="text-muted/50 group-hover:text-accent transition-colors flex-shrink-0" />
                    <span className="text-xs">{personalInfo.phone}</span>
                  </a>
                  <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-3 py-2.5 rounded-xl text-muted hover:text-foreground hover:bg-dark-3 transition-all duration-200 group">
                    <ExternalLink size={15} className="text-muted/50 group-hover:text-accent transition-colors flex-shrink-0" />
                    <span className="text-xs">Portfolio Laravel</span>
                  </a>
                </div>
              </div>

              <div className="pt-5 border-t border-dark-4">
                <p className="text-xs text-muted uppercase tracking-widest mb-4">Social</p>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { href: personalInfo.social.instagram, icon: Instagram, label: "Instagram" },
                    { href: personalInfo.social.github, icon: Github, label: "GitHub" },
                    { href: personalInfo.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                    { href: personalInfo.social.whatsapp, icon: MessageCircle, label: "WhatsApp" },
                  ].map(({ href, icon: Icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                      className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-dark-4 lg:hidden mt-5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
                  >
                    {mounted ? (isDark ? <Sun size={14} /> : <Moon size={14} />) : <span className="w-3.5 h-3.5" />}
                  </button>
                  {(["fr", "en"] as Lang[]).map((l) => (
                    <button key={l} onClick={() => setLang(l)}
                      className={`relative px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${lang === l ? "text-[#0f0f0f] border-accent" : "border-dark-4 text-muted hover:text-accent hover:border-accent/30"
                        }`}>
                      {lang === l && <ActiveIndicator layoutId="lang-toggle-menu" />}
                      <span className="relative z-10">{l.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
