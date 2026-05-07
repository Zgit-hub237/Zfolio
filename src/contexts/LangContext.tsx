"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fr } from "@/i18n/fr";
import { en } from "@/i18n/en";
import type { Translations } from "@/i18n/types";

export type Lang = "fr" | "en";

const LANG_KEY = "zfolio-lang";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue>({
  lang: "fr",
  setLang: () => {},
  t: fr,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = localStorage.getItem(LANG_KEY) as Lang | null;
    if (stored === "fr" || stored === "en") {
      setLangState(stored);
    } else {
      const browser = navigator.language.toLowerCase();
      setLangState(browser.startsWith("fr") ? "fr" : "en");
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: lang === "fr" ? fr : en }}>
      {children}
    </LangContext.Provider>
  );
}

export const useT = () => useContext(LangContext);
