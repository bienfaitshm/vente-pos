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

export async function getSellers() {
  return await db.select().from(userTable).where(eq(userTable.isAdmin, false));
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
  return await db
    .select()
    .from(tables.Product)
    .orderBy(asc(tables.Product.name));
}

// point of sale
export async function createPointOfSale(
  product: tables.InsertPointOfSale
): Promise<tables.SelectPointOfSale | undefined> {
  const categories = await db
    .insert(tables.PointOfSale)
    .values(product)
    .returning();
  return categories[0];
}

export async function updatePointOfSale({
  id,
  ...value
}: tables.InsertPointOfSale & TWithID) {
  return await db
    .update(tables.PointOfSale)
    .set(value)
    .where(eq(tables.PointOfSale.id, id))
    .returning();
}

export async function deletePointOfSale({ id }: TWithID) {
  return await db
    .delete(tables.PointOfSale)
    .where(eq(tables.PointOfSale.id, id))
    .returning();
}

export async function getPointOfSales(): Promise<tables.SelectPointOfSale[]> {
  return await db
    .select()
    .from(tables.PointOfSale)
    .orderBy(asc(tables.PointOfSale.id));
}

// Client
export async function createClient(
  client: tables.InsertClient
): Promise<tables.SelectClient | undefined> {
  const values = await db.insert(tables.Client).values(client).returning();
  return values[0];
}

export async function updateClient({
  id,
  ...value
}: tables.InsertPointOfSale & TWithID) {
  return await db
    .update(tables.Client)
    .set(value)
    .where(eq(tables.Client.id, id))
    .returning();
}

export async function deleteClient({ id }: TWithID) {
  return await db
    .delete(tables.Client)
    .where(eq(tables.Client.id, id))
    .returning();
}

export async function getClients(): Promise<tables.SelectClient[]> {
  return await db
    .select()
    .from(tables.Client)
    .orderBy(asc(tables.Client.createdAt));
}

// CommandProduct
export async function createCommandProduct(
  commandProduct: tables.InsertCommandProduct
): Promise<tables.SelectCommandProduct | undefined> {
  const values = await db
    .insert(tables.CommandProduct)
    .values(commandProduct)
    .returning();
  return values[0];
}

export async function updateCommandProduct({
  id,
  ...value
}: tables.InsertCommandProduct & TWithID) {
  return await db
    .update(tables.CommandProduct)
    .set(value)
    .where(eq(tables.CommandProduct.id, id))
    .returning();
}

export async function deleteCommandProduct({ id }: TWithID) {
  return await db
    .delete(tables.CommandProduct)
    .where(eq(tables.CommandProduct.id, id))
    .returning();
}

export async function getCommandProducts(): Promise<
  tables.SelectCommandProduct[]
> {
  return await db
    .select()
    .from(tables.CommandProduct)
    .orderBy(asc(tables.CommandProduct.createdAt));
}

export async function getCommandProduct(
  id: number | string
): Promise<tables.SelectCommandProduct | undefined> {
  const command = await db
    .select()
    .from(tables.CommandProduct)
    .where(eq(tables.CommandProduct, id));
  return command[0];
}

// command items
export async function createCommandItems(
  items: tables.InsertCommandItem[]
): Promise<tables.InsertCommandItem[]> {
  return await db.insert(tables.CommandItem).values(items).returning();
}

export async function getCommandItems(
  commandProduct: number
): Promise<tables.SelectCommandItem[]> {
  return await db
    .select()
    .from(tables.CommandItem)
    .where(eq(tables.CommandItem.commandProduct, commandProduct));
}
