"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

import { DataTableMonthlyCommission } from "./tables/mounth-commission-table";
import React from "react";
import { MonthlyCommissionChart, MonthlyCommissionChartLine } from "./charts/monthly-commissions-chart";
import { Button } from "./ui/button";
import { TrendingUp } from "lucide-react";

type MonthSalesViewProps = {
  data?: {
    year: number;
    month: number;
    totalCommission: number;
    totalSales: number;
    totalOrders: number;
  }[];
};
export const MonthSalesView: React.FC<MonthSalesViewProps> = ({
  data = [],
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="secondary">
          <TrendingUp className="h-4 w-4" />
          <span className="ml-2">Ventes et Commissions</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-full">
        <div className="mx-auto max-w-screen-lg">
          <SheetHeader className="pb-5">
            <SheetTitle className="uppercase">
              Vente et Commission mensuelle
            </SheetTitle>
            <SheetDescription>
              Cette vue affiche les ventes et les commissions générées
              mensuellement, offrant une analyse détaillée pour une meilleure
              gestion.
            </SheetDescription>
          </SheetHeader>
        </div>
        <ScrollArea className="h-full">
          <div className="mx-auto max-w-screen-lg mt-5 mb-36">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MonthlyCommissionChartLine data={data} />
              <MonthlyCommissionChart data={data} />
            </div>
            <div>
              <DataTableMonthlyCommission data={data} />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
