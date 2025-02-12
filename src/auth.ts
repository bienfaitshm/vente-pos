import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "./server/db/schemas";
import { db } from "./server/db/db";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    isAdmin?: boolean;
    username?: string;
  }
  interface Session {
    user: {
      isAdmin: boolean;
      username: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: "jwt",
  },

  callbacks: {
    session({ session, token, user }) {
      // `session.user.address` is now a valid property, and will be type-checked
      // in places like `useSession().data.user` or `auth().user`
      return {
        ...session,
        user,
      };
    },
  },
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "vente-pos@company.com",
    }),
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ username, password }) {
        // const user = await db("users").where({ username }).first();
        throw new InvalidLoginError();
        return null;
      },
    }),
  ],
});
