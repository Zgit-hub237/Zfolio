import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download } from "lucide-react";
import { cv } from "@/data/cv";
import { CV_PATH } from "@/data/portfolio";
import PrintButton from "./PrintButton";
import s from "./cv.module.css";

export const metadata: Metadata = {
  title: "CV — Loé Zegou Megnizon",
  description: "CV de Loé Zegou Megnizon : cybersécurité, analyse, pentest et développement sécurisé.",
};

export default function CvPage() {
  return (
    <div className={s.screen}>
      <style>{"@page { size: A4; margin: 0; } @media print { html, body { background: #fff !important; } }"}</style>

      <nav className={s.toolbar} aria-label="Actions du CV">
        <Link href="/" className={s.toolbarLink}>
          <ArrowLeft size={14} />
          Portfolio
        </Link>
        <div className={s.toolbarButtons}>
          <a href={CV_PATH} download className={s.toolbarLink}>
            <Download size={14} />
            PDF
          </a>
          <PrintButton className={s.toolbarButton} />
        </div>
      </nav>

      <article className={s.page}>
        <header className={s.header}>
          <div className={s.headerText}>
          <h1 className={s.name}>{cv.name}</h1>
          <p className={s.headline}>{cv.headline}</p>
          <p className={s.subheadline}>{cv.subheadline}</p>
          <div className={s.contactRow}>
            {cv.contact.map((c) =>
              c.href ? (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {c.label}
                </a>
              ) : (
                <span key={c.label}>{c.label}</span>
              ),
            )}
          </div>
          </div>
          <Image
            src={cv.photo}
            alt={`Photo de ${cv.name}`}
            width={240}
            height={320}
            priority
            className={s.photo}
          />
        </header>

        <aside className={s.aside}>
          <section className={s.section}>
            <h2 className={s.sectionTitle}>Compétences</h2>
            {cv.skills.map((group) => (
              <div key={group.title} className={s.skillGroup}>
                <p className={s.skillGroupTitle}>{group.title}</p>
                <div className={s.chips}>
                  {group.items.map((item) => (
                    <span key={item} className={s.chip}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Certifications</h2>
            <ul className={s.simpleList}>
              {cv.certifications.map((c) => (
                <li key={c.title}>
                  <p className={s.certTitle}>
                    {c.href ? <a href={c.href} target="_blank" rel="noopener noreferrer">{c.title}</a> : c.title}
                  </p>
                  <p className={s.muted}>{c.org} · {c.date}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Langues</h2>
            <ul className={s.simpleList}>
              {cv.languages.map((l) => (
                <li key={l.name} className={s.langRow}>
                  <span>{l.name}</span>
                  <span className={s.muted}>{l.level}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Atouts</h2>
            <p>{cv.strengths.join(" · ")}</p>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Centres d&apos;intérêt</h2>
            <p>{cv.interests.join(" · ")}</p>
          </section>
        </aside>

        <main className={s.main}>
          <section className={s.section}>
            <h2 className={s.sectionTitle}>Profil</h2>
            <p className={s.profile}>{cv.profile}</p>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Expérience</h2>
            {cv.experience.map((e) => (
              <div key={e.role + e.org} className={s.entry}>
                <div className={s.entryHead}>
                  <p>
                    <span className={s.entryRole}>{e.role}</span>
                    {" — "}
                    <span className={s.entryOrg}>{e.org}</span>
                    <span className={s.muted}>, {e.place}</span>
                  </p>
                  <span className={s.entryPeriod}>{e.period}</span>
                </div>
                <ul className={s.bullets}>
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Projets</h2>
            <div className={s.projects}>
              {cv.projects.map((p) => (
                <div key={p.name} className={s.project}>
                  <p className={s.projectName}>
                    {p.href ? <a href={p.href} target="_blank" rel="noopener noreferrer">{p.name}</a> : p.name}
                  </p>
                  <p className={s.projectTags}>{p.tags}</p>
                  <p className={s.projectText}>{p.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Formation</h2>
            {cv.education.map((ed) => (
              <div key={ed.degree} className={s.entry}>
                <div className={s.entryHead}>
                  <p>
                    <span className={s.entryRole}>{ed.degree}</span>
                    {" — "}
                    <span className={s.entryOrg}>{ed.school}</span>
                  </p>
                  <span className={s.entryPeriod}>{ed.period}</span>
                </div>
                <p className={s.muted}>{ed.text}</p>
              </div>
            ))}
          </section>
        </main>
      </article>
    </div>
  );
}
