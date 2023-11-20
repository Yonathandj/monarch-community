import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

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
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-gray-50 font-sans antialiased",
            fontSans.variable
          )}
        >
          <div className="max-w-[1200px] mx-auto p-4">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
