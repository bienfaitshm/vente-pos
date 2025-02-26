import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  varchar,
  doublePrecision,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";

export const PointOfSaleStatutEnum = pgEnum("statut", [
  "OPEN",
  "CLOSE",
  "RENOVATION",
]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar({ length: 255 }),
  username: varchar({ length: 255 }).unique(),
  email: varchar({ length: 255 }).unique(),
  password: varchar({ length: 255 }),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  isAdmin: boolean("is_admin").$default(() => false),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);

const commonFieldTable = {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  updatedAt: timestamp("updated_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
};

export const Client = pgTable("client", {
  ...commonFieldTable,
  name: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }),
  email: varchar({ length: 255 }),
  phoneNumber: varchar({ length: 255 }),
});

export type InsertClient = typeof Client.$inferInsert;
export type SelectClient = typeof Client.$inferSelect;

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

//
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
  category: integer("category_id")
    .references(() => Category.id, { onDelete: "cascade" })
    .notNull(),
  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
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

//
export const CommandProduct = pgTable("command_product", {
  ...commonFieldTable,
  amount: doublePrecision().notNull(),
  isConfirmed: boolean("is_confirmed").$default(() => false),
  client: integer("client_id")
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
  product: integer("product_id")
    .references(() => Product.id)
    .notNull(),
  commandProduct: integer("command_id").references(() => CommandProduct.id),
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
