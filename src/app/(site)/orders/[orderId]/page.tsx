import { PageProps } from "@/app/type";
import Invoice from "@/components/invoice";
// import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { getOrderWithDetails } from "@/server/actions";

export default async function Page({ params }: PageProps<{ orderId: string }>) {
  const { orderId } = await params;
  const order = await getOrderWithDetails({ orderId });
  return (
    <div className="max-w-screen-lg mx-auto">
      {/* <TypographyH1>Order {orderId}</TypographyH1>
      <TypographyP>{JSON.stringify(order, null, 4)}</TypographyP> */}
      <Invoice details={order?.data?.orderDetails || []} />
    </div>
  );
}
