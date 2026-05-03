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

export default function Resume() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="resume" className="min-h-screen flex flex-col justify-center px-10 lg:px-16 py-20 bg-dark">
      <div
        ref={ref}
        className={`max-w-3xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionBadge icon={FileText} label="CV" />

        <h2 className="section-heading mb-14">
          Formation et{" "}
          <span className="text-accent">expérience</span>
        </h2>

        {/* Timeline */}
        <div className="space-y-10">
          {timeline.map((group, gi) => (
            <div
              key={group.period}
              className={`flex gap-8 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${gi * 150}ms` }}
            >
              {/* Period column */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0 pt-1">
                <div className="w-2 h-2 rounded-full bg-dark-4 border border-muted/40" />
                {gi < timeline.length - 1 && (
                  <div className="w-px flex-1 bg-dark-4 min-h-[40px]" />
                )}
              </div>

              {/* Content column */}
              <div className="flex-1 pb-2">
                <p className="text-xs text-muted uppercase tracking-widest mb-4">{group.period}</p>
                <div className="space-y-4">
                  {group.items.map((item, ii) => (
                    <div key={ii}>
                      <div className="flex items-start gap-2">
                        <h3 className="text-white font-semibold text-base lg:text-lg hover:text-accent transition-colors cursor-default">
                          {item.title}
                        </h3>
                        {item.current && (
                          <span className="flex-shrink-0 mt-1 px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-semibold rounded-full border border-accent/20">
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
          ))}
        </div>
      </div>
    </section>
  );
}
