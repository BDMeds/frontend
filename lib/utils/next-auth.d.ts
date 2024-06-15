import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { IUser, ITokens } from "./types";

declare module "next-auth" {
  interface Session {
    user: IUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: IUser;
    tokens: ITokens;
  }
}
