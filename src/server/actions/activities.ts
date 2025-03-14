"use server";
import { actionClient } from "./base";
import * as queries from "../db/queries";
import * as schemas from "@/lib/schemas/activities";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const commandProduct = actionClient
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
export const getStocksOfSaler = actionClient
  .schema(
    z.object({
      saler: z.string().nonempty(),
    })
  )
  .action(async () => {
    return await queries.getStocks();
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
      saler: z.string().nonempty(),
    })
  )
  .action(async () => {
    return await queries.getStockHistories();
  });

// Point of sales

export const getPointOfSales = actionClient
  .schema(z.object({}))
  .action(async ({ parsedInput: {} }) => {
    return await queries.getPointOfSales();
  });

export const createPointOfSale = actionClient
  .schema(schemas.PointOfSaleSchemas)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.createPointOfSale(values);
    revalidatePath("/");
    return data;
  });

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
