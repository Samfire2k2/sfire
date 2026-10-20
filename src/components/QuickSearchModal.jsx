import React, { useState, useEffect, useRef } from "react";
import { Search, X, CornerDownLeft } from "lucide-react";
import PlatformIcon from "./PlatformIcon";
import { sound } from "../utils/audio";

export default function QuickSearchModal({ items, isOpen, onClose, onSelectItem }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      sound.playOpenModal();
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelectItem(null);
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onSelectItem]);

  if (!isOpen) return null;

  const filtered = items.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.platform.toLowerCase().includes(q) ||
      (item.handle && item.handle.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q))
    );
  });

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      sound.playHover();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      sound.playHover();
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      sound.playClick();
      onSelectItem(filtered[selectedIndex]);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-white/15 bg-zinc-950/95 overflow-hidden shadow-2xl backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-3.5 px-4 border-b border-white/10 bg-white/[0.02]">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-white placeholder-zinc-500 text-sm outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-zinc-500 border border-white/5">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[50vh] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-zinc-500 text-xs">
              Aucun résultat pour "<span className="text-zinc-300">{query}</span>"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectItem(item);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-2.5 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-white/10 border border-white/20"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 bg-white/5 text-white shrink-0">
                      <PlatformIcon platform={item.platform} className="w-4 h-4 text-white" />
                    </div>

                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-white truncate block">
                        {item.title}
                      </span>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-zinc-500">
                      {item.platform}
                    </span>
                    <CornerDownLeft className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 px-4 border-t border-white/10 bg-white/[0.01] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span>{filtered.length} résultats</span>
          <span>↑↓ Naviguer • ↵ Ouvrir</span>
        </div>
      </div>
    </div>
  );
}
