"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/form";
import { StockSchemas, type Stock } from "@/lib/schemas/activities";
import { HookSafeActionFn } from "next-safe-action/hooks";
import { ZodType, ZodTypeDef } from "zod";
import { PlusCircleIcon } from "lucide-react";

const DEFAULT_VALUE: Partial<Stock> = { action: "ADD", quantity: 0 };
interface StockFormProps {
  onSubmit: HookSafeActionFn<
    unknown,
    typeof StockSchemas,
    readonly ZodType<unknown, ZodTypeDef, unknown>[],
    unknown,
    unknown,
    unknown
  >;
  defaultValues?: Partial<Stock>;
  type?: "UPDATE" | "CREATE";
}

export const StockForm: React.FC<React.PropsWithChildren<StockFormProps>> = ({
  onSubmit,
  children,
  defaultValues,
  type = "CREATE",
}) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: StockSchemas,
    options: {
      formProps: { defaultValues: { ...defaultValues, ...DEFAULT_VALUE } },
      actionProps: {
        onSuccess() {
          form.reset(DEFAULT_VALUE);
        },
      },
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="action"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action Produit</FormLabel>
                <FormControl>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ToggleGroupItem
                      value="ADD"
                      className="h-20 w-full rounded-xl"
                    >
                      <PlusCircleIcon />
                      <span>Ajouts</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="SUB"
                      className="h-20 w-full rounded-xl"
                    >
                      Retrait
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormDescription>
                  « Ajouts » sert à faire entrer des produits dans votre stock,
                  tandis que « Retraits » sert à en faire sortir.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="pos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Point de ventes</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produits</FormLabel>
                  <FormControl>
                    <Select
                      disabled={type === "UPDATE"}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantites</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
