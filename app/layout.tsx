import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CartProvider } from "@/lib/cart-context";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Cormorant_Garamond } from "next/font/google";
import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

const displaySerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

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
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${displaySerif.variable}`}
    >
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/images/gfive_fav.png" />
      </head>
      <body className="bg-obsidian text-marble antialiased">
        <CartProvider>{children}</CartProvider>
        <Analytics />
        {/* <WhatsAppButton /> */}
      </body>
    </html>
  );
}
