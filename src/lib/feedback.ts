import type { ParamsMutation } from "@/hooks/mutations/types";
import { toast } from "sonner"


type FeedbackParams<T, E = unknown> = {
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: T) => void;
    onError?: (error: E) => void;
};

export function feedback<T extends {
    validationErrors: string; data?: unknown 
}, E = unknown>(params?: FeedbackParams<T, E>): ParamsMutation<T> {
    return {
        onSuccess(response) {
            if (response?.data) {
                toast.success(params?.successMessage || "Opération réussie !");
                params?.onSuccess?.(response);
            } else {
                toast.error(params?.errorMessage || "Opération échouée !");
                params?.onError?.(response?.validationErrors as E);
            }
        },
        onError(error) {
            toast.error(params?.errorMessage || "Opération échouée !");
            params?.onError?.(error as E);
        }
    };
}
