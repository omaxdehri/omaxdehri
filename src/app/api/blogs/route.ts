import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getSession } from "@/lib/auth";
import { ensureDefaultBlogs, slugify, calculateReadTime } from "@/lib/blogs";

export async function GET(req: NextRequest) {
  try {
    await ensureDefaultBlogs();
    const db = await getDb();
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const showAll = searchParams.get("all") === "true";

    const session = await getSession();

    const query: any = {};

    // If not authenticated doctor requesting all, only show published blogs
    if (!showAll || !session) {
      query.published = true;
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const blogs = await db
      .collection("blogs")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      blogs: blogs.map((b) => ({
        ...b,
        _id: b._id.toString(),
      })),
    });
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Doctor login required to publish blogs." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, content, excerpt, category, tags, coverImage, published } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Generate unique slug
    let baseSlug = slugify(title);
    if (!baseSlug) baseSlug = "blog-" + Date.now();
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (await db.collection("blogs").findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    const processedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const newBlog = {
      title: title.trim(),
      slug: uniqueSlug,
      excerpt: (excerpt || content.slice(0, 160).replace(/[#*`_]/g, "") + "...").trim(),
      content: content.trim(),
      category: category || "General Orthopaedics",
      tags: processedTags.length > 0 ? processedTags : ["Orthopaedics", "Health"],
      coverImage:
        coverImage || "/front_image_orthomax_hospital_orthopedic_surgeon_dehri.png",
      author: {
        name: session.name || "Dr. Kumar Anshuman",
        title: "Senior Orthopaedic & Joint Replacement Surgeon",
        avatarUrl: "/Dr._Kumar_Anshuman_mbbs_orthomax_hospital_orthopedic_surgeon_dehri.jpeg",
      },
      readTime: calculateReadTime(content),
      published: Boolean(published),
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("blogs").insertOne(newBlog);

    return NextResponse.json({
      success: true,
      blog: {
        ...newBlog,
        _id: result.insertedId.toString(),
      },
    });
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create blog" },
      { status: 500 }
    );
  }
}

