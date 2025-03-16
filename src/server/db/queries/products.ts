import { eq, asc, getTableColumns } from "drizzle-orm";
import { db } from "../db";
import * as tables from "../schemas";
import { WithID } from "./type";

/**
 * Creates a new category in the database.
 * @param category - The category data to insert.
 * @returns The inserted category or undefined if insertion failed.
 */
export async function createCategory(
  category: tables.InsertCategory
): Promise<tables.SelectCategory | undefined> {
  const categories = await db
    .insert(tables.categories)
    .values(category)
    .returning();
  return categories[0];
}

/**
 * Updates an existing category in the database.
 * @param category - The category data to update, including the ID.
 * @returns The updated category.
 */
export async function updateCategory({
  id,
  ...value
}: tables.InsertCategory & WithID) {
  return await db
    .update(tables.categories)
    .set(value)
    .where(eq(tables.categories.id, id))
    .returning();
}

/**
 * Deletes a category from the database.
 * @param id - The ID of the category to delete.
 * @returns The deleted category.
 */
export async function deleteCategory({ id }: WithID) {
  return await db
    .delete(tables.categories)
    .where(eq(tables.categories.id, id))
    .returning();
}

/**
 * Retrieves all categories from the database.
 * @returns An array of categories.
 */
export async function getCategories(): Promise<tables.SelectCategory[]> {
  return await db
    .select()
    .from(tables.categories)
    .orderBy(asc(tables.categories.id));
}

/**
 * Creates a new product in the database.
 * @param product - The product data to insert.
 * @returns The inserted product or undefined if insertion failed.
 */
export async function createProduct(
  product: tables.InsertProduct
): Promise<tables.SelectProduct | undefined> {
  const products = await db.insert(tables.products).values(product).returning();
  return products[0];
}

/**
 * Updates an existing product in the database.
 * @param product - The product data to update, including the ID.
 * @returns The updated product.
 */
export async function updateProduct({
  id,
  ...value
}: tables.InsertProduct & WithID) {
  return await db
    .update(tables.products)
    .set(value)
    .where(eq(tables.products.id, id))
    .returning();
}

/**
 * Deletes a product from the database.
 * @param id - The ID of the product to delete.
 * @returns The deleted product.
 */
export async function deleteProduct({ id }: WithID) {
  return await db
    .delete(tables.products)
    .where(eq(tables.products.id, id))
    .returning();
}

/**
 * Retrieves all products from the database.
 * @returns An array of products.
 */
export async function getProducts(): Promise<(tables.SelectProduct & { categoryName: string | null})[]> {
  return await db
    .select({
      ...getTableColumns(tables.products),
      categoryName: tables.categories.name
    })
    .from(tables.products)
    .leftJoin(tables.categories, eq(tables.categories.id, tables.products.categoryId))
    .orderBy(asc(tables.products.name));
}

/**
 * Creates a new point of sale in the database.
 * @param pointOfSale - The point of sale data to insert.
 * @returns The inserted point of sale or undefined if insertion failed.
 */
export async function createPointOfSale(
  pointOfSale: tables.InsertPointOfSale
): Promise<tables.SelectPointOfSale | undefined> {
  const pointOfSales = await db
    .insert(tables.pointOfSales)
    .values(pointOfSale)
    .returning();
  return pointOfSales[0];
}

/**
 * Updates an existing point of sale in the database.
 * @param pointOfSale - The point of sale data to update, including the ID.
 * @returns The updated point of sale.
 */
export async function updatePointOfSale({
  id,
  ...value
}: tables.InsertPointOfSale & WithID) {
  return await db
    .update(tables.pointOfSales)
    .set(value)
    .where(eq(tables.pointOfSales.id, id))
    .returning();
}

/**
 * Deletes a point of sale from the database.
 * @param id - The ID of the point of sale to delete.
 * @returns The deleted point of sale.
 */
export async function deletePointOfSale({ id }: WithID) {
  return await db
    .delete(tables.pointOfSales)
    .where(eq(tables.pointOfSales.id, id))
    .returning();
}

/**
 * Retrieves all points of sale from the database.
 * @returns An array of points of sale.
 */
export async function getPointOfSales(): Promise<tables.SelectPointOfSale[]> {
  return await db
    .select()
    .from(tables.pointOfSales)
    .orderBy(asc(tables.pointOfSales.id));
}

/**
 * Creates a new customer in the database.
 * @param customer - The customer data to insert.
 * @returns The inserted customer or undefined if insertion failed.
 */
export async function createCustomer(
  customer: tables.InsertCustomer
): Promise<tables.SelectCustomer | undefined> {
  const customers = await db
    .insert(tables.customers)
    .values(customer)
    .returning();
  return customers[0];
}

/**
 * Updates an existing customer in the database.
 * @param customer - The customer data to update, including the ID.
 * @returns The updated customer.
 */
export async function updateCustomer({
  id,
  ...value
}: tables.InsertCustomer & WithID) {
  return await db
    .update(tables.customers)
    .set(value)
    .where(eq(tables.customers.id, id))
    .returning();
}

/**
 * Deletes a customer from the database.
 * @param id - The ID of the customer to delete.
 * @returns The deleted customer.
 */
export async function deleteCustomer({ id }: WithID) {
  return await db
    .delete(tables.customers)
    .where(eq(tables.customers.id, id))
    .returning();
}

/**
 * Retrieves all customers from the database.
 * @returns An array of customers.
 */
export async function getCustomers(): Promise<tables.SelectCustomer[]> {
  return await db
    .select()
    .from(tables.customers)
    .orderBy(asc(tables.customers.createdAt));
}
