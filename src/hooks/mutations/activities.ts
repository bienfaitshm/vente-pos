import * as actions from "@/server/actions";
import { useMutation } from "@tanstack/react-query";
import type { Invoice } from "@/lib/schemas";
import { ParamsMutation } from "./types";
import * as schemas from "@/lib/schemas/activities";

//
export function useCommandProduct(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.commandProduct>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["COMMAND_PRODUCT"],
    mutationFn: (value: Invoice) => actions.commandProduct(value),
    ...params,
  });
}

//
export function useUpdateCommandProduct(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.commandProduct>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["UPDATE_COMMAND_PRODUCT"],
    mutationFn: (value: Invoice) => actions.commandProduct(value),
    ...params,
  });
}

//
export function useDeleteCommandProduct(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.commandProduct>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["DELETE_COMMAND_PRODUCT"],
    mutationFn: (value: Invoice) => actions.commandProduct(value),
    ...params,
  });
}

//

export function useChangeStock(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.changeStock>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["CHANGE_STOCK"],
    mutationFn: (value: schemas.Stock) => actions.changeStock(value),
    ...params,
  });
}
