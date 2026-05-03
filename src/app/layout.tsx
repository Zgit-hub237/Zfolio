import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loé Zegou | Développeur & Cybersécurité",
  description:
    "Portfolio de Loé Zegou Megnizon — Étudiant en Informatique spécialisé en Cybersécurité & Génie Logiciel. Développeur mobile, web et passionné de sécurité.",
  keywords: ["portfolio", "développeur", "cybersécurité", "Flutter", "React", "Next.js", "Cameroun"],
  authors: [{ name: "Loé Zegou Megnizon" }],
  openGraph: {
    title: "Loé Zegou | Développeur & Cybersécurité",
    description: "Portfolio de Loé Zegou Megnizon",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
