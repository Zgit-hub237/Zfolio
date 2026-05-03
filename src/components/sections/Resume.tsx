"use client";

import { useInView } from "react-intersection-observer";
import { GraduationCap, Briefcase, Calendar, MapPin } from "lucide-react";
import { education, experience } from "@/data/portfolio";

function TimelineItem({
  title,
  subtitle,
  location,
  period,
  description,
  tags,
  current,
  icon: Icon,
  index,
}: {
  title: string;
  subtitle: string;
  location?: string;
  period: string;
  description: string;
  tags?: string[];
  current: boolean;
  icon: typeof GraduationCap;
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`relative pl-12 pb-10 last:pb-0 transition-all duration-700 ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-dark-4 last:hidden" />

      {/* Icon dot */}
      <div
        className={`absolute left-0 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
          current
            ? "border-accent bg-accent/10 text-accent"
            : "border-dark-4 bg-dark-3 text-muted"
        }`}
      >
        <Icon size={14} />
      </div>

      {/* Content */}
      <div className="card group hover:border-accent/20 ml-2">
        {current && (
          <span className="inline-block mb-3 px-2.5 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
            En cours
          </span>
        )}

        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-accent text-sm font-medium mb-3">{subtitle}</p>

        <div className="flex flex-wrap gap-4 mb-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {period}
          </span>
          {location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {location}
            </span>
          )}
        </div>

        <p className="text-muted text-sm leading-relaxed mb-4">{description}</p>

        {tags && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-dark-4 rounded-md text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Resume() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="resume" className="py-24 bg-dark-2">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="section-subtitle">Mon parcours</p>
          <h2 className="section-title">Formation & Expérience</h2>
          <div className="accent-line mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <GraduationCap size={18} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white">Formation</h3>
            </div>

            {education.map((edu, i) => (
              <TimelineItem
                key={edu.id}
                title={edu.degree}
                subtitle={edu.field}
                location={edu.location}
                period={edu.period}
                description={edu.description}
                current={edu.current}
                icon={GraduationCap}
                index={i}
              />
            ))}
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Briefcase size={18} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white">Expériences</h3>
            </div>

            {experience.map((exp, i) => (
              <TimelineItem
                key={exp.id}
                title={exp.role}
                subtitle={exp.company}
                period={exp.period}
                description={exp.description}
                tags={exp.tags}
                current={exp.current}
                icon={Briefcase}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
