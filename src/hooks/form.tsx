import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import type { FieldValues, UseFormProps } from "react-hook-form";
import type { ZodType } from "zod";

type ErrorArgsType = {
  error: {
    serverError?: unknown;
    validationErrors?: unknown;
    bindArgsValidationErrors?: unknown;
  };
  input: any;
};

type TypeParams<TFieldValues extends FieldValues, TContext> = {
  action: (e: any) => any;
  schemas: ZodType<any, any, any>;
  options?: {
    formProps?: UseFormProps<TFieldValues, TContext>;
    actionProps?: {
      onSuccess?(value: { data?: unknown; input: any }): void;
      onError?(error: ErrorArgsType): void;
    };
  };
};
export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>({ action, schemas, options }: TypeParams<TFieldValues, TContext>) {
  return useHookFormAction(action, zodResolver(schemas), {
    actionProps: {
      onSuccess(args) {
        options?.actionProps?.onSuccess?.(args);
      },
      onError(args) {
        options?.actionProps?.onError?.(args);
      },
    },
    formProps: {
      ...options?.formProps,
    },
    errorMapProps: {},
  });
}
