"use client";
import type { PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider as QCProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <QCProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QCProvider>
  );
}
