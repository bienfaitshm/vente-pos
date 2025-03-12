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
import { ClientSchemas, type Client } from "@/lib/schemas/products";
import { useForm, type HookSafeActionFnSubmiter } from "@/hooks/form";

export type TClientDefaultValue = Client;

const DEFAULT_VALUE: TClientDefaultValue = {
  name: "",
  address: "",
  phoneNumber: "",
};

interface ClientFormRef {
  submit(): void;
}

interface ClientFormProps {
  onSubmit: HookSafeActionFnSubmiter<typeof ClientSchemas>;
  initialValues?: Partial<TClientDefaultValue>;
  ref?: React.Ref<ClientFormRef>;
}

export const ClientForm: React.FC<ClientFormProps> = ({
  onSubmit,
  initialValues = DEFAULT_VALUE,
  ref,
}) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: ClientSchemas,
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

export function useClientForm() {
  return React.useRef<ClientFormRef>(null);
}
