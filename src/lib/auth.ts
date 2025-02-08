import { dbConnect } from "@/Database/Config/DbConfig";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import LinkedInProvider from "next-auth/providers/linkedin";
import User from "@/Models/UserModel";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found");
          }
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("Invalid Password");
          }
          return {
            id: user._id.toString(),
            email: user.email,
            databaseId: user._id.toString(),
          };
        } catch (error) {
          throw error;
        }
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // signIn callback is executed after a successful OAuth login.
    async signIn({ user, account, profile }) {
      try {
        await dbConnect();

        // Check if this is the LinkedIn provider.
        if (account?.provider === "linkedin") {
          // Retrieve the email from either the user object or profile.
          const email = user?.email || (profile as any)?.email;
          if (!email) {
            console.error("No email returned from LinkedIn");
            return false;
          }
          // Check if a user with this email already exists.
          let existingUser = await User.findOne({ email });
          if (!existingUser) {
            // If no user exists, create a new one using defaults.
            // Generate a username from the user's name or email.
            const baseUsername =
              user?.name?.replace(/\s+/g, "").toLowerCase() ||
              email.split("@")[0];
            // Use a random string as password since social login doesn't use it.
            const randomPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            // Create new user with required defaults.
            const newUser = await User.create({
              username: baseUsername,
              domain: "linkedin",
              email: email,
              password: hashedPassword,
              graduationYear: new Date().getFullYear(), // default to current year
              college: "Not Provided",
              avatar: user?.image || (profile as any)?.image || "",
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
            // Attach the new user's id to the user object.
            user.databaseId = newUser._id.toString();
          } else {
            // If user exists, attach its id.
            user.databaseId = existingUser._id.toString();
          }
          return true;
        }
        // For other providers (like Credentials), simply allow sign in.
        return true;
      } catch (error) {
        console.error("Error during LinkedIn signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user?.databaseId) {
        token.id = user.databaseId;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
