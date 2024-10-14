import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt"; // eslint-disable-line

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface User {
    role: string;
    verifiedUser: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    role: string;
    verifiedUser: boolean;
  }
}
