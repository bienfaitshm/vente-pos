import {
  pgTable,
  integer,
  varchar,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { commonFieldTable } from "./base";

export const Category = pgTable("category", {
  ...commonFieldTable,
  name: varchar({ length: 255 }).notNull(),
});

export type InsertCategory = typeof Category.$inferInsert;
export type SelectCategory = typeof Category.$inferSelect;

//
export const Product = pgTable("product", {
  ...commonFieldTable,
  name: varchar({ length: 255 }).notNull(),
  category: varchar("category_id", { length: 10 })
    .references(() => Category.id, { onDelete: "cascade" })
    .notNull(),
  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
  commission: integer().default(10).notNull(),
});

export const CategoryRelation = relations(Category, ({ many }) => ({
  products: many(Product),
}));
export const ProductRelation = relations(Product, ({ one }) => ({
  category: one(Category, {
    fields: [Product.category],
    references: [Category.id],
  }),
}));
export type InsertProduct = typeof Product.$inferInsert;
export type SelectProduct = typeof Product.$inferSelect;
