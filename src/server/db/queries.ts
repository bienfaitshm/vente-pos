import { asc, between, count, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "./db";
import { InsertUser, users as userTable } from "./schemas";

export async function createUser(data: InsertUser) {
  await db.insert(userTable).values(data);
}

export async function getUserByEmail(email: string) {
  return await db.select().from(userTable).where(eq(userTable.email, email));
}
