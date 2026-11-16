import mongoose, { type InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 120,
    },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, required: true, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
