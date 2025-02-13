import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import type { FieldValues, UseFormProps } from "react-hook-form";
import type { ZodType } from "zod";

type TypeParams<TFieldValues extends FieldValues, TContext> = {
  action: (e: any) => any;
  schemas: ZodType<any, any, any>;
  options?: UseFormProps<TFieldValues, TContext>;
};
export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>({ action, schemas, options }: TypeParams<TFieldValues, TContext>) {
  return useHookFormAction(action, zodResolver(schemas), {
    actionProps: {},
    formProps: {
      ...options,
    },
    errorMapProps: {},
  });
}
