"use server";
import { EmptyObjet, IdObjectSchems, InvoiceSchemas } from "@/lib/schemas";
import { actionClient } from "./base";
import { sumSubTotal } from "@/lib/utils";
import { createCommandItems, createCommandProduct } from "../db/queries";
import * as queries from "../db/queries";

export const commandProduct = actionClient
  .schema(InvoiceSchemas)
  .action(async ({ parsedInput: { client, items, saler } }) => {
    console.log({ client, items, saler });
    // 1. get amount
    const amount: number = sumSubTotal(
      items,
      (item) => item.product.price * item.quantity
    );
    //2. create command
    const command = await createCommandProduct({
      amount,
      client: client?.id as number,
      isConfirmed: true,
      seller: saler as string,
    });
    //3. create command items
    const invoiceItems = await createCommandItems(
      items.map((item) => ({
        amount: item.quantity * item.product.price,
        command: command?.id as number,
        product: item.product.id as number,
        quantity: item.quantity,
      }))
    );

    return { command, items: invoiceItems };
  });

export const getInvoices = actionClient
  .schema(EmptyObjet)
  .action(async () => {});

export const getInvoice = actionClient
  .schema(IdObjectSchems)
  .action(async ({ parsedInput: { id } }) => {
    const [command, items] = await Promise.all([
      queries.getCommandProduct(id),
      queries.getCommandItems(id as number),
    ]);

    return { ...command, items };
  });
