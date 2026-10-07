"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatItem {
  n: string;
  l: string;
}

function parseNumeric(val: string): { prefix: string; number: number; suffix: string } | null {
  const match = val.match(/^([^\d]*)(\d+)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], number: parseInt(match[2], 10), suffix: match[3] };
}

function CountUpNumber({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduce = useReducedMotion();
  const [displayValue, setDisplayValue] = useState("0");
  const parsed = parseNumeric(value);

  useEffect(() => {
    if (!isInView || !parsed || shouldReduce) {
      setDisplayValue(value);
      return;
    }

    const target = parsed.number;
    const startTime = performance.now();
    const dur = duration * 1000;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / dur, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplayValue(`${parsed!.prefix}${current}${parsed!.suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value, duration, shouldReduce, parsed]);

  if (!parsed) {
    return <span ref={ref}>{value}</span>;
  }

  return <span ref={ref}>{displayValue}</span>;
}

export default function StatsBar({ stats }: { stats: StatItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-sky-100 rounded-2xl shadow-md"
    >
      <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <p className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-sky-500">
              <CountUpNumber value={s.n} />
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium leading-tight">
              {s.l}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
