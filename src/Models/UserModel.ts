import mongoose, { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Define a simple interface for social links.

// Define the interface for a User document.
export interface User extends Document {
  username: string;
  domain?: string; // Optional if you decide to use it
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  graduationYear: number;
  college: string;
  jobTitle?: string;
  blockedUser?: mongoose.Types.ObjectId[];
  company?: string;
  connections: mongoose.Types.ObjectId[];
  location?: string;
  experience?: number;
  skills: string[];
  socialLinks: ISocialLinks;
  isverified?: boolean;
  communities?: mongoose.Types.ObjectId[];
  posts?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema.
const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },

    domain: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    graduationYear: { type: Number, required: true },
    college: { type: String, required: true },
    jobTitle: { type: String, default: "" },
    company: { type: String, default: "" },
    location: { type: String, default: "" },
    experience: { type: Number, default: 0 },
    skills: [{ type: String }],
    socialLinks: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      twitter: { type: String, default: "" },
      portfolio: { type: String, default: "" },
    },
    blockedUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
    connections: [{ type: Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    isverified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash the password if it has been modified.
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Prevent recompilation in environments like Next.js.
const User = models.User || model<User>("User", userSchema);

export default User;
