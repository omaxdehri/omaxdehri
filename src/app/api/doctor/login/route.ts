import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyPassword, hashPassword, createSession, COOKIE_NAME } from "@/lib/auth";
import { ensureDefaultDoctor } from "@/lib/doctor";
import { ensureDefaultBlogs } from "@/lib/blogs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please provide both email and password." },
        { status: 400 }
      );
    }

    // Ensure database and collections exist with default doctor and blogs
    await ensureDefaultDoctor();
    await ensureDefaultBlogs();

    const db = await getDb();
    const doctor = await db.collection("doctors").findOne({
      email: email.trim().toLowerCase(),
    });

    if (!doctor) {
      return NextResponse.json(
        { error: "Invalid credentials. Doctor not found." },
        { status: 401 }
      );
    }

    let isValid = verifyPassword(password, doctor.salt || "", doctor.passwordHash || "");

    // If admin directly edited the password in MongoDB Atlas with plaintext:
    if (!isValid && doctor.passwordHash === password) {
      isValid = true;
      const { hash, salt } = hashPassword(password);
      await db.collection("doctors").updateOne(
        { _id: doctor._id },
        { $set: { passwordHash: hash, salt, updatedAt: new Date() } }
      );
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials. Incorrect password." },
        { status: 401 }
      );
    }

    const { token, expiresAt } = await createSession(
      doctor._id.toString(),
      doctor.email,
      doctor.name
    );

    const response = NextResponse.json({
      success: true,
      doctor: {
        id: doctor._id.toString(),
        name: doctor.name,
        email: doctor.email,
        designation: doctor.designation,
        qualifications: doctor.qualifications,
        avatarUrl: doctor.avatarUrl,
      },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: expiresAt,
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}

