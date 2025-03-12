"use server";
import { EmptyObjet, IdObjectSchems, InvoiceSchemas } from "@/lib/schemas";
import { actionClient } from "./base";
import * as queries from "../db/queries";
import * as schemas from "@/lib/schemas/activities";
import { auth } from "@/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

/**
 * Executes the command to process a product order.
 *
 * @param parsedInput - The input parameters for the action.
 * @param parsedInput.client - The client placing the order.
 * @param parsedInput.items - The list of items being ordered.
 * @param parsedInput.saler - The salesperson handling the order.
 * @returns The result of the command to process the product order.
 */
export const commandProduct = actionClient
  .schema(InvoiceSchemas)
  .action(async ({ parsedInput: { client, items, saler } }) => {
    const command = await queries.passCommandProduct(
      {
        client: client?.id as string,
        saler,
      },
      items.map((item) => ({
        commission: item.product.commission,
        price: item.product.price,
        product: item.product.id,
        quantity: item.quantity,
      }))
    );
    return command;
  });

export const getInvoices = actionClient
  .schema(EmptyObjet)
  .action(async () => {});

export const getInvoice = actionClient
  .schema(IdObjectSchems)
  .action(async ({ parsedInput: { id } }) => {
    const [command, items] = await Promise.all([
      queries.getCommandProduct(id),
      queries.getCommandItems(id as string),
    ]);

    return { ...command, items };
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
  .schema(schemas.StockSchemas)
  .action(async ({ parsedInput }) => {
    const session = await auth();
    if (session?.user.id) {
      console.log({
        admin: session?.user.id,
        ...parsedInput,
      });
      const stock = await queries.replenishingTheStock({
        admin: session.user.id,
        ...parsedInput,
      });
      revalidatePath("");
      return stock;
    }
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
