import crypto from "crypto";
import { getDb } from "./mongodb";
import { hashPassword } from "./auth";

export interface Doctor {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  designation: string;
  qualifications: string;
  avatarUrl?: string;
  createdAt: Date;
}

export async function ensureDefaultDoctor(): Promise<void> {
  try {
    const db = await getDb();
    const count = await db.collection("doctors").countDocuments();

    if (count === 0) {
      const defaultEmail = process.env.DOCTOR_EMAIL || "dr.anshuman@orthomax.com";
      const initialPassword =
        process.env.INITIAL_DOCTOR_PASSWORD ||
        process.env.DOCTOR_PASSWORD ||
        crypto.randomBytes(12).toString("hex");
      const { hash, salt } = hashPassword(initialPassword);

      await db.collection("doctors").insertOne({
        name: "Dr. Kumar Anshuman",
        email: defaultEmail.toLowerCase(),
        passwordHash: hash,
        salt,
        designation: "Senior Orthopaedic, Joint Replacement & Arthroscopy Surgeon",
        qualifications: "MBBS, DNB (Ortho) New Delhi, M.Ch (Ortho), MS (HCM) London",
        avatarUrl: "/Dr._Kumar_Anshuman_mbbs_orthomax_hospital_orthopedic_surgeon_dehri.jpeg",
        createdAt: new Date(),
      });

      console.log(`Initial doctor account created in MongoDB for ${defaultEmail}.`);
    }
  } catch (error) {
    console.error("Failed to seed default doctor:", error);
  }
}

