"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle2 } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: personalInfo.address,
    href: null,
  },
];

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-dark">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="section-subtitle">Travaillons ensemble</p>
          <h2 className="section-title">Contactez-moi</h2>
          <div className="accent-line mx-auto" />
          <p className="text-muted max-w-xl mx-auto mt-4">
            Vous avez un projet, une question ou une opportunité ? N&apos;hésitez pas à me contacter.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — info */}
          <div className="lg:col-span-2 space-y-6">
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-accent" />
                </div>
                <div>
                  <div className="text-xs text-muted mb-1">{item.label}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white hover:text-accent transition-colors font-medium"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white font-medium">{item.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="pt-4">
              <p className="text-xs text-muted uppercase tracking-widest mb-4">Réseaux sociaux</p>
              <div className="flex gap-3">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-3 border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
                  aria-label="GitHub"
                >
                  <Github size={17} />
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-3 border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={17} />
                </a>
                <a
                  href={personalInfo.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-3 border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
                  aria-label="Twitter / X"
                >
                  <Twitter size={17} />
                </a>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            {status === "sent" ? (
              <div className="card border-accent/30 flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 size={48} className="text-accent mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Message envoyé !</h3>
                <p className="text-muted">
                  Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-outline mt-6"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-muted mb-2 uppercase tracking-widest">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                      className="w-full bg-dark-4 border border-dark-4 focus:border-accent/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder-muted/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-2 uppercase tracking-widest">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="votre@email.com"
                      className="w-full bg-dark-4 border border-dark-4 focus:border-accent/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder-muted/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-muted mb-2 uppercase tracking-widest">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Objet de votre message"
                    className="w-full bg-dark-4 border border-dark-4 focus:border-accent/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder-muted/40"
                  />
                </div>

                <div>
                  <label className="block text-xs text-muted mb-2 uppercase tracking-widest">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Décrivez votre projet ou votre demande..."
                    className="w-full bg-dark-4 border border-dark-4 focus:border-accent/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder-muted/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
