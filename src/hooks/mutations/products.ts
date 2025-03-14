import * as actions from "@/server/actions";
import { useMutation } from "@tanstack/react-query";
import type { Category, Product } from "@/lib/schemas/products";
import type { ParamsMutation, WithID } from "./types";
//
export function useCreateCategory(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.createCategory>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: (value: Category) => actions.createCategory(value),
    ...params,
  });
}

export function useUpdateCategory(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.updateCategory>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["UPDATE_CATEGORY"],
    mutationFn: (value: WithID<Category>) => actions.updateCategory(value),
    ...params,
  });
}

export function useDeleteCategory(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.deleteCategory>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["DELETE_CATEGORY"],
    mutationFn: (id: string) => actions.deleteCategory({ id }),
    ...params,
  });
}

export function useCreateProduct(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.createProduct>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: (value: Product) => actions.createProduct(value),
    ...params,
  });
}

export function useUpdateProduct(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.updateProduct>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["UPDATE_PRODUCT"],
    mutationFn: (value: WithID<Product>) => actions.updateProduct(value),
    ...params,
  });
}

export function useDeleteProduct(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.deleteProduct>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["DELETE_PRODUCT"],
    mutationFn: (id: string) => actions.deleteProduct({ id }),
    ...params,
  });
}
