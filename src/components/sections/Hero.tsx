"use client";

import { useState, useEffect } from "react";
import {
  Home, ArrowDown, Menu, X,
  User, FileText, Layers, Code2, LayoutGrid, Mail,
  Instagram, Github, Linkedin,
  Phone, ExternalLink, MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

const menuLinks = [
  { href: "#hero",     label: "Accueil",      icon: Home },
  { href: "#about",    label: "À propos",     icon: User },
  { href: "#resume",   label: "CV",           icon: FileText },
  { href: "#services", label: "Services",     icon: Layers },
  { href: "#skills",   label: "Compétences",  icon: Code2 },
  { href: "#projects", label: "Portefeuille", icon: LayoutGrid },
  { href: "#contact",  label: "Contact",      icon: Mail },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-10 lg:px-16 pt-20 lg:pt-0 pb-10 relative overflow-hidden bg-dark"
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#2ecc71 1px, transparent 1px), linear-gradient(90deg, #2ecc71 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ligne badge + bouton — pleine largeur, bouton décalé légèrement vers la droite */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="relative z-10 flex items-center justify-between mb-8 w-full"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-dark-4 rounded-full text-xs font-medium text-muted uppercase tracking-widest">
          <Home size={12} />
          Introduction
        </div>

        {/* Mobile uniquement — dans la ligne du badge */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden w-13 h-13 rounded-full border border-dark-4 flex items-center justify-center hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group"
          aria-label="Ouvrir le menu"
        >
          <Menu size={22} className="text-muted group-hover:text-accent transition-colors" />
        </button>
      </motion.div>

      {/* Desktop — fixe, juste au-dessus du RightNav (right-5, même axe horizontal) */}
      <button
        onClick={() => setMenuOpen(true)}
        className="hidden lg:flex fixed right-5 z-[55] w-14 h-14 rounded-full border border-dark-4 items-center justify-center hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group"
        style={{ top: "calc(50vh - 210px)" }}
        aria-label="Ouvrir le menu"
      >
        <Menu size={24} className="text-muted group-hover:text-accent transition-colors" />
      </button>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-4xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease }}
          className="section-heading mb-4"
        >
          Bonjour, je suis<br />
          <span className="text-accent">Loé Zegou</span>,<br />
          étudiant passionné<br />
          d&apos;informatique
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease }}
          className="text-muted text-base lg:text-lg max-w-xl mb-16 leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Stats + circular badge */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32, ease }}
          className="flex flex-wrap items-end gap-12 lg:gap-20"
        >
          <div>
            <div className="text-5xl lg:text-6xl font-bold text-accent mb-2">3+</div>
            <div className="text-xs text-muted uppercase tracking-widest">Années d&apos;études</div>
          </div>
          <div>
            <a
              href="#projects"
              className="ml-auto lg:ml-8 relative w-28 h-28 flex items-center justify-center group flex-shrink-0"
              aria-label="Voir mes projets"
            >
              <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <defs>
                  <path id="hero-circle-path" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <text fill="#888888" fontSize="8.5" letterSpacing="2.8">
                  <textPath href="#hero-circle-path" startOffset="0%">
                    MES PROJETS • MES PROJETS •
                  </textPath>
                </text>
              </svg>
              <div className="w-14 h-14 rounded-full border border-dark-4 flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-300">
                <ArrowDown size={20} className="text-muted group-hover:text-accent transition-colors" />
              </div>
            </a>
          </div>
          <div>
            <div className="text-5xl lg:text-6xl font-bold text-accent mb-2">1+</div>
            <div className="text-xs text-muted uppercase tracking-widest">Experience Pro</div>
          </div>
        </motion.div>
      </div>

      {/* ── Menu overlay ── */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Panneau — slide depuis la droite */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-72 bg-dark-2 border-l border-dark-4 flex flex-col p-8 overflow-y-auto transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold text-white">Menu</h3>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-muted hover:text-white rounded-full hover:bg-dark-4 transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 mb-6">
            {menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-3 py-3 rounded-xl text-muted hover:text-white hover:bg-dark-3 transition-all duration-200 group"
              >
                <link.icon size={17} className="text-muted/50 group-hover:text-accent transition-colors flex-shrink-0" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="pt-5 border-t border-dark-4 mb-6">
            <p className="text-xs text-muted uppercase tracking-widest mb-3">Contact</p>
            <div className="flex flex-col gap-1">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 px-3 py-2.5 rounded-xl text-muted hover:text-white hover:bg-dark-3 transition-all duration-200 group"
              >
                <Mail size={15} className="text-muted/50 group-hover:text-accent transition-colors flex-shrink-0" />
                <span className="text-xs truncate">{personalInfo.email}</span>
              </a>
              <a
                href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 px-3 py-2.5 rounded-xl text-muted hover:text-white hover:bg-dark-3 transition-all duration-200 group"
              >
                <Phone size={15} className="text-muted/50 group-hover:text-accent transition-colors flex-shrink-0" />
                <span className="text-xs">{personalInfo.phone}</span>
              </a>
              <a
                href={personalInfo.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-3 py-2.5 rounded-xl text-muted hover:text-white hover:bg-dark-3 transition-all duration-200 group"
              >
                <ExternalLink size={15} className="text-muted/50 group-hover:text-accent transition-colors flex-shrink-0" />
                <span className="text-xs">Portfolio Laravel</span>
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="pt-5 border-t border-dark-4">
            <p className="text-xs text-muted uppercase tracking-widest mb-4">Social</p>
            <div className="flex gap-3 flex-wrap">
              <a
                href={personalInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all"
              >
                <Github size={16} />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={personalInfo.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
