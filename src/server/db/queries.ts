import { eq, or } from "drizzle-orm";
import { db } from "./db";
import { InsertUser, SelectUser, users as userTable } from "./schemas";

/**
 *
 * @param data
 */
export async function createUser(data: InsertUser) {
  return await db
    .insert(userTable)
    .values(data)
    .returning({ id: userTable.id });
}

/**
 *
 * @param email
 * @returns
 */
export async function isEmailExist(email: string): Promise<boolean> {
  return !!(await db
    .select({ id: userTable.id })
    .from(userTable)
    .where(eq(userTable.email, email))
    .limit(1));
}

/**
 *
 * @param username
 * @returns
 */
export async function isUsernameExist(username: string): Promise<boolean> {
  return !!(await db
    .select({ id: userTable.id })
    .from(userTable)
    .where(eq(userTable.username, username))
    .limit(1));
}

/**
 *
 * @param email
 * @returns
 */
export async function getUserByEmail(email: string) {
  const users = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
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
): Promise<SelectUser | undefined> {
  const users = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
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
): Promise<SelectUser | undefined> {
  const users = await db
    .select()
    .from(userTable)
    .where(
      or(
        eq(userTable.username, usernameOrEmail),
        eq(userTable.email, usernameOrEmail)
      )
    )
    .limit(1);
  return users[0];
}
