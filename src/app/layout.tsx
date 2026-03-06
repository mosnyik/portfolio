import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moses Nyikwagh - Fintech & Blockchain Engineer",
  description:
    "Building crypto payment infrastructure: multi-chain HD wallets, payment engines, and fiat settlement systems. Expertise in Bitcoin, Ethereum, and Tron blockchain development.",
  keywords: [
    "blockchain developer",
    "fintech engineer",
    "crypto payments",
    "payment engine",
    "HD wallet",
    "Bitcoin developer",
    "Ethereum developer",
    "Tron developer",
    "Node.js",
    "TypeScript",
  ],
  openGraph: {
    title: "Moses Nyikwagh - Fintech & Blockchain Engineer",
    description: "Building crypto payment infrastructure: multi-chain HD wallets, payment engines, and fiat settlement systems.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

