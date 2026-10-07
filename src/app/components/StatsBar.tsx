"use client";

import { motion } from "framer-motion";

interface StatItem {
  n: string;
  l: string;
}

export default function StatsBar({ stats }: { stats: StatItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white border border-sky-100 rounded-2xl shadow-lg shadow-sky-950/5 p-6 sm:p-8"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-sky-100/80">
        {stats.map((s, idx) => (
          <div
            key={s.l}
            className={`text-center ${idx > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""}`}
          >
            <p className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0EA5E9] tracking-tight">
              {s.n}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium leading-snug max-w-[180px] mx-auto">
              {s.l}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
