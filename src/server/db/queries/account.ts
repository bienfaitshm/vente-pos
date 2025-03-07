import { eq, or } from "drizzle-orm";
import { db } from "@/server/db/db";
import * as tables from "@/server/db/schemas/accounts";

/**
 *
 * @param data
 */
export async function createUser(data: tables.InsertUser) {
  return await db
    .insert(tables.users)
    .values(data)
    .returning({ id: tables.users.id });
}

/**
 *
 * @param email
 * @returns
 */
export async function isEmailExist(email: string): Promise<boolean> {
  const exist = await db
    .select({ id: tables.users.id })
    .from(tables.users)
    .where(eq(tables.users.email, email))
    .limit(1);
  return !!exist[0];
}

/**
 *
 * @param username
 * @returns
 */
export async function isUsernameExist(username: string): Promise<boolean> {
  const exist = await db
    .select({ id: tables.users.id })
    .from(tables.users)
    .where(eq(tables.users.username, username))
    .limit(1);
  return !!exist[0];
}

/**
 *
 * @param email
 * @returns
 */
export async function getUserByEmail(email: string) {
  const users = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.email, email))
    .limit(1);
  return users[0];
}

/**
 * Get user by username
 * @param username
 * @returns
 */
export async function getByUsername(
  username: string
): Promise<tables.SelectUser | undefined> {
  const users = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.username, username))
    .limit(1);
  return users[0];
}

/**
 * Get user by username
 * @param username
 * @returns
 */
export async function getByUsernameOrEmail(
  usernameOrEmail: string
): Promise<tables.SelectUser | undefined> {
  const users = await db
    .select()
    .from(tables.users)
    .where(
      or(
        eq(tables.users.username, usernameOrEmail),
        eq(tables.users.email, usernameOrEmail)
      )
    )
    .limit(1);
  return users[0];
}

// Salers
export async function getSalers() {
  return await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.isAdmin, false));
}
