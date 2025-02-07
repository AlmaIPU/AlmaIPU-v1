import mongoose, { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface ISocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
}
interface User extends Document {
  username: {
    type: string;
    required: true;
  };
  domain: {
    type: string;
    required: true;
  };
  email: {
    type: string;
    required: true;
    unique: true;
  };
  password: string;
  avatar?: string;
  bio?: string;
  graduationYear: number;
  college: string;
  jobTitle?: string;
  blockedUser?: {
    type: mongoose.Types.ObjectId[];
    ref: "User";
  };
  company?: string;
  connections: {
    type: mongoose.Types.ObjectId[];
    ref: "User";
  };
  location?: string;
  experience?: number;
  skills: string[];
  socialLinks: ISocialLinks;
  communities?: {
    type: mongoose.Types.ObjectId[];
    ref: "Community";
  };
  _id: mongoose.Types.ObjectId;
  posts?: {
    type: mongoose.Types.ObjectId[];
    ref: "Post";
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<User>(
  {
    username: { type: String, required: true, unique: true },
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
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  //pre hook is used to run some code before saving the document
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next(); //next is used to move to the next middleware
});
const User = models?.User || model<User>("User", userSchema); //pattern to prevent nodelrecompition in nextjs
export default User;
