"use server";

import { actionClient } from "./base";
import * as queries from "../db/queries";
import * as schemas from "@/lib/schemas/activities";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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
    return await queries.placeOrder({
      order: { customerId, sellerId },
      orderDetails,
    });
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
      sellerId: z.string().nonempty(),
    })
  )
  .action(async () => {
    return await queries.getStockHistories();
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
