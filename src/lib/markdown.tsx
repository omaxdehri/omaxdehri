import React from "react";
import Link from "next/link";

export function parseInlineMarkdown(text: string): React.ReactNode[] {
  // Regex that captures:
  // 1. links: [text](url)
  // 2. bold: **text**
  // 3. italic: *text*
  // 4. code: `code`
  const regex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    if (match[1]) {
      // Link: [text](url)
      const linkText = match[2];
      const url = match[3];
      const isInternal = url.startsWith("/") || url.includes("orthomax");

      if (isInternal) {
        elements.push(
          <Link
            key={match.index}
            href={url}
            className="text-sky-600 hover:text-sky-800 font-semibold underline decoration-sky-300 hover:decoration-sky-600 transition-colors"
          >
            {linkText}
          </Link>
        );
      } else {
        elements.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:text-sky-800 font-semibold underline decoration-sky-300 hover:decoration-sky-600 transition-colors"
          >
            {linkText}
          </a>
        );
      }
    } else if (match[4]) {
      // Bold: **text**
      elements.push(
        <strong key={match.index} className="font-bold text-[#1E3A5F]">
          {match[5]}
        </strong>
      );
    } else if (match[6]) {
      // Italic: *text*
      elements.push(
        <em key={match.index} className="italic text-slate-700">
          {match[7]}
        </em>
      );
    } else if (match[8]) {
      // Code: `code`
      elements.push(
        <code
          key={match.index}
          className="bg-sky-50 text-sky-800 px-1.5 py-0.5 rounded text-xs font-mono border border-sky-100"
        >
          {match[9]}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements.length > 0 ? elements : [text];
}

export function renderFormattedContent(raw: string): React.ReactNode[] {
  if (!raw) return [];
  const lines = raw.split("\n");

  return lines.map((line, idx) => {
    const trimmed = line.trim();

    // Image syntax: ![alt](url)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const src = imgMatch[2];
      return (
        <figure key={idx} className="my-6">
          <img
            src={src}
            alt={alt || "Clinical Article Image"}
            className="rounded-2xl w-full max-h-[500px] object-cover shadow-sm border border-slate-200"
            loading="lazy"
          />
          {alt && (
            <figcaption className="text-xs text-center text-slate-500 mt-2 italic font-medium">
              {alt}
            </figcaption>
          )}
        </figure>
      );
    }

    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={idx}
          className="text-xl sm:text-2xl font-bold text-[#1E3A5F] mt-8 mb-3 pt-2 font-[family-name:var(--font-display)] leading-snug"
        >
          {parseInlineMarkdown(trimmed.replace("### ", ""))}
        </h3>
      );
    }

    if (trimmed.startsWith("#### ")) {
      return (
        <h4
          key={idx}
          className="text-lg font-bold text-[#1E3A5F] mt-6 mb-2 leading-snug"
        >
          {parseInlineMarkdown(trimmed.replace("#### ", ""))}
        </h4>
      );
    }

    if (trimmed.startsWith("> ")) {
      return (
        <blockquote
          key={idx}
          className="my-5 p-4 bg-sky-50/80 border-l-4 border-sky-500 rounded-r-2xl italic text-slate-700 text-sm sm:text-base leading-relaxed"
        >
          {parseInlineMarkdown(trimmed.replace("> ", ""))}
        </blockquote>
      );
    }

    if (trimmed.startsWith("---")) {
      return <hr key={idx} className="my-6 border-slate-200" />;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      return (
        <li
          key={idx}
          className="ml-5 list-disc text-slate-700 my-1 text-sm sm:text-base leading-relaxed"
        >
          {parseInlineMarkdown(trimmed.replace(/^[-*]\s+/, ""))}
        </li>
      );
    }

    if (/^\d+\.\s/.test(trimmed)) {
      return (
        <li
          key={idx}
          className="ml-5 list-decimal text-slate-700 my-1 text-sm sm:text-base leading-relaxed"
        >
          {parseInlineMarkdown(trimmed.replace(/^\d+\.\s+/, ""))}
        </li>
      );
    }

    if (!trimmed) {
      return <div key={idx} className="h-3" />;
    }

    return (
      <p
        key={idx}
        className="text-slate-700 my-2 text-sm sm:text-base leading-relaxed"
      >
        {parseInlineMarkdown(trimmed)}
      </p>
    );
  });
}

