"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionBadge from "@/components/SectionBadge";
import { useT } from "@/contexts/LangContext";

const flyFrom = [
  { x: -140, y: -100 },
  { x:    0, y: -140 },
  { x:  140, y: -100 },
  { x: -140, y:    0 },
  { x:  140, y:    0 },
  { x: -140, y:  100 },
  { x:    0, y:  140 },
  { x:  140, y:  100 },
];

const logoMap: Record<string, string> = {
  "Flutter":    "/logos/flutter.jpg",
  "Firebase":   "/logos/firebas.jpg",
  "Kali Linux": "/logos/kalilinux.jpg",
  "MySQL":      "/logos/mysql.jpg",
  "Laravel":    "/logos/laravel.jpg",
  "C / C++":    "/logos/c.jpg",
  "JavaScript": "/logos/javascript.jpg",
  "React":      "/logos/react.jpg",
};

const mainSkills = [
  { name: "Flutter",    abbr: "Fl", percent: 85 },
  { name: "Firebase",   abbr: "Fb", percent: 80 },
  { name: "React",      abbr: "Re", percent: 75 },
  { name: "JavaScript", abbr: "JS", percent: 78 },
  { name: "Kali Linux", abbr: "KL", percent: 75 },
  { name: "MySQL",      abbr: "DB", percent: 78 },
  { name: "C / C++",    abbr: "C+", percent: 72 },
  { name: "Laravel",    abbr: "Lv", percent: 68 },
];

const ease = [0.22, 1, 0.36, 1] as const;
const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CircleSkill({ name, abbr, percent, inView, index }: {
  name: string; abbr: string; percent: number; inView: boolean; index: number;
}) {
  const dashoffset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
  const logo = logoMap[name];
  const dir = flyFrom[index] ?? { x: 0, y: 100 };

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, x: dir.x, y: dir.y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: dir.x, y: dir.y }}
      transition={{ duration: 0.7, delay: index * 0.09, ease }}
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
        <svg className="w-24 h-24 sm:w-28 sm:h-28 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="var(--bg-4)" strokeWidth="2" />
          <circle
            cx="50" cy="50" r={RADIUS}
            fill="none" stroke="#2ecc71" strokeWidth="2" strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            style={{
              strokeDashoffset: inView ? dashoffset : CIRCUMFERENCE,
              transition: `stroke-dashoffset 1.3s ease-out ${index * 90}ms`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          {logo ? (
            <>
              <Image src={logo} alt={name} width={46} height={46} className="rounded-lg object-contain" />
              <span className="text-accent font-bold text-xs leading-none">{percent}%</span>
            </>
          ) : (
            <>
              <span className="text-lg font-bold text-foreground leading-none">{abbr}</span>
              <span className="text-accent font-bold text-sm leading-none">{percent}%</span>
            </>
          )}
        </div>
      </div>
      <span className="text-sm text-muted text-center">{name}</span>
    </motion.div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const { t } = useT();

  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-14 sm:py-20 bg-dark">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
        >
          <SectionBadge icon={BarChart2} label={t.skills.badge} />
          <h2 className="section-heading mb-10 sm:mb-16">
            {t.skills.heading.split(" ").slice(0, -1).join(" ")}<br />
            <span className="text-accent">{t.skills.heading.split(" ").slice(-1)[0]}</span>
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {mainSkills.map((skill, i) => (
            <CircleSkill key={skill.name} {...skill} inView={inView} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className="mt-16 pt-8 border-t border-dark-4"
        >
          <p className="text-xs text-muted uppercase tracking-widest mb-5">{t.skills.alsoMastered}</p>
          <div className="flex flex-wrap gap-2">
            {t.skills.secondarySkills.map((s) => (
              <span key={s} className="px-3 py-1.5 border border-dark-4 rounded-full text-xs text-muted hover:border-accent/20 hover:text-accent/70 transition-all cursor-default">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
