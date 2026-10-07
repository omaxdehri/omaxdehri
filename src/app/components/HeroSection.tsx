"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Phone, ArrowUpRight, Stethoscope, Star, ShieldCheck } from "lucide-react";
import { AnimatedButton } from "./MotionWrappers";

interface HeroSectionProps {
  phone: string;
  doctorImg: string;
  hospitalImg: string;
}

export default function HeroSection({ phone, doctorImg, hospitalImg }: HeroSectionProps) {
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.12,
      },
    },
  };

  const childVariants = shouldReduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
      };

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-5 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Location Badge */}
            <motion.div variants={childVariants} className="mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-600 text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse shrink-0" />
                Canal Road, Dehri · Rohtas, Bihar
              </div>
            </motion.div>

            {/* H1 Headline */}
            <motion.h1
              variants={childVariants}
              className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.2] text-[#1E3A5F]"
            >
              ORTHO MAX MULTI SPECIALITY HOSPITAL
            </motion.h1>

            {/* Hindi Tagline */}
            <motion.p
              variants={childVariants}
              className="font-[family-name:var(--font-dev)] text-base sm:text-lg text-sky-500 font-semibold mt-2.5"
            >
              आपके हर कदम को फिर से आसान बनाने का भरोसा !
            </motion.p>

            {/* Body Text */}
            <motion.p
              variants={childVariants}
              className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-600 max-w-xl"
            >
              Super-specialty knee &amp; hip joint replacement, arthroscopy, sports injury recovery and acute trauma care backed by{" "}
              <strong className="text-sky-600 font-semibold">20+ years of surgical experience</strong> led by
              <strong className="text-sky-600 font-semibold"> Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri</strong> (MBBS, DNB (Ortho), New Delhi, M.Ch (Ortho), MS (HCM) London) — equipped with in-house modular OT, ICU, digital X-ray, and physiotherapy.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={childVariants} className="mt-7 flex flex-wrap items-center gap-3">
              <AnimatedButton
                href={`tel:${phone}`}
                className="bg-[#FF6B6B] hover:bg-[#e85d5d] text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors shadow-lg text-sm"
              >
                <Phone size={16} /> Call OPD / Emergency: {phone}
              </AnimatedButton>
              <AnimatedButton
                href="#doctor"
                className="border border-sky-300 text-[#1E3A5F] hover:bg-sky-50 px-5 py-3 rounded-full font-semibold transition-colors text-sm"
              >
                Dr. Kumar Anshuman Profile
              </AnimatedButton>
              <a
                href="#facilities"
                className="text-slate-500 hover:text-sky-500 px-3 py-3 text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                Hospital Facilities <ArrowUpRight size={15} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Hospital Image + Floating Doctor Card */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Hospital Photo */}
            <div className="rounded-2xl overflow-hidden border border-sky-100 shadow-xl bg-sky-50">
              <Image
                src={hospitalImg}
                alt="ORTHO MAX MULTI SPECIALITY HOSPITAL Front View — Canal Road, Dehri"
                width={800}
                height={500}
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating Doctor Credential Card */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md border border-sky-100 rounded-2xl p-4 sm:p-5 shadow-xl"
            >
              <div className="flex items-start gap-3">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-sky-400 shrink-0 bg-sky-50 shadow-md">
                  <Image
                    src={doctorImg}
                    alt="Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-1">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                      <Stethoscope size={11} /> Lead Orthopaedic Surgeon
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Star size={10} className="fill-amber-500" /> 20+ Years Experience
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-[#1E3A5F] leading-snug">
                    Dr. Kumar Anshuman
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    MBBS · DNB (Ortho), New Delhi · M.Ch (Ortho) · MS (HCM) London
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-sky-600 font-medium">
                  <ShieldCheck size={14} /> Verified Orthopaedic Specialist
                </span>
                <a href={`tel:${phone}`} className="font-semibold text-[#FF6B6B] hover:text-[#e85d5d] transition-colors">
                  Book OPD Slot →
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
