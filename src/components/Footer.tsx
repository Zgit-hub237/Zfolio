import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-2 border-t border-dark-4 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a href="#hero" className="text-xl font-bold text-white">
              <span className="text-accent">&lt;</span>
              Loé
              <span className="text-accent">/&gt;</span>
            </a>
            <p className="text-muted text-sm mt-1">
              Cybersécurité & Génie Logiciel — Yaoundé, Cameroun
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-dark-3 border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-dark-3 border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href={personalInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-dark-3 border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all"
              aria-label="Twitter / X"
            >
              <Twitter size={15} />
            </a>
          </div>

          <p className="text-muted text-sm flex items-center gap-1.5">
            © {year} Loé Zegou — Fait avec{" "}
            <Heart size={13} className="text-accent fill-accent" />
            &amp; Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
