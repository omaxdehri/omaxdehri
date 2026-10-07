"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden divide-y divide-sky-100">
      {faqs.map((f, idx) => (
        <div key={idx}>
          <button
            onClick={() => toggle(idx)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-bold text-[#1E3A5F] text-sm sm:text-base hover:bg-sky-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:ring-inset"
            aria-expanded={openIndex === idx}
          >
            <span>{f.q}</span>
            <motion.span
              animate={{ rotate: openIndex === idx ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-sky-500 shrink-0"
            >
              <ChevronDown size={20} />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === idx && (
              <motion.div
                initial={shouldReduce ? { height: "auto" } : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={shouldReduce ? { height: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {f.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
