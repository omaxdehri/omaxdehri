import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { getSession, hashPassword, verifyPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in first." },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword, confirmPassword } = await req.json();

    if (!currentPassword) {
      return NextResponse.json(
        { error: "Please provide your current password." },
        { status: 400 }
      );
    }

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirmation do not match." },
        { status: 400 }
      );
    }

    const db = await getDb();
    
    // Find doctor by session ID
    let query: any = {};
    try {
      query = { _id: new ObjectId(session.doctorId) };
    } catch {
      query = { email: session.email };
    }

    const doctor = await db.collection("doctors").findOne(query);

    if (!doctor) {
      return NextResponse.json(
        { error: "Doctor account not found in database." },
        { status: 404 }
      );
    }

    // Verify current password
    const isCurrentValid = verifyPassword(
      currentPassword,
      doctor.salt,
      doctor.passwordHash
    );

    if (!isCurrentValid) {
      return NextResponse.json(
        { error: "Current password is incorrect. Please try again." },
        { status: 400 }
      );
    }

    // Hash new password with fresh salt
    const { hash: newHash, salt: newSalt } = hashPassword(newPassword);

    await db.collection("doctors").updateOne(
      { _id: doctor._id },
      {
        $set: {
          passwordHash: newHash,
          salt: newSalt,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Doctor password updated successfully in MongoDB.",
    });
  } catch (error: any) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update password." },
      { status: 500 }
    );
  }
}

