import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "./i18n/LanguageContext";
import { sound } from "./utils/audio";
import Navbar from "./components/Navbar";
import HeroProfile from "./components/HeroProfile";
import GlassCard from "./components/GlassCard";
import MediaCard from "./components/MediaCard";
import BackgroundMusicPlayer from "./components/BackgroundMusicPlayer";
import LightboxModal from "./components/LightboxModal";
import QuickSearchModal from "./components/QuickSearchModal";
import ToastSystem from "./components/ToastSystem";
import Footer from "./components/Footer";

export default function App() {
  const { items, t } = useLanguage();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Mouse cursor ambient white glow tracking
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handlePointerMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Easter Egg trigger: Kenobi lightsaber & silver/white confetti explosion!
  const triggerEasterEgg = () => {
    sound.playLightsaber();
    showToast("⚔️ 'Hello there !' - General Kenobi");

    try {
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.35 },
        colors: ["#ffffff", "#e2e8f0", "#94a3b8", "#f8fafc", "#FF0000"]
      });
    } catch {}
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-['Outfit'] selection:bg-white/20 selection:text-white bg-[#060709]">
      {/* Pure White / Silver Ambient Cursor Glow */}
      <div
        className="pointer-events-none fixed z-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-15 transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, transparent 70%)"
        }}
      />

      {/* Floating White Ambient Glow Orbs */}
      <div
        className="pointer-events-none fixed top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.06] bg-white"
      />
      <div
        className="pointer-events-none fixed bottom-[-100px] left-[-100px] w-[450px] h-[450px] rounded-full blur-[140px] opacity-[0.05] bg-white"
      />

      {/* Subtle Dot Grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "28px 28px"
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Minimal Floating Glass Navbar */}
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onEasterEgg={triggerEasterEgg}
        />

        {/* Minimal Profile Header */}
        <HeroProfile
          onEasterEgg={triggerEasterEgg}
          onCopyToast={showToast}
        />

        {/* Bento Grid: EXACT order of tiles from avely.me/samfire (0 to 20) with wide horizontal landscape cards */}
        <main className="flex-1 px-4 sm:px-6 max-w-5xl mx-auto w-full my-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {items.map((item) =>
              item.type === "media" ? (
                <MediaCard
                  key={item.id}
                  item={item}
                  onSelectMedia={(m) => setSelectedMedia(m)}
                />
              ) : (
                <GlassCard
                  key={item.id}
                  item={item}
                  onSelectMedia={(m) => setSelectedMedia(m)}
                  onCopyToast={showToast}
                />
              )
            )}
          </div>
        </main>
        {/* Minimal Footer */}
        <Footer />
      </div>

      {/* Background Music Player */}
      <BackgroundMusicPlayer />

      {/* Lightbox Modal */}
      <LightboxModal
        mediaItem={selectedMedia}
        onClose={() => setSelectedMedia(null)}
        onCopyToast={showToast}
      />

      {/* Quick Search Modal */}
      <QuickSearchModal
        items={items}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={(item) => {
          if (!item) {
            setIsSearchOpen(true);
            return;
          }
          if (item.type === "media") {
            setSelectedMedia(item);
          } else if (item.url) {
            window.open(item.url, "_blank", "noopener,noreferrer");
          }
        }}
      />

  {/* Toast Notification */}
  <ToastSystem toast={toastMessage} />
    </div>
  );
}
