import React from "react";
import { Search, Command } from "lucide-react";
import { sound } from "../utils/audio";
import { useLanguage } from "../i18n/LanguageContext";
import { asset } from "../utils/assets";

export default function Navbar({
  onOpenSearch,
  onEasterEgg
}) {
  const { t, toggle, lang } = useLanguage();
  return (
    <header className="sticky top-4 z-40 px-4 sm:px-6 max-w-5xl mx-auto w-full">
      <div className="rounded-2xl p-2.5 px-4 backdrop-blur-2xl border border-white/10 bg-black/50 shadow-2xl flex items-center justify-between gap-3 transition-all duration-300">
        {/* Brand */}
        <div
          onClick={onEasterEgg}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="Clique pour un Easter egg !"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 p-0.5 transition-transform duration-200 group-hover:scale-105">
            <img
              src={asset("/images/avatar.jpg")}
              alt="Samfire"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="font-semibold text-sm tracking-tight text-white font-mono">
            samfire
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Search Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSearch();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-400 hover:text-white transition-all text-xs"
            title="Rechercher (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-zinc-400">{t("search")}</span>
            <span className="hidden sm:flex items-center text-[10px] font-mono text-zinc-500 bg-white/5 px-1 rounded">
              <Command className="w-2.5 h-2.5 mr-0.5" />K
            </span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              toggle();
            }}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-400 hover:text-white transition-colors text-[10px] font-mono font-bold"
            title="Language"
          >
            {lang.toUpperCase()}
          </button>

          {/* Portfolio Redirect */}

        </div>
      </div>
    </header>
  );
}
