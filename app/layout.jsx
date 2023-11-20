import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-[1200px] mx-auto p-2">{children}</div>
      </body>
    </html>
  );
}
