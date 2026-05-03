"use client";

import { useInView } from "react-intersection-observer";
import { Smartphone, Globe, Shield, CheckCircle2 } from "lucide-react";
import { services } from "@/data/portfolio";

const iconMap = {
  smartphone: Smartphone,
  globe: Globe,
  shield: Shield,
};

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="services" className="py-24 bg-dark">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="section-subtitle">Ce que je propose</p>
          <h2 className="section-title">Mes services</h2>
          <div className="accent-line mx-auto" />
          <p className="text-muted max-w-xl mx-auto mt-4">
            Des solutions adaptées à vos besoins, alliant performance, sécurité et expérience utilisateur.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={service.id}
                className={`card group hover:border-accent/30 hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                    <Icon size={24} className="text-accent" />
                  </div>

                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2 text-sm text-muted">
                        <CheckCircle2 size={14} className="text-accent flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block card border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
            <p className="text-white font-semibold mb-2">Vous avez un projet en tête ?</p>
            <p className="text-muted text-sm mb-6">
              Discutons de vos besoins et trouvons la meilleure solution ensemble.
            </p>
            <a href="#contact" className="btn-primary">
              Démarrer un projet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
