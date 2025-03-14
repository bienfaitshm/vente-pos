import { z } from "zod";
import { IDSchemas, NoEmptyStringSchemas } from "./base";

/**
 * Schema for Category
 */
export const CategorySchemas = z.object({
  name: NoEmptyStringSchemas,
  description: z.string().optional(),
});

/**
 * Type for Category
 */
export type Category = z.infer<typeof CategorySchemas>;

/**
 * Schema for Product
 */
export const ProductSchemas = z.object({
  name: NoEmptyStringSchemas,
  categoryId: IDSchemas,
  description: z.string().optional(),
  quantity: z.coerce.number().min(0),
  unitPrice: z.coerce.number().min(0),
  commission: z.coerce.number(),
});

/**
 * Type for Product
 */
export type Product = z.infer<typeof ProductSchemas>;
