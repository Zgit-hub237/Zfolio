"use client";

import { Home, ArrowDown } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import { personalInfo } from "@/data/portfolio";

export default function Hero() {
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

      <div className="relative z-10 max-w-4xl">
        <SectionBadge icon={Home} label="Introduction" />

        <h1 className="section-heading mb-4">
          Bonjour, je suis<br />
          <span className="text-accent">Loé Zegou</span>,<br />
          étudiant passionné<br />
          d&apos;informatique
        </h1>

        <p className="text-muted text-base lg:text-lg max-w-xl mb-16 leading-relaxed">
          {personalInfo.tagline}
        </p>

        {/* Stats + circular badge */}
        <div className="flex flex-wrap items-end gap-12 lg:gap-20">
          <div>
            <div className="text-5xl lg:text-6xl font-bold text-accent mb-2">3+</div>
            <div className="text-xs text-muted uppercase tracking-widest">Années d&apos;études</div>
          </div>
          <div>
            {/* Circular "MES PROJETS" badge */}
          <a
            href="#projects"
            className="ml-auto lg:ml-8 relative w-28 h-28 flex items-center justify-center group flex-shrink-0"
            aria-label="Voir mes projets"
          >
            {/* Rotating text */}
            <svg
              className="absolute inset-0 w-full h-full animate-spin-slow"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="hero-circle-path"
                  d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                />
              </defs>
              <text fill="#888888" fontSize="8.5" letterSpacing="2.8">
                <textPath href="#hero-circle-path" startOffset="0%">
                  MES PROJETS • MES PROJETS •
                </textPath>
              </text>
            </svg>

            {/* Center arrow */}
            <div className="w-14 h-14 rounded-full border border-dark-4 flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-300">
              <ArrowDown size={20} className="text-muted group-hover:text-accent transition-colors" />
            </div>
          </a>
          </div>
          <div>
            <div className="text-5xl lg:text-6xl font-bold text-accent mb-2">1+</div>
            <div className="text-xs text-muted uppercase tracking-widest">Experience Pro</div>
          </div>

        </div>
      </div>
    </section>
  );
}
