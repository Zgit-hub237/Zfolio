"use client";

import { useInView } from "react-intersection-observer";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  User,
  Heart,
  Code2,
  Shield,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const infoItems = [
  { icon: User, label: "Prénom", value: personalInfo.firstName },
  { icon: User, label: "Nom", value: personalInfo.lastName },
  { icon: MapPin, label: "Localisation", value: personalInfo.location },
  { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: Phone, label: "Téléphone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
  { icon: Globe, label: "Disponibilité", value: "Ouvert aux opportunités" },
];

const domains = [
  {
    icon: Code2,
    title: "Développement",
    desc: "Web & Mobile",
    color: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/20",
  },
  {
    icon: Shield,
    title: "Cybersécurité",
    desc: "Audit & Pentest",
    color: "from-accent/20 to-accent/5",
    border: "border-accent/20",
  },
  {
    icon: Heart,
    title: "Innovation",
    desc: "Tech Émergentes",
    color: "from-purple-500/20 to-purple-600/5",
    border: "border-purple-500/20",
  },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-24 bg-dark-2">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="section-subtitle">Qui suis-je ?</p>
          <h2 className="section-title">À propos de moi</h2>
          <div className="accent-line mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — bio + domains */}
          <div>
            <p className="text-muted leading-relaxed text-lg mb-8">
              {personalInfo.bio}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {domains.map((d) => (
                <div
                  key={d.title}
                  className={`card border ${d.border} bg-gradient-to-br ${d.color} text-center py-6`}
                >
                  <d.icon className="text-accent mx-auto mb-3" size={24} />
                  <div className="text-sm font-semibold text-white">{d.title}</div>
                  <div className="text-xs text-muted mt-1">{d.desc}</div>
                </div>
              ))}
            </div>

            {/* Atouts */}
            <div>
              <h3 className="text-white font-semibold mb-4">Mes atouts</h3>
              <div className="flex flex-wrap gap-2">
                {personalInfo.strengths.map((s) => (
                  <span
                    key={s}
                    className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — infos + languages */}
          <div>
            <h3 className="text-white font-semibold mb-6">Informations personnelles</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <item.icon size={15} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-white hover:text-accent transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm text-white">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Languages */}
            <h3 className="text-white font-semibold mb-4">Langues</h3>
            <div className="space-y-4">
              {personalInfo.languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-white font-medium">{lang.name}</span>
                    <span className="text-xs text-accent">{lang.level}</span>
                  </div>
                  <div className="h-1.5 bg-dark-4 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full transition-all duration-1000"
                      style={{ width: inView ? `${lang.percent}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Centres d'intérêt */}
            <div className="mt-8">
              <h3 className="text-white font-semibold mb-4">Centres d&apos;intérêt</h3>
              <div className="flex flex-wrap gap-2">
                {personalInfo.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 bg-dark-3 border border-dark-4 rounded-full text-sm text-muted"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
