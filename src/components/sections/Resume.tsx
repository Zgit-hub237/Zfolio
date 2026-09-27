"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  FileText, ChevronDown, ChevronUp,
  Clock, BookOpen, Briefcase, X, Download, Award, GraduationCap,
} from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import { useT } from "@/contexts/LangContext";
import { CV_PATH } from "@/data/portfolio";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import ActiveIndicator from "@/components/ui/ActiveIndicator";
import { useReducedMotion } from "@/components/ui/useReducedMotion";
import type { ItemDetail } from "@/i18n/types";

export interface SeparatedTimelineItem {
  period: string;
  title: string;
  company: string;
  current?: boolean;
  detail: ItemDetail;
}

/* ─── Ligne de timeline qui se dessine au scroll ─── */
function TimelineColumn({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.85", "end 0.55"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative mt-4">
      <div aria-hidden="true" className="absolute top-0 left-0 bottom-0 w-px bg-dark-4 pointer-events-none z-0" />
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? { scaleY: 1, transformOrigin: "top" } : { scaleY, transformOrigin: "top" }}
        className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent to-accent-2 pointer-events-none z-0"
      />
      {children}
    </div>
  );
}

/* ─── Popup de détails ─── */
function DetailPopup({
  detail, show, onClose, t,
}: {
  detail: ItemDetail;
  show: boolean;
  onClose: () => void;
  t: { educationLabel: string; experienceLabel: string };
}) {
  useEffect(() => {
    if (!detail.credlyBadgeId || !show) return;
    if (document.querySelector('script[src*="credly.com/assets/utilities/embed"]')) return;
    const script = document.createElement("script");
    script.src = "//cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [detail.credlyBadgeId, show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -8 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          className="absolute left-0 top-full mt-3 z-50 w-[min(18rem,calc(100vw-2.5rem))]
                      bg-dark-2 border border-dark-4 rounded-2xl p-4
                      shadow-2xl shadow-black/40 origin-top-left"
          onMouseEnter={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {detail.type === "education" ? (
                <BookOpen size={13} className="text-accent" />
              ) : (
                <Briefcase size={13} className="text-accent" />
              )}
              <span className="text-[10px] text-accent uppercase tracking-widest font-semibold">
                {detail.type === "education" ? t.educationLabel : t.experienceLabel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {detail.duration && (
                <span className="flex items-center gap-1 text-[10px] text-muted">
                  <Clock size={10} />
                  {detail.duration}
                </span>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="text-muted/50 hover:text-muted transition-colors ml-1"
                aria-label="Fermer"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          <p className="text-muted text-xs leading-relaxed mb-3">{detail.description}</p>

          {detail.stats && (
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-3 p-3 bg-dark-3 rounded-xl">
              {detail.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="text-[9px] text-muted/60 uppercase tracking-widest block leading-none mb-0.5">
                    {stat.label}
                  </span>
                  <span className="text-xs text-foreground font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mb-3">
            {detail.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-dark-4 rounded-md text-[10px] text-muted">
                {tag}
              </span>
            ))}
          </div>

          {detail.credlyBadgeId && (
            <div className="flex items-center gap-2 pt-3 border-t border-dark-4">
              <div
                data-iframe-width="150"
                data-iframe-height="270"
                data-share-badge-id={detail.credlyBadgeId}
                data-share-badge-host="https://www.credly.com"
              />
            </div>
          )}

          {detail.certificateUrl && (
            <a
              href={detail.certificateUrl}
              download
              onClick={(e) => e.stopPropagation()}
              className="mt-3 flex items-center gap-2 px-3 py-2 bg-accent/10 border border-accent/20 rounded-xl text-accent text-[11px] font-medium hover:bg-accent/20 transition-all w-full justify-center"
            >
              <Award size={12} />
              Télécharger le certificat
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Item dans une colonne ─── */
function ColumnTimelineItem({
  item, index, inView, t,
}: {
  item: SeparatedTimelineItem;
  index: number;
  inView: boolean;
  t: { educationLabel: string; experienceLabel: string; ongoing: string };
}) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div
      className={`relative pl-6 pb-7 last:pb-0 ${showDetail ? "z-50" : "z-10"}`}
      onMouseEnter={() => setShowDetail(true)}
      onMouseLeave={() => setShowDetail(false)}
    >
      {/* Bullet Dot */}
      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-accent bg-dark-2 transition-all duration-300 z-10" />

      <div
        className={`transition-all duration-500 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: `${100 + index * 80}ms` }}
      >
        <span className="text-[11px] text-accent font-semibold tracking-wider uppercase block mb-1">
          {item.period}
        </span>

        <div className="flex items-start gap-2 flex-wrap mb-1">
          <h4
            onClick={() => setShowDetail((v) => !v)}
            className={`font-semibold text-base cursor-pointer transition-colors duration-200 select-none ${
              showDetail ? "text-accent" : "text-foreground hover:text-accent"
            }`}
          >
            {item.title}
          </h4>
          {item.current && (
            <span className="flex-shrink-0 px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-semibold rounded-full border border-accent/20">
              {t.ongoing}
            </span>
          )}
        </div>

        <p className="text-muted text-xs sm:text-sm">{item.company}</p>

        <DetailPopup
          detail={item.detail}
          show={showDetail}
          onClose={() => setShowDetail(false)}
          t={t}
        />
      </div>
    </div>
  );
}

/* ─── Section principale ─── */
export default function Resume() {
  const [showExtra, setShowExtra] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "education" | "experience">("all");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useT();

  const mainGroups = t.resume.mainTimeline;
  const extraGroups = t.resume.extraTimeline;

  const allGroups = showExtra ? [...mainGroups, ...extraGroups] : mainGroups;

  const educationItems: SeparatedTimelineItem[] = [];
  const experienceItems: SeparatedTimelineItem[] = [];

  for (const group of allGroups) {
    for (const item of group.items) {
      const entry: SeparatedTimelineItem = {
        period: group.period,
        title: item.title,
        company: item.company,
        current: item.current,
        detail: item.detail,
      };

      if (item.detail.type === "education") {
        educationItems.push(entry);
      } else {
        experienceItems.push(entry);
      }
    }
  }

  const tLabels = {
    educationLabel: t.resume.educationLabel,
    experienceLabel: t.resume.experienceLabel,
    ongoing: t.resume.ongoing,
  };

  const tabs: { key: "all" | "education" | "experience"; label: string; icon?: typeof BookOpen }[] = [
    { key: "all", label: "Tout voir (2 Colonnes)" },
    { key: "education", label: `${t.resume.educationLabel} (${educationItems.length})`, icon: BookOpen },
    { key: "experience", label: `${t.resume.experienceLabel} (${experienceItems.length})`, icon: Briefcase },
  ];

  return (
    <section id="resume" className="min-h-screen flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-14 sm:py-20 bg-dark">
      <div className="max-w-6xl w-full mx-auto" ref={ref}>
        <div>
          <div className={`transition-all duration-500 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <SectionBadge icon={FileText} label={t.resume.badge} />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <RevealText as="h2" className="section-heading mb-2">
                {t.resume.heading1} <span className="gradient-text">{t.resume.heading2}</span>
              </RevealText>
              <p className="text-muted text-sm sm:text-base max-w-xl">
                Parcours académique et expériences professionnelles structurés et séparés.
              </p>
            </div>

            <MagneticButton className="inline-block flex-shrink-0 self-start sm:self-auto">
              <a
                href={CV_PATH}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-dark-4 rounded-full text-sm text-muted hover:text-accent hover:border-accent/30 transition-all duration-200 group"
              >
                <Download size={14} className="group-hover:text-accent transition-colors" />
                {t.resume.downloadCV}
              </a>
            </MagneticButton>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  activeTab === key
                    ? "text-[#0f0f0f]"
                    : "bg-dark-2 border border-dark-4 text-muted hover:text-foreground"
                }`}
              >
                {activeTab === key && <ActiveIndicator layoutId="resume-tab-pill" />}
                {Icon && <Icon size={13} className="relative z-10" />}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Separated Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Column 1: Formations (Education) */}
          {(activeTab === "all" || activeTab === "education") && (
            <div className="bg-dark-2/60 border border-dark-4 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-dark-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground">{t.resume.educationLabel}</h3>
                    <p className="text-muted text-xs">Formations académiques & certifications</p>
                  </div>
                </div>

                <TimelineColumn>
                  {educationItems.map((item, idx) => (
                    <ColumnTimelineItem
                      key={`${item.title}-${idx}`}
                      item={item}
                      index={idx}
                      inView={inView}
                      t={tLabels}
                    />
                  ))}
                </TimelineColumn>
              </div>

              {!showExtra && (
                <div className="pt-6 mt-4 border-t border-dark-4/60">
                  <button
                    onClick={() => setShowExtra(true)}
                    className="w-full flex items-center justify-center gap-2 text-xs text-muted hover:text-accent border border-dark-4 hover:border-accent/30 rounded-full py-2.5 transition-all duration-200 group"
                  >
                    <ChevronDown size={14} className="group-hover:text-accent" />
                    {t.resume.showMore}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Column 2: Expériences (Work Experience) */}
          {(activeTab === "all" || activeTab === "experience") && (
            <div className="bg-dark-2/60 border border-dark-4 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-dark-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground">{t.resume.experienceLabel}</h3>
                    <p className="text-muted text-xs">Expériences professionnelles & stages</p>
                  </div>
                </div>

                <TimelineColumn>
                  {experienceItems.map((item, idx) => (
                    <ColumnTimelineItem
                      key={`${item.title}-${idx}`}
                      item={item}
                      index={idx}
                      inView={inView}
                      t={tLabels}
                    />
                  ))}
                </TimelineColumn>
              </div>
            </div>
          )}
        </div>

        {showExtra && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowExtra(false)}
              className="inline-flex items-center gap-2 text-xs text-muted hover:text-accent border border-dark-4 hover:border-accent/30 rounded-full px-5 py-2.5 transition-all duration-200 group"
            >
              <ChevronUp size={14} className="group-hover:text-accent" />
              {t.resume.showLess}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
