import React from "react";
import { PageProps } from "@/app/type";
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

/**
 * The `StockPage` component is an asynchronous server-side rendered page
 * that displays the stock information for a specific seller. It fetches
 * data for point of sales, products, and the seller's stock, and renders
 * the stock details in a grid layout.
 *
 * @param {PageProps<{ sellerId: string }>} props - The props object containing route parameters.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.sellerId - The ID of the seller whose stock is being displayed.
 *
 * @returns {JSX.Element} A React component that renders the stock information.
 *
 * @async
 * @function
 *
 * @remarks
 * - If the seller has no stock, a message is displayed indicating that there are no products in stock.
 * - Each stock item is displayed with its product name, quantity, and a badge indicating its availability.
 * - A dialog form is provided for updating stock information, pre-filled with the seller ID and product ID.
 *
 * @example
 * ```tsx
 * <StockPage params={{ sellerId: "12345" }} />
 * ```
 */
export default async function StockPage({
  params,
}: PageProps<{ sellerId: string }>) {
  const { sellerId } = await params;
  const [pointOfSales, products, stocks, session] = await Promise.all([
    getPointOfSales({}),
    getProducts({}),
    getStocksOfSeller({ sellerId }),
    auth(),
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
                  sellerId,
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
