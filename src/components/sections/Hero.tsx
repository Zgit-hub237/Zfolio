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
import { personalInfo } from "@/data/portfolio";
import { useT, type Lang } from "@/contexts/LangContext";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { lang, setLang, t } = useT();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const menuLinks = [
    { href: "#hero",     label: t.nav.home,     icon: Home },
    { href: "#about",    label: t.nav.about,    icon: User },
    { href: "#resume",   label: t.nav.resume,   icon: FileText },
    { href: "#services", label: t.nav.services, icon: Layers },
    { href: "#skills",   label: t.nav.skills,   icon: Code2 },
    { href: "#projects", label: t.nav.projects, icon: LayoutGrid },
    { href: "#contact",  label: t.nav.contact,  icon: Mail },
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

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="relative z-10 flex items-center mb-8 w-full"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-dark-4 rounded-full text-xs font-medium text-muted uppercase tracking-widest">
          <Home size={12} />
          {t.hero.badge}
        </div>
      </motion.div>

      <button
        onClick={() => setMenuOpen(true)}
        className="flex fixed right-4 bottom-6 lg:bottom-auto lg:right-5 lg:top-[calc(50vh-210px)] z-[55] w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-dark-4 items-center justify-center hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group"
        aria-label="Menu"
      >
        <Menu size={20} className="text-muted group-hover:text-accent transition-colors lg:hidden" />
        <Menu size={24} className="text-muted group-hover:text-accent transition-colors hidden lg:block" />
      </button>

      <div className="relative z-10 max-w-4xl w-full">
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
          className="text-muted text-sm sm:text-base lg:text-lg max-w-xl mb-8 sm:mb-12 lg:mb-16 leading-relaxed"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32, ease }}
          className="flex flex-wrap items-end gap-8 sm:gap-12 lg:gap-20"
        >
          <div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-accent mb-2">3+</div>
            <div className="text-xs text-muted uppercase tracking-widest">{t.hero.yearsStudy}</div>
          </div>
          <div>
            <a href="#projects" className="lg:ml-8 relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center group flex-shrink-0">
              <svg className="absolute inset-0 w-24 h-24 sm:w-28 sm:h-28 animate-spin-slow" viewBox="0 0 100 100">
                <defs>
                  <path id="hero-circle-path" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <text fill="#888888" fontSize="8.5" letterSpacing="2.8">
                  <textPath href="#hero-circle-path" startOffset="0%">{t.hero.circularText}</textPath>
                </text>
              </svg>
              <div className="w-14 h-14 rounded-full border border-dark-4 flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-300">
                <ArrowDown size={20} className="text-muted group-hover:text-accent transition-colors" />
              </div>
            </a>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-accent mb-2">1+</div>
            <div className="text-xs text-muted uppercase tracking-widest">{t.hero.proExp}</div>
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
                { href: personalInfo.social.github,    icon: Github,    label: "GitHub" },
                { href: personalInfo.social.linkedin,  icon: Linkedin,  label: "LinkedIn" },
                { href: personalInfo.social.whatsapp,  icon: MessageCircle, label: "WhatsApp" },
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
                  className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                    lang === l ? "bg-accent text-[#0f0f0f] border-accent" : "border-dark-4 text-muted hover:text-accent hover:border-accent/30"
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
