import { Button, type ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

/**
 *
 * @param ButtonProps
 * @param isLoading boolean
 * * use when is action isloading
 * @param loadingText string
 * @returns ReactNode
 */
export function ButtonLoader({
  isLoading,
  loadingText,
  ...props
}: React.PropsWithChildren<
  ButtonProps & { isLoading?: boolean; loadingText?: string }
>): React.ReactNode {
  return (
    <Button type="submit" disabled={isLoading} {...props}>
      {isLoading ? (
        <span className="flex justify-center items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText}
        </span>
      ) : (
        props.children
      )}
    </Button>
  );
}
