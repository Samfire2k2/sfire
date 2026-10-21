import React from "react";
import { ArrowUp } from "lucide-react";
import { sound } from "../utils/audio";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-16 border-t border-white/[0.08] py-8 px-4 text-zinc-500 text-xs">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white font-mono">samfire</span>
          <span>•</span>
        </div>

        <button
          onClick={scrollToTop}
          className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-400 hover:text-white transition-colors"
          title={t("backToTop")}
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
