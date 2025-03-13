import {
  pgTable,
  integer,
  varchar,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { commonFieldTable } from "./base";

/**
 * categories table schema
 */
export const categories = pgTable("categories", {
  ...commonFieldTable,
  name: varchar({ length: 255 }).notNull(),
});

export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;

/**
 * products table schema
 */
export const products = pgTable("products", {
  ...commonFieldTable,
  name: varchar({ length: 255 }).notNull(),
  categoriesId: varchar("category_id", { length: 10 })
    .references(() => categories.id, { onDelete: "cascade" })
    .notNull(),
  quantity: integer().notNull(),
  unitPrice: doublePrecision("unit_price").notNull(),
  commission: integer().default(10).notNull(),
});

/**
 * Relations for categories table
 */
export const categoriesRelation = relations(categories, ({ many }) => ({
  productss: many(products),
}));

/**
 * Relations for products table
 */
export const productsRelation = relations(products, ({ one }) => ({
  categories: one(categories, {
    fields: [products.categoriesId],
    references: [categories.id],
  }),
}));

export type InsertProduct = typeof products.$inferInsert;
export type SelectProduct = typeof products.$inferSelect;
