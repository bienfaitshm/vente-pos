import { eq } from "drizzle-orm";
import { db } from "@/server/db/db";
import * as tables from "@/server/db/schemas";

export async function getSellers() {
  return await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.isAdmin, false));
}
