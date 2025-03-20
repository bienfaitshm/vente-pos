import { useMutation } from "@tanstack/react-query";
import { ParamsMutation } from "./types";
import * as actions from "@/server/actions/docs"

export function useGenerateInvoiceDocument(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.generateInvoice>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["DOWNLOAD_INVOICE"],
    mutationFn: (orderId: string) => actions.generateInvoice({orderId}),
    ...params,
  });
}