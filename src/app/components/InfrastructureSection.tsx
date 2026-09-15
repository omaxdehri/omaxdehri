"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Maximize2, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { ModalImageItem } from "./ImageModal";

const ImageModal = dynamic(() => import("./ImageModal"), { ssr: false });

interface InfrastructureSectionProps {
  facilities: ModalImageItem[];
}

export default function InfrastructureSection({ facilities }: InfrastructureSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [otActiveIdx, setOtActiveIdx] = useState(0);

  const handleOpenModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  return (
    <section id="facilities" className="bg-[#062226] text-white py-16">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6BCBEB] bg-white/10 px-3 py-1 rounded-full">
            Hospital Infrastructure
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mt-3">
            Modern Facilities for Accurate Diagnosis &amp; Recovery
          </h2>
          <p className="text-sm sm:text-base text-[#A2DFF7] mt-2">
            Fully equipped on-site facilities so you never have to move between diagnostic centres. Click any photo to view in full size.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((f, i) => {
            const hasGallery = f.gallery && f.gallery.length > 1;
            const displayedImg = hasGallery ? f.gallery![otActiveIdx % f.gallery!.length] : f.img;

            return (
              <div
                key={f.label}
                onClick={() => handleOpenModal(i)}
                className="bg-[#0A3A40]/60 rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:border-[#3A9AD9] transition-all group flex flex-col cursor-pointer hover:shadow-cyan-900/30 hover:shadow-xl"
                title="Click to view full size"
              >
                {/* Full 16:9 uncropped aspect ratio matching original camera photography */}
                <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
                  <Image
                    src={displayedImg}
                    alt={`${f.label} at ORTHO MAX MULTI SPECIALITY HOSPITAL Dehri`}
                    fill
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Multi-image indicator badge for Operation Theatre */}
                  {hasGallery && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-black/75 text-[#A2DFF7] text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md border border-white/20 shadow-md">
                        <Images size={13} /> {f.gallery!.length} OT Photos
                      </span>
                    </div>
                  )}

                  {/* Quick gallery switcher buttons if card has multiple photos */}
                  {hasGallery && (
                    <div
                      className="absolute inset-x-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOtActiveIdx((prev) => (prev - 1 + f.gallery!.length) % f.gallery!.length);
                        }}
                        className="p-1.5 rounded-full bg-black/70 hover:bg-[#007B8A] text-white border border-white/30 backdrop-blur-sm pointer-events-auto transition-transform hover:scale-110"
                        title="Previous photo"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOtActiveIdx((prev) => (prev + 1) % f.gallery!.length);
                        }}
                        className="p-1.5 rounded-full bg-black/70 hover:bg-[#007B8A] text-white border border-white/30 backdrop-blur-sm pointer-events-auto transition-transform hover:scale-110"
                        title="Next photo"
                        aria-label="Next photo"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}

                  {/* Full size button overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-black/75 text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 backdrop-blur-sm border border-white/20 shadow-lg">
                      <Maximize2 size={13} /> Full Size
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-semibold text-white text-base group-hover:text-[#A2DFF7] transition-colors leading-snug">
                      {f.label}
                    </h3>
                    <p className="text-xs text-[#A2DFF7]/80 mt-1.5 leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-[#3A9AD9]">
                    <span className="font-semibold">In-House Facility</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">Tap to Expand ↗</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modalOpen && (
        <ImageModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          items={facilities}
          currentIndex={currentIndex}
        />
      )}
    </section>
  );
}
