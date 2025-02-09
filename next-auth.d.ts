import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: String;
    } & DefaultSession["user"];
  }
  interface User {
    databaseId: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    /** The internal MongoDB user id */
    id?: string;
  }
}
