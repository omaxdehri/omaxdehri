"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Stethoscope,
  LogOut,
  PlusCircle,
  FileText,
  CheckCircle,
  Clock,
  Eye,
  Trash2,
  Edit3,
  ExternalLink,
  Sparkles,
  Layers,
  Search,
  ArrowUpRight,
  BookOpen,
  Send,
  Save,
  RefreshCw,
  Check,
  AlertCircle,
  UploadCloud,
  X,
  Link2,
  Key,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { renderFormattedContent } from "@/lib/markdown";

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage?: string;
  readTime: string;
  published: boolean;
  views?: number;
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = [
  "Joint Replacement",
  "Knee Arthroscopy",
  "Spine & Sciatica",
  "Fracture & Trauma",
  "Rehabilitation & Physio",
  "General Orthopaedics",
  "Health & Wellness Tips",
];

const PRESET_IMAGES = [
  { label: "Hospital Front", url: "/front_image_orthomax_hospital_orthopedic_surgeon_dehri.png" },
  { label: "Operation Theater", url: "/carousel/03-modular-operation-theater.jpeg" },
  { label: "Trauma OT", url: "/carousel/04-trauma-operation-theater.jpeg" },
  { label: "Digital X-Ray", url: "/carousel/06-advanced-digital-xray.jpeg" },
  { label: "Physiotherapy", url: "/carousel/07-physiotherapy-center.jpeg" },
  { label: "ICU Care", url: "/carousel/05-icu-critical-care.jpeg" },
  { label: "Doctor Anshuman", url: "/Dr._Kumar_Anshuman_mbbs_orthomax_hospital_orthopedic_surgeon_dehri.jpeg" },
];

