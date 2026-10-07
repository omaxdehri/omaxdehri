"use client";

import { motion, useReducedMotion } from "framer-motion";

interface JourneyStep {
  title: string;
  text: string;
}

export default function PatientJourney({ steps }: { steps: JourneyStep[] }) {
  const shouldReduce = useReducedMotion();

  return (
    <>
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden lg:block relative">
        {/* Connecting line */}
        <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-sky-200 z-0" />

        <div className="grid grid-cols-5 gap-4 relative z-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex flex-col items-center text-center"
            >
              {/* Numbered Circle */}
              <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-lg shadow-md border-4 border-white">
                {i + 1}
              </div>
              {/* Card content */}
              <div className="mt-4 bg-white rounded-2xl border border-sky-100 p-4 shadow-sm hover:shadow-md transition-shadow w-full">
                <h3 className="font-[family-name:var(--font-display)] font-bold text-sm text-[#1E3A5F] leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {s.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="lg:hidden relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-sky-200" />

        <div className="space-y-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={shouldReduce ? {} : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative"
            >
              {/* Numbered Circle */}
              <div className="absolute -left-8 top-0 w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-sm shadow-md border-3 border-white z-10">
                {i + 1}
              </div>
              {/* Card */}
              <div className="bg-white rounded-2xl border border-sky-100 p-4 shadow-sm ml-2">
                <h3 className="font-[family-name:var(--font-display)] font-bold text-sm text-[#1E3A5F] leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {s.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
