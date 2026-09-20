"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselSlide {
  img: string;
  caption: string;
}

export const HERO_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    img: "/carousel/corousal_front_orthomax_hospital_orthopedic_surgeon_best_doctor_in_bihar.png",
    caption: "Ortho Max Multi Speciality Hospital",
  },
  {
    img: "/carousel/02-reception-desk.jpeg",
    caption: "Reception & Emergency Help Desk",
  },
  {
    img: "/carousel/03-modular-operation-theater.jpeg",
    caption: "Modular Operation Theatre",
  },
  {
    img: "/carousel/04-trauma-operation-theater.jpeg",
    caption: "Trauma & Fracture Surgery OT",
  },
  {
    img: "/carousel/05-icu-critical-care.jpeg",
    caption: "ICU & Critical Care Unit",
  },
  {
    img: "/carousel/06-advanced-digital-xray.jpeg",
    caption: "Digital X-Ray Facility",
  },
  {
    img: "/carousel/07-physiotherapy-center.jpeg",
    caption: "Physiotherapy & Rehabilitation Centre",
  },
  {
    img: "/carousel/08-patient-waiting-lounge.jpeg",
    caption: "Patient Waiting Lounge",
  },
  {
    img: "/carousel/09-pathology-diagnostic-lab.jpeg",
    caption: "Pathology & Diagnostic Lab",
  },
];

interface HeroCarouselProps {
  phone?: string;
}

export default function HeroCarousel({}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [loadedIndices, setLoadedIndices] = useState<number[]>([0, 1]);
  const touchStartX = useRef<number | null>(null);

  const total = HERO_CAROUSEL_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % total;
      setLoadedIndices((current) => Array.from(new Set([...current, next, (next + 1) % total])));
      return next;
    });
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const p = (prev - 1 + total) % total;
      setLoadedIndices((current) => Array.from(new Set([...current, p, (p - 1 + total) % total])));
      return p;
    });
  }, [total]);

  // Auto-play timer (4.5s)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const currentSlide = HERO_CAROUSEL_SLIDES[currentIndex];

  return (
    <div
      className="relative w-full bg-[#021316] select-none group touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Ortho Max Multi Speciality Hospital Photo Carousel"
    >
      {/* Responsive Image Frame: fixed comfortable height on mobile, exact 1920x600 aspect ratio on desktop */}
      <div className="relative w-full h-[220px] xs:h-[260px] sm:h-[320px] md:h-[380px] lg:h-auto lg:aspect-[1920/600] overflow-hidden bg-[#021316]">
        {/* Slides */}
        {HERO_CAROUSEL_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          const shouldRenderImage = loadedIndices.includes(idx) || idx === 0;
          const isFrontBanner = idx === 0;

          return (
            <div
              key={slide.img}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              {shouldRenderImage ? (
                isFrontBanner ? (
                  /* Slide 1: Front Banner — fully contained on mobile, edge-to-edge on desktop */
                  <div className="relative w-full h-full flex items-center justify-center bg-[#021316]">
                    <Image
                      src={slide.img}
                      alt={slide.caption}
                      fill
                      priority
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                      className="object-contain lg:object-cover object-center"
                    />
                  </div>
                ) : (
                  /* Slides 2+: Facility Photos — with elegant border & full-size visibility */
                  <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-5 bg-[#031B1E]">
                    {/* Ambient subtle blurred background */}
                    <div className="absolute inset-0 overflow-hidden opacity-25">
                      <Image
                        src={slide.img}
                        alt=""
                        fill
                        className="object-cover object-center blur-2xl scale-110"
                        aria-hidden="true"
                      />
                    </div>
                    {/* Framed full-size photo with border */}
                    <div className="relative w-full h-full max-w-5xl rounded-xl sm:rounded-2xl border-2 border-[#A2DFF7]/60 shadow-2xl overflow-hidden bg-black/70 backdrop-blur-sm">
                      <Image
                        src={slide.img}
                        alt={slide.caption}
                        fill
                        loading="lazy"
                        quality={85}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                        className="object-contain object-center"
                      />
                    </div>
                  </div>
                )
              ) : null}
            </div>
          );
        })}

        {/* Left Navigation Arrow Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/55 hover:bg-black/85 text-white border border-white/25 backdrop-blur-sm transition-all hover:scale-110 active:scale-95 shadow-lg"
        >
          <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Right Navigation Arrow Button */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/55 hover:bg-black/85 text-white border border-white/25 backdrop-blur-sm transition-all hover:scale-110 active:scale-95 shadow-lg"
        >
          <ChevronRight size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Dots Pagination Indicators on Mobile & Desktop */}
        <div className="absolute bottom-2.5 inset-x-0 z-20 flex items-center justify-center gap-1.5 pointer-events-auto">
          {HERO_CAROUSEL_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 bg-[#38BDF8] shadow-sm shadow-sky-400/50"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thin Stripe Just Below Carousel Image Frame with Small Text */}
      <div className="bg-[#021316] border-t border-[#A2DFF7]/15 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-[13px] text-slate-300">
          <p className="font-medium text-white/90 truncate">
            {currentSlide.caption}
          </p>
          <span className="text-[11px] text-[#A2DFF7]/80 shrink-0 font-mono hidden sm:inline">
            ORTHO MAX MULTI SPECIALITY HOSPITAL
          </span>
        </div>
      </div>
    </div>
  );
}
