import React, { useRef, useState } from "react";
import PlatformIcon from "./PlatformIcon";
import { ArrowUpRight, Copy, Check, Sparkles, Radio, Code2, Film, Tv, BookOpen } from "lucide-react";
import { sound } from "../utils/audio";

export default function GlassCard({ item, onSelectMedia, onCopyToast }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    setTransform(`perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`);
    setGlare({
      x: ((x / rect.width) * 100).toFixed(1),
      y: ((y / rect.height) * 100).toFixed(1),
      opacity: 0.16
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const text = item.url || item.handle || item.title;
    navigator.clipboard.writeText(text);
    setCopied(true);
    sound.playSuccess();
    if (onCopyToast) onCopyToast(`Copié : ${item.title}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFull = item.isFullWidth;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        sound.playClick();
        if (item.url) {
          window.open(item.url, "_blank", "noopener,noreferrer");
        }
      }}
      style={{
        transform: transform,
        transition: isHovered
          ? "transform 0.08s ease-out, border-color 0.2s ease, box-shadow 0.2s ease"
          : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease",
        borderColor: isHovered ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.08)",
        boxShadow: isHovered
          ? `0 12px 36px -10px rgba(0,0,0,0.8), 0 0 25px ${item.brandColor}, inset 0 1px 0 rgba(255,255,255,0.25)`
          : "0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04)"
      }}
      className={`group relative rounded-2xl p-4 sm:p-5 cursor-pointer overflow-hidden backdrop-blur-xl border transition-colors duration-200
        ${isFull ? "sm:col-span-2 min-h-[160px]" : "col-span-1 min-h-[160px] sm:min-h-[175px]"}
        ${isHovered ? "bg-white/[0.07]" : "bg-white/[0.03]"}
        flex flex-col justify-between
      `}
    >
      {/* Glare Sheen Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200 rounded-2xl"
        style={{
          background: `radial-gradient(circle 320px at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 70%)`
        }}
      />

      {/* Main Horizontal Content */}
      <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Information Section */}
        <div className="flex-1 min-w-0">
          {/* Header row: Colored Logo + Platform Badge + Actions */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2.5">
              {/* Colorful Official Brand Logo */}
              <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 shadow-inner transition-transform duration-200 group-hover:scale-105">
                <PlatformIcon platform={item.platform} className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
                  {item.platform}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {item.handle}
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                title="Copier le lien"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <div className="p-1.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-white transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>

          {/* Badge & Mini Tags */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {item.badge && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300">
                {item.badge}
              </span>
            )}
          </div>
        </div>

        {/* Right Embedded Widget / Preview Visual */}
        <div className="shrink-0 self-center sm:self-auto sm:ml-2">
          {/* 1. Instagram Art Preview */}
          {item.widgetType === "instagram" && (
            <div className="relative w-24 h-24 sm:w-28 sm:h-24 rounded-xl overflow-hidden border border-white/15 bg-zinc-900 group-hover:border-white/30 transition-all shadow-md">
              <img
                src={item.previewImage || "/images/art1.jpg"}
                alt="Instagram Art"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-1.5">
                <span className="text-[9px] font-mono text-white/90">@sfire.art</span>
              </div>
            </div>
          )}

          {/* 3. Spotify User Profile Widget */}
          {item.widgetType === "spotify-user" && (
            <div className="w-24 h-20 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-2.5 flex flex-col justify-between text-left">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-300">Listening</span>
              </div>
              <div className="flex items-end justify-between h-4 gap-0.5">
                {[40, 80, 50, 95, 60, 75].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-emerald-400 rounded-full"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 4. Spotify Artist Widget */}
          {item.widgetType === "spotify-artist" && (
            <div className="w-24 h-20 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-2.5 flex flex-col justify-between text-left">
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                Producer
              </div>
              <span className="text-[10px] text-zinc-300 leading-tight">
                Synthwave & Beats
              </span>
              <div className="text-[9px] font-mono text-emerald-400/80">
                Official Artist
              </div>
            </div>
          )}

          {/* 5. Discord Server Widget */}
          {item.widgetType === "discord" && (
            <div className="w-26 h-20 rounded-xl border border-[#5865F2]/30 bg-[#5865F2]/10 p-2.5 flex flex-col justify-between text-left">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-white font-bold">140+ Online</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-300">
                Community Хо火
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-[#5865F2] text-white font-medium text-center">
                Rejoindre
              </span>
            </div>
          )}

          {/* 6. Letterboxd Film Diary Widget */}
          {item.widgetType === "letterboxd" && (
            <div className="w-24 h-20 rounded-xl border border-white/10 bg-white/5 p-2 flex flex-col justify-between text-left">
              <div className="flex items-center gap-1">
                <span className="text-amber-400 text-xs">★★★★★</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-300">
                Film Log
              </span>
              <span className="text-[9px] text-[#00E054] font-mono">
                Cinéphile
              </span>
            </div>
          )}

          {/* 7. GitHub Widget */}
          {item.widgetType === "github" && (
            <div className="w-24 h-20 rounded-xl border border-white/10 bg-white/5 p-2 flex flex-col justify-between text-left">
              <div className="flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-zinc-300" />
                <span className="text-[10px] font-mono text-zinc-300">Repos</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-[9px] font-mono text-zinc-400">JS / React</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500">
                git push
              </span>
            </div>
          )}

          {/* 8. ArtStation Pro Widget */}
          {item.widgetType === "artstation" && (
            <div className="relative w-24 h-20 rounded-xl overflow-hidden border border-cyan-500/30 bg-zinc-900 group-hover:border-cyan-500/60 transition-all shadow-md">
              <img
                src={item.previewImage || "/images/art2.png"}
                alt="ArtStation 3D"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                <span className="text-[9px] font-mono text-cyan-300">3D Render</span>
              </div>
            </div>
          )}

          {/* 9. End of Line (Full-width Cyberpunk Banner) */}
          {item.widgetType === "endofline" && (
            <div className="w-32 h-20 rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-2 flex flex-col justify-between text-left">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[10px] font-mono text-cyan-300 font-bold">GRID ONLINE</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-300">
                End of Line
              </span>
              <span className="text-[9px] text-cyan-400 font-mono">
                Cyber writings →
              </span>
            </div>
          )}

          {/* Default fallback widget */}
          {!["instagram", "spotify-user", "spotify-artist", "discord", "letterboxd", "github", "artstation", "endofline"].includes(item.widgetType) && (
            <div className="w-16 h-16 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
              <PlatformIcon platform={item.platform} className="w-6 h-6" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
