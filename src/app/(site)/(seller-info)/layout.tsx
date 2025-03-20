import React from "react";
import { DatePickerWithPresets } from "@/components/calendar-preset";
import { TypographyH3 } from "@/components/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, HistoryIcon, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StockFormDialog } from "@/components/dialogs/stock-form-dialog";
import { getPointOfSales, getProducts } from "@/server/actions";
import { PageProps } from "@/app/type";
import { auth } from "@/auth";

/**
 * Layout component for the Seller Dashboard.
 *
 * This component provides a layout for the seller's dashboard, including tabs for activities, stocks, and stock histories.
 * It also includes a date picker and a button to add stock.
 *
 * @param {Object} props - The props for the Layout component.
 * @param {React.ReactNode} props.children - The child components to render inside the layout.
 * @param {React.ReactNode} props.activityHistory - The content to display in the "Historiques du stock" tab.
 * @param {React.ReactNode} props.stock - The content to display in the "Stocks" tab.
 * @param {React.ReactNode} props.activitySale - The content to display in the "Activites" tab.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.sellerId - The ID of the seller.
 *
 * @returns {JSX.Element} The rendered layout component.
 */
export default async function Layout({
  children,
  activityHistory,
  stock,
  activitySale,
}: PageProps & {
  children: React.ReactNode;
  activityHistory: React.ReactNode;
  stock: React.ReactNode;
  activitySale: React.ReactNode;
}) {
  // Fetch necessary data for the layout
  const [pointOfSales, products, session] = await Promise.all([
    getPointOfSales({}),
    getProducts({}),
    auth(),
  ]);

  return (
    <div className="m-auto max-w-screen-lg space-y-5">
      {/* Header Section */}
      <div className="p-4 bg-muted/15 rounded-xl space-y-5">
        <div className="flex items-center md:justify-between">
          <div className="border-l-4 border-primary pl-3">
            <TypographyH3 className="text-xl md:text-3xl">Vendeur</TypographyH3>
          </div>
          <DatePickerWithPresets />
        </div>
        <div>{children}</div>
      </div>

      {/* Tabs Section */}
      <div className="p-4 bg-muted/15 rounded-xl">
        <Tabs defaultValue="activities" className="w-full">
          <TabsList className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-transparent">
            <div className="space-x-2">
              {/* Activities Tab */}
              <TabsTrigger
                value="activities"
                className="rounded-full border border-input"
              >
                <Activity className="h-4 w-4 mr-2" />
                <span>Activites</span>
              </TabsTrigger>

              {/* Stocks Tab */}
              <TabsTrigger
                value="stocks"
                className="rounded-full border border-input"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span>Stocks</span>
              </TabsTrigger>

              {/* Stock Histories Tab */}
              <TabsTrigger
                value="stock-histories"
                className="rounded-full border border-input"
              >
                <HistoryIcon className="h-4 w-4 mr-2" />
                <span>Historiques du stock</span>
              </TabsTrigger>
            </div>

            {/* Add Stock Button */}
            <div className="self-end">
              <StockFormDialog
                adminId={session?.user.id as string}
                defaultValues={{ sellerId: session?.user.id as string }}
                pointOfSales={pointOfSales?.data}
                products={products?.data}
              >
                <Button variant="outline" className="rounded-full h-7">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  <span>Ajouter au stock</span>
                </Button>
              </StockFormDialog>
            </div>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="stock-histories" className="mt-10">
            {activityHistory}
          </TabsContent>
          <TabsContent value="activities" className="mt-10">
            {activitySale}
          </TabsContent>
          <TabsContent value="stocks" className="mt-10">
            {stock}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
