import { PageProps } from "@/app/type";
import { TypographyH1 } from "@/components/ui/typography";

export default async function Page({ params }: PageProps<{ orderId: string }>) {
  const { orderId } = await params;
  return (
    <div>
      <TypographyH1>Order {orderId}</TypographyH1>
    </div>
  );
}
