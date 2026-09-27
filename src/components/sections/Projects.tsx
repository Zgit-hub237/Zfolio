"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Grid3X3, ExternalLink, Github, Code2, Smartphone, Shield, Monitor } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import { projects } from "@/data/portfolio";
import { useT } from "@/contexts/LangContext";
import RevealText from "@/components/ui/RevealText";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ActiveIndicator from "@/components/ui/ActiveIndicator";

const categoryIcons = { web: Code2, mobile: Smartphone, security: Shield, desktop: Monitor };

const categoryGradient: Record<string, string> = {
  web: "from-emerald-500/30 via-accent/10 to-cyan-500/20",
  mobile: "from-violet-500/30 via-accent-2/10 to-blue-500/20",
  security: "from-red-500/30 via-orange-500/10 to-amber-500/20",
  desktop: "from-amber-500/30 via-yellow-500/10 to-orange-500/20",
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const { t } = useT();

  const filtered =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-14 sm:py-20 bg-dark-2">
      <div
        ref={ref}
        className={`max-w-4xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionBadge icon={Grid3X3} label={t.projects.badge} />

        <RevealText as="h2" className="section-heading mb-6 sm:mb-10">
          {t.projects.heading.split(" ").slice(0, -1).join(" ")}<br />
          <span className="gradient-text">{t.projects.heading.split(" ").slice(-1)[0]}</span>
        </RevealText>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {t.projects.filters.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 ${
                activeFilter === cat.key
                  ? "text-[#0f0f0f] font-bold"
                  : "border border-dark-4 text-muted hover:text-foreground hover:border-dark-3"
              }`}
            >
              {activeFilter === cat.key && <ActiveIndicator layoutId="projects-filter-pill" />}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Projects grid 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((project, i) => {
            const CatIcon = categoryIcons[project.category as keyof typeof categoryIcons] ?? Code2;
            const translated = t.projects.items.find((p) => p.id === project.id);
            const filterLabel = t.projects.filters.find((f) => f.key === project.category)?.label;
            return (
              <div
                key={project.id}
                className={inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                style={{ transition: "opacity 0.6s ease-out, transform 0.6s ease-out", transitionDelay: `${i * 100}ms` }}
              >
                <SpotlightCard className="flex flex-col h-full border border-dark-4 bg-dark rounded-2xl overflow-hidden hover:border-accent/30 transition-colors duration-300">
                  {/* Decorative category banner */}
                  <div
                    className={`relative h-20 sm:h-24 flex items-center justify-center overflow-hidden bg-gradient-to-br ${categoryGradient[project.category] ?? categoryGradient.web} bg-[length:200%_200%] motion-safe:group-hover:animate-gradient-x`}
                  >
                    <CatIcon size={56} strokeWidth={1} className="text-foreground/15" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-dark-2/70 backdrop-blur-sm border border-dark-4/60 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
                          aria-label={t.projects.viewProject}>
                          <ExternalLink size={13} />
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-dark-2/70 backdrop-blur-sm border border-dark-4/60 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
                          aria-label={t.projects.sourceCode}>
                          <Github size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CatIcon size={12} className="text-accent" />
                      <span className="text-xs text-accent uppercase tracking-widest">{filterLabel}</span>
                    </div>

                    <h3 className="text-foreground text-base font-semibold mb-2 group-hover:text-accent transition-colors">
                      {translated?.title ?? project.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed flex-1 mb-4">
                      {translated?.description ?? project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 border border-dark-4 rounded-lg text-xs text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <a href="https://github.com/Zgit-hub237" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors">
            <Github size={16} />
            {t.projects.viewGithub}
          </a>
        </div>
      </div>
    </section>
  );
}
