import NextAuth, { AuthError as AuthjsError, DefaultSession } from "next-auth";
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
import { getByUsername } from "./server/db/queries";
import { comparePassword } from "./lib/encrypt";

export enum ErrorCode {
  InvalidUsername = "invalid_username",
  InvalidPassword = "invalid_password",
  InvalidCredentials = "invalid_credentials",
}

export class AuthError extends AuthjsError {
  code: ErrorCode;
  message: string;
  constructor(code: ErrorCode, message?: string) {
    super("Auth Error");
    this.code = code;
    this.message = message || code;
  }
}

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    username?: string | null;
    password?: string | null;
    isAdmin?: boolean | null;
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
    session({ session, user }) {
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
        // 1. check if username exists
        const user = await getByUsername(username as string);
        if (!user)
          throw new AuthError(ErrorCode.InvalidUsername, "User not found");
        //3. check password
        const isValid = await comparePassword(
          password as string,
          user.password as string
        );
        if (isValid) return user;
        if (!isValid)
          throw new AuthError(ErrorCode.InvalidPassword, "Invalid password");
        throw new AuthError(ErrorCode.InvalidCredentials);
      },
    }),
  ],
});
