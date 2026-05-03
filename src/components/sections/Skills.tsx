"use client";

import { useInView } from "react-intersection-observer";
import { skills } from "@/data/portfolio";

function SkillBar({ name, percent, delay }: { name: string; percent: number; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="group" style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white group-hover:text-accent transition-colors">
          {name}
        </span>
        <span className="text-xs font-bold text-accent">{percent}%</span>
      </div>
      <div className="h-2 bg-dark-4 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-dark transition-all duration-1000 ease-out"
          style={{ width: inView ? `${percent}%` : "0%" }}
        />
      </div>
    </div>
  );
}

const categories = [
  { key: "languages" as const, label: "Langages de programmation", icon: "</>" },
  { key: "frameworks" as const, label: "Frameworks & Outils", icon: "{ }" },
  { key: "security" as const, label: "Cybersécurité & Systèmes", icon: "🛡" },
];

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="skills" className="py-24 bg-dark">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="section-subtitle">Ce que je maîtrise</p>
          <h2 className="section-title">Compétences techniques</h2>
          <div className="accent-line mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.key} className="card hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                  {cat.icon}
                </div>
                <h3 className="text-white font-semibold">{cat.label}</h3>
              </div>
              <div className="space-y-5">
                {skills[cat.key].map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    percent={skill.percent}
                    delay={i * 100}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech badges */}
        <div className="mt-16 text-center">
          <p className="text-muted text-sm mb-6 uppercase tracking-widest">Outils & Technologies</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "VS Code", "IntelliJ IDEA", "Android Studio", "GitHub",
              "Firebase", "MySQL", "SQLite", "VMware", "Kali Linux", "Windows Server",
            ].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 bg-dark-3 border border-dark-4 rounded-full text-sm text-muted hover:text-accent hover:border-accent/30 transition-all duration-200 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
