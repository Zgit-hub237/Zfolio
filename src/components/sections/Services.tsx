"use client";

import { Layers, Smartphone, Globe, Shield, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import SectionBadge from "@/components/SectionBadge";
import { services } from "@/data/portfolio";

const iconMap = {
  smartphone: Smartphone,
  globe: Globe,
  monitor: Monitor,
  shield: Shield,
};

const projectCounts = {
  smartphone: "2 PROJETS",
  globe: "2 PROJETS",
  monitor: "Études & Formation",
  shield: "Études & Stage",
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function Services() {
  return (
    <section id="services" className="min-h-screen flex flex-col justify-center px-10 lg:px-16 py-20 bg-dark-2">
      <div className="max-w-3xl">

        {/* Titre — fade up au scroll */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
        >
          <SectionBadge icon={Layers} label="Services" />
          <h2 className="section-heading mb-12">
            Mes<br />
            <span className="text-accent">spécialisations</span>
          </h2>
        </motion.div>

        {/* Cartes — slide-in depuis la gauche avec stagger de 100 ms par carte */}
        <div className="space-y-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            const count = projectCounts[service.icon as keyof typeof projectCounts];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease }}
                className="service-card"
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
