import { asc, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "../db";
import * as tables from "../schemas";
import { calculateSubTotal, getAmountPercentage } from "../utils";
import { WithID } from "./type";

/**
 * Creates a new order in the database.
 *
 * @param {tables.InsertOrders} orderData - The order details to be inserted.
 * @returns {Promise<tables.SelectOrders | undefined>} - A promise that resolves to the created order.
 */
export async function createOrder(
  orderData: tables.InsertOrders
): Promise<tables.SelectOrders | undefined> {
  const result = await db.insert(tables.orders).values(orderData).returning();
  return result[0];
}

/**
 * Retrieves a list of orders from the database.
 *
 * @returns {Promise<tables.SelectOrders[]>} A promise that resolves to an array of orders.
 *
 * @async
 */
export async function getOrders(): Promise<tables.SelectOrders[]> {
  return await db.select().from(tables.orders);
}

/**
 * Retrieves an order from the database based on the provided order ID.
 *
 * @param orderId - The unique identifier of the order to retrieve.
 * @returns A promise that resolves to an array of selected orders matching the given ID.
 *          The array will typically contain a single order if the ID is unique.
 */
export async function getOrder(
  orderId: string
): Promise<tables.SelectOrders[]> {
  return await db
    .select()
    .from(tables.orders)
    .where(eq(tables.orders.id, orderId));
}

/**
 * Updates an existing order in the database.
 *
 * @param {Partial<tables.InsertOrders> & WithID} orderData - The order details to be updated.
 * @returns {Promise<tables.SelectOrders[]>} - A promise that resolves to the updated order.
 */
export async function updateOrder(
  orderData: Partial<tables.InsertOrders> & WithID
): Promise<tables.SelectOrders[]> {
  const { id, ...values } = orderData;
  return await db
    .update(tables.orders)
    .set(values)
    .where(eq(tables.orders.id, id))
    .returning();
}

/**
 * Deletes an order from the database.
 *
 * @param {WithID} orderId - The ID of the order to be deleted.
 * @returns {Promise<tables.SelectOrders[]>} - A promise that resolves to the deleted order.
 */
export async function deleteOrder(
  orderId: string
): Promise<tables.SelectOrders[]> {
  return await db
    .delete(tables.orders)
    .where(eq(tables.orders.id, orderId))
    .returning();
}

/**
 * Places a new order and its details in the database.
 *
 * @param {object} orderData - The order and its details.
 * @param {object} orderData.order - The order information.
 * @param {object[]} orderData.orderDetails - The details of the order.
 * @returns {Promise<object>} - A promise that resolves to the created order and its details.
 */
export async function placeOrder(orderData: {
  order: { customerId: string; sellerId: string };
  orderDetails: {
    productId: string;
    unitPrice: number;
    quantity: number;
    commission: number;
  }[];
}): Promise<{
  order: tables.SelectOrders;
  orderDetails: tables.SelectOrderDetails[];
}> {
  const { order, orderDetails } = orderData;

  const totalAmount = calculateSubTotal(
    orderDetails,
    (detail) => detail.unitPrice * detail.quantity
  );
  const salesCommission = calculateSubTotal(
    orderDetails,
    (detail) =>
      getAmountPercentage(detail.commission, detail.unitPrice) * detail.quantity
  );

  const createdOrder = await createOrder({
    ...order,
    status: "PENDING",
    totalAmount,
    salesCommission,
  });
  const parsedOrderDetails: tables.InsertOrderDetails[] = orderDetails.map(
    (detail) => ({
      orderId: createdOrder!.id,
      productId: detail.productId,
      quantity: detail.quantity,
      unitPrice: detail.unitPrice,
    })
  );
  const createdOrderDetails = await createOrderDetails(parsedOrderDetails);

  return { order: createdOrder!, orderDetails: createdOrderDetails };
}

/**
 * Creates new order details in the database.
 *
 * @param {tables.InsertOrderDetails[]} orderDetails - The order details to be inserted.
 * @returns {Promise<tables.SelectOrderDetails[]>} - A promise that resolves to the created order details.
 */
export async function createOrderDetails(
  orderDetails: tables.InsertOrderDetails[]
): Promise<tables.SelectOrderDetails[]> {
  return await db.insert(tables.orderDetails).values(orderDetails).returning();
}

/**
 * Retrieves order details by order ID.
 *
 * @param {string} orderId - The ID of the order.
 * @returns {Promise<tables.SelectOrderDetails[]>} - A promise that resolves to the order details.
 */
export async function getOrderDetails(
  orderId: string
): Promise<tables.SelectOrderDetails[]> {
  return await db
    .select()
    .from(tables.orderDetails)
    .where(eq(tables.orderDetails.orderId, orderId));
}

/**
 * Updates an existing order detail in the database.
 *
 * @param {tables.InsertOrderDetails & WithID} orderDetailData - The order detail to be updated.
 * @returns {Promise<tables.SelectOrderDetails>} - A promise that resolves to the updated order detail.
 */
export async function updateOrderDetail(
  orderDetailData: tables.InsertOrderDetails & WithID
): Promise<tables.SelectOrderDetails> {
  const { id, ...values } = orderDetailData;
  const result = await db
    .update(tables.orderDetails)
    .set(values)
    .where(eq(tables.orderDetails.id, id))
    .returning();
  return result[0];
}

/**
 * Retrieves seller activities by seller ID.
 *
 * @param {string} sellerId - The ID of the seller.
 * @returns {Promise<unknown[]>} - A promise that resolves to the seller activities.
 */
export async function getSellerActivities(sellerId: string): Promise<
  {
    orderId: string;
    sellerId: string | null;
    totalAmount: number;
    createdAt: Date;
    totalCommission: number;
    productsCount: number;
    quantitySum: number;
    totalPrice: number;
  }[]
> {
  const result = await db
    .select({
      orderId: tables.orders.id,
      sellerId: tables.orders.sellerId,
      totalAmount: tables.orders.totalAmount,
      createdAt: tables.orders.createdAt,
      totalCommission: tables.orders.salesCommission,
      productsCount: sql<number>`cast(count(${tables.orderDetails.productId}) as int)`,
      quantitySum: sql<number>`cast(sum(${tables.orderDetails.quantity}) as int)`,
      totalPrice: sql<number>`sum(${tables.orderDetails.quantity} * ${tables.orderDetails.unitPrice})`,
    })
    .from(tables.orders)
    .where(eq(tables.orders.sellerId, sellerId))
    .leftJoin(
      tables.orderDetails,
      eq(tables.orders.id, tables.orderDetails.orderId)
    )
    .groupBy(tables.orders.id)
    .orderBy(asc(tables.orders.id));

  console.log("Result....", result);
  return result;
}

// Stock Management

/**
 * Creates a new stock entry in the database.
 *
 * @param {tables.InsertStock} stockData - The stock details to be inserted.
 * @returns {Promise<tables.SelectStock | undefined>} - A promise that resolves to the created stock.
 */
export async function createStock(
  stockData: tables.InsertStock
): Promise<tables.SelectStock | undefined> {
  const result = await db.insert(tables.stocks).values(stockData).returning();
  return result[0];
}

/**
 * Updates an existing stock entry in the database.
 *
 * @param {tables.InsertStock & WithID} stockData - The stock details to be updated.
 * @returns {Promise<tables.SelectStock>} - A promise that resolves to the updated stock.
 */
export async function updateStock(
  stockData: tables.InsertStock & WithID
): Promise<tables.SelectStock> {
  const { id, ...values } = stockData;
  const result = await db
    .update(tables.stocks)
    .set(values)
    .where(eq(tables.stocks.id, id))
    .returning();
  return result[0];
}

/**
 * Deletes a stock entry from the database.
 *
 * @param {WithID} stockId - The ID of the stock to be deleted.
 * @returns {Promise<tables.SelectStock[]>} - A promise that resolves to the deleted stock.
 */
export async function deleteStock(
  stockId: WithID
): Promise<tables.SelectStock[]> {
  return await db
    .delete(tables.stocks)
    .where(eq(tables.stocks.id, stockId.id))
    .returning();
}

/**
 * Retrieves all stocks from the database.
 *
 * @returns {Promise<unknown[]>} - A promise that resolves to the list of stocks.
 */
export async function getStocks(): Promise<unknown[]> {
  return await db
    .select({
      ...getTableColumns(tables.stocks),
      productName: tables.products.name,
      productId: tables.products.id,
    })
    .from(tables.stocks)
    .leftJoin(tables.products, eq(tables.products.id, tables.stocks.productId))
    .orderBy(desc(tables.stocks.createdAt));
}

export async function getStocksOfSeller(sellerId: string): Promise<unknown[]> {
  return await db
    .select({
      ...getTableColumns(tables.stocks),
      productName: tables.products.name,
      productId: tables.products.id,
    })
    .from(tables.stocks)
    .leftJoin(tables.products, eq(tables.products.id, tables.stocks.productId))
    .orderBy(desc(tables.stocks.createdAt))
    .where(eq(tables.stocks.sellerId, sellerId));
}

/**
 * Retrieves a stock entry by its ID.
 *
 * @param {string} stockId - The ID of the stock.
 * @returns {Promise<unknown>} - A promise that resolves to the stock entry.
 */
export async function getStock(stockId: string): Promise<unknown> {
  const result = await db
    .select()
    .from(tables.stocks)
    .leftJoin(tables.products, eq(tables.products.id, tables.stocks.productId))
    .where(eq(tables.stocks.id, stockId));
  return result[0];
}

/**
 * Retrieves a stock entry by product ID.
 *
 * @param {string} productId - The ID of the product.
 * @returns {Promise<tables.SelectStock | undefined>} - A promise that resolves to the stock entry.
 */
export async function getStockByProduct(
  productId: string
): Promise<tables.SelectStock | undefined> {
  const result = await db
    .select()
    .from(tables.stocks)
    .where(eq(tables.stocks.productId, productId));
  return result[0];
}

// Stock History Management

/**
 * Creates a new stock history entry in the database.
 *
 * @param {tables.InsertStockHistory} stockHistoryData - The stock history details to be inserted.
 * @returns {Promise<tables.SelectStockHistory | undefined>} - A promise that resolves to the created stock history.
 */
export async function createStockHistory(
  stockHistoryData: tables.InsertStockHistory
): Promise<tables.SelectStockHistory | undefined> {
  const result = await db
    .insert(tables.stockHistories)
    .values(stockHistoryData)
    .returning();
  return result[0];
}

/**
 * Updates an existing stock history entry in the database.
 *
 * @param {tables.InsertStockHistory & WithID} stockHistoryData - The stock history details to be updated.
 * @returns {Promise<tables.SelectStockHistory>} - A promise that resolves to the updated stock history.
 */
export async function updateStockHistory(
  stockHistoryData: tables.InsertStockHistory & WithID
): Promise<tables.SelectStockHistory> {
  const { id, ...values } = stockHistoryData;
  const result = await db
    .update(tables.stockHistories)
    .set(values)
    .where(eq(tables.stockHistories.id, id))
    .returning();
  return result[0];
}

/**
 * Deletes a stock history entry from the database.
 *
 * @param {WithID} stockHistoryId - The ID of the stock history to be deleted.
 * @returns {Promise<tables.SelectStockHistory[]>} - A promise that resolves to the deleted stock history.
 */
export async function deleteStockHistory(
  stockHistoryId: WithID
): Promise<tables.SelectStockHistory[]> {
  return await db
    .delete(tables.stockHistories)
    .where(eq(tables.stockHistories.id, stockHistoryId.id))
    .returning();
}

/**
 * Retrieves all stock histories from the database.
 *
 * @returns {Promise<tables.SelectStockHistory[]>} - A promise that resolves to the list of stock histories.
 */
export async function getStockHistories(): Promise<
  tables.SelectStockHistory[]
> {
  return await db
    .select()
    .from(tables.stockHistories)
    .orderBy(desc(tables.stockHistories.createdAt));
}

/**
 * Retrieves all stock histories from the database of specifique seller.
 *
 * @returns {Promise<tables.SelectStockHistory[]>} - A promise that resolves to the list of stock histories.
 */
export async function getStockHistoriesOfSeller(
  sellerId: string
): Promise<tables.SelectStockHistory[]> {
  return await db
    .select()
    .from(tables.stockHistories)
    .where(eq(tables.stockHistories.sellerId, sellerId))
    .orderBy(desc(tables.stockHistories.createdAt));
}

/**
 * Retrieves a stock history entry by its ID.
 *
 * @param {string} stockHistoryId - The ID of the stock history.
 * @returns {Promise<tables.SelectStockHistory>} - A promise that resolves to the stock history entry.
 */
export async function getStockHistory(
  stockHistoryId: string
): Promise<tables.SelectStockHistory> {
  const result = await db
    .select()
    .from(tables.stockHistories)
    .where(eq(tables.stockHistories.id, stockHistoryId));
  return result[0];
}

/**
 * Replenishes the stock by either adding or subtracting the specified quantity.
 * If the stock for the product does not exist and the action is "ADD", it creates a new stock entry.
 * If the stock exists, it updates the quantity based on the action.
 * It also creates a stock history entry for the operation.
 *
 * @param {object} stockData - The stock data for replenishment.
 * @param {string} stockData.adminId - The admin performing the action.
 * @param {string} stockData.sellerId - The seller associated with the stock.
 * @param {string} stockData.posId - The point of sale identifier.
 * @param {string} stockData.productId - The product identifier.
 * @param {string} stockData.action - The action to perform, either "ADD" or "SUB".
 * @param {number} stockData.quantity - The quantity to add or subtract.
 * @throws Will throw an error if the action is "SUB" and the stock does not exist.
 * @throws Will throw an error if the resulting quantity is negative.
 */
export async function replenishStock(stockData: {
  adminId: string;
  sellerId: string;
  posId: string;
  action: "ADD" | "REMOVE";
  productId: string;
  quantity: number;
}): Promise<tables.SelectStock | undefined> {
  const { adminId, sellerId, posId, action, productId, quantity } = stockData;

  let stock = await getStockByProduct(productId);
  if (!stock) {
    if (action === "REMOVE") {
      throw new Error("Cannot perform the operation, stock is zero");
    }
    stock = await createStock({ productId, sellerId, quantity });
  } else {
    const newQuantity =
      action === "REMOVE"
        ? stock.quantity - quantity
        : stock.quantity + quantity;
    if (newQuantity < 0) {
      throw new Error("Quantity cannot be negative");
    }
    stock = await updateStock({
      id: stock.id,
      quantity: newQuantity,
      productId,
      sellerId,
    });
  }

  if (!stock?.id) return;
  await createStockHistory({
    adminId,
    posId,
    quantity,
    stockId: stock.id,
    sellerId,
    action,
  });

  return stock;
}
