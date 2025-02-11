import { loginUser } from "@/server/actions/account";
import { useMutation } from "@tanstack/react-query";
import type { LoginCredential } from "@/lib/schemas";

export function useLoginUser() {
  return useMutation({
    networkMode: "always",
    mutationKey: ["LOGIN"],
    mutationFn: (value: LoginCredential) => loginUser(value),
  });
}
