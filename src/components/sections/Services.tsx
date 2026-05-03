"use client";

import { useInView } from "react-intersection-observer";
import { Layers, Smartphone, Globe, Shield } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import { services } from "@/data/portfolio";

const iconMap = {
  smartphone: Smartphone,
  globe: Globe,
  shield: Shield,
};

const projectCounts = {
  smartphone: "2 PROJETS",
  globe: "1 PROJET",
  shield: "Études & Stage",
};

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="services" className="min-h-screen flex flex-col justify-center px-10 lg:px-16 py-20 bg-dark-2">
      <div
        ref={ref}
        className={`max-w-3xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionBadge icon={Layers} label="Services" />

        <h2 className="section-heading mb-12">
          Mes<br />
          <span className="text-accent">spécialisations</span>
        </h2>

        <div className="space-y-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            const count = projectCounts[service.icon as keyof typeof projectCounts];
            return (
              <div
                key={service.id}
                className={`service-card transition-all duration-700 ${
                  inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex-1 mr-6">
                  <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <p className="text-accent text-xs font-bold uppercase tracking-widest">
                    {count}
                  </p>
                </div>
                <div className="text-accent opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <Icon size={36} strokeWidth={1.5} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
