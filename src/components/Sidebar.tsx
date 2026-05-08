"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Settings, Mail, Download, Sun, Moon } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { useT, type Lang } from "@/contexts/LangContext";

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { lang, setLang, t } = useT();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <aside className="fixed top-0 left-0 h-screen w-[270px] bg-dark-2 border-r border-dark-4 z-40 hidden lg:flex flex-col">
        {/* Top header */}
        <div className="flex items-center justify-between px-4 pt-5 pb-5 border-b border-dark-4">
          <div className="flex items-center gap-2">
            <button
              className="text-muted hover:text-foreground transition-colors animate-spin-slow flex-shrink-0"
              aria-label="Paramètres"
            >
              <Settings size={16} />
            </button>
            <span className="text-xl font-bold text-foreground tracking-tight">Loé</span>
            <div className="w-5 h-5 rounded-full border border-accent flex items-center justify-center bg-accent/10 flex-shrink-0">
              <span className="text-accent text-[9px] font-bold">L</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-muted leading-relaxed">
              {t.sidebar.subtitleLines.map((line, i) => (
                <span key={i}>{line}{i < t.sidebar.subtitleLines.length - 1 && <br />}</span>
              ))}
            </p>
          </div>
        </div>

        {/* Profile content */}
        <div className="flex-1 flex flex-col items-center px-6 py-6 overflow-y-auto">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-dark-4 border border-dark-4 mb-3 flex-shrink-0 relative">
            <Image
              src="/images/profile.jpg"
              alt="Loé Zegou Megnizon"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          <p className="text-foreground font-bold text-sm mb-5 text-center tracking-wide">
            Loé Zegou Megnizon
          </p>

          <a
            href={`mailto:${personalInfo.email}`}
            className="text-sm text-muted hover:text-accent transition-colors text-center mb-1"
          >
            {personalInfo.email}
          </a>
          <p className="text-sm text-muted text-center mb-4">{personalInfo.address}</p>

          <p className="text-[11px] text-muted/50 mb-4 text-center">
            {t.sidebar.copyright}
          </p>

          {/* Theme + Lang toggles */}
          <div className="flex items-center gap-2 mb-4">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              title={isDark ? "Mode clair" : "Mode sombre"}
              className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all duration-200"
            >
              {mounted ? (isDark ? <Sun size={14} /> : <Moon size={14} />) : <span className="w-3.5 h-3.5" />}
            </button>

            {/* Lang toggles */}
            {(["fr", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200 ${
                  lang === l
                    ? "bg-accent text-[#0f0f0f] border-accent"
                    : "border-dark-4 text-muted hover:text-accent hover:border-accent/30"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex gap-2">
            <a href={personalInfo.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-purple-500 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-200">
              <InstagramIcon size={14} />
            </a>
            <a href={personalInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-green-500 hover:border-green-500/40 hover:bg-green-500/5 transition-all duration-200">
              <WhatsAppIcon size={14} />
            </a>
            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-200">
              <LinkedInIcon size={14} />
            </a>
            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-200">
              <GitHubIcon size={14} />
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-8 flex-shrink-0 space-y-3" suppressHydrationWarning>
          <a
            href="/cv/CV_ZEGOU_MEGNIZON_LOE.pdf"
            download
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-accent/30 rounded-2xl text-accent text-sm font-medium hover:bg-accent/10 transition-all duration-200"
          >
            <Download size={14} />
            {t.sidebar.downloadCV}
          </a>
          <a href="#contact" className="btn-hire">
            <Mail size={14} />
            {t.sidebar.contactMe}
          </a>
        </div>
      </aside>
  );
}
