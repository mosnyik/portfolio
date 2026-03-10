import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import VisitorTracker from "../components/VisitorTracker";

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
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <Analytics />
        <VisitorTracker />
        {/* {process.env.NODE_ENV !== "development" && <Analytics />} */}
      </body>
    </html>
  );
}
