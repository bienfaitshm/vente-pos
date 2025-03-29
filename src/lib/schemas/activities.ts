import { z } from "zod";
import { IDSchemas, NoEmptyStringSchemas } from "./base";

/**
 * Schema definition for stock-related activities.
 *
 * This schema validates the structure of stock activity objects, ensuring
 * that they conform to the expected format and constraints.
 *
 * Properties:
 * - `action`: Specifies the type of stock action. It can either be "REMOVE" or "ADD".
 *   Defaults to "ADD".
 * - `quantity`: The quantity of stock involved in the action. Must be a number
 *   with a minimum value of -1.
 * - `productId`: The unique identifier for the product involved in the stock action.
 *   Validated using the `IDSchemas` schema.
 * - `posId`: The unique identifier for the point of sale (POS) where the stock
 *   action is taking place. Validated using the `IDSchemas` schema.
 * - `sellerId`: The unique identifier for the seller performing the stock action.
 *   Validated using the `IDSchemas` schema.
 */
export const StockSchemas = z.object({
  action: z.enum(["REMOVE", "ADD"]).default("ADD"),
  quantity: z.coerce.number().min(-1),
  productId: IDSchemas,
  posId: IDSchemas,
  sellerId: IDSchemas,
});

export type Stock = z.infer<typeof StockSchemas>;

/**
 * Schema definition for a customer object.
 *
 * This schema validates the structure of a customer object, ensuring that:
 * - `name` is a non-empty string (validated by `NoEmptyStringSchemas`).
 * - `phoneNumber` is an optional string.
 * - `address` is an optional string.
 *
 * @constant
 */
export const CustomerSchemas = z.object({
  name: NoEmptyStringSchemas,
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

/**
 * Type for Customer
 */
export type Customer = z.infer<typeof CustomerSchemas>;

export const DetailOrderInputSchemas = z.object({
  quantity: z.coerce.number().min(1),
  productId: IDSchemas,
});

export type DetailOrderInput = z.infer<typeof DetailOrderInputSchemas>;

/**
 * Schema for Command Item
 */
export const DetailOrderSchemas = DetailOrderInputSchemas.merge(
  z.object({
    productName: z.string().nonempty(),
    unitPrice: z.coerce.number(),
    commission: z.coerce.number(),
  })
);

/**
 * Type for Command Item
 */
export type DetailOrder = z.infer<typeof DetailOrderSchemas>;

/**
 * Represents the schema for an order.
 *
 * This schema validates the structure of an order object, including the customer ID,
 * order details, and the saler ID. It ensures that the order contains at least one
 * product and that no duplicate products are allowed.
 */
export const OrderSchemas = z.object({
  /**
   * The ID of the customer placing the order.
   *
   * This field is validated using the `IDSchemas` schema.
   */
  customerId: z.string().optional(),

  /**
   * An array of order details.
   *
   * - Must contain at least one product.
   * - Ensures that no duplicate products (based on `productId`) are present.
   *
   * If duplicate products are detected, a custom validation error with the message
   * "Produit dupliqué non autorisé." will be raised.
   */
  orderDetails: z
    .array(DetailOrderSchemas)
    .min(1, { message: "Minimum de produit requis" })
    .superRefine((val, ctx) => {
      if (val.length !== new Set(val.map((item) => item.productId)).size) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Produit dupliqué non autorisé.",
        });
      }
    }),
});

/**
 * Type for Order
 */
export type Order = z.infer<typeof OrderSchemas>;

/**
 * Schema for Point of Sale
 */
export const PointOfSaleSchemas = z.object({
  name: NoEmptyStringSchemas,
  description: z.string().optional(),
  address: NoEmptyStringSchemas,
  phoneNumber: NoEmptyStringSchemas,
  status: z.enum(["OPEN", "CLOSE", "RENOVATION"]),
});

/**
 * Type for Point of Sale
 */
export type PointOfSale = z.infer<typeof PointOfSaleSchemas>;
