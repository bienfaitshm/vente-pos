import {
  boolean,
  pgTable,
  text,
  integer,
  varchar,
  doublePrecision,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { commonFieldTable } from "./base";
import { users } from "./accounts";
import { Product } from "./products";

export const PointOfSaleStatutEnum = pgEnum("statut", [
  "OPEN",
  "CLOSE",
  "RENOVATION",
]);

export const Client = pgTable("client", {
  ...commonFieldTable,
  name: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }),
  email: varchar({ length: 255 }),
  phoneNumber: varchar({ length: 255 }),
});

export type InsertClient = typeof Client.$inferInsert;
export type SelectClient = typeof Client.$inferSelect;

//

//
export const CommandProduct = pgTable("command_product", {
  ...commonFieldTable,
  amount: doublePrecision().notNull(),
  isConfirmed: boolean("is_confirmed").$default(() => false),
  client: varchar("client_id", { length: 10 })
    .references(() => Client.id, { onDelete: "cascade" })
    .notNull(),
  seller: text("seller_id").references(() => users.id, {
    onDelete: "set null",
  }),
});

export type InsertCommandProduct = typeof CommandProduct.$inferInsert;
export type SelectCommandProduct = typeof CommandProduct.$inferSelect;

//
export const CommandItem = pgTable("command_item", {
  amount: doublePrecision().notNull(),
  quantity: integer().notNull(),
  product: varchar("product_id", { length: 10 })
    .references(() => Product.id)
    .notNull(),
  commandProduct: varchar("command_id").references(() => CommandProduct.id),
});

//
export const CommandProductRelation = relations(CommandProduct, ({ many }) => ({
  items: many(CommandItem),
}));
export const CommandItemRelation = relations(CommandItem, ({ one }) => ({
  command: one(CommandProduct, {
    fields: [CommandItem.commandProduct],
    references: [CommandProduct.id],
  }),
}));

export type InsertCommandItem = typeof CommandItem.$inferInsert;
export type SelectCommandItem = typeof CommandItem.$inferSelect;

//
export const PointOfSale = pgTable("point_of_sale", {
  ...commonFieldTable,
  name: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 255 }).notNull(),
  description: text(),
  statut: PointOfSaleStatutEnum().default("OPEN").notNull(),
});

export type InsertPointOfSale = typeof PointOfSale.$inferInsert;
export type SelectPointOfSale = typeof PointOfSale.$inferSelect;
