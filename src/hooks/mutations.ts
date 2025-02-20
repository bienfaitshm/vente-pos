import { loginUser, signinUser } from "@/server/actions/account";
import { createCategory } from "@/server/actions/items";
import { useMutation } from "@tanstack/react-query";
import type {
  LoginCredential,
  RegistrationCredential,
  Category,
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
    mutationFn: (value: Category) => createCategory(value),
  });
}
