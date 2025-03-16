import React from "react";
import { DatePickerWithPresets } from "@/components/calendar-preset";
import { TypographyH3 } from "@/components/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, HistoryIcon, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StockFormDialog } from "@/components/dialogs/stock-form-dialog";
import { getPointOfSales, getProducts } from "@/server/actions";
import { PageProps } from "@/app/type";

export default async function Layout({
  children,
  activityHistory,
  stock,
  activitySale,
  params,
}: PageProps<{ sellerId: string }> & {
  children: React.ReactNode;
  activityHistory: React.ReactNode;
  stock: React.ReactNode;
  activitySale: React.ReactNode;
}) {
  const { sellerId } = await params;
  const [pointOfSales, products] = await Promise.all([
    getPointOfSales({}),
    getProducts({}),
  ]);

  return (
    <div className="m-auto max-w-screen-lg space-y-5">
      <div className="p-4 bg-muted/15 rounded-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="border-l-4 border-primary pl-3">
            <TypographyH3>Detail Vendeur</TypographyH3>
          </div>
          <DatePickerWithPresets />
        </div>
        <div>{children}</div>
      </div>
      <div className="p-4 bg-muted/15 rounded-xl">
        <Tabs defaultValue="activities" className="w-full">
          <TabsList className="flex items-center justify-between bg-transparent">
            <div className="space-x-2">
              <TabsTrigger
                value="activities"
                className="rounded-full border border-input"
              >
                <Activity className="h-4 w-4 mr-2" />
                <span>Activites</span>
              </TabsTrigger>
              <TabsTrigger
                value="stocks"
                className="rounded-full border border-input"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span>Stocks</span>
              </TabsTrigger>
              <TabsTrigger
                value="stock-histories"
                className="rounded-full border border-input"
              >
                <HistoryIcon className="h-4 w-4 mr-2" />
                <span>Historiques du stock</span>
              </TabsTrigger>
            </div>
            <StockFormDialog
              defaultValues={{
                sellerId,
              }}
              pointOfSales={pointOfSales?.data}
              products={products?.data}
            >
              <Button variant="outline" className="rounded-full h-7">
                <ShoppingBag className="h-4 w-4 mr-2" />
                <span>Ajouter au stock</span>
              </Button>
            </StockFormDialog>
          </TabsList>
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
