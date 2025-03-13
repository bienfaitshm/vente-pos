import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { commonFieldTable } from "./base";

/**
 * Enum representing the user roles in the system.
 *
 * This enum is used to define the possible roles a user can have within the application.
 * The roles include:
 * - `admin`: Represents an administrative user with full access to the system.
 * - `seller`: Represents a user with permissions to manage sales-related activities.
 *
 * @enum {string}
 */
export const UserRoleEnum = pgEnum("role", ["ADMIN", "SELLER"]);
/**
 * Represents the users table in the database.
 *
 * This table contains the following fields:
 * - `name`: The name of the user, with a maximum length of 255 characters.
 * - `username`: The username of the user, with a maximum length of 255 characters. This field must be unique.
 * - `email`: The email address of the user, with a maximum length of 255 characters. This field must be unique.
 * - `password`: The password of the user, with a maximum length of 255 characters.
 * - `emailVerified`: The timestamp indicating when the user's email was verified. This field uses the "date" mode.
 * - `image`: A text field for storing the user's image.
 * - `role`: The role of the user, which defaults to "admin" and cannot be null.
 *
 * The table also includes common fields from `commonFieldTable`.
 */
export const users = pgTable("users", {
  ...commonFieldTable,
  name: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).unique().notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: UserRoleEnum("role").notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

/**
 * Represents the schema for the "session" table in the database.
 *
 * @constant
 * @type {object}
 * @property {string} sessionToken - The primary key for the session, represented as text.
 * @property {string} userId - The ID of the user associated with the session, represented as a varchar with a length of 15 characters. This field is not nullable and references the `id` field in the `users` table. On deletion of the user, the session will be cascaded.
 * @property {Date} expires - The expiration date of the session, represented as a timestamp in date mode. This field is not nullable.
 */
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: varchar("userId", { length: 15 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

/**
 * Represents the `verificationToken` table in the database.
 *
 * This table stores verification tokens with the following columns:
 * - `identifier`: A unique identifier for the token (not nullable).
 * - `token`: The verification token itself (not nullable).
 * - `expires`: The expiration date of the token (not nullable).
 *
 * The table has a composite primary key consisting of `identifier` and `token`.
 *
 * @constant {pgTable} verificationTokens - The `verificationToken` table schema.
 */
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

/**
 * Represents the `authenticator` table in the database.
 *
 * This table stores information about authenticators used by users.
 *
 * Columns:
 * - `credentialID`: A unique identifier for the credential. Cannot be null.
 * - `userId`: The ID of the user associated with the authenticator. Cannot be null. References the `id` column in the `users` table. On delete, cascades.
 * - `providerAccountId`: The ID of the provider account. Cannot be null.
 * - `credentialPublicKey`: The public key of the credential. Cannot be null.
 * - `counter`: A counter value for the authenticator. Cannot be null.
 * - `credentialDeviceType`: The type of device for the credential. Cannot be null.
 * - `credentialBackedUp`: Indicates if the credential is backed up. Cannot be null.
 * - `transports`: The transports used by the authenticator.
 *
 * Composite Primary Key:
 * - `userId` and `credentialID`
 */
export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: varchar("userId", { length: 15 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);
