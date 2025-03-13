ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "point_of_sales" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "stock_histories" ALTER COLUMN "action" DROP DEFAULT;