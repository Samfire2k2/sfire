import React, { useState, useEffect } from "react";
import { X, ZoomIn, ZoomOut, Download, Copy, ExternalLink, Check } from "lucide-react";
import { sound } from "../utils/audio";

export default function LightboxModal({ mediaItem, onClose, onCopyToast }) {
  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!mediaItem) return null;

  const handleCopyLink = () => {
    const src = mediaItem.srcFallback || mediaItem.src;
    navigator.clipboard.writeText(src);
    setCopied(true);
    sound.playSuccess();
    if (onCopyToast) onCopyToast("Lien de l'image copié !");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    sound.playClick();
    const link = document.createElement("a");
    link.href = mediaItem.srcFallback || mediaItem.src;
    link.download = `${mediaItem.title || "artwork"}.jpg`;
    link.target = "_blank";
    link.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden border border-white/15 bg-zinc-950/90 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between p-3.5 px-5 border-b border-white/10 bg-white/[0.02]">
          <h2 className="text-sm font-semibold text-white truncate">
            {mediaItem.title}
          </h2>

          <div className="flex items-center gap-1.5">
            {/* Zoom Controls */}
            <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-0.5">
              <button
                onClick={() => {
                  sound.playClick();
                  setZoom((z) => Math.max(0.75, z - 0.25));
                }}
                className="p-1 text-zinc-400 hover:text-white transition-colors"
                title="Dézoomer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono px-1.5 text-zinc-400">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setZoom((z) => Math.min(2.5, z + 0.25));
                }}
                className="p-1 text-zinc-400 hover:text-white transition-colors"
                title="Zoomer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
              title="Copier le lien"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleDownload}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
              title="Télécharger"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              title="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative flex-1 overflow-auto flex items-center justify-center p-4 min-h-[300px] bg-black/60">
          <img
            src={mediaItem.src}
            onError={(e) => {
              e.currentTarget.src = mediaItem.srcFallback;
            }}
            alt={mediaItem.title}
            style={{
              transform: `scale(${zoom})`,
              transition: "transform 0.15s ease-out"
            }}
            className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg select-none"
          />
        </div>

        {/* Footer */}
        <div className="p-3 px-5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-zinc-400">
          <span>{mediaItem.description}</span>
          <span className="font-mono text-zinc-500">{mediaItem.handle}</span>
        </div>
      </div>
    </div>
  );
}
