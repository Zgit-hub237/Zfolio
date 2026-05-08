"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Download, Mail, Sun, Moon, Github, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { useT, type Lang } from "@/contexts/LangContext";

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
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative bg-dark-4 border border-dark-4">
          <Image
            src="/images/profile.jpg"
            alt="Loé Zegou Megnizon"
            fill
            className="object-cover object-top"
            priority
          />
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
            className="w-8 h-8 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
          >
            {mounted ? (isDark ? <Sun size={13} /> : <Moon size={13} />) : <span className="w-3 h-3" />}
          </button>
          {(["fr", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold transition-all ${
                lang === l
                  ? "bg-accent text-[#0f0f0f] border-accent"
                  : "border-dark-4 text-muted hover:text-accent hover:border-accent/30"
              }`}
            >
              {l.toUpperCase()}
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
        <a
          href="/cv/CV_ZEGOU_MEGNIZON_LOE.pdf"
          download
          className="flex items-center justify-center gap-2 py-2.5 border border-accent/30 rounded-2xl text-accent text-xs font-medium hover:bg-accent/10 transition-all"
        >
          <Download size={13} />
          {t.sidebar.downloadCV}
        </a>
        <a href="#contact" className="btn-hire !text-xs !py-2.5">
          <Mail size={13} />
          {t.sidebar.contactMe}
        </a>
      </div>
    </div>
  );
}
