import { cn } from "@/lib/utils";

import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

import { EdgeStoreProvider } from "./_lib/edgestore";
import PostContextProvider from "./_provider/post-provider";

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
    icon: "/favicon-96x96.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <html lang="en">
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <div className="max-w-[1200px] mx-auto p-4">
            <PostContextProvider>
              <EdgeStoreProvider>{children}</EdgeStoreProvider>
            </PostContextProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
