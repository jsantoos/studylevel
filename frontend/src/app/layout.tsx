import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";

import { QueryProvider } from "@/providers/query-provider";

import { ThemeProvider } from "@/providers/theme-provider";

import { Toaster } from "sonner";

import { RouteLoaderProvider } from "@/providers/route-loader-provider";

import { BootstrapProvider } from "@/providers/bootstrap-provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Study Platform",
  description:
    "AI-powered learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      suppressHydrationWarning
    >

      <body className={inter.className}>

        <BootstrapProvider>

          <ThemeProvider>

            <RouteLoaderProvider>

              <QueryProvider>

                {children}

                <Toaster
                  richColors
                  position="top-right"
                />

              </QueryProvider>

            </RouteLoaderProvider>

          </ThemeProvider>

        </BootstrapProvider>

      </body>

    </html>
  );
}