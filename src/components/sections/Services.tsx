"use client";

import { Layers, Smartphone, Globe, Shield, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import SectionBadge from "@/components/SectionBadge";
import { services } from "@/data/portfolio";
import { useT } from "@/contexts/LangContext";

const iconMap = {
  smartphone: Smartphone,
  globe: Globe,
  monitor: Monitor,
  shield: Shield,
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function Services() {
  const { t } = useT();

  return (
    <section id="services" className="min-h-screen flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-14 sm:py-20 bg-dark-2">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
        >
          <SectionBadge icon={Layers} label={t.services.badge} />
          <h2 className="section-heading mb-12">
            {t.services.heading.split(" ").slice(0, -1).join(" ")}<br />
            <span className="text-accent">{t.services.heading.split(" ").slice(-1)[0]}</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            const count = t.services.counts[service.icon];
            const translated = t.services.items[i];
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
                  <h3 className="text-foreground text-base sm:text-xl font-semibold mb-2">
                    {translated?.title ?? service.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-3">
                    {translated?.description ?? service.description}
                  </p>
                  <p className="text-accent text-xs font-bold uppercase tracking-widest">
                    {count}
                  </p>
                </div>
                <div className="text-accent opacity-40 transition-opacity flex-shrink-0">
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
