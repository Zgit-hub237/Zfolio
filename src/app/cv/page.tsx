import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, Languages } from "lucide-react";
import { getSiteContent } from "@/lib/content/get";
import { DEFAULT_CV_PDF, lines, tr, type Lang } from "@/lib/content/types";
import PrintButton from "./PrintButton";
import s from "./cv.module.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "CV — Loé Zegou Megnizon",
  description: "CV de Loé Zegou Megnizon : cybersécurité, analyse, pentest et développement sécurisé.",
};

const labels = {
  fr: { skills: "Compétences", certs: "Certifications", langs: "Langues", strengths: "Atouts", interests: "Centres d'intérêt", profile: "Profil", exp: "Expérience", projects: "Projets", edu: "Formation", print: "Imprimer", other: "English" },
  en: { skills: "Skills", certs: "Certifications", langs: "Languages", strengths: "Strengths", interests: "Interests", profile: "Profile", exp: "Experience", projects: "Projects", edu: "Education", print: "Print", other: "Français" },
};

const displayUrl = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default async function CvPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lang: Lang = (await searchParams).lang === "en" ? "en" : "fr";
  const t = labels[lang];
  const c = await getSiteContent();
  const p = c.profile;
  const cvItems = c.timeline.filter((i) => i.showOnCv);
  const experience = cvItems.filter((i) => i.kind === "experience" && !i.certification);
  const education = cvItems.filter((i) => i.kind === "education" && !i.certification);
  const certifications = cvItems.filter((i) => i.certification);
  const projects = c.projects.filter((pr) => pr.showOnCv);

  const contact = [
    { label: p.email, href: `mailto:${p.email}` },
    { label: p.phone, href: `tel:${p.phone.replace(/\s/g, "")}` },
    { label: tr(p.location, lang), href: null },
    { label: displayUrl(p.portfolioUrl), href: p.portfolioUrl },
    { label: displayUrl(p.social.linkedin).replace(/-\d+$/, ""), href: p.social.linkedin },
    { label: displayUrl(p.social.github), href: p.social.github },
  ].filter((x) => x.label);

  return (
    <div className={s.screen}>
      <style>{"@page { size: A4; margin: 0; } @media print { html, body { background: #fff !important; } }"}</style>

      <nav className={s.toolbar} aria-label="Actions du CV">
        <Link href="/" className={s.toolbarLink}>
          <ArrowLeft size={14} />
          Portfolio
        </Link>
        <div className={s.toolbarButtons}>
          <Link href={lang === "fr" ? "/cv?lang=en" : "/cv"} className={s.toolbarLink}>
            <Languages size={14} />
            {t.other}
          </Link>
          <a href={p.cv.pdfUrl || DEFAULT_CV_PDF} download className={s.toolbarLink}>
            <Download size={14} />
            PDF
          </a>
          <PrintButton className={s.toolbarButton} label={t.print} />
        </div>
      </nav>

      <article className={s.page} lang={lang}>
        <header className={s.header}>
          <div className={s.headerText}>
            <h1 className={s.name}>{p.name}</h1>
            <p className={s.headline}>{tr(p.cv.headline, lang)}</p>
            <p className={s.subheadline}>{tr(p.cv.subheadline, lang)}</p>
            <div className={s.contactRow}>
              {contact.map((ct) =>
                ct.href ? (
                  <a key={ct.label} href={ct.href} target={ct.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {ct.label}
                  </a>
                ) : (
                  <span key={ct.label}>{ct.label}</span>
                ),
              )}
            </div>
          </div>
          {p.photo && (
            <Image src={p.photo} alt={`Photo de ${p.name}`} width={240} height={320} priority className={s.photo} unoptimized={p.photo.startsWith("http")} />
          )}
        </header>

        <aside className={s.aside}>
          <section className={s.section}>
            <h2 className={s.sectionTitle}>{t.skills}</h2>
            {c.cvSkills.map((group) => (
              <div key={group.title.fr} className={s.skillGroup}>
                <p className={s.skillGroupTitle}>{tr(group.title, lang)}</p>
                <div className={s.chips}>
                  {group.items.map((item) => (
                    <span key={item} className={s.chip}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {certifications.length > 0 && (
            <section className={s.section}>
              <h2 className={s.sectionTitle}>{t.certs}</h2>
              <ul className={s.simpleList}>
                {certifications.map((cert) => {
                  const href = cert.credlyBadgeId ? `https://www.credly.com/badges/${cert.credlyBadgeId}/public_url` : null;
                  return (
                    <li key={cert.id}>
                      <p className={s.certTitle}>
                        {href ? <a href={href} target="_blank" rel="noopener noreferrer">{tr(cert.title, lang)}</a> : tr(cert.title, lang)}
                      </p>
                      <p className={s.muted}>
                        {tr(cert.org, lang)}
                        {cert.current ? (lang === "fr" ? " · en cours" : " · in progress") : ` · ${tr(cert.period, lang).split(/[—–-]/).pop()?.trim()}`}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section className={s.section}>
            <h2 className={s.sectionTitle}>{t.langs}</h2>
            <ul className={s.simpleList}>
              {p.cv.languages.map((lg) => (
                <li key={lg.name.fr} className={s.langRow}>
                  <span>{tr(lg.name, lang)}</span>
                  <span className={s.muted}>{tr(lg.level, lang)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>{t.strengths}</h2>
            <p>{lines(tr(p.cv.strengths, lang)).join(" · ")}</p>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>{t.interests}</h2>
            <p>{lines(tr(p.cv.interests, lang)).join(" · ")}</p>
          </section>
        </aside>

        <main className={s.main}>
          <section className={s.section}>
            <h2 className={s.sectionTitle}>{t.profile}</h2>
            <p className={s.profile}>{tr(p.cv.profile, lang)}</p>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>{t.exp}</h2>
            {experience.map((e) => (
              <div key={e.id} className={s.entry}>
                <div className={s.entryHead}>
                  <p>
                    <span className={s.entryRole}>{tr(e.title, lang)}</span>
                    {" — "}
                    <span className={s.entryOrg}>{tr(e.org, lang)}</span>
                    {tr(e.place, lang) && <span className={s.muted}>, {tr(e.place, lang)}</span>}
                  </p>
                  <span className={s.entryPeriod}>{tr(e.period, lang)}</span>
                </div>
                <ul className={s.bullets}>
                  {lines(tr(e.cvBullets, lang) || tr(e.description, lang)).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {projects.length > 0 && (
            <section className={s.section}>
              <h2 className={s.sectionTitle}>{t.projects}</h2>
              <div className={s.projects}>
                {projects.map((pr) => (
                  <div key={pr.id} className={s.project}>
                    <p className={s.projectName}>
                      {pr.github || pr.link ? (
                        <a href={pr.github || pr.link || undefined} target="_blank" rel="noopener noreferrer">{tr(pr.title, lang)}</a>
                      ) : (
                        tr(pr.title, lang)
                      )}
                    </p>
                    {pr.cvTags && <p className={s.projectTags}>{pr.cvTags}</p>}
                    <p className={s.projectText}>{tr(pr.cvText, lang) || tr(pr.description, lang)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className={s.section}>
            <h2 className={s.sectionTitle}>{t.edu}</h2>
            {education.map((ed) => (
              <div key={ed.id} className={s.entry}>
                <div className={s.entryHead}>
                  <p>
                    <span className={s.entryRole}>{tr(ed.title, lang)}</span>
                    {" — "}
                    <span className={s.entryOrg}>{[tr(ed.org, lang), tr(ed.place, lang)].filter(Boolean).join(", ")}</span>
                  </p>
                  <span className={s.entryPeriod}>{tr(ed.period, lang)}</span>
                </div>
                <p className={s.muted}>{tr(ed.cvBullets, lang) || tr(ed.description, lang)}</p>
              </div>
            ))}
          </section>
        </main>
      </article>
    </div>
  );
}
