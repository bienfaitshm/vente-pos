import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useFormHook } from "react-hook-form";
import type { FieldValues, UseFormProps } from "react-hook-form";
import type { z, ZodType } from "zod";

export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>(
  schemas: ZodType<any, any, any>,
  options?: UseFormProps<TFieldValues, TContext>
) {
  return useFormHook({
    resolver: zodResolver(schemas),
    ...options,
  });
}
