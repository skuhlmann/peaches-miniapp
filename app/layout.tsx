import Providers from "@/components/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PEACH TYCOON",
  description:
    "A seasonal NFT farming game where players can earn and/or sell boxes of real peaches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-brand-black min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
