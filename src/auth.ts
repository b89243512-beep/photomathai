import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { upsertUser } from "@/lib/supabase";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      // On first Google login, upsert user into Supabase
      if (account?.provider === "google" && user.email && account.providerAccountId) {
        const dbUser = await upsertUser({
          googleId: account.providerAccountId,
          email: user.email,
          name: user.name ?? null,
          image: user.image ?? null,
        });
        // Attach DB id to user object so it flows to JWT
        if (dbUser) {
          user.id = dbUser.id;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // On sign-in, copy user.id (DB id) and google_id to token
      if (user) {
        token.dbId = user.id;
      }
      if (account?.provider === "google") {
        token.googleId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.dbId as string) || (token.sub as string);
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});
