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
import { useForm } from "@/hooks/form";
import { CategorySchemas, type Category } from "@/lib/schemas";
import { HookSafeActionFn } from "next-safe-action/hooks";
import { ZodType, ZodTypeDef } from "zod";

export type TCategoryDefaultValue = Category;
const defaultValues: TCategoryDefaultValue = {
  name: "",
};
interface CategoryProps {
  onSubmit: HookSafeActionFn<
    unknown,
    typeof CategorySchemas,
    readonly ZodType<unknown, ZodTypeDef, unknown>[],
    unknown,
    unknown,
    unknown
  >;
  intialValues?: Partial<TCategoryDefaultValue>;
}

export const CategoryForm: React.FC<React.PropsWithChildren<CategoryProps>> = ({
  onSubmit,
  children,
  intialValues = defaultValues,
}) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: CategorySchemas,
    options: { formProps: { defaultValues: intialValues } },
  });
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <div className="flex flex-col gap-6">
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
          {children}
        </div>
      </form>
    </Form>
  );
};
