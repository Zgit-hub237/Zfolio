"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Mail, Sun, Moon, Github, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { personalInfo, CV_PATH } from "@/data/portfolio";
import { useT, type Lang } from "@/contexts/LangContext";
import ActiveIndicator from "@/components/ui/ActiveIndicator";
import MagneticButton from "@/components/ui/MagneticButton";

export default function MobileProfile() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { lang, setLang, t } = useT();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <div className="lg:hidden bg-dark-2 border-b border-dark-4 px-5 pt-6 pb-5">
      {/* Photo + nom + toggles */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative group flex-shrink-0">
          <div
            aria-hidden="true"
            className="absolute -inset-1 rounded-[0.85rem] opacity-70 motion-safe:animate-spin-slower pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg, rgb(var(--accent-rgb) / 0.7), transparent 25%, rgb(var(--accent-2-rgb) / 0.7), transparent 75%, rgb(var(--accent-rgb) / 0.7))",
            }}
          />
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-dark-4 border border-dark-4">
            <Image
              src="/images/profile.jpg"
              alt="Loé Zegou Megnizon"
              fill
              sizes="56px"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-foreground text-sm leading-tight">Loé Zegou Megnizon</p>
          <p className="text-[11px] text-muted mt-0.5 leading-snug">
            {t.sidebar.subtitleLines.join(" · ")}
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-8 h-8 rounded-full border border-dark-4 flex items-center justify-center overflow-hidden text-muted hover:text-accent hover:border-accent/30 transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mounted ? (
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center"
                >
                  {isDark ? <Sun size={13} /> : <Moon size={13} />}
                </motion.span>
              ) : (
                <span className="w-3 h-3" />
              )}
            </AnimatePresence>
          </button>
          {(["fr", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`relative px-2.5 py-1 rounded-full border text-[11px] font-semibold transition-colors ${
                lang === l
                  ? "text-[#0f0f0f] border-accent"
                  : "border-dark-4 text-muted hover:text-accent hover:border-accent/30"
              }`}
            >
              {lang === l && <ActiveIndicator layoutId="lang-toggle-mobile" />}
              <span className="relative z-10">{l.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Réseaux sociaux */}
      <div className="flex gap-2 mb-4">
        {[
          { href: personalInfo.social.instagram, icon: Instagram, label: "Instagram" },
          { href: personalInfo.social.whatsapp,  icon: MessageCircle, label: "WhatsApp" },
          { href: personalInfo.social.linkedin,  icon: Linkedin, label: "LinkedIn" },
          { href: personalInfo.social.github,    icon: Github, label: "GitHub" },
        ].map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-8 h-8 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all"
          >
            <Icon size={14} />
          </a>
        ))}
      </div>

      {/* Boutons CTA */}
      <div className="grid grid-cols-2 gap-2">
        <MagneticButton className="block">
          <a
            href={CV_PATH}
            download
            className="flex items-center justify-center gap-2 py-2.5 border border-accent/30 rounded-2xl text-accent text-xs font-medium hover:bg-accent/10 transition-all"
          >
            <Download size={13} />
            {t.sidebar.downloadCV}
          </a>
        </MagneticButton>
        <MagneticButton className="block">
          <a href="#contact" className="btn-hire btn-shine !text-xs !py-2.5">
            <Mail size={13} />
            {t.sidebar.contactMe}
          </a>
        </MagneticButton>
      </div>
    </div>
  );
}
