"use client";

import { useState, useEffect } from "react";
import { Home, User, FileText, Layers, BarChart2, Grid3X3, Mail, Menu } from "lucide-react";
import { useT } from "@/contexts/LangContext";

export default function RightNav() {
  const [active, setActive] = useState("#hero");
  const { t, setMenuOpen } = useT();

  const navItems = [
    { href: "#hero",     icon: Home,      label: t.nav.home },
    { href: "#about",    icon: User,      label: t.nav.about },
    { href: "#resume",   icon: FileText,  label: t.nav.resume },
    { href: "#services", icon: Layers,    label: t.nav.services },
    { href: "#skills",   icon: BarChart2, label: t.nav.skills },
    { href: "#projects", icon: Grid3X3,   label: t.nav.projects },
    { href: "#contact",  icon: Mail,      label: t.nav.contact },
  ];

  useEffect(() => {
    const ids = ["hero", "about", "resume", "services", "skills", "projects", "contact"];
    const handleScroll = () => {
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-1 bg-dark-2/80 backdrop-blur-md border border-dark-4 rounded-full py-3 px-2 shadow-xl">
      <button
        onClick={() => setMenuOpen(true)}
        title={t.nav.menu || "Menu"}
        aria-label="Menu"
        className="w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-all duration-200 group"
      >
        <Menu size={16} className="group-hover:text-accent transition-colors" />
      </button>

      <div className="w-5 h-[1px] bg-dark-4 my-1" />

      {navItems.map(({ href, icon: Icon, label }) => (
        <a
          key={href}
          href={href}
          title={label}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
            active === href
              ? "text-accent bg-accent/10"
              : "text-muted hover:text-foreground"
          }`}
        >
          <Icon size={15} />
        </a>
      ))}
    </nav>
  );
}
