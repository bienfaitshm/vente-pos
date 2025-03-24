import { TrendingUp } from "lucide-react";
import { Bar, BarChart, Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { getMonthNameWithDateFns } from "@/lib/formater"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

type MonthType = {
  year: number;
  month: number;
  totalCommission: number;
  totalSales: number;
  totalOrders: number;
}

const chartConfig = {
  totalCommission: {
    label: "Commission",
    color: "hsl(var(--chart-1))",
  },
  totalSales: {
    label: "Vente",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type MonthlyCommissionChartProps = {
  data?: MonthType[];
};

export const MonthlyCommissionChart: React.FC<
  MonthlyCommissionChartProps
> = ({ data = [] }) => {
  const chartData = useChartData(data);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="totalCommission" fill="var(--color-totalCommission)" radius={4} />
              <Bar dataKey="totalSales" fill="var(--color-totalSales)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};






export const MonthlyCommissionChartLine: React.FC<MonthlyCommissionChartProps> = ({ data }) => {
  const chartData = useChartData(data)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Stacked</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="totalCommission"
              type="natural"
              fill="var(--color-totalCommission)"
              fillOpacity={0.4}
              stroke="var(--color-totalCommission)"
              stackId="a"
            />
            <Area
              dataKey="totalSales"
              type="natural"
              fill="var(--color-totalSales)"
              fillOpacity={0.4}
              stroke="var(--color-totalSales)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}


function useChartData(data: MonthType[] = []) {
  return React.useMemo(() => data.map(d => ({
    month: getMonthNameWithDateFns(d.month),
    totalCommission: d.totalCommission,
    totalSales: d.totalSales
  })), [data])
}