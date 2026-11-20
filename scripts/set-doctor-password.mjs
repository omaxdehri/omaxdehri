import { MongoClient } from "mongodb";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local manually if not in Node process.env
const envLocalPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

const mongoUri = process.env.MONGODB_DIRECT_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("❌ Error: Neither MONGODB_DIRECT_URI nor MONGODB_URI is set in .env.local");
  process.exit(1);
}

const args = process.argv.slice(2);
const newPassword = args[0];
const targetEmail = (args[1] || "dr.anshuman@orthomax.com").toLowerCase().trim();

if (!newPassword || newPassword.trim().length < 6) {
  console.log(`
========================================================================
  🏥 Ortho Max Hospital - Doctor / Admin Password Reset Tool
========================================================================

Usage:
  node scripts/set-doctor-password.mjs <new_password> [email]

Examples:
  node scripts/set-doctor-password.mjs "MySecurePass2026!"
  node scripts/set-doctor-password.mjs "MySecurePass2026!" "dr.anshuman@orthomax.com"
  npm run set-doctor-password "MySecurePass2026!"

Note:
  - Password must be at least 6 characters long.
  - Changes will be immediately saved directly in MongoDB.
  - All existing doctor sessions will be expired for security.
========================================================================
`);
  process.exit(1);
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}

async function updatePassword() {
  console.log("🔌 Connecting securely to MongoDB Atlas...");
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db("orthomax_hospital");
    const doctorsCollection = db.collection("doctors");
    const sessionsCollection = db.collection("sessions");

    let doctor = await doctorsCollection.findOne({ email: targetEmail });
    if (!doctor) {
      // If not found by specific email, check if there is any doctor document
      doctor = await doctorsCollection.findOne({});
    }

    if (!doctor) {
      console.error(`❌ No doctor record found in orthomax_hospital.doctors collection.`);
      process.exit(1);
    }

    console.log(`👤 Found doctor account: ${doctor.name} (${doctor.email})`);

    const { hash, salt } = hashPassword(newPassword.trim());

    await doctorsCollection.updateOne(
      { _id: doctor._id },
      {
        $set: {
          passwordHash: hash,
          salt,
          updatedAt: new Date(),
        },
      }
    );

    // Invalidate old sessions so any active logins must re-authenticate with the new password
    const deleteResult = await sessionsCollection.deleteMany({
      $or: [{ doctorId: doctor._id.toString() }, { email: doctor.email }],
    });

    console.log(`
✅ SUCCESS: Admin/Doctor password has been updated in MongoDB!
------------------------------------------------------------------------
  Doctor Name     : ${doctor.name}
  Login Email     : ${doctor.email}
  New Password    : ${newPassword.replace(/./g, "*")} (Length: ${newPassword.length})
  Old Sessions    : ${deleteResult.deletedCount} active session(s) revoked
------------------------------------------------------------------------
You can now log in at: /doctor/login
`);
  } catch (error) {
    console.error("❌ Failed to update password in MongoDB:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

updatePassword();

