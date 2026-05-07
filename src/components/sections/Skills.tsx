"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionBadge from "@/components/SectionBadge";

/* ── Direction d'entrée pour chacune des 8 cartes ── */
const flyFrom = [
  { x: -140, y: -100 }, // 0 — haut-gauche
  { x:    0, y: -140 }, // 1 — haut
  { x:  140, y: -100 }, // 2 — haut-droite
  { x: -140, y:    0 }, // 3 — gauche
  { x:  140, y:    0 }, // 4 — droite
  { x: -140, y:  100 }, // 5 — bas-gauche
  { x:    0, y:  140 }, // 6 — bas
  { x:  140, y:  100 }, // 7 — bas-droite
];

/* ── Logos disponibles dans /public/logos/ ── */
const logoMap: Record<string, string> = {
  "Flutter":  "/logos/flutter.jpg",
  "Firebase": "/logos/firebas.jpg",
  "Kali Linux": "/logos/kalilinux.jpg",
  "MySQL":    "/logos/mysql.jpg",
  "Laravel":  "/logos/laravel.jpg",
  "C / C++":  "/logos/c.jpg",
  "JavaScript": "/logos/javascript.jpg",
  "React": "/logos/react.jpg",
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

/* ── Carte compétence ── */
function CircleSkill({
  name, abbr, percent, inView, index,
}: {
  name: string; abbr: string; percent: number;
  inView: boolean; index: number;
}) {
  const dashoffset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
  const logo       = logoMap[name];
  const delaySec   = index * 0.09;          // délai Framer Motion (secondes)
  const delayMs    = index * 90;            // délai SVG stroke (millisecondes)
  const dir        = flyFrom[index] ?? { x: 0, y: 100 };

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, x: dir.x, y: dir.y }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: dir.x, y: dir.y }
      }
      transition={{ duration: 0.7, delay: delaySec, ease }}
    >
      <div className="relative w-28 h-28">
        {/* Anneau de progression SVG */}
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
          {/* Piste de fond */}
          <circle
            cx="50" cy="50" r={RADIUS}
            fill="none" stroke="#2a2a2a" strokeWidth="2"
          />
          {/* Arc de progression */}
          <circle
            cx="50" cy="50" r={RADIUS}
            fill="none" stroke="#2ecc71" strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            style={{
              strokeDashoffset: inView ? dashoffset : CIRCUMFERENCE,
              transition: `stroke-dashoffset 1.3s ease-out ${delayMs}ms`,
            }}
          />
        </svg>

        {/* Contenu central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          {logo ? (
            <>
              <Image
                src={logo}
                alt={name}
                width={46}
                height={46}
                className="rounded-lg object-contain"
              />
              <span className="text-accent font-bold text-xs leading-none">{percent}%</span>
            </>
          ) : (
            <>
              <span className="text-lg font-bold text-white leading-none">{abbr}</span>
              <span className="text-accent font-bold text-sm leading-none">{percent}%</span>
            </>
          )}
        </div>
      </div>
      <span className="text-sm text-muted text-center">{name}</span>
    </motion.div>
  );
}

/* ── Section principale ── */
export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center px-10 lg:px-16 py-20 bg-dark">
      <div className="max-w-4xl">

        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
        >
          <SectionBadge icon={BarChart2} label="Mes Compétences" />
          <h2 className="section-heading mb-16">
            Mes<br />
            <span className="text-accent">avantages</span>
          </h2>
        </motion.div>

        {/* Grille — le ref déclenche l'animation d'entrée */}
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 lg:gap-12"
        >
          {mainSkills.map((skill, i) => (
            <CircleSkill key={skill.name} {...skill} inView={inView} index={i} />
          ))}
        </div>

        {/* Compétences secondaires */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className="mt-16 pt-8 border-t border-dark-4"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
