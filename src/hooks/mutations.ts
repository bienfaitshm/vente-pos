import { loginUser, signinUser } from "@/server/actions/account";
import * as itemActions from "@/server/actions/items";
import { useMutation } from "@tanstack/react-query";
import type {
  LoginCredential,
  RegistrationCredential,
  Category,
  Product,
  PointOfSale,
} from "@/lib/schemas";

export function useLoginUser() {
  return useMutation({
    networkMode: "always",
    mutationKey: ["LOGIN"],
    mutationFn: (value: LoginCredential) => loginUser(value),
  });
}

export function useSigninUser() {
  return useMutation({
    networkMode: "always",
    mutationKey: ["SIGNIN"],
    mutationFn: (value: RegistrationCredential) => signinUser(value),
  });
}

export function useCreateCategory() {
  return useMutation({
    networkMode: "always",
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: (value: Category) => itemActions.createCategory(value),
  });
}

export function useUpdateCategory() {
  return useMutation({
    networkMode: "always",
    mutationKey: ["UPDATE_CATEGORY"],
    mutationFn: (value: Category) => itemActions.updateCategory(value),
  });
}

export function useDeleteCategory() {
  return useMutation({
    networkMode: "always",
    mutationKey: ["DELETE_CATEGORY"],
    mutationFn: (id: number | string) => itemActions.deleteCategory({ id }),
  });
}

export function useCreateProduct() {
  return useMutation({
    networkMode: "always",
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: (value: Product) => itemActions.createProduct(value),
  });
}

export function useUpdateProduct() {
  return useMutation({
    networkMode: "always",
    mutationKey: ["UPDATE_PRODUCT"],
    mutationFn: (value: Product) => itemActions.updateProduct(value),
  });
}

export function useDeleteProduct() {
  return useMutation({
    networkMode: "always",
    mutationKey: ["DELETE_PRODUCT"],
    mutationFn: (id: number | string) => itemActions.deleteProduct({ id }),
  });
}

//

export function useCreatePointOfSale() {
  return useMutation({
    networkMode: "always",
    mutationKey: ["CREATE_PointOfSale"],
    mutationFn: (value: PointOfSale) => itemActions.createPointOfSale(value),
  });
}

export function useUpdatePointOfSale() {
  return useMutation({
    networkMode: "always",
    mutationKey: ["UPDATE_PointOfSale"],
    mutationFn: (value: PointOfSale) => itemActions.updatePointOfSale(value),
  });
}

export function useDeletePointOfSale() {
  return useMutation({
    networkMode: "always",
    mutationKey: ["DELETE_PointOfSale"],
    mutationFn: (id: number | string) => itemActions.deletePointOfSale({ id }),
  });
}
