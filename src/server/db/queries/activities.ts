import { asc, eq } from "drizzle-orm";
import { db } from "../db";
import * as tables from "../schemas";

export type TWithID<T = string> = { id: T };

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
  commandProduct: string
): Promise<tables.SelectCommandItem[]> {
  return await db
    .select()
    .from(tables.CommandItem)
    .where(eq(tables.CommandItem.commandProduct, commandProduct));
}
