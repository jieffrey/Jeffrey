"use client";
import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import SmoothScroll from "./SmoothScroll";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SmoothScroll>{children}</SmoothScroll>
    </ThemeProvider>
  );
}
