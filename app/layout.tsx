import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CartProvider } from "@/lib/cart-context";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "GFive Mines & Minerals – Premium Marble & Natural Stone",
  description:
    "Premium marble slabs, granite blocks, and mined minerals for construction, interiors, and architectural stonework.",
  // generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>

        {/* Favicon */}
        <link rel="icon" href="/placeholder.jpg" />
        {/* You can also add other formats if needed */}
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> */}
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
        <Analytics />
        {/* <WhatsAppButton /> */}
      </body>
    </html>
  );
}
