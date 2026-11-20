import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import Navbar from "../../components/Navbar";
import MobileBottomBar from "../../components/MobileBottomBar";
import ShareButton from "../../components/ShareButton";
import { renderFormattedContent } from "@/lib/markdown";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Stethoscope,
  Phone,
  BookOpen,
} from "lucide-react";

export const dynamic = "force-dynamic";

const PHONE = "9467029173";
const LOGO = "/hospital_logo__orthomax_hospital_orthopedic_surgeon_dehri.png";

interface ArticleData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  coverImage?: string;
  readTime?: string;
  views?: number;
  createdAt: string;
  author?: {
    name: string;
    title: string;
    avatarUrl?: string;
  };
}

async function getArticle(slugOrId: string): Promise<ArticleData | null> {
  try {
    const db = await getDb();
    let decoded = slugOrId;
    try {
      decoded = decodeURIComponent(slugOrId);
    } catch {}

    let blog: any = null;
    if (ObjectId.isValid(slugOrId)) {
      blog = await db.collection("blogs").findOne({ _id: new ObjectId(slugOrId) });
    }
    if (!blog) {
      blog = await db.collection("blogs").findOne({
        $or: [{ slug: slugOrId }, { slug: decoded }],
      });
    }

    if (!blog) return null;

    // Increment view count asynchronously
    db.collection("blogs")
      .updateOne({ _id: blog._id }, { $inc: { views: 1 } })
      .catch(() => {});

    return {
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      category: blog.category || "General",
      tags: blog.tags || [],
      coverImage: blog.coverImage || "",
      readTime: blog.readTime || "4 min read",
      views: blog.views || 0,
      author: blog.author || {
        name: "Dr. Kumar Anshuman",
        title: "Senior Orthopaedic Surgeon",
      },
      _id: blog._id.toString(),
      createdAt: blog.createdAt ? new Date(blog.createdAt).toISOString() : new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error loading article:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await getArticle(params.slug);
  if (!blog) {
    return {
      title: "Article Not Found | ORTHO MAX MULTI SPECIALITY HOSPITAL",
    };
  }

  return {
    title: `${blog.title} | Dr. Kumar Anshuman | Ortho Max Hospital Dehri`,
    description: blog.excerpt || blog.title,
    keywords: [
      ...(blog.tags || []),
      "Dr Kumar Anshuman",
      "Ortho Max Hospital Dehri",
      "Orthopaedic Surgeon Dehri Rohtas",
      blog.category,
    ],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage || "/front_image_orthomax_hospital_orthopedic_surgeon_dehri.png"],
      type: "article",
    },
  };
}

