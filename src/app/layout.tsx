import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import QueryClientProvider from "@/components/providers/tanstack-provider";
import { Toaster } from "sonner";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yummy foodyz",
  description: "Suivi automatique des stocks avec des notifications en cas de faiblesse des stocks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
        </SessionProvider>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