const QUICK_TEMPLATES = [
  {
    name: "Knee Replacement Guide",
    title: "Understanding Knee Replacement: Preparation, Surgical Care & Walking Again",
    category: "Joint Replacement",
    tags: ["Knee Replacement", "Arthritis", "Joint Pain", "Orthopaedics"],
    coverImage: "/front_image_orthomax_hospital_orthopedic_surgeon_dehri.png",
    excerpt: "Learn how modern total knee replacement can relieve persistent arthritis pain and help you regain smooth, active mobility.",
    content: `### Why Consider Knee Replacement Surgery?

When non-surgical treatments such as physiotherapy, weight management, and oral anti-inflammatories no longer relieve debilitating knee osteoarthritis, total or partial knee replacement provides long-lasting relief.

#### Key Signs You May Need a Replacement:
- Severe pain that restricts daily walking, standing, or climbing stairs.
- Continuous dull ache even when resting or trying to sleep at night.
- Noticeable bowing or deformity in one or both knees.
- Joint stiffness that limits bending or straightening the leg.

---

### What to Expect During the Procedure
At Ortho Max Hospital, our advanced surgical team utilizes state-of-the-art sterile modular operation theaters and modern implant technologies designed for natural joint kinetics.

1. **Precision Surface Resurfacing:** Only worn bone and cartilage are carefully resurfaced.
2. **High-Grade Bio-Implants:** Engineered titanium/cobalt-chrome surfaces with ultra-smooth medical polymer inserts.
3. **Rapid Rehabilitation:** Most patients take their first assisted steps within 24 to 48 hours under experienced physiotherapy supervision.

---

### In-House Physiotherapy & Recovery
Recovery is a partnership between surgical precision and dedicated rehabilitation. Our in-house physiotherapy department guides each patient with tailored knee exercises to ensure optimal quadriceps strength and range of motion.`,
  },
  {
    name: "Sports Injury & ACL Repair",
    title: "ACL Tear in Athletes & Active Adults: Diagnosis, Keyhole Arthroscopy & Recovery",
    category: "Knee Arthroscopy",
    tags: ["ACL Reconstruction", "Sports Medicine", "Arthroscopy", "Ligament Tear"],
    coverImage: "/carousel/03-modular-operation-theater.jpeg",
    excerpt: "Experiencing knee instability after a twist or sudden injury? Understand how minimally invasive ACL reconstruction restores stability.",
    content: `### Understanding the ACL (Anterior Cruciate Ligament)

The ACL is one of the crucial stabilizing ligaments of the knee joint. A tear often occurs following a sudden pivot, rapid change in direction, or hyperextension during sports like cricket, football, or accidental falls.

#### Typical Symptoms of an ACL Tear:
- An audible 'pop' inside the knee at the moment of injury.
- Rapid joint swelling within a few hours.
- Knee "giving way" or feeling unstable during walking or turning.
- Inability to bear full weight without pain.

---

### Modern Keyhole Arthroscopic Reconstruction
Unlike traditional open surgeries, arthroscopy uses miniature fiber-optic cameras and precision micro-instruments through tiny keyhole incisions.

- **Minimal scar tissue:** Rapid wound healing and significantly less post-op discomfort.
- **Anatomical Grafting:** Autograft tendons provide a strong, biocompatible replacement ligament.
- **Early Mobilization:** Guided physical therapy helps regain knee flexion and quadriceps activation quickly.`,
  },
  {
    name: "Sciatica & Back Pain Tips",
    title: "Relieving Sciatica & Lumbar Nerve Pain: Effective Home Habits & Clinical Treatments",
    category: "Spine & Sciatica",
    tags: ["Sciatica", "Spine Health", "Nerve Pain", "Physiotherapy"],
    coverImage: "/carousel/07-physiotherapy-center.jpeg",
    excerpt: "Sharp pain radiating down your hip and leg? Learn practical steps to decompress your sciatic nerve and when to consult a spine specialist.",
    content: `### What Triggers Sciatica (नस दबना)?

Sciatica occurs when the sciatic nerve—the longest nerve in the body—gets irritated or compressed, most commonly by a bulging lumbar disc, bone spur, or spinal stenosis.

#### Primary Symptoms:
- Burning, tingling, or electric shock sensation radiating down the buttock into the calf or foot.
- Difficulty standing up from a seated posture.
- Numbness or muscle weakness in the affected leg.

---

### Non-Surgical Management Strategies
Over 80-90% of sciatica cases resolve without invasive surgery when addressed early:
1. **Core & Pelvic Stabilization:** Specific physiotherapy exercises relieve pressure on spinal nerve roots.
2. **Ergonomic Posture:** Avoid soft sagging sofas; use lumbar support cushions when sitting.
3. **Avoid Forward Bending with Heavy Weights:** Always bend from your knees, keeping back straight.

If you experience persistent leg weakness or numbness, schedule an in-depth orthopaedic spine evaluation at Ortho Max Hospital.`,
  },
  {
    name: "हिंदी: घुटने का दर्द व गठिया इलाज",
    title: "घुटने का दर्द (Knee Arthritis) के 5 बड़े कारण, बचाव और आधुनिक नी रिप्लेसमेंट सर्जरी",
    category: "Joint Replacement",
    tags: ["घुटने में दर्द", "गठिया का इलाज", "नी रिप्लेसमेंट", "डेहरी", "ऑर्थोपेडिक डॉक्टर", "Knee Pain"],
    coverImage: "/front_image_orthomax_hospital_orthopedic_surgeon_dehri.png",
    excerpt: "क्या घुटने के तेज दर्द और गठिया (Arthritis) ने आपका चलना-फिरना रोक दिया है? जानें ऑर्थो मैक्स हॉस्पिटल डेहरी में उपलब्ध आधुनिक मिनिमली इनवेसिव इलाज और फिजियोथेरेपी।",
    content: `### घुटने में तेज दर्द और गठिया (Knee Osteoarthritis) क्यों होता है?

हमारे घुटनों की हड्डियों के बीच एक प्राकृतिक कुशन (कार्टिलेज) होता है, जो जोड़ों को घिसने से बचाता है। उम्र बढ़ने, पुरानी चोट या अत्यधिक वजन के कारण जब यह कार्टिलेज घिस जाता है, तो हड्डियां आपस में रगड़ खाने लगती हैं। इसे आम बोलचाल में **गठिया या जोड़ों का घिसना** कहते हैं।

#### गठिया के मुख्य लक्षण:
- सुबह सोकर उठने पर घुटने में कड़ापन (Stiffness) रहना
- सीढ़ी चढ़ने, उतरने या जमीन पर बैठने में असहनीय दर्द
- घुटने से 'कट-कट' की आवाज आना और सूजन रहना
- चलने में लड़खड़ाहट या पैर का टेढ़ा (O-Shape) होना

---

### टोटल नी रिप्लेसमेंट (TKR) सर्जरी कब जरूरी है?

जब दवाइयां, इंजेक्शन और फिजियोथेरेपी से दर्द में आराम मिलना बंद हो जाए और मरीज का सामान्य चलना-फिरना भी मुश्किल हो जाए, तब नी रिप्लेसमेंट सर्जरी सबसे सुरक्षित और स्थायी समाधान है।

> "आधुनिक नी रिप्लेसमेंट सर्जरी पूरी तरह सुरक्षित है। हमारी टीम उन्नत सर्जिकल तकनीक से केवल खराब कार्टिलेज को रिप्लेस करती है, जिससे मरीज अगले 24 से 48 घंटे में चलने लगता है।" — **डॉ. कुमार अंशुमान**

### सर्जरी के मुख्य फायदे:
1. **दर्द से हमेशा के लिए आजादी:** 95% से अधिक मरीज बिना किसी दर्द के अपनी सामान्य दिनचर्या में लौट आते हैं।
2. **सीधा चलना:** पैरों का टेढ़ापन पूरी तरह ठीक हो जाता है।
3. **लंबी उम्र:** आधुनिक इम्प्लांट्स 20 से 25 साल से भी अधिक समय तक मजबूत बने रहते हैं।

---

### ऑर्थो मैक्स हॉस्पिटल, डेहरी में उन्नत सुविधाएं
यदि आप या आपके परिवार का कोई सदस्य घुटनों के पुराने दर्द से परेशान है, तो आज ही [ऑर्थो मैक्स हॉस्पिटल, कैनाल रोड, डेहरी](/#contact) में डिजिटल एक्स-रे और विशेषज्ञ परामर्श के लिए संपर्क करें। अधिक जानकारी के लिए [स्पोर्ट्स इंजरी और लिगामेंट इलाज](/blog/acl-tear-knee-arthroscopy-keyhole-surgery) की विस्तृत जानकारी भी पढ़ें।`,
  },
];

