"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, UserRound, GraduationCap, FolderKanban, Layers, BarChart2, FileText,
  PenSquare, Mail, Images, ShieldCheck, ExternalLink, LogOut, Menu, X,
} from "lucide-react";
import { logout } from "@/app/admin/(auth)/login/actions";

const links = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/profil", label: "Profil & textes", icon: UserRound },
  { href: "/admin/parcours", label: "Parcours", icon: GraduationCap },
  { href: "/admin/projets", label: "Projets", icon: FolderKanban },
  { href: "/admin/services", label: "Services", icon: Layers },
  { href: "/admin/competences", label: "Compétences", icon: BarChart2 },
  { href: "/admin/cv", label: "CV", icon: FileText },
  { href: "/admin/blog", label: "Blog & vlog", icon: PenSquare },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/medias", label: "Médias", icon: Images },
  { href: "/admin/securite", label: "Sécurité", icon: ShieldCheck },
];

export default function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const nav = (
    <nav className="flex flex-col gap-0.5">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
            isActive(href) ? "bg-accent/10 text-accent font-semibold" : "text-muted hover:text-foreground hover:bg-dark-3"
          }`}
        >
          <Icon size={16} />
          <span className="flex-1">{label}</span>
          {href === "/admin/messages" && unread > 0 && (
            <span className="rounded-full bg-accent px-1.5 text-[10px] font-bold text-[#0f0f0f]">{unread}</span>
          )}
        </Link>
      ))}
      <div className="h-px bg-dark-4 my-3" />
      <a href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted hover:text-foreground hover:bg-dark-3">
        <ExternalLink size={16} /> Voir le site
      </a>
      <form action={logout}>
        <button type="submit" className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted hover:text-red-400 hover:bg-dark-3">
          <LogOut size={16} /> Déconnexion
        </button>
      </form>
    </nav>
  );

  return (
    <>
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-dark-4 bg-dark-2/95 backdrop-blur px-4 py-3">
        <span className="font-display font-bold text-foreground">Zfolio · Admin</span>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Menu" className="text-muted">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      {open && <div className="lg:hidden border-b border-dark-4 bg-dark-2 p-3">{nav}</div>}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col border-r border-dark-4 bg-dark-2 p-4">
        <div className="px-3 py-2 mb-4">
          <p className="font-display text-lg font-bold text-foreground">Zfolio</p>
          <p className="text-[11px] text-muted uppercase tracking-widest">Administration</p>
        </div>
        {nav}
      </aside>
    </>
  );
}
