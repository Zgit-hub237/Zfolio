"use client";

import { useState, useEffect } from "react";
import {
  Home, ArrowDown, Menu, X, Sun, Moon,
  User, FileText, Layers, Code2, LayoutGrid, Mail,
  Instagram, Github, Linkedin,
  Phone, ExternalLink, MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { personalInfo } from "@/data/portfolio";
import { useT, type Lang } from "@/contexts/LangContext";

const ease = [0.22, 1, 0.36, 1] as const;

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
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#2ecc71 1px, transparent 1px), linear-gradient(90deg, #2ecc71 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header row: INTRODUCTION badge on left, Mobile Menu button on right aligned on the exact same row */}
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

        {/* Mobile menu button aligned on the same row as INTRODUCTION */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-dark-4 bg-dark-2/80 backdrop-blur-md text-muted hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group shadow-md"
          aria-label="Menu"
        >
          <Menu size={18} className="group-hover:text-accent transition-colors" />
        </button>
      </motion.div>

      {/* Main Grid: Left side text/stats & Right side modern tech photo showcase */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            className="section-heading mb-4"
          >
            {t.hero.greeting}<br />
            <span className="text-accent">Loé Zegou</span>,<br />
            {t.hero.line3}<br />
            {t.hero.line4}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease }}
            className="text-muted text-sm sm:text-base lg:text-lg max-w-xl mb-8 sm:mb-10 leading-relaxed"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease }}
            className="flex flex-wrap items-end gap-6 sm:gap-10 lg:gap-12"
          >
            <div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-accent mb-2">4+</div>
              <div className="text-xs text-muted uppercase tracking-widest">{t.hero.yearsStudy}</div>
            </div>
            <div>
              <a href="#projects" className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center group flex-shrink-0">
                <svg className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 animate-spin-slow" viewBox="0 0 100 100">
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
            </div>
            <div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-accent mb-2">2+</div>
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
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[400px] group">
            {/* Glowing gradient aura backdrop */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-accent/30 via-accent/10 to-emerald-500/20 rounded-[2.5rem] blur-xl opacity-60 group-hover:opacity-90 transition duration-700 animate-pulse" />

            {/* Glassmorphic Futuristic Frame */}
            <div className="relative rounded-[2rem] p-3 sm:p-4 bg-dark-2/80 backdrop-blur-xl border border-dark-4 group-hover:border-accent/40 transition-all duration-500 shadow-2xl overflow-hidden">

              {/* Tech Corner Brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-accent/60 z-20 pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-accent/60 z-20 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-accent/60 z-20 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-accent/60 z-20 pointer-events-none" />

              {/* Code Watermark Overlay */}
              <div className="absolute top-6 right-6 text-accent/10 text-5xl font-mono font-bold select-none pointer-events-none z-10">
                &lt;/&gt;
              </div>

              {/* Profile Image */}
              <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/5] bg-dark-3">
                <Image
                  src="/images/photo1.JPG"
                  alt="Loé Zegou"
                  width={600}
                  height={750}
                  priority
                  className="w-full h-full object-cover object-top filter contrast-[1.04] saturate-[1.04] transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Tech Badge: Top Right */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-6 bg-dark-2/95 border border-accent/40 text-accent px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 backdrop-blur-md shadow-lg z-20"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="tracking-wide">Computer Science</span>
              </motion.div>

              {/* Floating Profile Card: Bottom */}
              <motion.div
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
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Menu overlay */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-[min(18rem,100vw)] bg-dark-2 border-l border-dark-4 flex flex-col p-6 sm:p-8 overflow-y-auto transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold text-foreground">{t.nav.menu}</h3>
            <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center text-muted hover:text-foreground rounded-full hover:bg-dark-4 transition-all">
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-col gap-1 mb-6">
            {menuLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-3 py-3 rounded-xl text-muted hover:text-foreground hover:bg-dark-3 transition-all duration-200 group">
                <link.icon size={17} className="text-muted/50 group-hover:text-accent transition-colors flex-shrink-0" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </nav>

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

          <div className="pt-5 border-t border-dark-4 lg:hidden">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
              >
                {mounted ? (isDark ? <Sun size={14} /> : <Moon size={14} />) : <span className="w-3.5 h-3.5" />}
              </button>
              {(["fr", "en"] as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${lang === l ? "bg-accent text-[#0f0f0f] border-accent" : "border-dark-4 text-muted hover:text-accent hover:border-accent/30"
                    }`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
