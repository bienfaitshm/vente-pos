import {
  pgTable,
  text,
  integer,
  varchar,
  doublePrecision,
  pgEnum,
} from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm";
import { commonFieldTable } from "./base";
import { users } from "./accounts";
import { products } from "./products";

export const StockHistoryActionEnum = pgEnum("stock_action", ["ADD", "REMOVE"]);
export const OrderStatusEnum = pgEnum("order_status", [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "COMPLETED",
]);

export const PointOfSaleStatusEnum = pgEnum("pos_status", [
  "OPEN",
  "CLOSE",
  "RENOVATION",
]);

export const customers = pgTable("customers", {
  ...commonFieldTable,
  name: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }),
  email: varchar({ length: 255 }),
  phoneNumber: varchar({ length: 255 }),
});

export type InsertCustomer = typeof customers.$inferInsert;
export type SelectCustomer = typeof customers.$inferSelect;

export const orders = pgTable("orders", {
  ...commonFieldTable,
  customerId: varchar("customer_id", { length: 15 })
    .references(() => customers.id),
  sellerId: varchar("seller_id", { length: 15 }).references(() => users.id, {
    onDelete: "set null",
  }),
  totalAmount: doublePrecision("total_amount").notNull(),
  salesCommission: doublePrecision("sales_commission").notNull(),
  status: OrderStatusEnum().notNull(),
});

export type InsertOrders = typeof orders.$inferInsert;
export type SelectOrders = typeof orders.$inferSelect;

export const orderDetails = pgTable("order_details", {
  ...commonFieldTable,
  orderId: varchar("order_id", { length: 15 })
    .references(() => orders.id)
    .notNull(),
  productId: varchar("product_id", { length: 15 })
    .references(() => products.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: doublePrecision("unit_price").notNull(),
});

export type InsertOrderDetails = typeof orderDetails.$inferInsert;
export type SelectOrderDetails = typeof orderDetails.$inferSelect;

export const pointOfSales = pgTable("point_of_sales", {
  ...commonFieldTable,
  name: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 255 }).notNull(),
  description: text(),
  status: PointOfSaleStatusEnum().notNull(),
});

export type InsertPointOfSale = typeof pointOfSales.$inferInsert;
export type SelectPointOfSale = typeof pointOfSales.$inferSelect;

// Stock
export const stocks = pgTable("stocks", {
  ...commonFieldTable,
  quantity: integer().notNull(),
  sellerId: varchar("seller_id", { length: 15 }).references(() => users.id),
  productId: varchar("products_id", { length: 10 })
    .notNull()
    .references(() => products.id),
});

export type InsertStock = typeof stocks.$inferInsert;
export type SelectStock = typeof stocks.$inferSelect;

// StockHistory
export const stockHistories = pgTable("stock_histories", {
  ...commonFieldTable,
  quantity: integer().notNull(),
  action: StockHistoryActionEnum().notNull(),
  stockId: varchar("stock_id")
    .notNull()
    .references(() => stocks.id),
  sellerId: text("seller_id")
    .notNull()
    .references(() => users.id),
  adminId: text("admin_id")
    .notNull()
    .references(() => users.id),
  posId: varchar("pos_id", { length: 10 })
    .notNull()
    .references(() => pointOfSales.id),
});

export type InsertStockHistory = typeof stockHistories.$inferInsert;
export type SelectStockHistory = typeof stockHistories.$inferSelect;
