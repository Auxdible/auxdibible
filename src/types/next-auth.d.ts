import NextAuth, { DefaultUser } from "next-auth"
import { AdapterUser } from "next-auth/adapters";
declare module "next-auth" {
    interface Session {
      user: {
        tag?: string
      } & DefaultUser;
    }
}
declare module "next-auth/adapters" {
    interface AdapterUser {
        tag?: string;
    }
}