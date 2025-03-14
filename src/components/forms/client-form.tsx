"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomerSchemas, type Customer } from "@/lib/schemas/activities";
import { useForm, type HookSafeActionFnSubmiter } from "@/hooks/form";

export type TCustomerDefaultValue = Customer;

const DEFAULT_VALUE: TCustomerDefaultValue = {
  name: "",
  address: "",
  phoneNumber: "",
};

interface CustomerFormRef {
  submit(): void;
}

interface CustomerFormProps {
  onSubmit: HookSafeActionFnSubmiter<typeof CustomerSchemas>;
  initialValues?: Partial<TCustomerDefaultValue>;
  ref?: React.Ref<CustomerFormRef>;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  onSubmit,
  initialValues = DEFAULT_VALUE,
  ref,
}) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: CustomerSchemas,
    options: {
      formProps: { defaultValues: { ...DEFAULT_VALUE, ...initialValues } },
      actionProps: {
        onSuccess() {
          form.reset(DEFAULT_VALUE);
        },
      },
    },
  });

  React.useImperativeHandle(
    ref,
    () => ({
      submit() {
        handleSubmitWithAction();
      },
    }),
    [handleSubmitWithAction]
  );
  return (
    <Form {...form}>
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero telephone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export function useCustomerForm() {
  return React.useRef<CustomerFormRef>(null);
}
