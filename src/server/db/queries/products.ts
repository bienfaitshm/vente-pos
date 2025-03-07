import { eq, asc } from "drizzle-orm";
import { db } from "../db";
import { TWithID } from "../queries";
import * as tables from "../schemas";

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
