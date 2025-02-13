import { zodResolver } from "@hookform/resolvers/zod";
import {
  type HookProps,
  useHookFormAction,
} from "@next-safe-action/adapter-react-hook-form/hooks";
import type { HookSafeActionFn } from "next-safe-action/hooks";
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
