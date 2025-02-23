"use client";

import { InvoiceForm } from "@/components/forms/invoice-form";
import { SafeActionResult } from "next-safe-action";
import {
  ZodObject,
  ZodOptional,
  ZodUnion,
  ZodString,
  ZodNumber,
  ZodTypeAny,
  ZodType,
  ZodTypeDef,
} from "zod";

export const SaleClientPage = () => {
  return (
    <div>
      <h1>Client page</h1>
      <InvoiceForm
        onSubmit={function (input: {
          name: string;
          id?: string | number | undefined;
        }): Promise<
          | SafeActionResult<
              unknown,
              ZodObject<
                {
                  id: ZodOptional<ZodUnion<[ZodString, ZodNumber]>>;
                  name: ZodString;
                },
                "strip",
                ZodTypeAny,
                { name: string; id?: string | number | undefined },
                { name: string; id?: string | number | undefined }
              >,
              readonly ZodType<unknown, ZodTypeDef, unknown>[],
              unknown,
              unknown,
              unknown
            >
          | undefined
        > {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};
