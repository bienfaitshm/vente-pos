import { loginUser, signinUser } from "@/server/actions/account";
import { useMutation } from "@tanstack/react-query";
import type { LoginCredential, RegistrationCredential } from "@/lib/schemas";

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
