import { eq } from "drizzle-orm";
import { db } from "./db";
import { InsertUser, SelectUser, users as userTable } from "./schemas";

export async function createUser(data: InsertUser) {
  await db.insert(userTable).values(data);
}

export async function getUserByEmail(email: string) {
  return await db.select().from(userTable).where(eq(userTable.email, email));
}

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
