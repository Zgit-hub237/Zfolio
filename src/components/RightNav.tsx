"use client";

import { useState, useEffect } from "react";
import { Home, User, FileText, Layers, BarChart2, Grid3X3, Mail } from "lucide-react";

const navItems = [
  { href: "#hero", icon: Home, label: "Accueil" },
  { href: "#about", icon: User, label: "À propos" },
  { href: "#resume", icon: FileText, label: "Parcours" },
  { href: "#services", icon: Layers, label: "Services" },
  { href: "#skills", icon: BarChart2, label: "Compétences" },
  { href: "#projects", icon: Grid3X3, label: "Projets" },
  { href: "#contact", icon: Mail, label: "Contact" },
];

export default function RightNav() {
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      const ids = navItems.map((n) => n.href.replace("#", ""));
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
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-1 bg-dark-2/80 backdrop-blur-md border border-dark-4 rounded-full py-3 px-2">
      {navItems.map(({ href, icon: Icon, label }) => (
        <a
          key={href}
          href={href}
          title={label}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
            active === href
              ? "text-accent bg-accent/10"
              : "text-muted hover:text-white"
          }`}
        >
          <Icon size={15} />
        </a>
      ))}
    </nav>
  );
}
