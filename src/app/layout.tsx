import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conway's Game of Life",
  description: "A simple implementation of Conway's Game of Life in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
