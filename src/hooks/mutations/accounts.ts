import * as actions from "@/server/actions/account";
import { useMutation } from "@tanstack/react-query";
import type {
  LoginCredential,
  RegistrationCredential,
} from "@/lib/schemas/accounts";
import type { ParamsMutation } from "./types";

/**
 * Custom hook to perform the login operation for a user.
 *
 * This hook utilizes the `useMutation` hook from React Query to handle the login process.
 * It allows you to pass additional parameters to customize the mutation behavior.
 *
 * @param params - Optional parameters to configure the mutation. These parameters
 *                 extend the `ParamsMutation` type, which is based on the return type
 *                 of the `actions.loginUser` function.
 *
 * @returns A mutation object from React Query's `useMutation` hook, which includes
 *          methods and state for managing the login operation.
 *
 * @example
 * ```typescript
 * const { mutate, isLoading, isError } = useLoginUser({
 *   onSuccess: (data) => {
 *     console.log("Login successful:", data);
 *   },
 *   onError: (error) => {
 *     console.error("Login failed:", error);
 *   },
 * });
 *
 * mutate({ username: "user", password: "pass" });
 * ```
 */
export function useLoginUser(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.loginUser>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["LOGIN"],
    mutationFn: (value: LoginCredential) => actions.loginUser(value),
    ...params,
  });
}

/**
 * Custom hook to handle user sign-in using a mutation.
 *
 * @param params - Optional parameters for configuring the mutation.
 * These parameters extend `ParamsMutation` with the expected return type
 * of the `actions.signinUser` function.
 *
 * @returns A mutation object from `useMutation` that can be used to trigger
 * the sign-in process and track its state.
 *
 * The mutation:
 * - Uses the `actions.signinUser` function to perform the sign-in operation.
 * - Has a mutation key of `["SIGNIN"]` for caching and tracking purposes.
 * - Operates in `networkMode: "always"` to ensure it always communicates with the network.
 */
export function useUpdateSeller(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.updateSeller>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["UPDATE_USER"],
    mutationFn: (
      value: Omit<RegistrationCredential, "password" | "confirm"> & {
        sellerId: string;
      }
    ) => actions.updateSeller(value),
    ...params,
  });
}

/**
 * Custom hook to handle the deletion of a seller using a mutation.
 *
 * @param params - Optional parameters for configuring the mutation, such as callbacks or additional options.
 *                 The type is derived from `ParamsMutation` with the return type of `actions.deleteSeller`.
 *
 * @returns A mutation object from `useMutation` that can be used to trigger the deletion of a seller.
 *
 * @example
 * const { mutate: deleteSeller, isLoading, isError } = useDeleteSeller({
 *   onSuccess: () => {
 *     console.log('Seller deleted successfully');
 *   },
 *   onError: (error) => {
 *     console.error('Error deleting seller:', error);
 *   },
 * });
 *
 * deleteSeller('sellerId123');
 */
export function useDeleteSeller(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.deleteSeller>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["UPDATE_USER"],
    mutationFn: (id: string) => actions.deleteSeller({ id }),
    ...params,
  });
}