export default function DoctorDashboard() {
  const router = useRouter();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [activeTab, setActiveTab] = useState<"write" | "manage">("write");

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tagsInput, setTagsInput] = useState("");
  const [coverImage, setCoverImage] = useState(PRESET_IMAGES[0].url);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);
  const [editorPreview, setEditorPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Cloudinary Upload State
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingBodyImage, setUploadingBodyImage] = useState(false);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const bodyFileInputRef = useRef<HTMLInputElement>(null);

  // Change Password Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch("/api/doctor/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update password");
      }

      setPasswordSuccess("Password updated successfully in MongoDB!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess("");
      }, 2000);
    } catch (err: any) {
      setPasswordError(err.message || "Failed to update password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  // Hyperlink Modal State for DA & SEO Interlinking
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const handleOpenLinkModal = () => {
    const textarea = document.getElementById("blog-content-area") as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = content.substring(start, end).trim();
      if (selected) {
        setLinkText(selected);
      }
    }
    setShowLinkModal(true);
  };

  const handleInsertLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl.trim()) return;

    const formattedAnchor = linkText.trim() || linkUrl.trim();
    const markdownLink = `[${formattedAnchor}](${linkUrl.trim()})`;

    const textarea = document.getElementById("blog-content-area") as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + markdownLink + content.substring(end);
      setContent(newContent);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + markdownLink.length, start + markdownLink.length);
      }, 50);
    } else {
      setContent((prev) => prev + " " + markdownLink);
    }

    setShowLinkModal(false);
    setLinkText("");
    setLinkUrl("");
    setMessage({
      type: "success",
      text: "Hyperlink added! Boosts internal SEO & DA rank.",
    });
    setTimeout(() => setMessage(null), 3500);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please select an image file (JPEG, PNG, WebP, AVIF)." });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image file size exceeds the 10MB limit." });
      return;
    }

    setUploadingCover(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image to Cloudinary");
      }

      setCoverImage(data.url);
      setMessage({
        type: "success",
        text: "Featured cover image uploaded to Cloudinary successfully!",
      });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Failed to upload image to Cloudinary.",
      });
    } finally {
      setUploadingCover(false);
      if (coverFileInputRef.current) {
        coverFileInputRef.current.value = "";
      }
    }
  };

  const handleBodyImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please select an image file." });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image file size exceeds the 10MB limit." });
      return;
    }

    setUploadingBodyImage(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image to Cloudinary");
      }

      const markdownImage = `\n\n![Clinical Study / Radiographic Finding](${data.url})\n*Figure: Clinical observation / radiographic imaging*\n\n`;

      const textarea = document.getElementById("blog-content-area") as HTMLTextAreaElement;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = content.substring(0, start) + markdownImage + content.substring(end);
        setContent(newContent);
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + markdownImage.length, start + markdownImage.length);
        }, 50);
      } else {
        setContent((prev) => prev + markdownImage);
      }

      setMessage({
        type: "success",
        text: "Image uploaded to Cloudinary and inserted into article body!",
      });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Failed to upload image.",
      });
    } finally {
      setUploadingBodyImage(false);
      if (bodyFileInputRef.current) {
        bodyFileInputRef.current.value = "";
      }
    }
  };

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    fetchSessionAndBlogs();
  }, []);

  const fetchSessionAndBlogs = async () => {
    setLoading(true);
    try {
      const authRes = await fetch("/api/doctor/me");
      const authData = await authRes.json();

      if (!authRes.ok || !authData.authenticated) {
        router.push("/doctor/login");
        return;
      }
      setDoctor(authData.doctor);

      // Fetch all blogs (including drafts)
      const blogsRes = await fetch("/api/blogs?all=true");
      const blogsData = await blogsRes.json();
      if (blogsData.success) {
        setBlogs(blogsData.blogs);
      }
    } catch (err) {
      console.error(err);
      router.push("/doctor/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/doctor/logout", { method: "POST" });
      router.push("/doctor/login");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const applyTemplate = (tpl: typeof QUICK_TEMPLATES[0]) => {
    setTitle(tpl.title);
    setCategory(tpl.category);
    setTagsInput(tpl.tags.join(", "));
    setCoverImage(tpl.coverImage);
    setExcerpt(tpl.excerpt);
    setContent(tpl.content);
    setEditingId(null);
    setMessage({
      type: "success",
      text: `Template "${tpl.name}" loaded! You can tweak it and publish immediately.`,
    });
    setTimeout(() => setMessage(null), 4000);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setCategory(CATEGORIES[0]);
    setTagsInput("");
    setCoverImage(PRESET_IMAGES[0].url);
    setExcerpt("");
    setContent("");
    setPublished(true);
    setEditorPreview(false);
  };

  const handleEditBlog = (blog: BlogItem) => {
    setEditingId(blog._id);
    setTitle(blog.title);
    setCategory(blog.category);
    setTagsInput(blog.tags.join(", "));
    setCoverImage(blog.coverImage || PRESET_IMAGES[0].url);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setPublished(blog.published);
    setActiveTab("write");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteBlog = async (id: string, blogTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${blogTitle}"?`)) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b._id !== id));
        if (editingId === id) resetForm();
        setMessage({ type: "success", text: "Blog deleted successfully." });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to delete blog." });
    }
  };

  const handleTogglePublish = async (blog: BlogItem) => {
    try {
      const newStatus = !blog.published;
      const res = await fetch(`/api/blogs/${blog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) => (b._id === blog._id ? { ...b, published: newStatus } : b))
        );
        setMessage({
          type: "success",
          text: `Article status changed to ${newStatus ? "Published" : "Draft"}.`,
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to update status." });
    }
  };

  const handleSubmitBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setMessage({ type: "error", text: "Please fill in both title and article content." });
      return;
    }

    setSaving(true);
    setMessage(null);

    const payload = {
      title,
      category,
      tags: tagsInput,
      coverImage,
      excerpt,
      content,
      published,
    };

    try {
      let res;
      if (editingId) {
        res = await fetch(`/api/blogs/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save blog post");
      }

      setMessage({
        type: "success",
        text: editingId
          ? "Blog post updated successfully!"
          : "🎉 New blog post saved & published to MongoDB successfully!",
      });

      // Refresh list
      const blogsRes = await fetch("/api/blogs?all=true");
      const blogsData = await blogsRes.json();
      if (blogsData.success) {
        setBlogs(blogsData.blogs);
      }

      resetForm();
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to save blog post." });
    } finally {
      setSaving(false);
    }
  };

  // Helper formatting tools
  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("blog-content-area") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || "text";
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === "All" || b.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const totalPublished = blogs.filter((b) => b.published).length;
  const totalDrafts = blogs.filter((b) => !b.published).length;
  const totalViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-semibold text-sm">Opening Doctor Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-100 text-slate-800">
      {/* Top Navbar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-sky-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md">
              <Stethoscope size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg text-[#1E3A5F] leading-tight">
                  Doctor Blog Portal
                </h1>
                <span className="hidden sm:inline-block bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  MongoDB Connected
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {doctor?.name || "Dr. Kumar Anshuman"} &bull; Ortho Max Hospital Dehri
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/blog"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <BookOpen size={14} /> View Public Blog <ArrowUpRight size={13} />
            </Link>
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-sky-600 px-2 py-1"
            >
              Hospital Home
            </Link>
            <button
              onClick={() => {
                setPasswordError("");
                setPasswordSuccess("");
                setShowPasswordModal(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-700 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-200 px-3 py-1.5 rounded-lg transition-colors"
              title="Change Doctor Password"
            >
              <Key size={14} className="text-sky-600" />
              <span className="hidden sm:inline">Change Password</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Banner Alert Message */}
        {message && (
          <div
            className={`p-4 rounded-2xl border flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2 shadow-sm ${
              message.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle size={18} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle size={18} className="text-rose-600 shrink-0" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        {/* Dashboard Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-sky-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Articles
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1E3A5F] mt-1">
                {blogs.length}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <FileText size={22} />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                Published Live
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">
                {totalPublished}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle size={22} />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Drafts
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-1">
                {totalDrafts}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock size={22} />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-indigo-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                Patient Reads
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-700 mt-1">
                {totalViews}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Eye size={22} />
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("write")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === "write"
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <PlusCircle size={16} />
              {editingId ? "Edit Article" : "Quick Blog Writer"}
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === "manage"
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Layers size={16} />
              Manage All Articles ({blogs.length})
            </button>
          </div>

          {editingId && (
            <button
              onClick={resetForm}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
            >
              Cancel Edit &amp; Create New
            </button>
          )}
        </div>

        {/* ========================================================
            TAB 1: QUICK BLOG WRITER
            ======================================================== */}
        {activeTab === "write" && (
          <div className="space-y-6">
            {/* Quick Template Picker Strip */}
            <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 rounded-2xl p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-sky-600" />
                  <h3 className="font-bold text-sm text-[#1E3A5F]">
                    Write Quickly with Pre-Made Orthopaedic Templates:
                  </h3>
                </div>
                <span className="text-[11px] text-slate-500">
                  1-Click to prefill clinical outline
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {QUICK_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.name}
                    type="button"
                    onClick={() => applyTemplate(tpl)}
                    className="text-left bg-white hover:bg-sky-50/70 border border-sky-200/80 hover:border-sky-400 rounded-xl p-3 shadow-2xs transition-all group"
                  >
                    <div className="font-bold text-xs text-sky-800 group-hover:text-sky-950 flex items-center justify-between">
                      <span>{tpl.name}</span>
                      <span className="text-[10px] text-sky-600 group-hover:translate-x-0.5 transition-transform">
                        Use &rarr;
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {tpl.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Writer Form Card */}
            <form
              onSubmit={handleSubmitBlog}
              className="bg-white rounded-3xl border border-sky-100 shadow-sm p-5 sm:p-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-[#1E3A5F]">
                    {editingId ? "Edit Blog Article" : "Write a New Medical Article"}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Articles are saved instantly to MongoDB ({`orthomax_hospital.blogs`}) and published to patient portal.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      {published ? "Publish Live" : "Save as Draft"}
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-2 rounded-xl text-sm shadow-md shadow-sky-600/20 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <RefreshCw size={15} className="animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={15} />
                        <span>{editingId ? "Update Post" : "Publish to MongoDB"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Title & Category Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. When Should You Consider Knee Replacement Surgery?"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Medical Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags & Excerpt Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Keywords / Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="e.g. Knee Replacement, Arthritis, Joint Care, Dehri"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {["Knee Pain", "Arthritis", "ACL Tear", "Sciatica", "Trauma", "Physiotherapy"].map((quickTag) => (
                      <button
                        type="button"
                        key={quickTag}
                        onClick={() => {
                          const current = tagsInput ? tagsInput.split(",").map((t) => t.trim()) : [];
                          if (!current.includes(quickTag)) {
                            setTagsInput([...current, quickTag].join(", "));
                          }
                        }}
                        className="text-[11px] bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600 px-2 py-0.5 rounded-md transition-colors"
                      >
                        + {quickTag}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Short Excerpt / Meta Summary (for search & preview)
                  </label>
                  <textarea
                    rows={2}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief 1-2 sentence overview for patient preview cards..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              {/* Cover Image Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    Featured Cover Image
                  </label>
                  <span className="text-[11px] text-sky-600 font-semibold flex items-center gap-1">
                    <UploadCloud size={13} /> Powered by Cloudinary CDN
                  </span>
                </div>

                {/* Cloudinary Drag/Click Upload Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50/70 via-blue-50/50 to-indigo-50/60 border-2 border-dashed border-sky-200 hover:border-sky-400 transition-all">
                  <input
                    ref={coverFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />

                  {uploadingCover ? (
                    <div className="py-6 text-center space-y-2">
                      <RefreshCw size={26} className="animate-spin text-sky-600 mx-auto" />
                      <p className="text-xs font-bold text-sky-800">
                        Optimizing &amp; uploading image to Cloudinary CDN...
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Generating responsive WebP/AVIF formats
                      </p>
                    </div>
                  ) : coverImage && coverImage.includes("cloudinary.com") ? (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-20 h-16 rounded-xl overflow-hidden border border-sky-300 shadow-sm shrink-0 bg-white">
                          <Image
                            src={coverImage}
                            alt="Cloudinary uploaded cover"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            <Check size={10} /> Cloudinary CDN Active
                          </span>
                          <p className="text-xs font-semibold text-slate-800 mt-1 truncate max-w-xs sm:max-w-md">
                            {coverImage}
                          </p>
                          <a
                            href={coverImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-sky-600 hover:underline inline-flex items-center gap-0.5 mt-0.5"
                          >
                            Open original in new tab <ArrowUpRight size={11} />
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => coverFileInputRef.current?.click()}
                          className="px-3 py-1.5 bg-white text-sky-700 hover:bg-sky-50 border border-sky-200 rounded-xl text-xs font-bold shadow-2xs transition-all"
                        >
                          Replace Image
                        </button>
                        <button
                          type="button"
                          onClick={() => setCoverImage(PRESET_IMAGES[0].url)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                          title="Remove uploaded image"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => coverFileInputRef.current?.click()}
                      className="cursor-pointer py-4 text-center group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white text-sky-600 border border-sky-200 flex items-center justify-center mx-auto mb-2 shadow-sm group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all">
                        <UploadCloud size={24} />
                      </div>
                      <p className="text-xs font-bold text-[#1E3A5F] group-hover:text-sky-600 transition-colors">
                        Click to upload new cover image from your computer / phone
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        High-speed Cloudinary CDN &bull; JPEG, PNG, WebP, AVIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>

                {/* Preset Photography Strip */}
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 mb-1.5">
                    Or select from hospital photography presets:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-2">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        type="button"
                        key={img.label}
                        onClick={() => setCoverImage(img.url)}
                        className={`relative rounded-xl overflow-hidden border-2 text-left transition-all p-1 ${
                          coverImage === img.url
                            ? "border-sky-600 ring-2 ring-sky-300"
                            : "border-slate-200 hover:border-sky-300 opacity-75 hover:opacity-100"
                        }`}
                      >
                        <div className="h-16 w-full relative rounded-lg overflow-hidden bg-slate-100">
                          <Image
                            src={img.url}
                            alt={img.label}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-[10px] font-semibold text-slate-700 mt-1 truncate text-center">
                          {img.label}
                        </p>
                        {coverImage === img.url && (
                          <div className="absolute top-2 right-2 bg-sky-600 text-white rounded-full p-0.5">
                            <Check size={10} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct URL input */}
                <div>
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="Or enter custom image URL (/carousel/..., https://...)"
                    className="w-full px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                </div>
              </div>

              {/* Markdown Content Editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">
                    Article Body Content (Markdown Supported) *
                  </label>

                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
                    <button
                      type="button"
                      onClick={() => setEditorPreview(false)}
                      className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                        !editorPreview ? "bg-white text-sky-700 shadow-2xs" : "text-slate-600"
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorPreview(true)}
                      className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                        editorPreview ? "bg-white text-sky-700 shadow-2xs" : "text-slate-600"
                      }`}
                    >
                      Preview Mode
                    </button>
                  </div>
                </div>

                {/* Formatting Shortcut Toolbar */}
                {!editorPreview && (
                  <div className="flex flex-wrap items-center gap-1 bg-slate-50 border border-slate-200 border-b-0 rounded-t-xl px-3 py-1.5 text-xs text-slate-700">
                    <button
                      type="button"
                      onClick={() => insertFormatting("### ", "")}
                      className="px-2 py-1 font-bold hover:bg-slate-200 rounded"
                      title="Heading 3"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("#### ", "")}
                      className="px-2 py-1 font-bold hover:bg-slate-200 rounded"
                      title="Heading 4"
                    >
                      H4
                    </button>
                    <span className="w-px h-4 bg-slate-300 mx-1" />
                    <button
                      type="button"
                      onClick={() => insertFormatting("**", "**")}
                      className="px-2 py-1 font-bold hover:bg-slate-200 rounded"
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("*", "*")}
                      className="px-2 py-1 italic hover:bg-slate-200 rounded"
                      title="Italic"
                    >
                      I
                    </button>
                    <span className="w-px h-4 bg-slate-300 mx-1" />
                    <button
                      type="button"
                      onClick={() => insertFormatting("- ", "")}
                      className="px-2 py-1 hover:bg-slate-200 rounded"
                      title="Bullet Point"
                    >
                      &bull; List
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("1. ", "")}
                      className="px-2 py-1 hover:bg-slate-200 rounded"
                      title="Numbered List"
                    >
                      1. List
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("> ", "")}
                      className="px-2 py-1 hover:bg-slate-200 rounded"
                      title="Doctor Quote / Callout"
                    >
                      Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("\n---\n")}
                      className="px-2 py-1 hover:bg-slate-200 rounded"
                      title="Divider line"
                    >
                      Divider
                    </button>

                    <span className="w-px h-4 bg-slate-300 mx-1" />

                    {/* SEO Hyperlink Button */}
                    <button
                      type="button"
                      onClick={handleOpenLinkModal}
                      className="flex items-center gap-1.5 px-2.5 py-1 font-semibold text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded transition-colors shadow-2xs"
                      title="Add Hyperlink / Interlink another article for Domain Authority & Google SEO"
                    >
                      <Link2 size={13} className="text-emerald-700" />
                      <span>Add Hyperlink (SEO &amp; DA)</span>
                    </button>

                    <span className="w-px h-4 bg-slate-300 mx-1" />

                    {/* Cloudinary Inline Image Uploader */}
                    <input
                      ref={bodyFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleBodyImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => bodyFileInputRef.current?.click()}
                      disabled={uploadingBodyImage}
                      className="flex items-center gap-1.5 px-2.5 py-1 font-semibold text-xs bg-sky-100 hover:bg-sky-200 text-sky-800 rounded transition-colors disabled:opacity-50"
                      title="Upload and insert clinical image or diagram via Cloudinary CDN"
                    >
                      {uploadingBodyImage ? (
                        <>
                          <RefreshCw size={13} className="animate-spin text-sky-700" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud size={13} className="text-sky-700" />
                          <span>Insert Image (Cloudinary)</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {!editorPreview ? (
                  <textarea
                    id="blog-content-area"
                    rows={14}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write clinical insights, treatment overviews, patient rehabilitation advice here in English or Hindi (हिन्दी)... Supports markdown headings, bullet points, hyperlinks, and images."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-b-xl text-sm font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 leading-relaxed font-medium"
                  />
                ) : (
                  <div className="min-h-[350px] p-6 bg-white border border-slate-200 rounded-xl prose max-w-none text-slate-800">
                    <h1 className="text-2xl font-bold text-[#1E3A5F] mb-3">{title || "Article Title Preview"}</h1>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-6 pb-4 border-b">
                      <span>By Dr. Kumar Anshuman</span>
                      <span>&bull;</span>
                      <span>{category}</span>
                    </div>
                    <div className="text-slate-800 leading-relaxed font-sans pt-2">
                      {content ? (
                        renderFormattedContent(content)
                      ) : (
                        <p className="text-slate-400 italic text-sm">
                          (Empty content - write something in Editor tab)
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold px-7 py-3 rounded-xl text-sm shadow-lg shadow-sky-600/25 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Saving to MongoDB...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>{editingId ? "Update Article" : "Publish to MongoDB & Live Site"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            TAB 2: MANAGE ALL ARTICLES
            ======================================================== */}
        {activeTab === "manage" && (
          <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-5 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-[#1E3A5F]">
                  Hospital Blog Repository
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Stored in MongoDB database <span className="font-mono text-sky-700">orthomax_hospital</span> &rarr; collection <span className="font-mono text-sky-700">blogs</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search articles..."
                    className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-sky-400 w-44 sm:w-56"
                  />
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-sky-400"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Articles Table / List */}
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <FileText size={36} className="mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-semibold">No articles found.</p>
                <button
                  onClick={() => setActiveTab("write")}
                  className="mt-3 text-xs text-sky-600 font-bold hover:underline"
                >
                  Write your first article now &rarr;
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-y border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Article</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Views</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBlogs.map((b) => (
                      <tr key={b._id} className="hover:bg-sky-50/40 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs sm:max-w-md">
                          <div className="line-clamp-1">{b.title}</div>
                          <div className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                            slug: /{b.slug}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium text-[11px]">
                            {b.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleTogglePublish(b)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                              b.published
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            }`}
                            title="Click to toggle status"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                b.published ? "bg-emerald-600" : "bg-amber-600"
                              }`}
                            />
                            {b.published ? "Published" : "Draft"}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                          {new Date(b.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-700">
                          {b.views || 0}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1">
                          {b.published && (
                            <Link
                              href={`/blog/${b.slug}`}
                              target="_blank"
                              className="p-1.5 inline-block text-slate-400 hover:text-sky-600 rounded-lg hover:bg-sky-50 transition-colors"
                              title="View on public site"
                            >
                              <ExternalLink size={15} />
                            </Link>
                          )}
                          <button
                            onClick={() => handleEditBlog(b)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            title="Edit blog"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(b._id, b.title)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            HYPERLINK / INTERLINKING MODAL (FOR DA & SEO)
            ======================================================== */}
        {showLinkModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-sky-100 shadow-2xl max-w-lg w-full p-6 sm:p-7 relative animate-in fade-in zoom-in-95">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Link2 size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1E3A5F]">
                    Insert Hyperlink (SEO &amp; DA Booster)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Interlink keywords to other articles, treatments or websites
                  </p>
                </div>
              </div>

              <form onSubmit={handleInsertLink} className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Display / Anchor Text *
                  </label>
                  <input
                    type="text"
                    required
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="e.g. नी रिप्लेसमेंट सर्जरी डेहरी or Knee Arthroscopy"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-sans"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    The clickable keyword patients and Google search will see.
                  </span>
                </div>

                {/* Quick Interlink Dropdown for Existing Articles */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Quick Interlink: Pick from Existing Published Articles
                  </label>
                  <select
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!val) return;
                      const selected = blogs.find((b) => b.slug === val);
                      if (selected) {
                        setLinkUrl(`/blog/${selected.slug}`);
                        if (!linkText) {
                          setLinkText(selected.title);
                        }
                      }
                    }}
                    className="w-full px-3 py-2 bg-sky-50/70 border border-sky-200 rounded-xl text-xs text-sky-950 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <option value="">-- Choose an article to link (Internal DA) --</option>
                    {blogs.map((b) => (
                      <option key={b._id} value={b.slug}>
                        {b.title} ({b.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target URL / Web Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="e.g. /blog/complete-guide... or https://..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                {/* Preset shortcuts */}
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 mb-1">
                    Or link to hospital pages:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "Book Consultation", url: "/#contact" },
                      { label: "Hospital Services", url: "/#services" },
                      { label: "Blog Journal", url: "/blog" },
                      { label: "Doctor Profile", url: "/#doctor" },
                    ].map((shortcut) => (
                      <button
                        type="button"
                        key={shortcut.label}
                        onClick={() => {
                          setLinkUrl(shortcut.url);
                          if (!linkText) setLinkText(shortcut.label);
                        }}
                        className="text-[11px] bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-800 px-2 py-1 rounded-lg border border-slate-200 transition-colors"
                      >
                        + {shortcut.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowLinkModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Link2 size={14} />
                    <span>Insert Link into Article</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-sky-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                    <Key size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1E3A5F]">Change Doctor Password</h3>
                    <p className="text-[11px] text-slate-500">
                      Update credentials stored in MongoDB database
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X size={18} />
                </button>
              </div>

              {passwordError && (
                <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              {passwordSuccess && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                  <CheckCircle size={15} className="shrink-0 text-emerald-600" />
                  <span>{passwordSuccess}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock size={15} />
                    </div>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter existing password"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    New Password * (Min 8 characters)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Key size={15} />
                    </div>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new strong password"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <ShieldCheck size={15} />
                    </div>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 disabled:opacity-60"
                  >
                    {passwordLoading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Key size={14} />
                        <span>Update Password</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

