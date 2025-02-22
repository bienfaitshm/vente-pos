import { asc, eq, or } from "drizzle-orm";
import { db } from "./db";
import { InsertUser, SelectUser, users as userTable } from "./schemas";
import * as tables from "./schemas";

type TWithID<T = number> = { id: T };

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
  const exist = await db
    .select({ id: userTable.id })
    .from(userTable)
    .where(eq(userTable.email, email))
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
    .select({ id: userTable.id })
    .from(userTable)
    .where(eq(userTable.username, username))
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

// catgories
export async function createCategory(
  category: tables.InsertCategory
): Promise<tables.SelectCategory | undefined> {
  const categories = await db
    .insert(tables.Category)
    .values(category)
    .returning();
  return categories[0];
}

export async function updateCategory({
  id,
  ...value
}: tables.InsertCategory & TWithID) {
  return await db
    .update(tables.Category)
    .set(value)
    .where(eq(tables.Category.id, id))
    .returning();
}

export async function deleteCategory({ id }: TWithID) {
  return await db
    .delete(tables.Category)
    .where(eq(tables.Category.id, id))
    .returning();
}

export async function getCategories(): Promise<tables.SelectCategory[]> {
  return await db
    .select()
    .from(tables.Category)
    .orderBy(asc(tables.Category.id));
}

// products
export async function createProduct(
  product: tables.InsertProduct
): Promise<tables.SelectProduct | undefined> {
  const categories = await db
    .insert(tables.Product)
    .values(product)
    .returning();
  return categories[0];
}

export async function updateProduct({
  id,
  ...value
}: tables.InsertProduct & TWithID) {
  return await db
    .update(tables.Product)
    .set(value)
    .where(eq(tables.Product.id, id))
    .returning();
}

export async function deleteProduct({ id }: TWithID) {
  return await db
    .delete(tables.Product)
    .where(eq(tables.Product.id, id))
    .returning();
}

export async function getProducts(): Promise<tables.SelectProduct[]> {
  return await db.select().from(tables.Product).orderBy(asc(tables.Product.id));
}
