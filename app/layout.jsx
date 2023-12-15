import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/toaster";

import { ClerkProvider } from "@clerk/nextjs";
import { EdgeStoreProvider } from "./_lib/edgestore";

import { Inter as FontSans } from "next/font/google";
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

import "./globals.css";

export const metadata = {
  title: {
    template: "%s | Monarch Community",
    default: "Monarch Community",
  },
  description: "Share your ideas with people around the world through blogs",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable,
          )}
        >
          <div className="mx-auto max-w-[1200px] p-4">
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
            <Toaster />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
