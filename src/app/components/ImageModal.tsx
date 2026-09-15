"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface ModalImageItem {
  img: string;
  label: string;
  desc?: string;
  gallery?: string[];
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ModalImageItem[];
  currentIndex: number;
  onNavigate?: (newIndex: number) => void;
}

export default function ImageModal({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}: ImageModalProps) {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    if (!onNavigate || items.length <= 1) return;
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (!onNavigate || items.length <= 1) return;
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-md p-3 sm:p-6 transition-all"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Full size image viewer"
    >
      <div
        className="relative max-w-5xl w-full flex flex-col items-center justify-center max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="w-full flex items-center justify-between py-2 px-1 text-white mb-2">
          <div className="flex items-center gap-2">
            {items.length > 1 && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-[#A2DFF7]">
                {currentIndex + 1} / {items.length}
              </span>
            )}
            <span className="text-xs text-white/80 font-medium hidden sm:inline">
              Full Size View (Uncropped 16:9)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#A2DFF7]"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Main Image Frame (Full 16:9 proportion, uncropped) */}
        <div className="relative w-full aspect-video max-h-[75vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black/60 border border-white/20 shadow-2xl">
          <Image
            src={currentItem.img}
            alt={currentItem.label}
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-contain"
            priority
          />
        </div>

        {/* Bottom Caption Bar */}
        <div className="w-full mt-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2 text-white">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white">
              {currentItem.label}
            </h3>
            {currentItem.desc && (
              <p className="text-xs sm:text-sm text-[#A2DFF7] mt-0.5">
                {currentItem.desc}
              </p>
            )}
          </div>
          <div className="text-[11px] text-white/60 shrink-0 font-medium">
            ORTHO MAX MULTI SPECIALITY HOSPITAL · Canal Road, Dehri
          </div>
        </div>

        {/* Prev & Next Navigation Buttons */}
        {items.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/30 transition-all hover:scale-110 active:scale-95 focus:outline-none shadow-2xl"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/30 transition-all hover:scale-110 active:scale-95 focus:outline-none shadow-2xl"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
