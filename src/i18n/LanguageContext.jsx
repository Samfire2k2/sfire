import React, { createContext, useContext, useState, useEffect } from "react";
import { samfireProfile as profileEn, bentoItems as itemsEn } from "../data/samfireData";
import { samfireProfile as profileFr, bentoItems as itemsFr } from "../data/samfireData.fr";

export const translations = {
  en: {
    search: "Search...",
    searchPlaceholder: "Search...",
    noResults: "No results for",
    results: "results",
    navigate: "Navigate",
    open: "Open",
    backToTop: "Back to top",
    soundOn: "Sound on",
    soundOff: "Sound off",
    copied: "Copied",
    copy: "Copy",
    copyLink: "Copy link",
    shareProfile: "Share profile",
    scanOrCopy: "Scan the QR code or copy the link",
    share: "Share",
    discoverPortfolio: "Discover Samfire's portfolio!",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    download: "Download",
    close: "Close",
    imageLinkCopied: "Image link copied!",
    handleCopied: "Handle @samfire copied!",
    linkCopied: "Link copied!",
    easterEgg: "Hello there ! - General Kenobi",
    reduce: "Collapse",
    player: "Player",
    openOnYouTube: "Open on YouTube",
    officialOst: "OST Official Arcane S2",
    music: "Music",
    play: "Play",
    copiedToast: "Copied:",
  },
  fr: {
    search: "Rechercher...",
    searchPlaceholder: "Rechercher...",
    noResults: "Aucun résultat pour",
    results: "résultats",
    navigate: "Naviguer",
    open: "Ouvrir",
    backToTop: "Haut de page",
    soundOn: "Sons activés",
    soundOff: "Sons coupés",
    copied: "Copié",
    copy: "Copier",
    copyLink: "Copier le lien",
    shareProfile: "Partager le profil",
    scanOrCopy: "Scanne le QR code ou copie le lien",
    share: "Partager",
    discoverPortfolio: "Découvre le portfolio de Samfire !",
    zoomIn: "Zoomer",
    zoomOut: "Dézoomer",
    download: "Télécharger",
    close: "Fermer",
    imageLinkCopied: "Lien de l'image copié !",
    handleCopied: "Handle @samfire copié !",
    linkCopied: "Lien copié !",
    easterEgg: "Hello there ! - General Kenobi",
    reduce: "Réduire",
    player: "Lecteur",
    openOnYouTube: "Ouvrir sur YouTube",
    officialOst: "OST Officielle Arcane S2",
    music: "Musique",
    play: "Lecture",
    copiedToast: "Copié :",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);
  const toggle = () => setLang((l) => (l === "en" ? "fr" : "en"));
  const t = (key) => translations[lang]?.[key] ?? translations.en[key] ?? key;
  const profile = lang === "fr" ? profileFr : profileEn;
  const items = lang === "fr" ? itemsFr : itemsEn;
  return (
    <LanguageContext.Provider value={{ lang, toggle, t, profile, items }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
