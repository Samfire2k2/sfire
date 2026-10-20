import React from "react";
import { Check } from "lucide-react";

export default function ToastSystem({ toast }) {
  if (!toast) return null;

  return (
    <div className="fixed top-20 right-5 z-50 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="px-3.5 py-2 rounded-xl backdrop-blur-2xl border border-white/20 bg-black/80 text-white text-xs font-medium flex items-center gap-2 shadow-2xl">
        <Check className="w-3.5 h-3.5 text-white" />
        <span>{toast}</span>
      </div>
    </div>
  );
}
