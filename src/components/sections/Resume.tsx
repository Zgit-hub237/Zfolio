"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  FileText,
  ChevronDown,
  ChevronUp,
  Clock,
  BookOpen,
  Briefcase,
  X,
} from "lucide-react";
import SectionBadge from "@/components/SectionBadge";

/* ─── Types ─────────────────────────────────────────────── */
type Stat = { label: string; value: string };

type ItemDetail = {
  type: "education" | "experience";
  description: string;
  duration?: string;
  stats?: Stat[];
  tags: string[];
};

type TimelineItemData = {
  title: string;
  company: string;
  current: boolean;
  detail: ItemDetail;
};

type TimelineGroupData = {
  period: string;
  items: TimelineItemData[];
};

/* ─── Données ────────────────────────────────────────────── */
const mainTimeline: TimelineGroupData[] = [
  {
    period: "Juin 2026 — Présent",
    items: [
      {
        title: "Web Développeur",
        company: "SpeDev, Yaoundé",
        current: true,
        detail: {
          type: "experience",
          description:
            "Conception et développement d'applications web modernes au sein de SpeDev. Collaboration en équipe sur des projets clients variés.",
          tags: ["React", "Next.js", "Web", "SpeDev"],
        },
      },
    ],
  },
  {
    period: "Oct. 2025 — Présent",
    items: [
      {
        title: "Master I — Système d'Information & Génie Logiciel",
        company: "Université de Yaoundé I",
        current: true,
        detail: {
          type: "education",
          description:
            "Approfondissement en ingénierie logicielle, conception de systèmes d'information sécurisés et intégration de technologies avancées.",
          tags: ["Génie Logiciel", "Cybersécurité", "Systèmes d'Information"],
        },
      },
    ],
  },
  {
    period: "Janv. 2025 — Oct. 2025",
    items: [
      {
        title: "Stagiaire Développeur Mobile",
        company: "PIALOA Technologie, Yaoundé",
        current: false,
        detail: {
          type: "experience",
          duration: "7 mois",
          description:
            "Conception et déploiement d'une solution d'authentification biométrique sécurisée. Intégration mobile, gestion de base de données et sécurité applicative.",
          tags: ["Mobile", "Biométrie", "Sécurité", "Flutter"],
        },
      },
      {
        title: "Développeur Freelance",
        company: "Application mobile — Flutter & Firebase",
        current: false,
        detail: {
          type: "experience",
          duration: "2 mois",
          description:
            "Application mobile multiplateforme de petites annonces avec messagerie en temps réel et authentification sécurisée.",
          tags: ["Flutter", "Firebase", "Dart", "Real-time"],
        },
      },
    ],
  },
  {
    period: "Sept. 2022 — Juil. 2025",
    items: [
      {
        title: "Licence Professionnelle en Informatique",
        company: "Université de Yaoundé I — Spé. Cybersécurité",
        current: false,
        detail: {
          type: "education",
          description:
            "L3 : Cryptographie, audit de vulnérabilités, administration sécurisée. L2 : Développement logiciel, bases de données, réseaux. L1 : Algorithmique, programmation, mathématiques appliquées.",
          tags: ["Cybersécurité", "Cryptographie", "Développement", "Réseaux"],
        },
      },
    ],
  },
];

const extraTimeline: TimelineGroupData[] = [
  {
    period: "Session 2022",
    items: [
      {
        title: "Baccalauréat — Série C",
        company: "Lycée NSAM-EFOULAN, Yaoundé",
        current: false,
        detail: {
          type: "education",
          description:
            "Baccalauréat de l'Enseignement Secondaire Général. Série C : Mathématiques, Physique-Chimie. Session 2022, Lycée de NSAM-EFOULAN.",
          stats: [
            { label: "Moyenne", value: "10,78 / 20" },
            { label: "Mention", value: "Passable" },
            { label: "Jury N°", value: "332" },
          ],
          tags: ["Mathématiques", "Physique-Chimie", "Informatique"],
        },
      },
    ],
  },
  {
    period: "Session 2021",
    items: [
      {
        title: "Probatoire — Série C",
        company: "Lycée NSAM-EFOULAN, Yaoundé",
        current: false,
        detail: {
          type: "education",
          description:
            "Probatoire de l'Enseignement Secondaire Général. Série C : Mathématiques, Physique-Chimie. Session 2021.",
          stats: [
            { label: "Moyenne", value: "10,75 / 20" },
            { label: "Mention", value: "Admis" },
            { label: "Total", value: "301 / 28 coefs" },
          ],
          tags: ["Mathématiques", "Physique-Chimie", "Sciences"],
        },
      },
    ],
  },
  {
    period: "Session 2019",
    items: [
      {
        title: "BEPC — Premier Cycle",
        company: "Lycée NSAM-EFOULAN, Yaoundé",
        current: false,
        detail: {
          type: "education",
          description:
            "Brevet d'Études du Premier Cycle. Points forts : Mathématiques (56/80), Éducation Citoyenneté (34/40), Éducation Physique (34/40), Expression Écrite (24/40).",
          stats: [
            { label: "Moyenne", value: "11,88 / 20" },
            { label: "Total", value: "297 / 500" },
            { label: "Mention", value: "Passable" },
          ],
          tags: ["Mathématiques", "Sciences", "Premier Cycle"],
        },
      },
    ],
  },
];

