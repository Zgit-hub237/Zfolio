"use client";

import { useState } from "react";
import { Settings, Mail, Github, Linkedin, Twitter, X, Menu } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-5 left-5 z-50 lg:hidden w-10 h-10 bg-dark-2 border border-dark-4 rounded-xl flex items-center justify-center text-muted hover:text-white transition-colors"
        aria-label="Menu"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[270px] bg-dark-2 border-r border-dark-4 z-40 flex flex-col transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Settings icon */}
        <button className="absolute top-5 left-5 text-muted hover:text-white transition-colors">
          <Settings size={15} />
        </button>

        {/* Top header */}
        <div className="flex items-start justify-between pt-5 px-6 pb-5 border-b border-dark-4">
          <div className="flex items-center gap-2 ml-7">
            <span className="text-xl font-bold text-white tracking-tight">Loé</span>
            <div className="w-5 h-5 rounded-full border border-accent flex items-center justify-center bg-accent/10">
              <span className="text-accent text-[9px] font-bold">L</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-muted leading-relaxed">
              Étudiant en<br />Informatique,<br />Cybersécurité
            </p>
          </div>
        </div>

        {/* Profile content */}
        <div className="flex-1 flex flex-col items-center px-6 py-7 overflow-hidden">
          {/* Profile photo */}
          <div className="w-44 h-44 rounded-2xl overflow-hidden bg-dark-4 border border-dark-4 mb-7 flex items-center justify-center flex-shrink-0">
            <span className="text-6xl font-black text-white/10 select-none">LZ</span>
          </div>

          {/* Contact */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-sm text-muted hover:text-accent transition-colors text-center mb-1"
          >
            {personalInfo.email}
          </a>
          <p className="text-sm text-muted text-center mb-6">{personalInfo.address}</p>

          <p className="text-[11px] text-muted/50 mb-7 text-center">
            © Loé Zegou 2025. Tous droits réservés
          </p>

          {/* Social icons */}
          <div className="flex gap-2">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href={personalInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
              aria-label="Twitter / X"
            >
              <Twitter size={14} />
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-8 flex-shrink-0">
          <a href="#contact" className="btn-hire" onClick={() => setMobileOpen(false)}>
            <Mail size={14} />
            ME CONTACTER
          </a>
        </div>
      </aside>
    </>
  );
}
