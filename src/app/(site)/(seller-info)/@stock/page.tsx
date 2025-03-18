import React from "react";
import { StockFormDialog } from "@/components/dialogs/stock-form-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TypographyH3,
  TypographyH4,
  TypographySmall,
} from "@/components/ui/typography";
import {
  getPointOfSales,
  getProducts,
  getStocksOfSeller,
} from "@/server/actions";
import { PencilIcon } from "lucide-react";
import { auth } from "@/auth";

export default async function StockPage() {
  const session = await auth();
  const [pointOfSales, products, stocks] = await Promise.all([
    getPointOfSales({}),
    getProducts({}),
    getStocksOfSeller({ sellerId: session?.user.id ?? "" }),
  ]);

  const stockData = stocks?.data ?? [];

  return (
    <div>
      {stockData.length === 0 && (
        <TypographyH4 className="text-center text-muted-foreground">
          Aucun produit n&apos;est actuellement en stock.
        </TypographyH4>
      )}
      <div className="grid gap-2 md:grid-cols-4 md:gap-4">
        {stockData.map((stock) => (
          <div
            key={stock.id}
            className="flex flex-col gap-4 p-3 rounded-xl bg-muted-foreground/10"
          >
            <div className="flex items-center justify-between">
              <TypographySmall className="text-muted-foreground text-xs">
                {stock.productName}
              </TypographySmall>
              <Badge
                className="text-xs font-medium rounded-full"
                variant={stock.quantity > 0 ? "default" : "destructive"}
              >
                {stock.quantity > 0 ? "En stock" : "À court de stock"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <TypographyH3>{stock.quantity}</TypographyH3>
              <StockFormDialog
                adminId={session?.user.id as string}
                defaultValues={{
                  sellerId: session?.user.id ?? "",
                  productId: stock.productId,
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