/* ─── Popup de détails ───────────────────────────────────── */
function DetailPopup({
  detail,
  show,
  onClose,
}: {
  detail: ItemDetail;
  show: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`absolute left-0 top-full mt-3 z-50 w-72 sm:w-80
                  bg-dark-2 border border-dark-4 rounded-2xl p-4
                  shadow-2xl shadow-black/60
                  transition-all duration-200 ease-out origin-top-left
                  ${show
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
      onMouseEnter={(e) => e.stopPropagation()}
    >
      {/* Header popup */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {detail.type === "education" ? (
            <BookOpen size={13} className="text-accent" />
          ) : (
            <Briefcase size={13} className="text-accent" />
          )}
          <span className="text-[10px] text-accent uppercase tracking-widest font-semibold">
            {detail.type === "education" ? "Formation" : "Expérience"}
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

      {/* Description */}
      <p className="text-muted text-xs leading-relaxed mb-3">
        {detail.description}
      </p>

      {/* Stats */}
      {detail.stats && (
        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-3 p-3 bg-dark-3 rounded-xl">
          {detail.stats.map((stat) => (
            <div key={stat.label}>
              <span className="text-[9px] text-muted/60 uppercase tracking-widest block leading-none mb-0.5">
                {stat.label}
              </span>
              <span className="text-xs text-white font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {detail.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-dark-4 rounded-md text-[10px] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Item de la timeline ────────────────────────────────── */
function TimelineItem({
  item,
  delay,
  inView,
}: {
  item: TimelineItemData;
  delay: number;
  inView: boolean;
}) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Wrapper avec événements hover/click */}
      <div
        className="relative z-10"
        onMouseEnter={() => setShowDetail(true)}
        onMouseLeave={() => setShowDetail(false)}
      >
        <div className="flex items-start gap-2 flex-wrap">
          <h3
            onClick={() => setShowDetail((v) => !v)}
            className={`font-semibold text-base lg:text-lg cursor-pointer transition-colors duration-200 select-none ${
              showDetail ? "text-accent" : "text-white hover:text-accent"
            }`}
          >
            {item.title}
          </h3>
          {item.current && (
            <span className="flex-shrink-0 mt-[3px] px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-semibold rounded-full border border-accent/20">
              En cours
            </span>
          )}
        </div>
        <p className="text-muted text-sm mt-0.5">{item.company}</p>

        <DetailPopup
          detail={item.detail}
          show={showDetail}
          onClose={() => setShowDetail(false)}
        />
      </div>
    </div>
  );
}

/* ─── Groupe de la timeline ──────────────────────────────── */
function TimelineGroup({
  group,
  isLast,
}: {
  group: TimelineGroupData;
  isLast: boolean;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div ref={ref} className="flex gap-8">
      {/* Dot + ligne */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1 gap-1">
        <div
          className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 ease-out ${
            inView
              ? "border-accent bg-accent/30 scale-100"
              : "border-muted/30 bg-dark-4 scale-0"
          }`}
          style={{ transitionDelay: "50ms" }}
        />
        {!isLast && (
          <div
            className={`w-px flex-1 min-h-[60px] transition-all duration-700 ease-out ${
              inView
                ? "opacity-100 bg-gradient-to-b from-accent/20 to-dark-4"
                : "opacity-0 bg-dark-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          />
        )}
      </div>

      {/* Contenu */}
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
            <TimelineItem
              key={ii}
              item={item}
              delay={120 + ii * 110}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Section principale ─────────────────────────────────── */
export default function Resume() {
  const [showExtra, setShowExtra] = useState(false);
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const displayedTimeline = showExtra
    ? [...mainTimeline, ...extraTimeline]
    : mainTimeline;

  return (
    <section
      id="resume"
      className="min-h-screen flex flex-col justify-center px-10 lg:px-16 py-20 bg-dark"
    >
      <div className="max-w-3xl">
        {/* Titre animé (montée) */}
        <div ref={titleRef}>
          <div
            className={`transition-all duration-500 ease-out ${
              titleInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <SectionBadge icon={FileText} label="CV" />
          </div>

          <div className="overflow-hidden">
            <h2
              className={`section-heading transition-all duration-700 ease-out ${
                titleInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Formation et
            </h2>
          </div>
          <div className="overflow-hidden mb-14">
            <h2
              className={`section-heading text-accent transition-all duration-700 ease-out ${
                titleInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "230ms" }}
            >
              expérience
            </h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-10">
          {displayedTimeline.map((group, gi) => (
            <TimelineGroup
              key={group.period}
              group={group}
              isLast={gi === displayedTimeline.length - 1}
            />
          ))}
        </div>

        {/* Bouton Voir plus / Voir moins */}
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
            {showExtra
              ? "Voir moins"
              : "Voir plus — formations antérieures (BAC, Probatoire, BEPC)"}
          </button>
        </div>
      </div>
    </section>
  );
}
