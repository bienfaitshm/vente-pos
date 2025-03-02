"use server";
import { InvoiceSchemas } from "@/lib/schemas";
import { actionClient } from "./base";
import { sumSubTotal } from "@/lib/utils";
import { createCommandItems, createCommandProduct } from "../db/queries";

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
