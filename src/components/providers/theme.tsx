"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { useEffect, useState } from "react";

/**
 * ThemeProvider component wraps the application with theme context.
 * It ensures that the theme is only applied on the client side to avoid
 * hydration mismatches during server-side rendering.
 *
 * @param {ThemeProviderProps} props - Props passed to the ThemeProvider.
 * @returns {JSX.Element} The wrapped children with theme context.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isClient, setIsClient] = useState(false);

  // Ensure the component is rendered only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
