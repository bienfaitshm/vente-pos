import * as actions from "@/server/actions";
import { useMutation } from "@tanstack/react-query";
import { ParamsMutation, WithID } from "./types";
import * as schemas from "@/lib/schemas/activities";
import type { Order, Customer, PointOfSale } from "@/lib/schemas/activities";

//
export function usePlaceOrder(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.placeOrder>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["PLACE_ORDER"],
    mutationFn: (value: Order & { sellerId: string }) =>
      actions.placeOrder(value),
    ...params,
  });
}

//
export function useUpdateOrder(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.updateOrder>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["UPDATE_ORDER"],
    mutationFn: (value: Order & { id: string }) => actions.updateOrder(value),
    ...params,
  });
}

//
export function useDeleteOrder(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.deleteOrder>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["DELETE_ORDER"],
    mutationFn: (id: string) => actions.deleteOrder({ id }),
    ...params,
  });
}

//

export function useChangeStock(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.replenishStock>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["REPLENISH_STOCK"],
    mutationFn: (value: schemas.Stock & { adminId: string }) =>
      actions.replenishStock(value),
    ...params,
  });
}

//

export function useCreatePointOfSale(
  params?: ParamsMutation<
    Awaited<ReturnType<typeof actions.createPointOfSeller>>
  >
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["CREATE_PointOfSale"],
    mutationFn: (value: PointOfSale) => actions.createPointOfSeller(value),
    ...params,
  });
}

export function useUpdatePointOfSale(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.updatePointOfSale>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["UPDATE_PointOfSale"],
    mutationFn: (value: WithID<PointOfSale>) =>
      actions.updatePointOfSale(value),
    ...params,
  });
}

export function useDeletePointOfSale(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.deletePointOfSale>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["DELETE_PointOfSale"],
    mutationFn: (id: string) => actions.deletePointOfSale({ id }),
    ...params,
  });
}

export function useCreateCustomer(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.createCustomer>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["CREATE_CLIENT"],
    mutationFn: (value: Customer) => actions.createCustomer(value),
    ...params,
  });
}
