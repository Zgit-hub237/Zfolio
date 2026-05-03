"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Grid3X3, ExternalLink, Github, Code2, Smartphone, Shield } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import { projects } from "@/data/portfolio";

const categories = [
  { key: "all", label: "Tous" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
  { key: "security", label: "Sécurité" },
];

const categoryIcons = { web: Code2, mobile: Smartphone, security: Shield };

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center px-10 lg:px-16 py-20 bg-dark-2">
      <div
        ref={ref}
        className={`max-w-4xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionBadge icon={Grid3X3} label="Portfolio" />

        <h2 className="section-heading mb-10">
          Mes<br />
          <span className="text-accent">projets réalisés</span>
        </h2>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === cat.key
                  ? "bg-accent text-dark font-bold"
                  : "border border-dark-4 text-muted hover:text-white hover:border-dark-3"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects list (Drake-style: full-width cards) */}
        <div className="space-y-4">
          {filtered.map((project, i) => {
            const CatIcon =
              categoryIcons[project.category as keyof typeof categoryIcons] ?? Code2;
            return (
              <div
                key={project.id}
                className={`group flex items-center justify-between p-6 border border-dark-4 rounded-2xl hover:border-accent/20 hover:bg-dark-3 transition-all duration-300 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex-1 mr-6">
                  {/* Category badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <CatIcon size={12} className="text-accent" />
                    <span className="text-xs text-accent uppercase tracking-widest">
                      {categories.find((c) => c.key === project.category)?.label}
                    </span>
                  </div>

                  <h3 className="text-white text-lg font-semibold mb-1 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-3 max-w-xl">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 border border-dark-4 rounded-lg text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action links */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
                      aria-label="Voir le projet"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
                      aria-label="Code source"
                    >
                      <Github size={14} />
                    </a>
                  )}
                  {!project.link && !project.github && (
                    <div className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-dark-4">
                      <Code2 size={14} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* GitHub CTA */}
        <div className="mt-10">
          <a
            href="https://github.com/Zgit-hub237"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
          >
            <Github size={16} />
            Voir tous mes projets sur GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
