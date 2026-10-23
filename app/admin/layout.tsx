import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";

import "../globals.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh bg-background text-foreground">{children}</body>
    </html>
  );
}
