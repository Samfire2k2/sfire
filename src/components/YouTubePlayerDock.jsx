import React, { useState } from "react";
import { Play, Pause, X, ChevronUp, ChevronDown, ExternalLink } from "lucide-react";
import PlatformIcon from "./PlatformIcon";
import { sound } from "../utils/audio";

export default function YouTubePlayerDock({ isOpen, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-[calc(100vw-2.5rem)] transition-all duration-300 ease-out">
      <div
        className="rounded-2xl p-3.5 backdrop-blur-2xl border border-white/20 bg-black/85 text-white shadow-2xl relative overflow-hidden"
        style={{
          boxShadow: "0 16px 40px -10px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 255, 255, 0.15)"
        }}
      >
        {/* Subtle top white ambient glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full blur-2xl opacity-15 bg-white pointer-events-none" />

        {/* Header / Video Info */}
        <div className="flex items-center justify-between gap-3 min-w-[280px] sm:min-w-[340px]">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Video Thumbnail */}
            <div
              onClick={() => {
                sound.playClick();
                setIsExpanded(true);
              }}
              className="relative w-12 h-10 rounded-lg overflow-hidden border border-white/20 bg-zinc-900 shrink-0 cursor-pointer group"
            >
              <img
                src="/images/hellfire.jpg"
                alt="Hellfire"
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 fill-white text-white" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white truncate block">
                  Hellfire
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-red-600/30 text-red-200 border border-red-500/40 flex items-center gap-1">
                  <PlatformIcon platform="YouTube" className="w-3 h-3" /> Arcane
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono truncate">
                FEVER 333 • Arcane League of Legends
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                setIsExpanded(!isExpanded);
              }}
              className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] font-medium text-white transition-colors"
            >
              {isExpanded ? "Réduire" : "Lecteur"}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setIsExpanded(!isExpanded);
              }}
              className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expandable YouTube Video Embed */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-white/10 w-full">
            <div className="relative rounded-xl overflow-hidden border border-white/15 bg-black aspect-video w-full max-w-sm sm:max-w-md">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/qRpEVIUviKs?autoplay=1&enablejsapi=1"
                title="Hellfire (from Arcane League of Legends) - FEVER 333"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-[11px] text-zinc-400">
                OST Officielle Arcane S2
              </span>
              <a
                href="https://www.youtube.com/watch?v=qRpEVIUviKs"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="text-zinc-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Ouvrir sur YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

