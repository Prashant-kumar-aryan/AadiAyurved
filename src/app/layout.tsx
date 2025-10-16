import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartMini } from "@/components/cart/cart-mini";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aadi Ayurveda",
  description: "Aadi Ayurveda - Your Wellness Journey Begins Here",
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
        <Topbar />
        <Navbar />
        <main>
          <CartProvider>{children}</CartProvider>
        </main>
      </body>
    </html>
  );
}
