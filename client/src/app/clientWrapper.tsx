"use client";

import { ThemeProvider } from "@/components/theme-provider";
import Container from "@/components/Container";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/navbar";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      <Navbar />
      <main className="flex-grow">
        <Container>{children}</Container>
      </main>
    </ThemeProvider>
  );
}
