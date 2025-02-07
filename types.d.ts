import { Connection } from "mongoose";
declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
  interface ISocialLinks {
    linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
  }
}
export {};
