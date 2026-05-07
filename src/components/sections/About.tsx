"use client";

import { useInView } from "react-intersection-observer";
import { User } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import { useT } from "@/contexts/LangContext";

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useT();

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-14 sm:py-20 bg-dark-2">
      <div
        ref={ref}
        className={`max-w-3xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionBadge icon={User} label={t.about.badge} />

        <h2 className="section-heading mb-8">
          {t.about.heading1}<br />
          {t.about.heading2}{" "}
          <span className="text-accent">
            {t.about.heading3}<br />{t.about.heading4}
          </span>
        </h2>

        <p className="text-muted text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-10">
          {t.about.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          {t.about.strengths.map((s) => (
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
