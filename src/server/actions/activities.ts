"use server";
import { actionClient } from "./base";
import * as queries from "../db/queries";
import * as schemas from "@/lib/schemas/activities";
import { z } from "zod";
import { revalidatePath } from "next/cache";

/**
 * Places an order by processing the provided customer, seller, and order details.
 *
 * @remarks
 * This function uses a schema to validate the input data before executing the action.
 * It merges the `OrderSchemas` with an additional `sellerId` field to ensure all
 * required fields are present and valid.
 *
 * @param parsedInput - The parsed input object containing the following properties:
 *   @property customerId - The ID of the customer placing the order.
 *   @property sellerId - The ID of the seller associated with the order.
 *   @property orderDetails - The details of the order being placed.
 *
 * @returns A promise that resolves to the result of the `placeOrder` query command.
 *
 * @throws Will throw an error if the input validation fails or if the query execution encounters an issue.
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
    const command = await queries.placeOrder({
      order: {
        customerId,
        sellerId,
      },
      orderDetails,
    });
    return command;
  });

export const getSellerActivities = actionClient
  .schema(
    z.object({
      sellerId: z.string().nonempty(),
    })
  )
  .action(
    async ({ parsedInput: { sellerId } }) =>
      await queries.getSellerActivities(sellerId)
  );

export const getOrder = actionClient
  .schema(z.object({ id: z.string().nonempty() }))
  .action(async ({ parsedInput: { id } }) => {
    const [order, orderDetails] = await Promise.all([
      queries.getOrder(id),
      queries.getOrderDetails(id as string),
    ]);

    return { ...order, orderDetails };
  });

//
export const getStocksOfsellerr = actionClient
  .schema(
    z.object({
      sellerId: z.string().nonempty(),
    })
  )
  .action(async ({ parsedInput: { sellerId } }) => {
    return await queries.getStocksOfSeller(sellerId);
  });

export const changeStock = actionClient
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

export const getStockHistories = actionClient
  .schema(
    z.object({
      sellerId: z.string().nonempty(),
    })
  )
  .action(async () => {
    return await queries.getStockHistories();
  });

// Point of sellers

export const getPointOfSales = actionClient
  .schema(z.object({}))
  .action(async () => {
    return await queries.getPointOfSales();
  });

export const createPointOfSeller = actionClient
  .schema(schemas.PointOfSaleSchemas)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.createPointOfSale(values);
    revalidatePath("/");
    return data;
  });

/**
 * Updates a Point of Sale (POS) entry in the system.
 *
 * This function uses a schema to validate the input, ensuring that the `id` field
 * is a non-empty string. It then performs the update operation using the provided
 * `queries.updatePointOfSale` function and revalidates the root path to reflect
 * the changes.
 *
 * @async
 * @function
 * @param {Object} parsedInput - The parsed input values from the schema.
 * @param {string} parsedInput.id - The unique identifier of the Point of Sale to update.
 * @returns {Promise<any>} The updated Point of Sale data.
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

// customers
export const getCustomers = actionClient
  .schema(z.object({}))
  .action(async ({ parsedInput: {} }) => {
    return await queries.getCustomers();
  });

export const createClient = actionClient
  .schema(schemas.CustomerSchemas)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.createCustomer(values);
    revalidatePath("/");
    return data;
  });

export const updateCustomer = actionClient
  .schema(
    schemas.CustomerSchemas.merge(z.object({ id: z.string().nonempty() }))
  )
  .action(async ({ parsedInput: values }) => {
    const data = await queries.updateCustomer(values);
    revalidatePath("/");
    return data;
  });

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
