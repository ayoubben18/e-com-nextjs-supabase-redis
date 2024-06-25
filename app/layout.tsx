import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";
import NavBar from "@/components/NavBar";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "Test UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster richColors position="top-center" />
            <NavBar />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
