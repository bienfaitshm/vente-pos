"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { type HookSafeActionFnSubmiter, useForm } from "@/hooks/form";
import { InvoiceSchemas, type Invoice } from "@/lib/schemas";
import React from "react";
import { PlusCircle, UserRoundPlus } from "lucide-react";
import { SelectClient, SelectProduct } from "@/server/db";
import { ClientInput } from "../fields/client-input";
import { Separator } from "../ui/separator";

import { ProductItem } from "../fields/client-field/client-field";
import {
  ClientDrawerForm,
  useClientDrawerForm,
} from "../fields/client-field/client-drawer-form";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/formater";
import { Control, useFieldArray } from "react-hook-form";

export type TInvoiceDefaultValue = Invoice;
const defaultValues: Partial<TInvoiceDefaultValue> = {
  items: [],
  client: null,
};

interface InvoiceFormProps {
  onSubmit: HookSafeActionFnSubmiter<typeof InvoiceSchemas>;
  initialValues?: Partial<TInvoiceDefaultValue>;
  products?: SelectProduct[];
  clients?: SelectClient[];
}

interface InvoicePropsWithForm {
  control: Control<TInvoiceDefaultValue>;
}

const InvoiceFormFields: React.FC<
  InvoicePropsWithForm & {
    products?: SelectProduct[];
    clients?: SelectClient[];
  }
> = ({ control, products = [], clients = [] }) => {
  const clientDrawerForm = useClientDrawerForm();
  const { update, append, remove, fields } = useFieldArray({
    control: control,
    name: "items",
  });

  return (
    <div className="space-y-2">
      <FormField
        control={control}
        name="client"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel>Client</FormLabel>
            <FormControl>
              <ClientInput
                clients={clients}
                value={field.value as SelectClient}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
            <FormDescription>
              <span>
                Pour sélectionner un client existant, choisissez-le dans la
                liste ci-dessous. Si vous souhaitez ajouter un nouveau client,
                veuillez cliquer sur le bouton
              </span>
              <UserRoundPlus className="h-3 w-3 inline-flex mb-2" />
            </FormDescription>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="items"
        render={() => (
          <FormItem>
            <FormLabel>Produits</FormLabel>
            <FormDescription>
              Pour ajouter un produit, cliquez sur le bouton{" "}
              <PlusCircle className="h-3 w-3 inline-flex" />. Une fois le
              produit ajouté, vous pourrez modifier la quantité souhaitée.
            </FormDescription>
            <div>
              <ClientDrawerForm
                onSubmit={(newValue) => {
                  if (newValue.isEdit) {
                    update(newValue.index, newValue.value);
                  } else {
                    append(newValue.value);
                  }
                }}
                products={products}
                ref={clientDrawerForm}
              />
              <FormControl>
                <div className="space-y-2">
                  {fields.map((item, index) => (
                    <FormField
                      key={item.id}
                      control={control}
                      name={`items.${index}`}
                      render={({ field: itemField }) => (
                        <FormItem>
                          <FormControl>
                            <ProductItem
                              product={item.product?.name || ""}
                              quantity={item.quantity}
                              amount={formatCurrency(
                                item.product.price * item.quantity
                              )}
                              onEdit={() => {
                                clientDrawerForm.current?.open({
                                  index: index,
                                  ...itemField.value,
                                });
                              }}
                              onDelete={() => {
                                remove(index);
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    className="px-0 underline-offset-4 underline"
                    type="button"
                    variant="link"
                    onClick={() => clientDrawerForm.current?.open()}
                  >
                    Ajouter un produit
                    <PlusCircle />
                  </Button>
                </div>
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const InvoiceSummary: React.FC<InvoicePropsWithForm> = ({ control }) => {
  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-center bg-primary text-muted p-4 rounded-md">
        <h1 className="text-lg">Sommaire</h1>
      </div>
      <FormField
        control={control}
        name="items"
        render={({ field }) => (
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Designation</TableHead>
                <TableHead>Qte</TableHead>
                <TableHead>PU</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {field.value.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.product.name}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatCurrency(item.product.price)}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.product.price * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      />
      <div className="text-xs"></div>
      <div className="flex flex-col gap-2 border rounded-md p-2 text-sm capitalize">
        <div className="flex justify-between">
          <p className="text-muted-foreground">Sous total</p>
          <p className="font-black">20FC</p>
        </div>
        <div className="flex justify-between">
          <p className="text-muted-foreground">Taxe</p>
          <p className="font-black">20FC</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <p className="text-muted-foreground">Total</p>
          <p className="font-black">1220FC</p>
        </div>
      </div>
    </div>
  );
};

export const InvoiceForm: React.FC<
  React.PropsWithChildren<InvoiceFormProps>
> = ({ onSubmit, children, initialValues, products = [], clients = [] }) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: InvoiceSchemas,
    options: {
      formProps: { defaultValues: { ...defaultValues, ...initialValues } },
      actionProps: {
        onSuccess(response) {
          console.log({ response });
          // form.reset(defaultValues);
        },
      },
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmitWithAction}>
          <div className="grid md:grid-cols-5 gap-28">
            <div className="md:col-span-3">
              <InvoiceFormFields
                clients={clients}
                products={products}
                control={form.control}
              />
            </div>
            <div className="md:col-span-2 space-y-5">
              <InvoiceSummary control={form.control} />
              {children}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
