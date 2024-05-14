import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster"
import StoreProvider from "@/redux/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pizza 3 App",
  description: "Pagina oficial de Pizza 3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return  (
    <html lang="en">
      <body className={inter.className}>   
        <Providers>
          <StoreProvider>
            {children}
          </StoreProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  ); 
}