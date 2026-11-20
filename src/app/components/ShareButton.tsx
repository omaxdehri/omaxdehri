"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 bg-slate-100 hover:bg-sky-50 px-3 py-1.5 rounded-lg transition-colors"
      title="Copy article link"
    >
      <Share2 size={13} />
      <span>{copied ? "Link Copied!" : "Share Article"}</span>
    </button>
  );
}

