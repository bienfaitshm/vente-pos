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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/form";
import { PointOfSaleSchemas, type PointOfSale } from "@/lib/schemas";
import { HookSafeActionFn } from "next-safe-action/hooks";
import { ZodType, ZodTypeDef } from "zod";
import { Textarea } from "@/components/ui/textarea";

export type TPointOfSaleDefaultValue = PointOfSale;
const defaultValues: TPointOfSaleDefaultValue = {
  name: "",
  address: "",
  phoneNumber: "",
  statut: "OPEN",
  description: "",
};
interface PointOfSaleProps {
  onSubmit: HookSafeActionFn<
    unknown,
    typeof PointOfSaleSchemas,
    readonly ZodType<unknown, ZodTypeDef, unknown>[],
    unknown,
    unknown,
    unknown
  >;
  initialValues?: Partial<TPointOfSaleDefaultValue>;
}

export const PointOfSaleForm: React.FC<
  React.PropsWithChildren<PointOfSaleProps>
> = ({ onSubmit, children, initialValues = defaultValues }) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: PointOfSaleSchemas,
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
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectionne le statut du point de vente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OPEN">Ouvert</SelectItem>
                      <SelectItem value="CLOSE">Fermee</SelectItem>
                      <SelectItem value="RENOVATION">En renomation</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {children}
        </div>
      </form>
    </Form>
  );
};
