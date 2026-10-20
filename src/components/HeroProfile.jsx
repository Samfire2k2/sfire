import React, { useState } from "react";
import { Sparkles, Copy, Check, ExternalLink } from "lucide-react";
import PlatformIcon from "./PlatformIcon";
import { samfireProfile } from "../data/samfireData";
import { sound } from "../utils/audio";

export default function HeroProfile({ onEasterEgg, onCopyToast }) {
  const [copied, setCopied] = useState(false);

  const handleCopyHandle = () => {
    navigator.clipboard.writeText("samfire");
    setCopied(true);
    sound.playSuccess();
    if (onCopyToast) onCopyToast("Handle @samfire copié !");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative px-4 pt-10 pb-6 max-w-5xl mx-auto w-full text-center">
      {/* Avatar Container with fine frosted ring */}
      <div className="relative inline-block mx-auto mb-4 group">
        <div
          onClick={() => {
            sound.playLightsaber();
            onEasterEgg();
          }}
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-white/20 bg-zinc-900 cursor-pointer shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-white/40 group-hover:shadow-[0_0_35px_rgba(255,255,255,0.18)]"
          title="Clique pour un Easter egg !"
        >
          <img
            src={samfireProfile.avatar}
            alt={samfireProfile.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Minimal White Online Status Dot */}
        <span className="absolute bottom-1 right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
          <span className="relative inline-flex rounded-full h-4 w-4 border-2 border-black bg-white" />
        </span>
      </div>

      {/* Name & Handle */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-zinc-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 flex items-center gap-1.5">
            @{samfireProfile.handle}
            <button
              onClick={handleCopyHandle}
              className="text-zinc-500 hover:text-white transition-colors"
              title="Copier le pseudonyme"
            >
              {copied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
            </button>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          {samfireProfile.name}
        </h1>

        {/* Minimal Kenobi Quote Pill */}
        <div
          onClick={() => {
            sound.playLightsaber();
            onEasterEgg();
          }}
          className="mt-2.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 cursor-pointer transition-all duration-200 group hover:border-white/25 hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]"
          title="Clique pour un Easter egg !"
        >
          <span className="text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors italic">
            "{samfireProfile.bio}"
          </span>
          <Sparkles className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
        </div>

        {/* Quick Minimal Links with vibrant brand colored icons */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="https://discord.com/invite/FVchfHZxKh"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all flex items-center gap-2"
          >
            <PlatformIcon platform="Discord" className="w-4 h-4" />
            <span>Discord</span>
          </a>

          <a
            href="https://open.spotify.com/artist/4UVeb63pjdS4f8YYVMRYjM?si=Ff8CEmDxTbamsz10ZoI5KA"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all flex items-center gap-2"
          >
            <PlatformIcon platform="Spotify" className="w-4 h-4" />
            <span>Spotify Artist</span>
          </a>

          <a
            href="https://www.youtube.com/watch?v=qRpEVIUviKs"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all flex items-center gap-2"
          >
            <PlatformIcon platform="YouTube" className="w-4 h-4" />
            <span>Hellfire (Arcane)</span>
          </a>

          <a
            href="https://samfire2k2.github.io/end-of-line/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all flex items-center gap-2"
          >
            <PlatformIcon platform="End of Line" className="w-4 h-4" />
            <span>End of Line</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>
        </div>
      </div>
    </section>
  );
}