export default async function SingleBlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getArticle(params.slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar phone={PHONE} logo={LOGO} />
        <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-slate-200 text-center shadow-sm">
          <BookOpen size={48} className="mx-auto text-slate-300 mb-3" />
          <h2 className="text-xl font-bold text-slate-800">Article Not Found</h2>
          <p className="text-xs text-slate-500 mt-1">
            This medical article or study could not be found.
          </p>
          <Link
            href="/blog"
            className="mt-5 inline-flex items-center gap-2 bg-sky-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            <ArrowLeft size={14} /> Back to Blog Journal
          </Link>
        </div>
        <MobileBottomBar phone={PHONE} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar phone={PHONE} logo={LOGO} />

        {/* Breadcrumb & Navigation */}
        <div className="bg-white border-b border-slate-200 py-3">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800"
            >
              <ArrowLeft size={14} /> All Articles
            </Link>

            <ShareButton />
          </div>
        </div>

        {/* Article Container */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <article className="bg-white rounded-3xl border border-sky-100/90 shadow-sm overflow-hidden p-6 sm:p-10">
            {/* Header Meta */}
            <div className="space-y-4 mb-6">
              <div className="inline-block bg-sky-100 text-sky-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {blog.category}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A5F] tracking-tight leading-snug font-[family-name:var(--font-display)]">
                {blog.title}
              </h1>

              {/* Author & Published Info */}
              <div className="flex flex-wrap items-center gap-4 pt-2 pb-4 border-b border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative border border-sky-200">
                    <Image
                      src={blog.author?.avatarUrl || "/Dr._Kumar_Anshuman_mbbs_orthomax_hospital_orthopedic_surgeon_dehri.jpeg"}
                      alt={blog.author?.name || "Dr. Kumar Anshuman"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{blog.author?.name || "Dr. Kumar Anshuman"}</p>
                    <p className="text-[11px] text-slate-400">{blog.author?.title || "Senior Orthopaedic Surgeon"}</p>
                  </div>
                </div>

                <span className="hidden sm:inline text-slate-300">&bull;</span>

                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-sky-500" />
                    {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-sky-500" />
                    {blog.readTime || "4 min read"}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {blog.coverImage && (
              <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-8 bg-slate-100 shadow-inner">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Excerpt Lead Paragraph */}
            {blog.excerpt && (
              <p className="text-base sm:text-lg font-medium text-slate-700 italic border-l-4 border-sky-500 pl-4 py-1.5 mb-6 bg-slate-50/60 rounded-r-xl leading-relaxed">
                {blog.excerpt}
              </p>
            )}

            {/* Main Formatted Article Content with Hyperlinks and Hindi Support */}
            <div className="text-slate-800 leading-relaxed font-sans pt-2">
              {renderFormattedContent(blog.content)}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Related Keywords:</span>
                {blog.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Doctor Bio Box */}
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-sky-50 via-blue-50/50 to-indigo-50 border border-sky-200/80 flex flex-col sm:flex-row items-center gap-5">
              <div className="w-20 h-20 rounded-2xl overflow-hidden relative shrink-0 border-2 border-sky-300 shadow-sm">
                <Image
                  src="/Dr._Kumar_Anshuman_mbbs_orthomax_hospital_orthopedic_surgeon_dehri.jpeg"
                  alt="Dr. Kumar Anshuman"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-1 text-xs font-bold text-sky-800">
                  <Stethoscope size={14} className="text-sky-600" />
                  <span>About the Surgeon &amp; Researcher</span>
                </div>
                <h4 className="text-lg font-bold text-[#1E3A5F]">
                  Dr. Kumar Anshuman
                </h4>
                <p className="text-xs text-slate-600">
                  MBBS, DNB (Ortho) New Delhi, M.Ch (Ortho), MS (HCM) London &bull; 20+ Years Surgical Experience
                </p>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  Founder &amp; Senior Orthopaedic Surgeon at ORTHO MAX MULTI SPECIALITY HOSPITAL, leading advanced joint replacement, arthroscopic ligament reconstruction, and trauma care in Dehri-on-Sone, Bihar.
                </p>
              </div>
            </div>

            {/* Book Appointment Callout */}
            <div className="mt-8 bg-[#1E3A5F] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <h3 className="font-bold text-lg sm:text-xl">
                  Consult Dr. Kumar Anshuman Directly
                </h3>
                <p className="text-xs text-sky-200 mt-1 max-w-md">
                  OPD consultations available Monday through Saturday at Canal Road, Dehri-on-Sone.
                </p>
              </div>
              <a
                href={`tel:${PHONE}`}
                className="bg-[#FF6B6B] hover:bg-[#e85d5d] text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shrink-0 transition-transform active:scale-95"
              >
                <Phone size={15} /> Book Consultation: {PHONE}
              </a>
            </div>
          </article>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#1E3A5F] text-white py-6 border-t border-sky-900/40 text-center text-xs text-sky-200">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} ORTHO MAX MULTI SPECIALITY HOSPITAL &bull; Dehri</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/blog" className="hover:text-white">All Articles</Link>
            <Link href="/doctor/login" className="hover:text-white text-sky-300 font-semibold">Doctor Portal</Link>
          </div>
        </div>
      </footer>

      <MobileBottomBar phone={PHONE} />
    </div>
  );
}
