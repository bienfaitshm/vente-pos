"use client";

import { InvoiceForm } from "@/components/forms/invoice-form";
import { useCommandProduct } from "@/hooks/mutations";

export const SaleClientPage = () => {
  const mutation = useCommandProduct();
  return (
    <div>
      <h1>Client page</h1>
      <InvoiceForm onSubmit={mutation.mutateAsync} />
    </div>
  );
};
