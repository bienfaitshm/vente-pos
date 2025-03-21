import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  TypographyH3,
  TypographyH4,
  TypographySmall,
} from "@/components/ui/typography";
import { getStocksOfSeller } from "@/server/actions";
import { auth } from "@/auth";

export default async function StockPage() {
  const session = await auth();
  const [stocks] = await Promise.all([
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
