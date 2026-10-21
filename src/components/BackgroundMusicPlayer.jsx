import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { asset } from "../utils/assets";
import { useLanguage } from "../i18n/LanguageContext";

export default function BackgroundMusicPlayer() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  const audioSrc = asset("/music.mp3");

  // On first user interaction anywhere on the page, start the music
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsPlaying(true);
      }
    };
    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("keydown", handleFirstInteraction, { once: true });
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [hasInteracted]);

  // Play/pause the audio element in response to isPlaying
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, hasInteracted]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      {/* Hidden audio element */}
      {hasInteracted && (
        <audio ref={audioRef} src={audioSrc} loop preload="auto" />
      )}

      {/* Skeleton loading before first interaction */}
      {!hasInteracted && (
        <button
          onClick={togglePlay}
          className="fixed bottom-5 left-5 z-50 flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-2xl border border-white/15 bg-white/5 text-white shadow-lg transition-all animate-pulse"
        >
          <div className="w-5 h-5 rounded-full bg-white/20" />
          <span className="w-12 h-3 rounded bg-white/20" />
          <div className="w-3.5 h-3.5 rounded bg-white/20" />
        </button>
      )}

      {/* Floating music control pill */}
      {hasInteracted && (
        <button
          onClick={togglePlay}
          className="fixed bottom-5 left-5 z-50 flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-2xl border border-white/15 bg-black/70 text-white shadow-lg hover:bg-black/90 transition-all group"
          style={{
            boxShadow: isPlaying
              ? "0 0 20px rgba(255, 255, 255, 0.3), 0 4px 15px rgba(0, 0, 0, 0.5)"
              : "0 4px 15px rgba(0, 0, 0, 0.5)"
          }}
        >
          {/* Now playing pulsing dot */}
          {isPlaying && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
          )}
          {/* Animated music icon */}
          <div className="relative w-5 h-5 flex items-center justify-center">
            {isPlaying ? (
              <div className="flex items-end gap-[2px] h-4">
                <span className="w-[3px] bg-white rounded-full animate-[musicBar1_0.8s_ease-in-out_infinite]" />
                <span className="w-[3px] bg-white/80 rounded-full animate-[musicBar2_0.6s_ease-in-out_infinite_0.2s]" />
                <span className="w-[3px] bg-white rounded-full animate-[musicBar3_0.7s_ease-in-out_infinite_0.1s]" />
              </div>
            ) : (
              <Music className="w-4 h-4 text-zinc-400" />
            )}
          </div>

          <span className="text-[11px] font-mono tracking-wide">
            {isPlaying ? t("music") : t("play")}
          </span>

          {isPlaying ? (
            <VolumeX className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
          )}
        </button>
      )}

      {/* Keyframe animations injected via style tag */}
      <style>{`
        @keyframes musicBar1 {
          0%, 100% { height: 30%; }
          50% { height: 100%; }
        }
        @keyframes musicBar2 {
          0%, 100% { height: 50%; }
          50% { height: 80%; }
        }
        @keyframes musicBar3 {
          0%, 100% { height: 40%; }
          50% { height: 95%; }
        }
      `}</style>
    </>
  );
}
