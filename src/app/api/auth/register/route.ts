// app/actions/auth.ts
import { dbConnect } from "@/Database/Config/DbConfig";
import User from "@/Models/UserModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// Type for the registration response
// type RegisterResponse = {
//   success: boolean;
//   message: string;
//   user?: any;
// };

export default async function POST(
  request: NextRequest,
  response: NextResponse
) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and passwords are required" },
        { status: 400 }
      );
    }
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    await User.create({ email, password });
    return NextResponse.json(
      { message: "User registerd successfully", data: existingUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred in register route",
      },
      {
        status: 500,
      }
    );
  }
}
