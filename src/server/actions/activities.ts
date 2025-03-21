"use server";
import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "./base";
import * as queries from "../db/queries";
import * as schemas from "@/lib/schemas/activities";
import { z } from "zod";
import { revalidatePath } from "next/cache";

type ValidatationErrors = { [key: string]: { _errors: string[] } };

/**
 * Places an order for a customer with the specified seller and order details.
 */
export const placeOrder = actionClient
  .schema(
    schemas.OrderSchemas.merge(
      z.object({
        sellerId: z.string().nonempty(),
      })
    )
  )
  .action(async ({ parsedInput: { customerId, sellerId, orderDetails } }) => {
    /**
     * Validates order details against the seller's stock, updates stock quantities, 
     * and places an order if validation passes.
     *
     * @param sellerId - The ID of the seller.
     * @param orderDetails - Array of order details containing productId, productName, and quantity.
     * @returns The placed order object.
     * @throws Validation errors if stock is insufficient or missing for any product.
     */
    const errors: ValidatationErrors = {};
    const stocks = await queries.getStocksOfSeller(sellerId);

    // Prepare a list for bulk stock updates
    const stockBulkUpdate: { quantity: number; id: string }[] = [];

    // Validate each order detail against the seller's stock
    orderDetails.forEach(({ productId, productName, quantity }, idx) => {
      const stock = stocks.find((s) => s.productId === productId);
      const _errors: string[] = [];

      if (!stock) {
      _errors.push(`Stock not found for product: ${productName}`);
      } else if (stock.quantity < quantity) {
      _errors.push(`Insufficient stock for product: ${productName}`);
      }

      if (_errors.length > 0) {
      errors[`orderDetails.${idx}`] = { _errors };
      }

      if (stock) {
      // Prepare stock update if validation passes
      stockBulkUpdate.push({ quantity: stock.quantity - quantity, id: stock.id });
      }
    });

    // If there are validation errors, return them and stop execution
    if (Object.keys(errors).length > 0) {
      returnValidationErrors(schemas.OrderSchemas, errors);
    }

    // Place the order and update stock in bulk
    const order = await queries.placeOrder({
      order: { customerId, sellerId },
      orderDetails,
    });

    await queries.bulkUpdateStock(stockBulkUpdate);

    return order;
  });

/**
 * Retrieves an order and its details by ID.
 */
export const getOrder = actionClient
  .schema(z.object({ id: z.string().nonempty() }))
  .action(async ({ parsedInput: { id } }) => {
    const [order, orderDetails] = await Promise.all([
      queries.getOrder(id),
      queries.getOrderDetails(id),
    ]);
    return { ...order, orderDetails };
  });


/**
 * Retrieves an order along with its detailed information based on the provided order ID.
 *
 * @remarks
 * This function uses a schema to validate the input, ensuring that the `orderId` is a non-empty string.
 * It then calls the `queries.getOrderWithDetails` function to fetch the order details from the database.
 *
 * @param parsedInput - An object containing the `orderId` as a string.
 * @returns A promise that resolves to the detailed information of the specified order.
 *
 * @throws Will throw an error if the `orderId` is invalid or if the query fails.
 */
export const getOrderWithDetails = actionClient.schema(z.object({
  orderId: z.string().nonempty()
})).action(async({parsedInput:{orderId}})=>{
  return await queries.getOrderWithDetails(orderId)
})

/**
 * Retrieves all orders for a specific ID.
 */
export const getOrders = actionClient
  .schema(z.object({ id: z.string().nonempty() }))
  .action(async ({ parsedInput: { id } }) => {
    const [order, orderDetails] = await Promise.all([
      queries.getOrder(id),
      queries.getOrderDetails(id),
    ]);
    return { ...order, orderDetails };
  });

/**
 * Deletes an order by ID.
 */
