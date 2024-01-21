import { Toaster } from "@/components/ui/toaster";
import Providers from "@/lib/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster as HotToaster } from "react-hot-toast";
import "./globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <Providers>
        <body className={inter.className} suppressHydrationWarning={true}>
          {children}
          <Toaster />
          <HotToaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </Providers>
    </html>
  );
}
