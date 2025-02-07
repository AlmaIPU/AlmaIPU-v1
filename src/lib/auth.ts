import { dbConnect } from "@/Database/Config/DbConfig";
import { NextAuthOptions } from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import User from "@/Models/UserModel";
export const authOptions: NextAuthOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ email }) {
      try {
        await dbConnect();
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
          return true;
        }
        return false;
      } catch (error) {
        throw new Error("Error while signing in");
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session; //always return
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  //   prop4
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
