import { PageProps } from "@/app/type";
import Invoice from "@/components/invoice";
import { TypographyH1 } from "@/components/ui/typography";

export default async function Page({ params }: PageProps<{ orderId: string }>) {
  const { orderId } = await params;
  return (
    <div className="max-w-screen-lg mx-auto">
      <TypographyH1>Order {orderId}</TypographyH1>
      <Invoice />
    </div>
  );
}
