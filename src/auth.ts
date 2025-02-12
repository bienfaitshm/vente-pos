import NextAuth, {
  CredentialsSignin,
  AuthError,
  DefaultSession,
} from "next-auth";
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

class InvalidUsernameError extends CredentialsSignin {
  code = ErrorCode.InvalidUsername;
}

class InvalidPasszordError extends CredentialsSignin {
  code = ErrorCode.InvalidPassword;
}

class InvalidCredentialsError extends AuthError {
  code = ErrorCode.InvalidCredentials;
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
        try {
          // 1. check if username exists
          const user = await getByUsername(username as string);
          if (!user) {
            throw new InvalidUsernameError("No user found");
          }
          //3. check password
          const isValid = await comparePassword(
            password as string,
            user.password as string
          );
          console.log({ isValid });
          if (isValid) return user;
          throw new InvalidPasszordError("Invalid password");
        } catch (error) {
          console.log({ error });
          throw new InvalidCredentialsError("Invalid credentials");
        }

        return null;
      },
    }),
  ],
});
