import { zodResolver } from "@hookform/resolvers/zod";
import {
  type HookProps,
  useHookFormAction,
} from "@next-safe-action/adapter-react-hook-form/hooks";
import type { Infer } from "next-safe-action/adapters/types";
import type { HookSafeActionFn } from "next-safe-action/hooks";
import type { UseFormReturn } from "react-hook-form";
import type { Schema, ZodType, ZodTypeDef } from "zod";

type TypeParams<
  ServerError,
  S extends Schema,
  BAS extends readonly Schema[],
  CVE,
  CBAVE,
  Data,
  FormContext
> = {
  action: HookSafeActionFn<ServerError, S, BAS, CVE, CBAVE, Data>;
  schemas: ZodType<unknown, ZodTypeDef, unknown>;
  options?: HookProps<ServerError, S, BAS, CVE, CBAVE, Data, FormContext>;
};

export type HookSafeActionFnSubmiter<
  TSchemas extends Schema<unknown, ZodTypeDef, unknown>
> = HookSafeActionFn<
  unknown,
  TSchemas,
  readonly ZodType<unknown, ZodTypeDef, unknown>[],
  unknown,
  unknown,
  unknown
>;

export type TFormReturn<
  S extends Schema,
  FormContext = unknown
> = UseFormReturn<Infer<S>, FormContext>;

export function useForm<
  ServerError,
  S extends Schema,
  BAS extends readonly Schema[],
  CVE,
  CBAVE,
  Data,
  FormContext = unknown
>({
  action,
  schemas,
  options,
}: TypeParams<ServerError, S, BAS, CVE, CBAVE, Data, FormContext>) {
  return useHookFormAction<ServerError, S, BAS, CVE, CBAVE, Data, FormContext>(
    action,
    zodResolver(schemas),
    options
  );
}
