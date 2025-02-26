"use client";

import { InvoiceForm } from "@/components/forms/invoice-form";
import { useCommandProduct } from "@/hooks/mutations";
import { SelectProduct } from "@/server/db";

interface SaleClientPageProps {
  products?: SelectProduct[];
}

export const SaleClientPage: React.FC<SaleClientPageProps> = ({ products }) => {
  const mutation = useCommandProduct();
  return (
    <div>
      <InvoiceForm products={products} onSubmit={mutation.mutateAsync} />
    </div>
  );
};
