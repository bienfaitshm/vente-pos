"use server";
import { InvoiceSchemas } from "@/lib/schemas";
import { actionClient } from "./base";

export const commandProduct = actionClient
  .schema(InvoiceSchemas)
  .action(async ({ parsedInput: { client, items, saler } }) => {
    console.log({ client, items, saler });
  });
