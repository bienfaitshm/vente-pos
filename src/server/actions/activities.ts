"use server";
import { EmptyObjet, IdObjectSchems, InvoiceSchemas } from "@/lib/schemas";
import { actionClient } from "./base";
import { sumSubTotal } from "@/lib/utils";
import * as queries from "../db/queries";

export const commandProduct = actionClient
  .schema(InvoiceSchemas)
  .action(async ({ parsedInput: { client, items, saler } }) => {
    // 1. get amount
    const amount: number = sumSubTotal(
      items,
      (item) => item.product.price * item.quantity
    );
    //2. create command
    const command = await queries.createCommandProduct({
      amount,
      client: client?.id as string,
      isConfirmed: true,
      seller: saler as string,
    });
    //3. create command items
    const invoiceItems = await queries.createCommandItems(
      items.map((item) => ({
        amount: item.quantity * item.product.price,
        command: command?.id as string,
        product: item.product.id as string,
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
      queries.getCommandItems(id as string),
    ]);

    return { ...command, items };
  });
