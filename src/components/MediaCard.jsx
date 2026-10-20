import React, { useRef, useState } from "react";
import { Maximize2, Sparkles, Eye, Image as ImageIcon } from "lucide-react";
import { sound } from "../utils/audio";

export default function MediaCard({ item, onSelectMedia }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

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
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  const imageSrc = imgError ? item.srcFallback : item.src;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        sound.playOpenModal();
        onSelectMedia(item);
      }}
      style={{
        transform: transform,
        transition: isHovered
          ? "transform 0.08s ease-out, border-color 0.2s ease, box-shadow 0.2s ease"
          : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease",
        borderColor: isHovered ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.08)",
        boxShadow: isHovered
          ? "0 12px 36px -10px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 255, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.25)"
          : "0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04)"
      }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer backdrop-blur-xl border bg-white/[0.03] col-span-1 min-h-[160px] sm:min-h-[175px] flex flex-col justify-between"
    >
      {/* Background High-Res Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={imageSrc}
          alt={item.title}
          onError={() => setImgError(true)}
          style={{
            objectPosition: item.focalPoint ? `${item.focalPoint.x}% ${item.focalPoint.y}%` : "center center"
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
        />
        {/* Soft glass gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      </div>

    </div>
  );
}