export const deleteOrder = actionClient
  .schema(z.object({ id: z.string().nonempty() }))
  .action(async ({ parsedInput: { id } }) => {
    return await queries.deleteOrder(id);
  });

/**
 * Updates an order with new details.
 */
export const updateOrder = actionClient
  .schema(
    schemas.OrderSchemas.merge(
      z.object({
        id: z.string().nonempty(),
      })
    )
  )
  .action(async ({ parsedInput: value }) => {
    return await queries.updateOrder(value);
  });

/**
 * Retrieves activities for a specific seller.
 */
export const getSellerActivities = actionClient
  .schema(
    z.object({
      sellerId: z.string().nonempty(),
    })
  )
  .action(async ({ parsedInput: { sellerId } }) => {
    return await queries.getSellerActivities(sellerId);
  });

/**
 * Retrieves stocks for a specific seller.
 */
export const getStocksOfSeller = actionClient
  .schema(
    z.object({
      sellerId: z.string().nonempty(),
    })
  )
  .action(async ({ parsedInput: { sellerId } }) => {
    return await queries.getStocksOfSeller(sellerId);
  });

/**
 * Replenishes stock for a seller by an admin.
 */
export const replenishStock = actionClient
  .schema(
    schemas.StockSchemas.merge(
      z.object({
        adminId: z.string().nonempty(),
      })
    )
  )
  .action(async ({ parsedInput: values }) => {
    const stock = await queries.replenishStock(values);
    revalidatePath("");
    return stock;
  });

/**
 * Retrieves stock histories for a seller.
 */
export const getStockHistories = actionClient
  .schema(
    z.object({
      
    })
  )
  .action(async () => {
    return await queries.getStockHistories();
  });

  export const getStockHistoriesOfSeller = actionClient
  .schema(
    z.object({
      sellerId: z.string().nonempty(),
    })
  )
  .action(async ({parsedInput: {sellerId}}) => {
    return await queries.getStockHistoriesOfSeller(sellerId);
  });

/**
 * Retrieves all points of sale.
 */
export const getPointOfSales = actionClient
  .schema(z.object({}))
  .action(async () => {
    return await queries.getPointOfSales();
  });

/**
 * Creates a new point of sale.
 */
export const createPointOfSeller = actionClient
  .schema(schemas.PointOfSaleSchemas)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.createPointOfSale(values);
    revalidatePath("/");
    return data;
  });

/**
 * Updates an existing point of sale.
 */
export const updatePointOfSale = actionClient
  .schema(
    schemas.PointOfSaleSchemas.merge(
      z.object({
        id: z.string().nonempty(),
      })
    )
  )
  .action(async ({ parsedInput: values }) => {
    const data = await queries.updatePointOfSale(values);
    revalidatePath("/");
    return data;
  });

/**
 * Deletes a point of sale by ID.
 */
export const deletePointOfSale = actionClient
  .schema(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .action(async ({ parsedInput: values }) => {
    const data = await queries.deletePointOfSale(values);
    revalidatePath("/");
    return data;
  });

/**
 * Retrieves all customers.
 */
export const getCustomers = actionClient
  .schema(z.object({}))
  .action(async () => {
    return await queries.getCustomers();
  });

/**
 * Creates a new customer.
 */
export const createCustomer = actionClient
  .schema(schemas.CustomerSchemas)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.createCustomer(values);
    revalidatePath("/");
    return data;
  });

/**
 * Updates an existing customer.
 */
export const updateCustomer = actionClient
  .schema(
    schemas.CustomerSchemas.merge(z.object({ id: z.string().nonempty() }))
  )
  .action(async ({ parsedInput: values }) => {
    const data = await queries.updateCustomer(values);
    revalidatePath("/");
    return data;
  });

/**
 * Deletes a customer by ID.
 */
export const deleteCustomer = actionClient
  .schema(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .action(async ({ parsedInput: values }) => {
    const data = await queries.deleteCustomer(values);
    revalidatePath("/");
    return data;
  });
