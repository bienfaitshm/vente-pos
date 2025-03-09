import { z } from "zod";
import { IDSchemas } from "./base";

export const StockSchemas = z.object({
  action: z.enum(["SUB", "ADD"]).default("ADD"),
  quantity: z.coerce.number().min(-1),
  product: IDSchemas,
  pos: IDSchemas,
  saler: IDSchemas,
});

export type Stock = z.infer<typeof StockSchemas>;
