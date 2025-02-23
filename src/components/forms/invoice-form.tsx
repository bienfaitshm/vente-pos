"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type HookSafeActionFnSubmiter,
  TFormReturn,
  useForm,
} from "@/hooks/form";
import { InvoiceSchemas, type Invoice } from "@/lib/schemas";
import React from "react";

export type TInvoiceDefaultValue = Invoice;
const defaultValues: TInvoiceDefaultValue = {
  client: null,
  items: [],
  saler: 1,
};
interface InvoiceFormProps {
  onSubmit: HookSafeActionFnSubmiter<typeof InvoiceSchemas>;
  initialValues?: Partial<TInvoiceDefaultValue>;
}

interface InvoicePropsWithForm {
  form: TFormReturn<typeof InvoiceSchemas>;
}

const InputInvoiceForm: React.FC<InvoicePropsWithForm> = ({ form }) => {
  return (
    <div>
      <FormField
        control={form.control}
        name="client"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client</FormLabel>
            <FormControl>
              {/* <Input {...field} /> */}
              <h1>Input client</h1>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export const InvoiceForm: React.FC<
  React.PropsWithChildren<InvoiceFormProps>
> = ({ onSubmit, children, initialValues = defaultValues }) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: InvoiceSchemas,
    options: {
      formProps: { defaultValues: initialValues },
      actionProps: {
        onSuccess() {
          form.reset(defaultValues);
        },
      },
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <div className="grid grid-cols-2 gap-2">
          <InputInvoiceForm form={form} />
        </div>
        {children}
      </form>
    </Form>
  );
};
