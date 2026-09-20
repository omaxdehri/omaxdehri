"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Maximize2 } from "lucide-react";

const ImageModal = dynamic(() => import("./ImageModal"), { ssr: false });

interface PatientFirstSectionProps {
  waitingImage: string;
}

export default function PatientFirstSection({ waitingImage }: PatientFirstSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const waitingModalItem = [
    {
      img: waitingImage,
      label: "Patient & Attendant Waiting Lounge",
      desc: "Comfortable, air-conditioned patient & attendant waiting lounge at ORTHO MAX MULTI SPECIALITY HOSPITAL, Canal Road, Dehri",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#007B8A] bg-[#007B8A]/10 px-3 py-1 rounded-full">
          Patient First Approach
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#062226] mt-3">
          One Comprehensive Hospital, From First Visit to Discharge
        </h2>
        <p className="mt-4 text-[#0A3A40] leading-relaxed">
          Conventional orthopaedic journeys often require an X-ray at one private clinic, blood tests at another lab, and surgery in a distant metro city. At ORTHO MAX MULTI SPECIALITY HOSPITAL, digital X-rays, pathology, modular operation theatre, critical care ICU, and physiotherapy are available together on Canal Road.
        </p>
        <p className="mt-3 text-[#0A3A40] leading-relaxed">
          This avoids critical treatment delays in trauma cases and allows Dr. Kumar Anshuman (Orthopaedic surgeon with 20+ years experience | Dehri) to personally monitor your recovery at every step.
        </p>
        <p className="font-[family-name:var(--font-dev)] mt-4 text-[#007B8A] font-semibold text-lg">
          बेहतरीन ऑर्थोपेडिक इलाज — आपके परिवार के नज़दीक।
        </p>
      </div>

      <div
        onClick={() => setModalOpen(true)}
        className="rounded-2xl overflow-hidden border border-[#A2DFF7] shadow-lg bg-slate-900 group cursor-pointer hover:border-[#007B8A] hover:shadow-xl transition-all"
        title="Click to view full size"
      >
        {/* Full 16:9 uncropped aspect ratio matching original 1600x900 resolution */}
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={waitingImage}
            alt="Patient waiting area at ORTHO MAX MULTI SPECIALITY HOSPITAL, Dehri"
            fill
            loading="lazy"
            quality={75}
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-black/75 text-white text-xs px-3.5 py-1.5 rounded-full font-medium flex items-center gap-2 backdrop-blur-sm border border-white/20 shadow-lg">
              <Maximize2 size={14} /> Click to view full size
            </span>
          </div>
        </div>
        <div className="p-4 bg-white border-t border-[#A2DFF7] flex items-center justify-between">
          <p className="text-xs sm:text-sm text-[#0A3A40] font-medium">
            Comfortable, air-conditioned patient &amp; attendant waiting lounge
          </p>
          <span className="text-[11px] font-bold text-[#007B8A] bg-[#007B8A]/10 px-2.5 py-1 rounded-full shrink-0">
            Canal Road
          </span>
        </div>
      </div>

      {modalOpen && (
        <ImageModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          items={waitingModalItem}
          currentIndex={0}
        />
      )}
    </section>
  );
}
