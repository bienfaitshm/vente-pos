"use client";
import type { HookSafeActionFn } from "next-safe-action/hooks";
import type { ZodType, ZodTypeDef } from "zod";
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
import { ClientSchemas, type Client } from "@/lib/schemas";
import { useForm } from "@/hooks/form";

export type TClientDefaultValue = Client;

const defaultValues: TClientDefaultValue = {
  name: "",
  address: "",
  phoneNumber: "",
};

interface ClientFormRef {
  submit(): void;
}

interface ClientFormProps {
  onSubmit: HookSafeActionFn<
    unknown,
    typeof ClientSchemas,
    readonly ZodType<unknown, ZodTypeDef, unknown>[],
    unknown,
    unknown,
    unknown
  >;
  initialValues?: Partial<TClientDefaultValue>;
  ref?: React.Ref<ClientFormRef>;
}

export const ClientForm: React.FC<ClientFormProps> = ({
  onSubmit,
  initialValues = defaultValues,
  ref,
}) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: ClientSchemas,
    options: {
      formProps: { defaultValues: initialValues },
      actionProps: {
        onSuccess() {
          form.reset(defaultValues);
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
    []
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
