"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  FileText, ChevronDown, ChevronUp,
  Clock, BookOpen, Briefcase, X, Download,
} from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import { useT } from "@/contexts/LangContext";
import type { TimelineItemData, TimelineGroupData, ItemDetail } from "@/i18n/types";

/* ─── Popup de détails ─── */
function DetailPopup({
  detail, show, onClose, t,
}: {
  detail: ItemDetail;
  show: boolean;
  onClose: () => void;
  t: { educationLabel: string; experienceLabel: string };
}) {
  return (
    <div
      className={`absolute left-0 top-full mt-3 z-50 w-[min(18rem,calc(100vw-2.5rem))]
                  bg-dark-2 border border-dark-4 rounded-2xl p-4
                  shadow-2xl shadow-black/40
                  transition-all duration-200 ease-out origin-top-left
                  ${show
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
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

      <div className="flex flex-wrap gap-1.5">
        {detail.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-dark-4 rounded-md text-[10px] text-muted">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Item de la timeline ─── */
function TimelineItem({
  item, delay, inView, t,
}: {
  item: TimelineItemData;
  delay: number;
  inView: boolean;
  t: { educationLabel: string; experienceLabel: string; ongoing: string };
}) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div
      className={`relative ${showDetail ? "z-50" : "z-10"}`}
      onMouseEnter={() => setShowDetail(true)}
      onMouseLeave={() => setShowDetail(false)}
    >
      <div
        className={`transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="flex items-start gap-2 flex-wrap">
          <h3
            onClick={() => setShowDetail((v) => !v)}
            className={`font-semibold text-base lg:text-lg cursor-pointer transition-colors duration-200 select-none ${
              showDetail ? "text-accent" : "text-foreground hover:text-accent"
            }`}
          >
            {item.title}
          </h3>
          {item.current && (
            <span className="flex-shrink-0 mt-[3px] px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-semibold rounded-full border border-accent/20">
              {t.ongoing}
            </span>
          )}
        </div>
        <p className="text-muted text-sm mt-0.5">{item.company}</p>

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

/* ─── Groupe de la timeline ─── */
function TimelineGroup({
  group, isLast, t,
}: {
  group: TimelineGroupData;
  isLast: boolean;
  t: { educationLabel: string; experienceLabel: string; ongoing: string };
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div ref={ref} className="flex gap-8">
      <div className="flex flex-col items-center flex-shrink-0 pt-1 gap-1">
        <div
          className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 ease-out ${
            inView ? "border-accent bg-accent/30 scale-100" : "border-muted/30 bg-dark-4 scale-0"
          }`}
          style={{ transitionDelay: "50ms" }}
        />
        {!isLast && (
          <div
            className={`w-px flex-1 min-h-[60px] transition-all duration-700 ease-out ${
              inView ? "opacity-100 bg-gradient-to-b from-accent/20 to-dark-4" : "opacity-0 bg-dark-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          />
        )}
      </div>

      <div className="flex-1 pb-2">
        <p
          className={`text-xs text-muted uppercase tracking-widest mb-5 transition-all duration-500 ease-out ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
          style={{ transitionDelay: "80ms" }}
        >
          {group.period}
        </p>
        <div className="space-y-5">
          {group.items.map((item, ii) => (
            <TimelineItem key={ii} item={item} delay={120 + ii * 110} inView={inView} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Section principale ─── */
export default function Resume() {
  const [showExtra, setShowExtra] = useState(false);
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const { t } = useT();

  const displayedTimeline = showExtra
    ? [...t.resume.mainTimeline, ...t.resume.extraTimeline]
    : t.resume.mainTimeline;

  const tLabels = {
    educationLabel: t.resume.educationLabel,
    experienceLabel: t.resume.experienceLabel,
    ongoing: t.resume.ongoing,
  };

  return (
    <section id="resume" className="min-h-screen flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-14 sm:py-20 bg-dark">
      <div className="max-w-3xl">
        <div ref={titleRef}>
          <div className={`transition-all duration-500 ease-out ${titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <SectionBadge icon={FileText} label={t.resume.badge} />
          </div>

          <div className="overflow-hidden">
            <h2
              className={`section-heading transition-all duration-700 ease-out ${titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: "100ms" }}
            >
              {t.resume.heading1}
            </h2>
          </div>
          <div className="overflow-hidden mb-6 sm:mb-8">
            <h2
              className={`section-heading text-accent transition-all duration-700 ease-out ${titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: "230ms" }}
            >
              {t.resume.heading2}
            </h2>
          </div>

          <div
            className={`transition-all duration-500 ease-out mb-10 ${titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "350ms" }}
          >
            <a
              href="/cv/CV_ZEGOU_MEGNIZON_LOE.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-dark-4 rounded-full text-sm text-muted hover:text-accent hover:border-accent/30 transition-all duration-200 group"
            >
              <Download size={14} className="group-hover:text-accent transition-colors" />
              {t.resume.downloadCV}
            </a>
          </div>
        </div>

        <div className="space-y-7 sm:space-y-10">
          {displayedTimeline.map((group, gi) => (
            <TimelineGroup
              key={group.period}
              group={group}
              isLast={gi === displayedTimeline.length - 1}
              t={tLabels}
            />
          ))}
        </div>

        <div className="mt-10">
          <button
            onClick={() => setShowExtra((v) => !v)}
            className="flex items-center gap-2 text-sm text-muted hover:text-accent border border-dark-4 hover:border-accent/30 rounded-full px-5 py-2.5 transition-all duration-200 group"
          >
            {showExtra ? (
              <ChevronUp size={15} className="group-hover:text-accent" />
            ) : (
              <ChevronDown size={15} className="group-hover:text-accent" />
            )}
            {showExtra ? t.resume.showLess : t.resume.showMore}
          </button>
        </div>
      </div>
    </section>
  );
}
