"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import MobileBottomBar from "../components/MobileBottomBar";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  BookOpen,
  Tag,
  Stethoscope,
  ChevronRight,
  Sparkles,
  Phone,
} from "lucide-react";

const PHONE = "9467029173";
const LOGO = "/hospital_logo__orthomax_hospital_orthopedic_surgeon_dehri.png";

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage?: string;
  readTime: string;
  views?: number;
  createdAt: string;
  author: {
    name: string;
    title: string;
    avatarUrl?: string;
  };
}

export default function BlogIndexPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs) {
          setBlogs(data.blogs);
        }
      })
      .catch((err) => console.error("Error loading blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(blogs.map((b) => b.category).filter(Boolean))),
  ];

  const filtered = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat =
      selectedCategory === "All" || b.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar phone={PHONE} logo={LOGO} />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#1E3A5F] via-[#162a45] to-[#0f1d30] text-white py-14 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 backdrop-blur-sm">
              <Stethoscope size={14} className="text-sky-300" />
              <span>Verified Medical Insights &bull; Dehri-on-Sone</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-display)]">
              Ortho Max <span className="text-sky-400">Health &amp; Orthopaedic</span> Journal
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Clinical knowledge, surgical guides, joint care, and physical rehabilitation insights authored by Senior Orthopaedic Surgeon Dr. Kumar Anshuman.
            </p>

            {/* Search Input */}
            <div className="mt-7 max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search knee replacement, ACL tear, sciatica, arthritis..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/20 transition-all shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-2xs">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-sky-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-semibold text-slate-600">Loading articles from MongoDB...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto my-12 shadow-sm">
              <BookOpen size={40} className="mx-auto text-slate-300 mb-3" />
              <h3 className="font-bold text-slate-800 text-base">No articles found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try searching with different keywords or choosing another category.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-4 px-4 py-2 bg-sky-50 text-sky-700 rounded-xl text-xs font-bold hover:bg-sky-100"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filtered.map((b) => (
                <article
                  key={b._id}
                  className="bg-white rounded-3xl overflow-hidden border border-sky-100/80 shadow-sm hover:shadow-xl hover:shadow-sky-900/5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={b.coverImage || "/front_image_orthomax_hospital_orthopedic_surgeon_dehri.png"}
                        alt={b.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#1E3A5F]/90 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {b.category}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} className="text-sky-500" />
                          {new Date(b.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-sky-500" />
                          {b.readTime || "4 min read"}
                        </span>
                      </div>

                      <h2 className="font-bold text-base sm:text-lg text-[#1E3A5F] group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                        <Link href={`/blog/${b.slug}`}>
                          {b.title}
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {b.excerpt}
                      </p>

                      {/* Tag chips */}
                      {b.tags && b.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {b.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 sm:px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-sky-100 relative shrink-0 border border-sky-200">
                        <Image
                          src={b.author?.avatarUrl || "/Dr._Kumar_Anshuman_mbbs_orthomax_hospital_orthopedic_surgeon_dehri.jpeg"}
                          alt={b.author?.name || "Dr. Kumar Anshuman"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700">
                        {b.author?.name || "Dr. Kumar Anshuman"}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${b.slug}`}
                      className="text-xs font-bold text-sky-600 group-hover:text-sky-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      Read Full <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Consultation CTA Banner */}
          <div className="mt-14 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-sky-900/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="bg-white/20 text-sky-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                Expert Orthopaedic Consultation
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                Have Joint, Bone or Spine Concerns?
              </h3>
              <p className="text-xs sm:text-sm text-sky-100 max-w-xl">
                Consult with Dr. Kumar Anshuman (20+ Years Experience) at ORTHO MAX MULTI SPECIALITY HOSPITAL, Canal Road, Dehri.
              </p>
            </div>
            <a
              href={`tel:${PHONE}`}
              className="bg-[#FF6B6B] hover:bg-[#e85d5d] text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-black/20 flex items-center gap-2 shrink-0 transition-all hover:scale-105 active:scale-95"
            >
              <Phone size={16} /> Call +91 {PHONE}
            </a>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#1E3A5F] text-white mt-12 py-8 border-t border-sky-900/40">
        <div className="max-w-6xl mx-auto px-5 text-center sm:flex sm:justify-between sm:items-center text-xs text-sky-200">
          <p>© {new Date().getFullYear()} ORTHO MAX MULTI SPECIALITY HOSPITAL &bull; Dehri-on-Sone</p>
          <div className="flex justify-center gap-4 mt-3 sm:mt-0">
            <Link href="/" className="hover:text-white">Hospital Home</Link>
            <Link href="/blog" className="hover:text-white">Health Blog</Link>
            <Link href="/doctor/login" className="hover:text-white font-semibold text-sky-300">Doctor Portal</Link>
          </div>
        </div>
      </footer>

      <MobileBottomBar phone={PHONE} />
    </div>
  );
}

