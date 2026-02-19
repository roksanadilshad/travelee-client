"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

export default function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const goPrev = useCallback(
    () => setCurrent((p) => (p - 1 + images.length) % images.length),
    [images]
  );
  const goNext = useCallback(
    () => setCurrent((p) => (p + 1) % images.length),
    [images]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goPrev, goNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full mx-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1"
        >
          <X className="w-5 h-5" /> Close
        </button>

        <img
          src={images[current]}
          alt={`Image ${current + 1}`}
          className="rounded-2xl max-h-[75vh] w-full object-contain shadow-2xl"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex gap-1.5 mt-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === current ? "bg-white scale-125" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            <p className="text-white/50 text-xs mt-2">
              {current + 1} / {images.length}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
