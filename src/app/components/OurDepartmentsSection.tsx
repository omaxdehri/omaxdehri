"use client";

import React from "react";
import Image from "next/image";

interface OurDepartmentsSectionProps {
  onViewAllClick?: () => void;
}

export default function OurDepartmentsSection({ onViewAllClick }: OurDepartmentsSectionProps) {
  const specialities = [
    { label: "KNEE & JOINT REPLACEMENT SURGERY", href: "#services" },
    { label: "KNEE ARTHROSCOPY & ACL / PCL RECONSTRUCTION", href: "#services" },
    { label: "FRACTURE SURGERY & ORTHOPEDIC TRAUMA CARE", href: "#services" },
    { label: "SHOULDER ARTHROSCOPY & UPPER LIMB CARE", href: "#services" },
    { label: "SPINE CARE & NERVE EVALUATION", href: "#services" },
  ];

  return (
    <section className="relative w-full bg-white overflow-hidden select-none border-b border-slate-200">
      {/* ================= DESKTOP LAYOUT (md & up) ================= */}
      <div className="hidden md:block relative min-h-[460px] lg:min-h-[520px] xl:min-h-[560px] w-full">
        {/* Left Side: Image with Diagonal Slanted Right Edge */}
        <div 
          className="absolute inset-y-0 left-0 w-[62%] lg:w-[60%] xl:w-[58%] z-0"
          style={{
            clipPath: "polygon(0 0, 100% 0, 82% 100%, 0 100%)",
          }}
        >
          <Image
            src="/ongoing_operation_orthomax_hospital_orthopedic_surgeon_rohtas.webp"
            alt="Ongoing Orthopaedic Surgery at ORTHO MAX MULTI SPECIALITY HOSPITAL"
            fill
            sizes="(max-width: 1200px) 60vw, 55vw"
            className="object-cover object-center brightness-95 contrast-105"
            priority
          />
          {/* Subtle dark vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Decorative Geometric Wireframe Lines behind Right Content */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <svg
            className="absolute right-[-40px] top-[-30px] w-[650px] h-[600px] text-sky-200/50"
            viewBox="0 0 600 550"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M120 180 L480 80 L560 420 L240 510 Z"
              stroke="#A2DFF7"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M180 220 L520 140 L460 480 Z"
              stroke="#38BDF8"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Right Side: Content Area */}
        <div className="relative z-20 max-w-7xl mx-auto h-full min-h-[460px] lg:min-h-[520px] xl:min-h-[560px] flex items-center justify-end px-6 lg:px-12">
          <div className="w-full md:w-[48%] lg:w-[44%] xl:w-[42%] py-12 pl-4 lg:pl-8">
            {/* Heading Group */}
            <div className="mb-6">
              <h2 className="text-[#E31B23] font-bold text-2xl sm:text-3xl tracking-tight leading-none">
                Our
              </h2>
              <div className="text-[#E31B23] font-light text-4xl sm:text-5xl lg:text-6xl tracking-wide leading-none mt-1">
                Specialities
              </div>
              {/* Sky blue underline accent bar */}
              <div className="w-16 h-1 bg-[#38BDF8] mt-3 rounded-full" />
            </div>

            {/* Specialities List */}
            <ul className="space-y-3.5 mb-8">
              {specialities.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm lg:text-[14px] font-medium tracking-wide text-slate-700 hover:text-[#007B8A] transition-colors duration-150 uppercase"
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* View All Button */}
            <div>
              <a
                href="#services"
                onClick={onViewAllClick}
                className="inline-flex items-center justify-center px-7 py-2.5 bg-[#38BDF8] hover:bg-[#0ea5e9] text-white text-sm font-semibold rounded-md shadow-sm transition-all duration-200 active:scale-95"
              >
                View All
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Dark Navy Angular Accent Strip */}
        <div
          className="absolute bottom-0 inset-x-0 h-10 lg:h-12 bg-[#062226] z-20 pointer-events-none"
          style={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 20%, 55% 65%, 0 0)",
          }}
        />
      </div>

      {/* ================= MOBILE LAYOUT (< md) ================= */}
      <div className="block md:hidden w-full bg-white">
        {/* Top Image with angled bottom cut */}
        <div 
          className="relative w-full h-[250px] sm:h-[300px] overflow-hidden"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 92%, 0 100%)",
          }}
        >
          <Image
            src="/ongoing_operation_orthomax_hospital_orthopedic_surgeon_rohtas.webp"
            alt="Ongoing Surgery at ORTHO MAX MULTI SPECIALITY HOSPITAL"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Mobile Content Card */}
        <div className="px-6 pt-5 pb-9">
          {/* Heading */}
          <div className="mb-4">
            <h2 className="text-[#E31B23] font-bold text-2xl tracking-tight leading-none">
              Our
            </h2>
            <div className="text-[#E31B23] font-light text-4xl tracking-wide leading-none mt-1">
              Specialities
            </div>
            {/* Sky blue accent underline */}
            <div className="w-14 h-1 bg-[#38BDF8] mt-2.5 rounded-full" />
          </div>

          {/* Specialities List */}
          <ul className="space-y-3 mb-6">
            {specialities.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  className="block text-[13px] font-medium tracking-wide text-slate-700 hover:text-[#007B8A] transition-colors uppercase"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* View All Button */}
          <a
            href="#services"
            onClick={onViewAllClick}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-[#38BDF8] hover:bg-[#0ea5e9] text-white text-sm font-semibold rounded-md shadow-sm transition-all duration-200 active:scale-95"
          >
            View All
          </a>
        </div>
      </div>
    </section>
  );
}
