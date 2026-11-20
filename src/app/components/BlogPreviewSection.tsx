"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  ArrowUpRight,
  Stethoscope,
  Sparkles,
} from "lucide-react";

interface BlogItem {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags?: string[];
  coverImage?: string;
  readTime?: string;
  createdAt?: string | Date;
}

const DEFAULT_ARTICLES: BlogItem[] = [
  {
    title: "Complete Guide to Total Knee Replacement Surgery: Benefits, Procedure & Recovery",
    slug: "complete-guide-total-knee-replacement-surgery",
    excerpt:
      "Severe knee arthritis shouldn't steal your independence. Discover how modern minimally invasive knee replacement helps patients walk pain-free again.",
    category: "Joint Replacement",
    coverImage: "/front_image_orthomax_hospital_orthopedic_surgeon_dehri.png",
    readTime: "5 min read",
    createdAt: new Date().toISOString(),
  },
  {
    title: "ACL Tear & Knee Arthroscopy: When is Keyhole Surgery Necessary?",
    slug: "acl-tear-knee-arthroscopy-keyhole-surgery",
    excerpt:
      "Heard a 'pop' in your knee during sports or bike accident? Understand the symptoms of an anterior cruciate ligament (ACL) injury and keyhole arthroscopic repair.",
    category: "Knee Arthroscopy",
    coverImage: "/carousel/03-modular-operation-theater.jpeg",
    readTime: "4 min read",
    createdAt: new Date().toISOString(),
  },
  {
    title: "Sciatica & Nerve Compression (नस दबना): Causes, Non-Surgical Relief & When to Seek Help",
    slug: "sciatica-nerve-compression-causes-relief",
    excerpt:
      "Shooting pain traveling from your lower back down your leg? Learn what causes sciatica, ergonomic tips, and advanced non-surgical spine treatments.",
    category: "Spine & Sciatica",
    coverImage: "/carousel/07-physiotherapy-center.jpeg",
    readTime: "4 min read",
    createdAt: new Date().toISOString(),
  },
];

export default function BlogPreviewSection() {
  const [articles, setArticles] = useState<BlogItem[]>(DEFAULT_ARTICLES);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs && Array.isArray(data.blogs) && data.blogs.length > 0) {
          // Take top 3 articles from MongoDB
          setArticles(data.blogs.slice(0, 3));
        }
      })
      .catch(() => {
        // Keep defaults if fetch fails
      });
  }, []);

  return (
    <section className="bg-white py-14 sm:py-16 border-t border-sky-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 border border-sky-200/80 px-3.5 py-1 rounded-full mb-3 shadow-2xs">
            <Stethoscope size={13} className="text-sky-500" />
            <span>Clinical Insights &amp; Surgical Studies</span>
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A5F] tracking-tight leading-tight">
            Read Dr. Kumar Anshuman&apos;s — <span className="text-sky-600">Blog, Articles, Observations, Researches and Studies</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">
            Evidence-based medical articles, joint care tips, arthroscopic procedure insights, and surgical observations by Senior Orthopaedic Surgeon Dr. Kumar Anshuman.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {articles.map((item, index) => (
            <article
              key={item.slug || index}
              className="bg-white rounded-2xl sm:rounded-3xl border border-sky-100/90 shadow-sm hover:shadow-xl hover:shadow-sky-900/5 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div>
                {/* Image Container */}
                <Link href={`/blog/${item.slug}`} className="block relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.coverImage || "/front_image_orthomax_hospital_orthopedic_surgeon_dehri.png"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1E3A5F]/90 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {item.category}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-sky-500" />
                      {item.readTime || "4 min read"}
                    </span>
                    <span>&bull;</span>
                    <span>Dr. Kumar Anshuman</span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-[#1E3A5F] group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Card CTA Footer */}
              <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">
                  Clinical Study
                </span>
                <Link
                  href={`/blog/${item.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 group-hover:text-sky-700 group-hover:translate-x-1 transition-all"
                >
                  Read Study <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold px-7 py-3 rounded-full text-xs sm:text-sm shadow-md shadow-sky-600/20 hover:shadow-lg hover:shadow-sky-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <BookOpen size={16} />
            <span>Explore All Blogs, Articles &amp; Researches</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

