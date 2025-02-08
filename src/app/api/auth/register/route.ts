// app/actions/auth.ts
"use server";

import { dbConnect } from "@/Database/Config/DbConfig";
import User from "@/Models/UserModel";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Define a schema for input validation
const RegisterSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  graduationYear: z.number().optional(),
  college: z.string().optional(),
});

// Type for the registration response
type RegisterResponse = {
  success: boolean;
  message: string;
  user?: any;
};

export async function registerUser(
  formData: FormData
): Promise<RegisterResponse> {
  try {
    // Connect to database
    await dbConnect();

    // Extract and validate form data
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
      username: formData.get("username"),
      graduationYear:
        Number(formData.get("graduationYear")) || new Date().getFullYear(),
      college: formData.get("college") || "Not Provided",
    };

    // Validate input
    const validatedData = RegisterSchema.parse(rawData);

    // Check if email already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return {
        success: false,
        message: "Email already registered",
      };
    }

    // Check if username is taken
    const existingUsername = await User.findOne({
      username: validatedData.username,
    });
    if (existingUsername) {
      return {
        success: false,
        message: "Username already taken",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create new user
    const newUser = await User.create({
      ...validatedData,
      password: hashedPassword,
      domain: "email",
      avatar: "",
      bio: "",
      jobTitle: "",
      company: "",
      location: "",
      experience: 0,
      skills: [],
      socialLinks: {
        linkedin: "",
        github: "",
        twitter: "",
        portfolio: "",
      },
      blockedUser: [],
      connections: [],
      isverified: false,
      communities: [],
      posts: [],
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return {
      success: true,
      message: "Registration successful",
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }
    return {
      success: false,
      message: "Error creating user",
    };
  }
}
