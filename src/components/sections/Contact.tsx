"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, CheckCircle2, Download } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import { personalInfo } from "@/data/portfolio";
import { useT } from "@/contexts/LangContext";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const { t } = useT();

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
    <section id="contact" className="min-h-screen flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-14 sm:py-20 bg-dark">
      <div
        ref={ref}
        className={`max-w-4xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionBadge icon={Mail} label={t.contact.badge} />

        <h2 className="section-heading mb-8 sm:mb-12">
          {t.contact.heading.split(" ").slice(0, -1).join(" ")}<br />
          <span className="text-accent">{t.contact.heading.split(" ").slice(-1)[0]}</span>
        </h2>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-7">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl border border-dark-4 flex items-center justify-center flex-shrink-0">
                <Mail size={15} className="text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-1">{t.contact.emailLabel}</p>
                <a href={`mailto:${personalInfo.email}`} className="text-sm text-foreground hover:text-accent transition-colors">
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl border border-dark-4 flex items-center justify-center flex-shrink-0">
                <Phone size={15} className="text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-1">{t.contact.phoneLabel}</p>
                <a href={`tel:${personalInfo.phone}`} className="text-sm text-foreground hover:text-accent transition-colors">
                  {personalInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl border border-dark-4 flex items-center justify-center flex-shrink-0">
                <MapPin size={15} className="text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-1">{t.contact.locationLabel}</p>
                <span className="text-sm text-foreground">{personalInfo.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl border border-dark-4 flex items-center justify-center flex-shrink-0">
                <Download size={15} className="text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-1">{t.contact.cvLabel}</p>
                <a href="/cv/CV_ZEGOU_MEGNIZON_LOE.pdf" download
                  className="text-sm text-foreground hover:text-accent transition-colors">
                  {t.contact.downloadCV}
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-dark-4">
              <p className="text-xs text-muted uppercase tracking-widest mb-4">{t.contact.socialLabel}</p>
              <div className="flex gap-2">
                {[
                  { href: personalInfo.social.github,    label: "GitHub",    color: "hover:text-red-500 hover:border-red-500/40" },
                  { href: personalInfo.social.linkedin,  label: "LinkedIn",  color: "hover:text-blue-500 hover:border-blue-500/40" },
                  { href: personalInfo.social.instagram, label: "Instagram", color: "hover:text-purple-500 hover:border-purple-500/40" },
                  { href: personalInfo.social.whatsapp,  label: "WhatsApp",  color: "hover:text-green-500 hover:border-green-500/40" },
                ].map(({ href, label, color }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
                    className={`w-9 h-9 rounded-full border border-dark-4 flex items-center justify-center text-muted transition-all ${color}`}>
                    <span className="text-[10px] font-bold">{label.slice(0, 2)}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3">
            {status === "sent" ? (
              <div className="border border-dark-4 rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-dark-2">
                <CheckCircle2 size={44} className="text-accent mb-4" />
                <h3 className="text-foreground font-bold text-xl mb-2">{t.contact.sentTitle}</h3>
                <p className="text-muted text-sm mb-6">{t.contact.sentMessage}</p>
                <button onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 border border-dark-4 rounded-full text-sm text-muted hover:text-accent hover:border-accent/30 transition-all">
                  {t.contact.newMessageButton}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted uppercase tracking-widest mb-2">{t.contact.nameLabel}</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required
                      placeholder={t.contact.namePlaceholder}
                      className="w-full bg-dark-2 border border-dark-4 focus:border-accent/40 rounded-xl px-4 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted/30" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted uppercase tracking-widest mb-2">{t.contact.emailFieldLabel}</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full bg-dark-2 border border-dark-4 focus:border-accent/40 rounded-xl px-4 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted/30" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-muted uppercase tracking-widest mb-2">{t.contact.subjectLabel}</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} required
                    placeholder={t.contact.subjectPlaceholder}
                    className="w-full bg-dark-2 border border-dark-4 focus:border-accent/40 rounded-xl px-4 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted/30" />
                </div>

                <div>
                  <label className="block text-xs text-muted uppercase tracking-widest mb-2">{t.contact.messageLabel}</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full bg-dark-2 border border-dark-4 focus:border-accent/40 rounded-xl px-4 py-3 text-foreground text-sm outline-none transition-colors resize-none placeholder:text-muted/30" />
                </div>

                <button type="submit" disabled={status === "sending"}
                  className="btn-hire disabled:opacity-50 disabled:cursor-not-allowed">
                  {status === "sending" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0f0f0f]/30 border-t-[#0f0f0f] rounded-full animate-spin" />
                      {t.contact.sendingButton}
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      {t.contact.sendButton}
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
