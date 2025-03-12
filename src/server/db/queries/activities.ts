import { asc, desc, eq, getTableColumns } from "drizzle-orm";
import { db } from "../db";
import * as tables from "../schemas";
import { calculateSubTotal, getAmountFromPourcentage } from "../utils";

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

/**
 * Processes a command for products by calculating the total amount and commission,
 * creating the command, and creating the associated command items.
 *
 * @param {tables.InsertCommandProduct} command - The command details to be inserted.
 * @param {Array<{product: string, price: number, quantity: number, commission: number}>} items -
 *   An array of items containing product details such as id, price, quantity, and commission.
 *
 * @returns {Promise<{command: CommandProduct, items: CommandItem[]}>} - A promise that resolves to an object containing the created command and its items.
 *
 * @throws {Error} - Throws an error if the command or items creation fails.
 */
export async function passCommandProduct(
  command: {
    client: string;
    saler: string;
  },
  items: {
    // id of product
    product: string;
    price: number;
    quantity: number;
    commission: number;
  }[]
) {
  // 1. get amount
  const amount: number = calculateSubTotal(
    items,
    (item) => item.price * item.quantity
  );

  //2. get amount commission
  const amountCommission: number = calculateSubTotal(
    items,
    (item) =>
      getAmountFromPourcentage(item.commission, item.price) * item.quantity
  );

  //3. create command
  const commandObj = await createCommandProduct({
    ...command,
    amountCommission,
    amount,
  });

  //3. create command items
  const invoiceItems = await createCommandItems(
    items.map((item) => ({
      amount: item.quantity * item.price,
      command: commandObj?.id,
      product: item.product,
      quantity: item.quantity,
    }))
  );

  return { command: commandObj, items: invoiceItems };
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

// Stocks
export async function createStock(
  Stock: tables.InsertStock
): Promise<tables.SelectStock | undefined> {
  const values = await db.insert(tables.Stock).values(Stock).returning();
  return values[0];
}

export async function updateStock({
  id,
  ...value
}: tables.InsertStock & TWithID) {
  const values = await db
    .update(tables.Stock)
    .set(value)
    .where(eq(tables.Stock.id, id))
    .returning();
  return values[0];
}

export async function deleteStock({ id }: TWithID) {
  return await db
    .delete(tables.Stock)
    .where(eq(tables.Stock.id, id))
    .returning();
}

export async function getStocks() {
  return await db
    .select({
      ...getTableColumns(tables.Stock),
      product: tables.Product.name,
      productId: tables.Product.id,
    })
    .from(tables.Stock)
    .leftJoin(tables.Product, eq(tables.Product.id, tables.Stock.product))
    .orderBy(desc(tables.Stock.createdAt));
}

export async function getStock(id: string) {
  const command = await db
    .select()
    .from(tables.Stock)
    .leftJoin(tables.Product, eq(tables.Product.id, tables.Stock.product))
    .where(eq(tables.Stock.id, id));
  return command[0];
}

export async function getStockByProduct(
  product: string
): Promise<tables.SelectStock | undefined> {
  const command = await db
    .select()
    .from(tables.Stock)
    .where(eq(tables.Stock.product, product));
  return command[0];
}

// StockHistory
export async function createStockHistory(
  StockHistory: tables.InsertStockHistory
): Promise<tables.SelectStockHistory | undefined> {
  const values = await db
    .insert(tables.StockHistory)
    .values(StockHistory)
    .returning();
  return values[0];
}

export async function updateStockHistory({
  id,
  ...value
}: tables.InsertStockHistory & TWithID) {
  return await db
    .update(tables.StockHistory)
    .set(value)
    .where(eq(tables.StockHistory.id, id))
    .returning();
}

export async function deleteStockHistory({ id }: TWithID) {
  return await db
    .delete(tables.StockHistory)
    .where(eq(tables.StockHistory.id, id))
    .returning();
}

export async function getStockHistories() {
  return await db
    .select()
    .from(tables.StockHistory)
    .orderBy(desc(tables.StockHistory.createdAt));
}

export async function getStockHistory(
  id: string
): Promise<tables.SelectStockHistory | undefined> {
  const command = await db
    .select()
    .from(tables.StockHistory)
    .where(eq(tables.StockHistory.id, id));
  return command[0];
}

// actions stocks

/**
 * Replenishes the stock by either adding or subtracting the specified quantity.
 * If the stock for the product does not exist and the action is "ADD", it creates a new stock entry.
 * If the stock exists, it updates the quantity based on the action.
 * It also creates a stock history entry for the operation.
 *
 * @param admin - The admin performing the action.
 * @param saler - The saler associated with the stock.
 * @param action - The action to perform, either "ADD" or "SUB".
 * @param pos - The point of sale identifier.
 * @param product - The product identifier.
 * @param quantity - The quantity to add or subtract.
 * @throws Will throw an error if the action is "SUB" and the stock does not exist.
 * @throws Will throw an error if the resulting quantity is negative.
 */
export async function replenishingTheStock({
  admin,
  saler,
  action,
  pos,
  product,
  quantity,
}: Pick<tables.InsertStock, "product"> &
  Omit<tables.InsertStockHistory, "id" | "stock">): Promise<void> {
  // 1. Get or create stock
  let stock = await getStockByProduct(product);
  if (!stock) {
    if (action === "SUB") {
      throw new Error("Impossible d'exécuter l'opération, le stock est nul");
    }
    stock = await createStock({ product, saler, quantity });
  } else {
    const newQuantity =
      action === "ADD" ? stock.quantity + quantity : stock.quantity - quantity;
    if (newQuantity < 0) {
      throw new Error("La quantité ne peut pas être négative");
    }
    stock = await updateStock({
      id: stock.id,
      quantity: newQuantity,
      product,
      saler,
    });
  }

  // 2. Create stock history
  if (!stock?.id) return;
  await createStockHistory({
    admin,
    pos,
    quantity,
    stock: stock.id,
    saler,
    action,
  });
}
