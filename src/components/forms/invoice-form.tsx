"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import {
  type HookSafeActionFnSubmiter,
  TFormReturn,
  useForm,
} from "@/hooks/form";
import { InvoiceSchemas, type Invoice } from "@/lib/schemas";
import React from "react";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import {
  ProductItemInput,
  useProductItemInput,
} from "../fields/product-item-input";
import { SelectProduct } from "@/server/db";

export type TInvoiceDefaultValue = Invoice;
const defaultValues: TInvoiceDefaultValue = {
  client: null,
  items: [],
  saler: 1,
};
interface InvoiceFormProps {
  onSubmit: HookSafeActionFnSubmiter<typeof InvoiceSchemas>;
  initialValues?: Partial<TInvoiceDefaultValue>;
  products?: SelectProduct[];
}

interface InvoicePropsWithForm {
  form: TFormReturn<typeof InvoiceSchemas>;
}

/**
 *
 * @param param0
 * @returns
 */
const InputInvoiceForm: React.FC<
  InvoicePropsWithForm & { products?: SelectProduct[] }
> = ({ form, products = [] }) => {
  const productItemInputRef = useProductItemInput();
  const handleOpenInputProductInput = () => {
    productItemInputRef.current?.addItem();
  };
  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="client"
        render={({}) => (
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
      <FormField
        control={form.control}
        name="items"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Produit</FormLabel>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      onClick={handleOpenInputProductInput}
                    >
                      <PlusCircle />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Ajouter un produit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <FormControl>
              <ProductItemInput
                ref={productItemInputRef}
                value={field.value}
                onChange={field.onChange}
                products={products}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

/**
 *
 * @param param0
 * @returns
 */
const InvoiceFormReviewView: React.FC<InvoicePropsWithForm> = ({}) => {
  return (
    <div>
      <h1>Somaire</h1>
    </div>
  );
};

/**
 *
 * @param param0
 * @returns
 */
export const InvoiceForm: React.FC<
  React.PropsWithChildren<InvoiceFormProps>
> = ({ onSubmit, children, initialValues = defaultValues, products = [] }) => {
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
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <InputInvoiceForm products={products} form={form} />
          </div>
          <div className="col-span-1">
            <InvoiceFormReviewView form={form} />
          </div>
        </div>
        {children}
      </form>
    </Form>
  );
};
