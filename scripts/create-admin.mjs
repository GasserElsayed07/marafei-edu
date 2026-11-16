import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD ?? "";
const name = process.env.ADMIN_NAME?.trim() || "Admin";

if (!uri || !email || !password) {
  console.error("Set MONGODB_URI, ADMIN_EMAIL, and ADMIN_PASSWORD in .env");
  process.exit(1);
}

if (password.length < 8 || password.length > 72) {
  console.error("ADMIN_PASSWORD must be 8 to 72 characters");
  process.exit(1);
}

await mongoose.connect(uri);
const users = mongoose.connection.collection("users");
const passwordHash = await bcrypt.hash(password, 12);
const now = new Date();

await users.updateOne(
  { email },
  {
    $set: { name, email, passwordHash, role: "admin", updatedAt: now },
    $setOnInsert: { createdAt: now },
  },
  { upsert: true },
);

console.log(`Admin ready: ${email}`);
await mongoose.disconnect();
