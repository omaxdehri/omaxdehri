import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const db = await getDb();
    let doctor = null;
    try {
      doctor = await db.collection("doctors").findOne({
        _id: new ObjectId(session.doctorId),
      });
    } catch {
      doctor = await db.collection("doctors").findOne({
        email: session.email,
      });
    }

    if (!doctor) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      doctor: {
        id: doctor._id.toString(),
        name: doctor.name,
        email: doctor.email,
        designation: doctor.designation,
        qualifications: doctor.qualifications,
        avatarUrl: doctor.avatarUrl,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { authenticated: false, error: error.message },
      { status: 500 }
    );
  }
}

