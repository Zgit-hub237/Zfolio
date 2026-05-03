"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Code2, Smartphone, Shield } from "lucide-react";
import { projects } from "@/data/portfolio";

const categories = [
  { key: "all", label: "Tous" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
  { key: "security", label: "Sécurité" },
];

const categoryIcons = {
  web: Code2,
  mobile: Smartphone,
  security: Shield,
  all: Code2,
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-dark-2">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="section-subtitle">Ce que j&apos;ai réalisé</p>
          <h2 className="section-title">Mes projets</h2>
          <div className="accent-line mx-auto" />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === cat.key
                  ? "bg-accent text-dark"
                  : "bg-dark-3 border border-dark-4 text-muted hover:text-white hover:border-accent/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => {
            const CatIcon = categoryIcons[project.category as keyof typeof categoryIcons] ?? Code2;
            return (
              <div
                key={project.id}
                className="card group hover:border-accent/30 hover:scale-[1.02] transition-all duration-500 overflow-hidden"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Project image placeholder */}
                <div className="relative h-44 -m-6 mb-6 bg-gradient-to-br from-dark-4 to-dark-3 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CatIcon size={48} className="text-accent/20" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-3 to-transparent" />

                  {/* Overlay links */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-accent/90 flex items-center justify-center text-dark hover:scale-110 transition-transform"
                        aria-label="Voir le projet"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:scale-110 transition-transform"
                        aria-label="Voir le code source"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Category badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent mb-3">
                  <CatIcon size={11} />
                  {categories.find((c) => c.key === project.category)?.label}
                </span>

                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-dark-4 rounded-md text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* GitHub CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/Zgit-hub237"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
          >
            <Github size={18} />
            Voir tous mes projets sur GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
