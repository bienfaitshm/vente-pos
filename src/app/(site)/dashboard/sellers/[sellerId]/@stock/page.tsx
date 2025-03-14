import { PageProps } from "@/app/type";
import { StockFormDialog } from "@/components/dialogs/stock-form-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographySmall } from "@/components/ui/typography";
import {
  getPointOfSales,
  getProducts,
  getStocksOfSeller,
} from "@/server/actions";
import { PencilIcon } from "lucide-react";
import React from "react";

export default async function StockPage({
  params,
}: PageProps<{ sellerId: string }>) {
  const { sellerId } = await params;
  const [pointOfSales, products, stocks] = await Promise.all([
    getPointOfSales({}),
    getProducts({}),
    getStocksOfSeller({ sellerId }),
  ]);
  return (
    <div>
      <div className="grid gap-2 md:grid-cols-4 md:gap-4">
        {stocks?.data?.map((stock) => (
          <div
            key={stock.id}
            className="flex flex-col gap-4 p-3 rounded-xl bg-muted-foreground/10"
          >
            <div className="flex items-center justify-between">
              <TypographySmall className="text-muted-foreground text-xs">
                {stock.product}
              </TypographySmall>
              <Badge
                className="text-xs font-medium rounded-full"
                variant={stock.quantity > 0 ? "default" : "destructive"}
              >
                {stock.quantity > 0 ? "Enstock" : "A cours de stock"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <TypographyH3>{stock.quantity}</TypographyH3>
              <StockFormDialog
                defaultValues={{
                  saler: "1bc14f8b-8fe8-46bd-9b53-13bffa2db540",
                  product: stock.productId as string,
                }}
                type="UPDATE"
                pointOfSales={pointOfSales?.data}
                products={products?.data}
              >
                <Button variant="outline" size="icon" className="rounded-full">
                  <PencilIcon className="h-4 w-4" />
                </Button>
              </StockFormDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
