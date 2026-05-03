"use client";

import { useInView } from "react-intersection-observer";
import { User } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import { personalInfo } from "@/data/portfolio";

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center px-10 lg:px-16 py-20 bg-dark-2">
      <div
        ref={ref}
        className={`max-w-3xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionBadge icon={User} label="À propos" />

        <h2 className="section-heading mb-8">
          Chaque grande solution<br />
          numérique commence par{" "}
          <span className="text-accent">
            une histoire<br />encore meilleure
          </span>
        </h2>

        <p className="text-muted text-base lg:text-lg leading-relaxed max-w-2xl mb-10">
          {personalInfo.bio}
        </p>

        {/* Atouts */}
        <div className="flex flex-wrap gap-2">
          {personalInfo.strengths.map((s) => (
            <span
              key={s}
              className="px-4 py-2 border border-dark-4 rounded-full text-sm text-muted hover:border-accent/30 hover:text-accent transition-all cursor-default"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
