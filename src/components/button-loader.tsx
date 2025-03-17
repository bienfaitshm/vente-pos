import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function ButtonLoader({
  isLoading,
  loadingText,
  className,
  ...props
}: React.PropsWithChildren<
  ButtonProps & { isLoading?: boolean; loadingText?: string }
>): React.ReactNode {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn("", className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span> {loadingText}</span>
        </>
      ) : (
        props.children
      )}
    </Button>
  );
}
