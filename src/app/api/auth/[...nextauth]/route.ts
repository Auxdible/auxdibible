import prisma from "@/lib/prisma";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const handler = NextAuth({
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
            return prisma.users.findFirstOrThrow({ where: { tag: credentials?.username } })
            .then((i) => {
                if (i.password) {
                    return bcrypt.compare(credentials.password, i.password)
                        .then((res) => res ? i : null)
                        .catch(() => null);
                }
                return null;
            }).catch(() => null);
        },
     }),
    Google({ 
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        authorization: { params: { scope: "openid email profile" } },
        profile(profile) {
            console.log(profile);
            return {
                id: profile.at_hash,
                name: profile.name,
                email: profile.email,
                image: profile.picture
            }
        }
    }),

  ],
})
export {handler as GET, handler as POST}