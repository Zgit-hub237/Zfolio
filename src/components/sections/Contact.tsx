"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle2 } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import { personalInfo } from "@/data/portfolio";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center px-10 lg:px-16 py-20 bg-dark">
      <div
        ref={ref}
        className={`max-w-4xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionBadge icon={Mail} label="Contact" />

        <h2 className="section-heading mb-12">
          Travaillons<br />
          <span className="text-accent">ensemble</span>
        </h2>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-7">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl border border-dark-4 flex items-center justify-center flex-shrink-0">
                <Mail size={15} className="text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-1">Email</p>
                <a href={`mailto:${personalInfo.email}`} className="text-sm text-white hover:text-accent transition-colors">
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl border border-dark-4 flex items-center justify-center flex-shrink-0">
                <Phone size={15} className="text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-1">Téléphone</p>
                <a href={`tel:${personalInfo.phone}`} className="text-sm text-white hover:text-accent transition-colors">
                  {personalInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl border border-dark-4 flex items-center justify-center flex-shrink-0">
                <MapPin size={15} className="text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-1">Localisation</p>
                <span className="text-sm text-white">{personalInfo.address}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-dark-4">
              <p className="text-xs text-muted uppercase tracking-widest mb-4">Réseaux sociaux</p>
              <div className="flex gap-2">
                {[
                  { href: personalInfo.social.github, icon: Github, label: "GitHub" },
                  { href: personalInfo.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                  { href: personalInfo.social.twitter, icon: Twitter, label: "Twitter" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3">
            {status === "sent" ? (
              <div className="border border-dark-4 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                <CheckCircle2 size={44} className="text-accent mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Message envoyé !</h3>
                <p className="text-muted text-sm mb-6">
                  Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 border border-dark-4 rounded-full text-sm text-muted hover:text-accent hover:border-accent/30 transition-all"
                >
                  Nouveau message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted uppercase tracking-widest mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} required placeholder="Votre nom"
                      className="w-full bg-dark-2 border border-dark-4 focus:border-accent/40 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-muted/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted uppercase tracking-widest mb-2">
                      Email *
                    </label>
                    <input
                      type="email" name="email" value={form.email}
                      onChange={handleChange} required placeholder="votre@email.com"
                      className="w-full bg-dark-2 border border-dark-4 focus:border-accent/40 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-muted/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-muted uppercase tracking-widest mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text" name="subject" value={form.subject}
                    onChange={handleChange} required placeholder="Objet de votre message"
                    className="w-full bg-dark-2 border border-dark-4 focus:border-accent/40 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-muted/30"
                  />
                </div>

                <div>
                  <label className="block text-xs text-muted uppercase tracking-widest mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange} required rows={5}
                    placeholder="Décrivez votre projet ou demande..."
                    className="w-full bg-dark-2 border border-dark-4 focus:border-accent/40 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors resize-none placeholder:text-muted/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-hire disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
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
