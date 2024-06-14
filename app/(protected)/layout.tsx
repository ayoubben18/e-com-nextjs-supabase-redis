import type { Metadata } from "next";

import NavBar from "@/components/NavBar";

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
    <div>
      <NavBar />
      {children}
    </div>
  );
}
