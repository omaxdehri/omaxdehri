import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getSession } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { calculateReadTime } from "@/lib/blogs";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const db = await getDb();

    let blog = null;
    if (ObjectId.isValid(id)) {
      blog = await db.collection("blogs").findOne({ _id: new ObjectId(id) });
    }

    if (!blog) {
      let decoded = id;
      try {
        decoded = decodeURIComponent(id);
      } catch {}
      blog = await db.collection("blogs").findOne({
        $or: [{ slug: id }, { slug: decoded }],
      });
    }

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Increment view count asynchronously
    db.collection("blogs").updateOne(
      { _id: blog._id },
      { $inc: { views: 1 } }
    ).catch(() => {});

    return NextResponse.json({
      success: true,
      blog: {
        ...blog,
        _id: blog._id.toString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Doctor login required." },
        { status: 401 }
      );
    }

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const body = await req.json();
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.content !== undefined) {
      updateData.content = body.content.trim();
      updateData.readTime = calculateReadTime(body.content);
    }
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt.trim();
    if (body.category !== undefined) updateData.category = body.category;
    if (body.coverImage !== undefined) updateData.coverImage = body.coverImage;
    if (body.published !== undefined) updateData.published = Boolean(body.published);
    if (body.tags !== undefined) {
      updateData.tags = Array.isArray(body.tags)
        ? body.tags
        : typeof body.tags === "string"
        ? body.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : [];
    }

    const db = await getDb();
    const result = await db
      .collection("blogs")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: "after" }
      );

    if (!result) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      blog: {
        ...result,
        _id: result._id.toString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Doctor login required." },
        { status: 401 }
      );
    }

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection("blogs").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete blog" },
      { status: 500 }
    );
  }
}

