import prisma from "@/lib/prisma";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
import bcrypt from 'bcrypt';
import { PrismaAdapter } from "@auth/prisma-adapter";


const saltRounds = 10;

export const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
        id: "credentials",
        name: "Auxdibible Account",
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith40" },
            password: { label: "Password", type: "password" }
        },
        authorize(credentials, req) {
            if (!credentials || !credentials.password || !credentials.username) return null;
            return null;
        },
     }),
    Google({
        id: "google",
        name: "Google",
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        authorization: { params: { scope: "openid email profile" } },
        idToken: true,
        profile(profile) {
        return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
        }
        },
    }),
    
  ],
  callbacks: {
    async session({ session, user }) {
        session.user.id = user.id;
        if (!user.tag && !session.user.tag) {
            let i = 0;
            while (!session.user.tag) {
                const autoTag = `${session.user.name?.toLowerCase().replaceAll(' ', '.')}${(i == 0 ? "" : i)}`;
                const exists = await prisma.user.findUnique({ where: { tag: autoTag }});
                console.log(autoTag + " " + exists);
                if (!exists) {
                    session.user.tag = autoTag;
                    await prisma.user.update({ where: { id: user.id }, data: { tag: autoTag }})
                    break;
                }
                i++;

            }
            
            
        }
        if (!session.user.tag) {
            session.user.tag = user.tag;
        }
        return session
      }
  },
  pages: {
    signIn: '/auth',
    signOut: '/auth',
  }
})
export {handler as GET, handler as POST}