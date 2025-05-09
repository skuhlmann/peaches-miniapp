import Providers from "@/components/providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`font-sans bg-brand-black min-h-screen flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-1 pt-20 pb-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
