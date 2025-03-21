"use client";
import React from "react";
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
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { type HookSafeActionFnSubmiter, useForm } from "@/hooks/form";
import { OrderSchemas, type Order } from "@/lib/schemas/activities";
import { PlusCircle, UserRoundPlus } from "lucide-react";
import type { SelectCustomer, SelectProduct } from "@/server/db";
import {
  CustomerInputContainer,
  CustomerInputDialog,
  CustomerSelect,
} from "../fields/customer-input";

import { ProductItem } from "../fields/customer-field/client-field";
import {
  ClientDrawerForm,
  useClientDrawerForm,
} from "../fields/customer-field/client-drawer-form";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/formater";
import { Control, useFieldArray } from "react-hook-form";
import { calculateSubTotal } from "@/lib/utils";

// Define default values for the order form
export type TOrderDefaultValue = Order;
const defaultValues: Partial<TOrderDefaultValue> = {
  customerId: "",
  orderDetails: [],
};

interface OrderFormProps {
  onSubmit: HookSafeActionFnSubmiter<typeof OrderSchemas>;
  initialValues?: Partial<TOrderDefaultValue>;
  products?: SelectProduct[];
  customers?: SelectCustomer[];
}

interface OrderPropsWithForm {
  control: Control<TOrderDefaultValue>;
}

// Component for rendering the order form fields
const OrderFormFields: React.FC<
  OrderPropsWithForm & {
    products?: SelectProduct[];
    customers?: SelectCustomer[];
  }
> = ({ control, products = [], customers = [] }) => {
  const clientDrawerForm = useClientDrawerForm();
  const { update, append, remove, fields } = useFieldArray({
    control: control,
    name: "orderDetails",
  });

  return (
    <div className="space-y-2">
      {/* Customer selection field */}
      <FormField
        control={control}
        name="customerId"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel>Client</FormLabel>
            <FormControl>
              <CustomerInputContainer customers={customers}>
                <CustomerSelect value={field.value} onChange={field.onChange} />
                <CustomerInputDialog onChange={field.onChange} />
              </CustomerInputContainer>
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

      {/* Product selection and management field */}
      <FormField
        control={control}
        name="orderDetails"
        render={() => (
          <FormItem>
            <FormLabel>Produits</FormLabel>
            <FormDescription>
              Pour ajouter un produit, cliquez sur le bouton{" "}
              <PlusCircle className="h-3 w-3 inline-flex" />. Une fois le
              produit ajouté, vous pourrez modifier la quantité souhaitée.
            </FormDescription>
            <div>
              {/* Drawer form for adding/editing products */}
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
                  {/* Render each product in the order */}
                  {fields.map((orderDetail, index) => (
                    <FormField
                      key={orderDetail.id}
                      control={control}
                      name={`orderDetails.${index}`}
                      render={({ field: itemField }) => (
                        <FormItem>
                          <FormControl>
                            <ProductItem
                              productName={orderDetail.productName}
                              quantity={orderDetail.quantity}
                              amount={formatCurrency(
                                orderDetail.unitPrice * orderDetail.quantity
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  {/* Button to add a new product */}
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

// Component for rendering the order summary
const OrderSummary: React.FC<OrderPropsWithForm> = ({ control }) => {
  return (
    <div className="space-y-4 w-full">
      {/* Summary header */}
      <div className="flex items-center justify-center bg-primary text-muted p-4 rounded-lg">
        <h1 className="text-lg">Sommaire</h1>
      </div>
      {/* Table displaying order details */}
      <FormField
        control={control}
        name="orderDetails"
        render={({ field }) => (
          <Table className="text-xs">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Designation</TableHead>
                <TableHead>Qte</TableHead>
                <TableHead>PU</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {field.value.map((orderDetail, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {orderDetail.productName}
                  </TableCell>
                  <TableCell>{orderDetail.quantity}</TableCell>
                  <TableCell>{formatCurrency(orderDetail.unitPrice)}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(
                      orderDetail.unitPrice * orderDetail.quantity
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(
                    calculateSubTotal(
                      field.value,
                      (i) => i.quantity * i.unitPrice
                    )
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      />
    </div>
  );
};

// Main OrderForm component
export const OrderForm: React.FC<React.PropsWithChildren<OrderFormProps>> = ({
  onSubmit,
  children,
  initialValues,
  products = [],
  customers = [],
}) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: OrderSchemas,
    options: {
      formProps: { defaultValues: { ...defaultValues, ...initialValues } },
      actionProps: {
        onSuccess(response) {
          if (response.data) {
            form.reset(defaultValues);
          }
        },
      },
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmitWithAction}>
          <div className="grid md:grid-cols-5 gap-28">
            {/* Left section: Order form fields */}
            <div className="md:col-span-3">
              <OrderFormFields
                customers={customers}
                products={products}
                control={form.control}
              />
            </div>
            {/* Right section: Order summary and additional content */}
            <div className="md:col-span-2 space-y-5">
              <OrderSummary control={form.control} />
              {children}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
