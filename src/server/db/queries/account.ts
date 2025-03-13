import { and, eq, or } from "drizzle-orm";
import { db } from "@/server/db/db";
import * as tables from "@/server/db/schemas/accounts";
import { WithID } from "./type";

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

// Sellers
export async function getSellers() {
  return await db.select().from(tables.users);
  // .where(eq(tables.users.isAdmin, false));
}

export async function getSeller(
  id: string
): Promise<tables.SelectUser | undefined> {
  const users = await db
    .select()
    .from(tables.users)
    .where(and(eq(tables.users.role, "seller"), eq(tables.users.id, id)));
  return users[0];
}

export async function updateSeller({
  id,
  ...value
}: WithID & Pick<tables.InsertUser, "email" | "image" | "name" | "username">) {
  return await db
    .update(tables.users)
    .set(value)
    .where(eq(tables.users.id, id))
    .returning();
}

export async function deleteSeller({ id }: WithID) {
  return await db
    .delete(tables.users)
    .where(eq(tables.users.id, id))
    .returning();
}
