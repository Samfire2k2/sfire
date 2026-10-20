import React, { useState } from "react";
import { X, Copy, Check, Share2, Send } from "lucide-react";
import { sound } from "../utils/audio";

export default function ShareModal({ isOpen, onClose, onCopyToast }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://samfire2k2.github.io/Portfolio/";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    sound.playSuccess();
    if (onCopyToast) onCopyToast("Lien copié !");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    sound.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Samfire (@samfire)",
          text: "Portfolio et univers de Samfire",
          url: shareUrl
        });
      } catch (err) {}
    } else {
      handleCopy();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-white/15 bg-zinc-950/95 p-5 shadow-2xl backdrop-blur-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-base font-semibold text-white">Partager le profil</h3>
        <p className="text-xs text-zinc-400 mt-0.5 mb-4">
          Scanne le QR code ou copie le lien
        </p>

        {/* QR Code */}
        <div className="p-3 rounded-xl bg-white inline-block shadow-lg border border-white/20 mb-4">
          <svg className="w-36 h-36 mx-auto" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="#ffffff"/>
            <path d="M20 20h70v70h-70zM35 35v40h40v-40zM45 45h20v20h-20z" fill="#09090b"/>
            <path d="M166 20h70v70h-70zM181 35v40h40v-40zM191 45h20v20h-20z" fill="#09090b"/>
            <path d="M20 166h70v70h-70zM35 181v40h40v-40zM45 191h20v20h-20z" fill="#09090b"/>
            <path d="M105 25h15v15h-15zM130 25h15v15h-15zM105 50h25v15h-25zM135 65h15v25h-15zM110 90h15v15h-15zM25 105h15v15h-15zM55 105h20v15h-20zM85 105h15v15h-15zM115 105h25v15h-25zM155 105h15v20h-15zM185 105h15v15h-15zM215 105h20v15h-20zM25 130h15v20h-15zM70 130h25v15h-25zM110 130h15v25h-15zM140 130h35v15h-35zM195 130h15v15h-15zM225 130h15v30h-15zM105 165h15v15h-15zM135 165h25v15h-25zM175 165h15v15h-15zM210 165h20v15h-20zM105 195h25v15h-25zM145 195h15v25h-15zM175 195h35v15h-35zM105 225h15v15h-15zM130 225h20v15h-20zM165 225h15v15h-15zM195 225h45v15h-45z" fill="#09090b"/>
            <circle cx="128" cy="128" r="10" fill="#09090b"/>
          </svg>
        </div>

        {/* Link Input Bar */}
        <div className="flex items-center gap-1.5 p-1.5 px-2.5 rounded-xl bg-white/5 border border-white/10 text-left mb-3">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 bg-transparent text-xs text-zinc-300 font-mono outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 bg-white text-black transition-all"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copié" : "Copier"}</span>
          </button>
        </div>

        {/* Native share */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleNativeShare}
            className="flex-1 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-medium text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Partager</span>
          </button>

          <a
            href={`https://twitter.com/intent/tweet?text=Découvre+le+portfolio+de+Samfire+!&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            title="X (Twitter)"
          >
            <Send className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
