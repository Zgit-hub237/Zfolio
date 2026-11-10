import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zfolio-zeta.vercel.app"),
  verification: {
    google: "KFgccyYYhQbRviAzxHMxL0ez2EhArxzs9MI4ZzcCJ0s",
  },
  title: "Loé Zegou | Cybersécurité & développement sécurisé",
  description:
    "Portfolio de Loé Zegou Megnizon, étudiant en MSc Cybersecurity Management à l'ECE Paris : analyse de vulnérabilités, pentest et développement sécurisé (web, mobile, desktop).",
  keywords: ["portfolio", "cybersécurité", "pentest", "analyse de vulnérabilités", "développement sécurisé", "ECE Paris", "Flutter", "Next.js"],
  authors: [{ name: "Loé Zegou Megnizon" }],
  openGraph: {
    title: "Loé Zegou | Cybersécurité & développement sécurisé",
    description: "Portfolio et CV de Loé Zegou Megnizon",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
    { media: "(prefers-color-scheme: light)", color: "#f4f4f4" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
