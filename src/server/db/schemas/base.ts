import { timestamp, varchar } from "drizzle-orm/pg-core";
import ShortUniqueId from "short-unique-id";

const shordId = new ShortUniqueId({ length: 5 });
export const commonFieldTable = {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => shordId.randomUUID()),
  updatedAt: timestamp("updated_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
};
