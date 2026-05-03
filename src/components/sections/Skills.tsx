"use client";

import { useInView } from "react-intersection-observer";
import { BarChart2 } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";

const mainSkills = [
  { name: "Flutter", abbr: "Fl", percent: 85 },
  { name: "Firebase", abbr: "Fb", percent: 80 },
  { name: "React", abbr: "Re", percent: 75 },
  { name: "JavaScript", abbr: "JS", percent: 78 },
  { name: "Kali Linux", abbr: "KL", percent: 75 },
  { name: "MySQL", abbr: "DB", percent: 78 },
  { name: "C / C++", abbr: "C+", percent: 72 },
  { name: "Laravel", abbr: "Lv", percent: 68 },
];

function CircleSkill({
  name,
  abbr,
  percent,
  inView,
  delay,
}: {
  name: string;
  abbr: string;
  percent: number;
  inView: boolean;
  delay: number;
}) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (percent / 100) * circumference;

  return (
    <div
      className="flex flex-col items-center gap-3"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative w-28 h-28">
        {/* SVG circle progress */}
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="2"
          />
          {/* Progress arc */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#2ecc71"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: inView ? dashoffset : circumference,
              transition: `stroke-dashoffset 1.2s ease-out ${delay}ms`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-white leading-none">{abbr}</span>
          <span className="text-accent font-bold text-sm leading-none mt-1">{percent}%</span>
        </div>
      </div>
      <span className="text-sm text-muted text-center">{name}</span>
    </div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center px-10 lg:px-16 py-20 bg-dark">
      <div
        ref={ref}
        className={`max-w-4xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionBadge icon={BarChart2} label="Mes Compétences" />

        <h2 className="section-heading mb-16">
          Mes<br />
          <span className="text-accent">avantages</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 lg:gap-12">
          {mainSkills.map((skill, i) => (
            <CircleSkill key={skill.name} {...skill} inView={inView} delay={i * 80} />
          ))}
        </div>

        {/* Secondary skills text list */}
        <div className="mt-16 pt-8 border-t border-dark-4">
          <p className="text-xs text-muted uppercase tracking-widest mb-5">Également maîtrisé</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Dart", "Java", "C#", "HTML / CSS", "SQLite",
              "Entity Framework", "MSFVenom", "VMware", "Windows Server",
              "Android Studio", "IntelliJ IDEA",
            ].map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 border border-dark-4 rounded-full text-xs text-muted hover:border-accent/20 hover:text-accent/70 transition-all cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
