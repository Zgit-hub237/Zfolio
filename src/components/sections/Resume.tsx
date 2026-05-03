"use client";

import { useInView } from "react-intersection-observer";
import { FileText } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";

const timeline = [
  {
    period: "Oct. 2025 — Présent",
    items: [
      {
        title: "Master I — Génie Logiciel & Cybersécurité",
        company: "Université de Yaoundé I",
        current: true,
      },
      {
        title: "Développeur Freelance",
        company: "Portfolio professionnel — Laravel & PHP",
        current: true,
      },
    ],
  },
  {
    period: "Janv. 2025 — Oct. 2025",
    items: [
      {
        title: "Stagiaire Développeur Mobile",
        company: "PIALOA Technologie, Yaoundé",
        current: false,
      },
      {
        title: "Développeur Freelance",
        company: "Application mobile — Flutter & Firebase",
        current: false,
      },
    ],
  },
  {
    period: "Sept. 2022 — Juil. 2025",
    items: [
      {
        title: "Licence Professionnelle en Informatique",
        company: "Université de Yaoundé I — Spé. Cybersécurité",
        current: false,
      },
    ],
  },
];

/* ── Chaque groupe de la timeline avec son propre observer ── */
function TimelineGroup({
  group,
  isLast,
}: {
  group: (typeof timeline)[number];
  isLast: boolean;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div ref={ref} className="flex gap-8">
      {/* Colonne dot + ligne */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1 gap-1">
        {/* Dot animé : scale-in + couleur accent */}
        <div
          className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 ease-out ${
            inView
              ? "border-accent bg-accent/30 scale-100"
              : "border-muted/30 bg-dark-4 scale-0"
          }`}
          style={{ transitionDelay: "50ms" }}
        />
        {/* Ligne verticale : fade in */}
        {!isLast && (
          <div
            className={`w-px flex-1 min-h-[60px] transition-all duration-700 ease-out ${
              inView
                ? "opacity-100 bg-gradient-to-b from-accent/20 to-dark-4"
                : "opacity-0 bg-dark-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          />
        )}
      </div>

      {/* Contenu — glisse de droite vers gauche */}
      <div className="flex-1 pb-2">
        {/* Période : légèrement plus rapide */}
        <p
          className={`text-xs text-muted uppercase tracking-widest mb-5 transition-all duration-600 ease-out ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
          style={{ transitionDelay: "80ms" }}
        >
          {group.period}
        </p>

        {/* Items — chacun avec un décalage progressif */}
        <div className="space-y-5">
          {group.items.map((item, ii) => (
            <div
              key={ii}
              className={`transition-all duration-700 ease-out ${
                inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
              }`}
              style={{ transitionDelay: `${120 + ii * 110}ms` }}
            >
              <div className="flex items-start gap-2 flex-wrap">
                <h3 className="text-white font-semibold text-base lg:text-lg hover:text-accent transition-colors cursor-default">
                  {item.title}
                </h3>
                {item.current && (
                  <span className="flex-shrink-0 mt-[3px] px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-semibold rounded-full border border-accent/20">
                    En cours
                  </span>
                )}
              </div>
              <p className="text-muted text-sm mt-0.5">{item.company}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Section principale ── */
export default function Resume() {
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      id="resume"
      className="min-h-screen flex flex-col justify-center px-10 lg:px-16 py-20 bg-dark"
    >
      <div className="max-w-3xl">
        {/* Badge + titre animé (montée) */}
        <div ref={titleRef}>
          {/* Badge slide-up */}
          <div
            className={`transition-all duration-500 ease-out ${
              titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <SectionBadge icon={FileText} label="CV" />
          </div>

          {/* "Formation et" — ligne 1, glisse vers le haut */}
          <div className="overflow-hidden">
            <h2
              className={`section-heading transition-all duration-700 ease-out ${
                titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Formation et
            </h2>
          </div>

          {/* "expérience" — ligne 2, suit avec délai */}
          <div className="overflow-hidden mb-14">
            <h2
              className={`section-heading text-accent transition-all duration-700 ease-out ${
                titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "230ms" }}
            >
              expérience
            </h2>
          </div>
        </div>

        {/* Timeline — chaque groupe observe son propre déclencheur */}
        <div className="space-y-10">
          {timeline.map((group, gi) => (
            <TimelineGroup
              key={group.period}
              group={group}
              isLast={gi === timeline.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
