import { z } from "zod";
import { IDSchemas, NoEmptyStringSchemas, WithIdSchemas } from "./base";

/**
 * Schema for Category
 */
export const CategorySchemas = z.object({
  name: NoEmptyStringSchemas,
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
  category: IDSchemas,
  quantity: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  commission: z.coerce.number(),
});

/**
 * Type for Product
 */
export type Product = z.infer<typeof ProductSchemas>;

/**
 * Schema for Product Quantity
 */
export const ProductQuantitySchemas = z.object({
  product: ProductSchemas,
  quantity: z.coerce.number().min(0),
  reason: NoEmptyStringSchemas.optional(),
});

/**
 * Type for Product Quantity
 */
export type ProductQuantity = z.infer<typeof ProductQuantitySchemas>;

/**
 * Schema for Point of Sale
 */
export const PointOfSaleSchemas = z.object({
  name: NoEmptyStringSchemas,
  description: z.string().optional(),
  address: NoEmptyStringSchemas,
  phoneNumber: NoEmptyStringSchemas,
  statut: z.enum(["OPEN", "CLOSE", "RENOVATION"]),
});

/**
 * Type for Point of Sale
 */
export type PointOfSale = z.infer<typeof PointOfSaleSchemas>;

/**
 * Schema for Client
 */
export const ClientSchemas = z.object({
  name: NoEmptyStringSchemas,
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

/**
 * Type for Client
 */
export type Client = z.infer<typeof ClientSchemas>;

/**
 * Schema for Command Item
 */
export const CommandItemSchemas = z.object({
  quantity: z.coerce.number().min(1),
  product: z.object({
    id: IDSchemas,
    name: NoEmptyStringSchemas,
    category: IDSchemas,
    price: z.coerce.number(),
  }),
});

/**
 * Type for Command Item
 */
export type CommandItem = z.infer<typeof CommandItemSchemas>;

/**
 * Schema for Invoice
 */
export const InvoiceSchemas = z
  .object({
    client: ClientSchemas.merge(WithIdSchemas).nullable(),
    items: z
      .array(CommandItemSchemas)
      .min(1, { message: "Minimum de produit requis" })
      .superRefine((val, ctx) => {
        if (val.length !== new Set(val.map((item) => item.product?.id)).size) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Produit dupliqué non autorisé.",
          });
        }
      }),
    saler: IDSchemas,
  })
  .refine((schema) => schema.client !== null, {
    message: "Veiller ajouter le client",
    path: ["client"],
  });

/**
 * Type for Invoice
 */
export type Invoice = z.infer<typeof InvoiceSchemas>;

/**
 * Schema for Items Select
 */
export const ItemsSelectSchemas = z.object({
  items: z.array(CommandItemSchemas).min(1),
});

/**
 * Type for Items Select
 */
export type ItemsSelect = z.infer<typeof ItemsSelectSchemas>;
